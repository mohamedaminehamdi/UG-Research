"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Users, BookOpen, Target, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Navigation } from "./components/navigation"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")

  const recentPublications = [
    {
      title: "Intelligence Artificielle et Traitement du Langage Naturel",
      author: "Dr. Ahmed Ben Salem",
      journal: "Journal of AI Research",
      year: "2024",
      type: "Article",
    },
    {
      title: "Énergies Renouvelables en Tunisie : Défis et Opportunités",
      author: "Prof. Fatma Gharbi",
      journal: "Energy & Environment",
      year: "2024",
      type: "Article",
    },
    {
      title: "Biodiversité Marine du Golfe de Gabès",
      author: "Dr. Mohamed Triki",
      journal: "Marine Biology International",
      year: "2024",
      type: "Communication",
    },
  ]

  const activeProjects = [
    {
      title: "Développement Durable et Innovation Technologique",
      responsible: "Prof. Leila Mansouri",
      partners: 3,
      funding: "150,000 TND",
      status: "En cours",
    },
    {
      title: "Patrimoine Culturel et Digitalisation",
      responsible: "Dr. Karim Bouaziz",
      partners: 2,
      funding: "80,000 TND",
      status: "En cours",
    },
  ]

  const topResearchers = [
    {
      name: "Prof. Ahmed Ben Salem",
      department: "Informatique",
      publications: 45,
      hIndex: 12,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Dr. Fatma Gharbi",
      department: "Génie Électrique",
      publications: 38,
      hIndex: 10,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Prof. Mohamed Triki",
      department: "Sciences Biologiques",
      publications: 52,
      hIndex: 15,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">UG-Research</h1>
            <p className="text-xl mb-8">Plateforme de gestion des chercheurs de l'Université de Gabès</p>
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

      {/* Statistics Cards */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Chercheurs</p>
                  <p className="text-2xl font-bold">0</p>
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
                  <p className="text-2xl font-bold">0</p>
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
                  <p className="text-2xl font-bold">0</p>
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
                  <p className="text-2xl font-bold">0</p>
                </div>
              </div>
            </CardContent>
          </Card>
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
    </div>
  )
}
