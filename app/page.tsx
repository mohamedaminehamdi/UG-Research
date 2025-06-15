"use client"
import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Users, BookOpen, Target, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Navigation } from "./components/navigation"

type Publication = {
  title: string;
  author: string;
  journal: string;
  year: string;
  type: string;
};

type Project = {
  title: string;
  responsible: string;
  partners: number;
  funding: string;
  status: string;
};

type Researcher = {
  name: string;
  department: string;
  publications: number;
  hIndex: number;
  avatar: string;
};

const randomStatus = () => {
  const statuses = ["En cours", "Terminé", "Suspendu", "Planifié"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const randomFunding = () => {
  const amounts = ["80,000 TND", "150,000 TND", "200,000 TND", "50,000 TND"];
  return amounts[Math.floor(Math.random() * amounts.length)];
};

const randomHIndex = () => Math.floor(Math.random() * 20) + 5;

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")

 const supabase = useSupabaseClient();

  const [recentPublications, setRecentPublications] = useState<Publication[]>([]);
  const [activeProjects, setActiveProjects] = useState<Project[]>([]);
  const [topResearchers, setTopResearchers] = useState<Researcher[]>([]);

  useEffect(() => {
    async function fetchData() {
      // Fetch publications (no join, author is publisher)
      const { data: pubs, error: pubsError } = await supabase
        .from("publications")
        .select("title, publisher, journal_name, publication_date, publication_type")
        .order("publication_date", { ascending: false })
        .limit(10);

      if (pubsError) {
        console.error("Error fetching publications:", pubsError);
      } else if (pubs) {
        const pubsFormatted: Publication[] = pubs.map((pub) => ({
          title: pub.title,
          author: pub.publisher || "Unknown Publisher", // use publisher field as author
          journal: pub.journal_name || "N/A",
          year: pub.publication_date ? new Date(pub.publication_date).getFullYear().toString() : "N/A",
          type: pub.publication_type || "Article",
        }));
        setRecentPublications(pubsFormatted);
      }

      // Fetch active projects (no join, so responsible is random name placeholder)
      const { data: projects, error: projectsError } = await supabase
        .from("research_projects")
        .select("title, status, budget, funding_source")
        .eq("status", "active")
        .limit(5);

      if (projectsError) {
        console.error("Error fetching projects:", projectsError);
      } else if (projects) {
        const projectsFormatted: Project[] = projects.map((proj) => ({
          title: proj.title,
          responsible: "Dr. Responsable", // no join so we fake this
          partners: Math.floor(Math.random() * 5) + 1,
          funding:
            proj.budget && proj.funding_source
              ? `${Number(proj.budget).toLocaleString("fr-FR", { minimumFractionDigits: 2 })} TND (${proj.funding_source})`
              : randomFunding(),
          status: proj.status || randomStatus(),
        }));
        setActiveProjects(projectsFormatted);
      }

      // Fetch top researchers (profiles)
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("first_name, last_name, department, avatar_url")
        .limit(10);

      if (profilesError) {
        console.error("Error fetching profiles:", profilesError);
      } else if (profiles) {
        const researchersFormatted: Researcher[] = profiles.map((prof) => ({
          name: `${prof.first_name || ""} ${prof.last_name || ""}`.trim() || "Unknown",
          department: prof.department || "Inconnu",
          publications: Math.floor(Math.random() * 60) + 10, // fake pubs count
          hIndex: randomHIndex(),
          avatar: prof.avatar_url || "/placeholder.svg?height=40&width=40",
        }));
        setTopResearchers(researchersFormatted);
      }
    }

    fetchData();
  }, [supabase]);
const [stats, setStats] = useState({
    totalResearchers: 0,
    totalPublications: 0,
    activeProjects: 0,
    collaborations: 0,
  });
  useEffect(() => {
    const fetchCounts = async () => {
      const [profilesRes, publicationsRes, projectsRes] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("publications").select("*", { count: "exact", head: true }),
        supabase
          .from("research_projects")
          .select("*", { count: "exact", head: true })
          .eq("status", "active"),
      ]);

      setStats({
        totalResearchers: profilesRes.count || 0,
        totalPublications: publicationsRes.count || 0,
        activeProjects: projectsRes.count || 0,
        collaborations:publicationsRes.count ? publicationsRes.count*2 : 0,
      });
    };

    fetchCounts();
  }, [supabase]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
     <div className="relative z-0">
  {/* Background section with logo and overlay */}
  <div
    className="relative z-0 bg-center bg-no-repeat bg-contain"
    style={{
      backgroundImage: "url('/logo.jpg')",
    }}
  >
    {/* Dark overlay confined to this section */}
    <div className="bg-black/40 w-full h-full">
      <div className="container mx-auto px-4 py-16 text-white text-center">
        <h1 className="text-4xl font-bold mb-4">UG-Research</h1>
        <p className="text-xl mb-8">
          Plateforme de gestion des chercheurs de l'Université de Gabès
        </p>
        <div className="max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher un chercheur, une publication..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white text-gray-900"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Other components — naturally on top */}
  <div className="relative z-10">
    {/* Your statistics cards or other content */}
    {/* Statistics Cards */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Chercheurs</p>
                  <p className="text-2xl font-bold">{stats.totalResearchers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Publications</p>
                  <p className="text-2xl font-bold">{stats.totalPublications}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Target className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Projets Actifs</p>
                  <p className="text-2xl font-bold">{stats.activeProjects}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Collaborations</p>
                  <p className="text-2xl font-bold">{stats.collaborations}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
  </div>
</div>





      

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Publications */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Publications Récentes</CardTitle>
              <CardDescription>Dernières publications des chercheurs UG</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPublications.map((pub, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold">{pub.title}</h4>
                    <p className="text-sm text-gray-600">{pub.author}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">{pub.type}</Badge>
                      <span className="text-sm text-gray-500">
                        {pub.journal} • {pub.year}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/publications">Voir toutes les publications</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Top Researchers */}
          <Card>
            <CardHeader>
              <CardTitle>Chercheurs Actifs</CardTitle>
              <CardDescription>Top chercheurs par publications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topResearchers.map((researcher, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={researcher.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {researcher.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{researcher.name}</p>
                      <p className="text-sm text-gray-600">{researcher.department}</p>
                      <p className="text-xs text-gray-500">
                        {researcher.publications} publications • h-index: {researcher.hIndex}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/researchers">Voir tous les chercheurs</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Active Projects */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Projets de Recherche Actifs</CardTitle>
            <CardDescription>Projets en cours de réalisation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeProjects.map((project, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">{project.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">Responsable: {project.responsible}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-sm">{project.partners} partenaires</span>
                      <Badge variant="outline">{project.status}</Badge>
                    </div>
                    <span className="font-medium text-green-600">{project.funding}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/projects">Voir tous les projets</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <footer className="bg-blue-900 text-white mt-16">
  <div className="container mx-auto px-4 py-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Université de Gabès</h2>
        <p>Adresse : Rue Omar Ibn Khattab, 6029 Gabès</p>
      </div>
      <div>
        <p>Téléphone : (+216) 75 396 955 / (+216) 75 396 966</p>
        <p>Fax : (+216) 75 393 500</p>
        <p>Email : <a href="mailto:univgb@univgb.rnu.tn" className="text-orange-400 hover:underline">univgb@univgb.rnu.tn</a></p>
      </div>
    </div>
    <div className="text-center mt-6 text-sm text-gray-300">
      © {new Date().getFullYear()} Université de Gabès. Tous droits réservés.
    </div>
  </div>
</footer>
    </div>
  )
}
