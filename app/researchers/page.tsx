"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  Filter,
  Mail,
  ExternalLink,
  MapPin,
} from "lucide-react"
import { Navigation } from "../components/navigation"
import Link from "next/link"

type Researcher = {
  id: string
  email: string
  first_name: string
  last_name: string
  title: string | null
  department: string | null
  laboratory: string | null
  avatar_url: string | null
  orcid_id: string | null
  research_interests: string[] | null
  office_location: string | null
  publications?: number
  hIndex?: number
  projects?: number
}

export default function ResearchersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedGrade, setSelectedGrade] = useState("all")
  const [researchers, setResearchers] = useState<Researcher[]>([])

  const supabase = useSupabaseClient()

  const departments = [
    "Informatique",
    "Génie Électrique",
    "Sciences Biologiques",
    "Génie Civil",
    "Histoire",
    "Chimie",
  ]

  const grades = [
    "Professeur",
    "Maître de Conférences",
    "Maître Assistant",
    "Assistant",
  ]

 useEffect(() => {
  const fetchResearchers = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select(`
        id,
        email,
        first_name,
        last_name,
        title,
        department,
        laboratory,
        avatar_url,
        orcid_id,
        research_interests,
        office_location
      `)
      .eq("is_active", true)
      .eq("role", "researcher");

    if (error) {
      console.error("Erreur lors du chargement des profils:", error);
      return;
    }

    // Add random stats to each researcher
    const researchersWithStats = data.map((researcher) => ({
      ...researcher,
      publications: Math.floor(Math.random() * 100) + 5, // between 5–104
      hIndex: Math.floor(Math.random() * 20) + 1,        // between 1–20
      projects: Math.floor(Math.random() * 10) + 1       // between 1–10
    }));

    setResearchers(researchersWithStats);
  };

  fetchResearchers();
}, [supabase]);

  const filteredResearchers = researchers.filter((researcher) => {
    const fullName = `${researcher.first_name} ${researcher.last_name}`
    const matchesSearch =
      fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      researcher.laboratory?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      researcher.research_interests?.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      )

    const matchesDepartment =
      selectedDepartment === "all" || researcher.department === selectedDepartment

    const matchesGrade =
      selectedGrade === "all" || researcher.title === selectedGrade

    return matchesSearch && matchesDepartment && matchesGrade
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Chercheurs</h1>
          <p className="text-gray-600">
            Découvrez les enseignants-chercheurs de l'Université de Gabès
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtres de recherche
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par nom, spécialité, laboratoire..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Département" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les départements</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger>
                  <SelectValue placeholder="Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les grades</SelectItem>
                  {grades.map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">{filteredResearchers.length} chercheur(s) trouvé(s)</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredResearchers.map((researcher) => {
            const fullName = `${researcher.first_name} ${researcher.last_name}`
            return (
              <Card key={researcher.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={researcher.avatar_url || "/placeholder.svg"} />
                      <AvatarFallback>
                        {researcher.first_name[0]}
                        {researcher.last_name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{fullName}</h3>
                          <p className="text-blue-600 font-medium">{researcher.title}</p>
                          <div className="flex items-center text-gray-600 text-sm mt-1">
                            <MapPin className="w-4 h-4 mr-1" />
                            {researcher.department}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <a href={`mailto:${researcher.email}`}>
                              <Mail className="w-4 h-4" />
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={`https://orcid.org/${researcher.orcid_id}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mt-2">{researcher.laboratory}</p>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {researcher.research_interests?.map((specialty, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                        <div className="text-center">
                          <p className="text-lg font-semibold text-blue-600">
                            {researcher.publications ?? 0}
                          </p>
                          <p className="text-xs text-gray-600">Publications</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-green-600">
                            {researcher.hIndex ?? 0}
                          </p>
                          <p className="text-xs text-gray-600">h-index</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-purple-600">
                            {researcher.projects ?? 0}
                          </p>
                          <p className="text-xs text-gray-600">Projets</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
