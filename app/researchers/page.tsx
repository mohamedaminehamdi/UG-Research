"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Mail, ExternalLink, MapPin } from "lucide-react"
import { Navigation } from "../components/navigation"
import Link from "next/link"

export default function ResearchersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedGrade, setSelectedGrade] = useState("all")

  const researchers = [
    {
      id: 1,
      name: "Prof. Ahmed Ben Salem",
      title: "Professeur",
      department: "Informatique",
      laboratory: "LISI - Laboratoire d'Informatique et Systèmes Intelligents",
      email: "ahmed.bensalem@ug.edu.tn",
      specialties: ["Intelligence Artificielle", "Machine Learning", "NLP"],
      publications: 45,
      hIndex: 12,
      projects: 8,
      avatar: "/placeholder.svg?height=80&width=80",
      orcid: "0000-0002-1234-5678",
    },
    {
      id: 2,
      name: "Dr. Fatma Gharbi",
      title: "Maître de Conférences",
      department: "Génie Électrique",
      laboratory: "LESE - Laboratoire d'Électronique et Systèmes Embarqués",
      email: "fatma.gharbi@ug.edu.tn",
      specialties: ["Énergies Renouvelables", "Systèmes Photovoltaïques", "Smart Grid"],
      publications: 38,
      hIndex: 10,
      projects: 5,
      avatar: "/placeholder.svg?height=80&width=80",
      orcid: "0000-0002-2345-6789",
    },
    {
      id: 3,
      name: "Prof. Mohamed Triki",
      title: "Professeur",
      department: "Sciences Biologiques",
      laboratory: "LBME - Laboratoire de Biologie Marine et Environnement",
      email: "mohamed.triki@ug.edu.tn",
      specialties: ["Biologie Marine", "Écologie", "Biodiversité"],
      publications: 52,
      hIndex: 15,
      projects: 12,
      avatar: "/placeholder.svg?height=80&width=80",
      orcid: "0000-0002-3456-7890",
    },
    {
      id: 4,
      name: "Dr. Leila Mansouri",
      title: "Maître de Conférences",
      department: "Génie Civil",
      laboratory: "LGCE - Laboratoire de Génie Civil et Environnement",
      email: "leila.mansouri@ug.edu.tn",
      specialties: ["Matériaux de Construction", "Développement Durable", "BIM"],
      publications: 29,
      hIndex: 8,
      projects: 6,
      avatar: "/placeholder.svg?height=80&width=80",
      orcid: "0000-0002-4567-8901",
    },
    {
      id: 5,
      name: "Dr. Karim Bouaziz",
      title: "Maître Assistant",
      department: "Histoire",
      laboratory: "LHPC - Laboratoire d'Histoire et Patrimoine Culturel",
      email: "karim.bouaziz@ug.edu.tn",
      specialties: ["Histoire Contemporaine", "Patrimoine Culturel", "Digitalisation"],
      publications: 22,
      hIndex: 6,
      projects: 4,
      avatar: "/placeholder.svg?height=80&width=80",
      orcid: "0000-0002-5678-9012",
    },
    {
      id: 6,
      name: "Prof. Sonia Hammami",
      title: "Professeur",
      department: "Chimie",
      laboratory: "LCA - Laboratoire de Chimie Analytique",
      email: "sonia.hammami@ug.edu.tn",
      specialties: ["Chimie Analytique", "Spectroscopie", "Environnement"],
      publications: 67,
      hIndex: 18,
      projects: 15,
      avatar: "/placeholder.svg?height=80&width=80",
      orcid: "0000-0002-6789-0123",
    },
  ]

  const departments = ["Informatique", "Génie Électrique", "Sciences Biologiques", "Génie Civil", "Histoire", "Chimie"]

  const grades = ["Professeur", "Maître de Conférences", "Maître Assistant", "Assistant"]

  const filteredResearchers = researchers.filter((researcher) => {
    const matchesSearch =
      researcher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      researcher.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      researcher.laboratory.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || researcher.department === selectedDepartment
    const matchesGrade = selectedGrade === "all" || researcher.title === selectedGrade

    return matchesSearch && matchesDepartment && matchesGrade
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Chercheurs</h1>
          <p className="text-gray-600">Découvrez les enseignants-chercheurs de l'Université de Gabès</p>
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
          {filteredResearchers.map((researcher) => (
            <Card key={researcher.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={researcher.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {researcher.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{researcher.name}</h3>
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
                          <a href={`https://orcid.org/${researcher.orcid}`} target="_blank" rel="noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mt-2">{researcher.laboratory}</p>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {researcher.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                      <div className="text-center">
                        <p className="text-lg font-semibold text-blue-600">{researcher.publications}</p>
                        <p className="text-xs text-gray-600">Publications</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-green-600">{researcher.hIndex}</p>
                        <p className="text-xs text-gray-600">h-index</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-purple-600">{researcher.projects}</p>
                        <p className="text-xs text-gray-600">Projets</p>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full mt-4" asChild>
                      <Link href={`/researchers/${researcher.id}`}>Voir le profil</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
