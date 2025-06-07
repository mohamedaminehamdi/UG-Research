"use client"
import Link from "next/link"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Calendar, Users, DollarSign } from "lucide-react"
import { Navigation } from "../components/navigation"

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  const projects = [
    {
      id: 1,
      title: "Développement Durable et Innovation Technologique",
      description: "Recherche sur les technologies vertes et leur impact sur le développement durable en Tunisie",
      responsible: {
        name: "Prof. Leila Mansouri",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      department: "Génie Civil",
      type: "Recherche Fondamentale",
      status: "En cours",
      progress: 65,
      startDate: "2023-01-15",
      endDate: "2025-12-31",
      budget: "150,000 TND",
      funding: "Ministère de l'Enseignement Supérieur",
      partners: [
        { name: "Université de Tunis", type: "Académique" },
        { name: "CERTE", type: "Recherche" },
        { name: "GreenTech Solutions", type: "Industriel" },
      ],
      objectives: [
        "Développer de nouveaux matériaux écologiques",
        "Analyser l'impact environnemental",
        "Proposer des solutions durables",
      ],
      team: 8,
      publications: 5,
    },
    {
      id: 2,
      title: "Intelligence Artificielle pour la Santé",
      description: "Application de l'IA dans le diagnostic médical et la télémédecine",
      responsible: {
        name: "Dr. Ahmed Ben Salem",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      department: "Informatique",
      type: "Recherche Appliquée",
      status: "En cours",
      progress: 40,
      startDate: "2023-09-01",
      endDate: "2026-08-31",
      budget: "200,000 TND",
      funding: "Union Européenne - Horizon Europe",
      partners: [
        { name: "CHU Habib Bourguiba", type: "Médical" },
        { name: "Université de Montpellier", type: "Académique" },
      ],
      objectives: [
        "Développer des algorithmes de diagnostic",
        "Créer une plateforme de télémédecine",
        "Former les professionnels de santé",
      ],
      team: 12,
      publications: 3,
    },
    {
      id: 3,
      title: "Patrimoine Culturel et Digitalisation",
      description: "Préservation numérique du patrimoine culturel tunisien",
      responsible: {
        name: "Dr. Karim Bouaziz",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      department: "Histoire",
      type: "Valorisation",
      status: "En cours",
      progress: 80,
      startDate: "2022-03-01",
      endDate: "2024-02-29",
      budget: "80,000 TND",
      funding: "Institut National du Patrimoine",
      partners: [
        { name: "Musée National du Bardo", type: "Culturel" },
        { name: "Archives Nationales", type: "Institutionnel" },
      ],
      objectives: [
        "Numériser les archives historiques",
        "Créer une base de données accessible",
        "Développer des outils de recherche",
      ],
      team: 6,
      publications: 8,
    },
    {
      id: 4,
      title: "Biodiversité Marine du Golfe de Gabès",
      description: "Étude et conservation de l'écosystème marin du golfe de Gabès",
      responsible: {
        name: "Prof. Mohamed Triki",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      department: "Sciences Biologiques",
      type: "Recherche Fondamentale",
      status: "Terminé",
      progress: 100,
      startDate: "2021-01-01",
      endDate: "2023-12-31",
      budget: "120,000 TND",
      funding: "Ministère de l'Environnement",
      partners: [
        { name: "INSTM", type: "Recherche" },
        { name: "WWF Tunisie", type: "ONG" },
      ],
      objectives: [
        "Cartographier la biodiversité marine",
        "Identifier les espèces menacées",
        "Proposer des mesures de conservation",
      ],
      team: 10,
      publications: 12,
    },
    {
      id: 5,
      title: "Énergies Renouvelables et Smart Grid",
      description: "Intégration des énergies renouvelables dans les réseaux intelligents",
      responsible: {
        name: "Prof. Fatma Gharbi",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      department: "Génie Électrique",
      type: "Recherche Appliquée",
      status: "Planifié",
      progress: 10,
      startDate: "2024-06-01",
      endDate: "2027-05-31",
      budget: "180,000 TND",
      funding: "STEG - Société Tunisienne de l'Électricité et du Gaz",
      partners: [
        { name: "STEG", type: "Industriel" },
        { name: "École Polytechnique de Tunisie", type: "Académique" },
      ],
      objectives: [
        "Optimiser l'intégration des énergies renouvelables",
        "Développer des algorithmes de gestion",
        "Tester sur un réseau pilote",
      ],
      team: 15,
      publications: 0,
    },
  ]

  const statuses = ["En cours", "Terminé", "Planifié", "Suspendu"]
  const types = ["Recherche Fondamentale", "Recherche Appliquée", "Valorisation", "Innovation"]
  const departments = ["Informatique", "Génie Électrique", "Sciences Biologiques", "Génie Civil", "Histoire", "Chimie"]

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.responsible.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === "all" || project.status === selectedStatus
    const matchesType = selectedType === "all" || project.type === selectedType
    const matchesDepartment = selectedDepartment === "all" || project.department === selectedDepartment

    return matchesSearch && matchesStatus && matchesType && matchesDepartment
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En cours":
        return "bg-blue-500"
      case "Terminé":
        return "bg-green-500"
      case "Planifié":
        return "bg-yellow-500"
      case "Suspendu":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "En cours":
        return "default"
      case "Terminé":
        return "secondary"
      case "Planifié":
        return "outline"
      case "Suspendu":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Projets de Recherche</h1>
          <p className="text-gray-600">Découvrez les projets de recherche de l'Université de Gabès</p>
        </div>
         <Link href="/projectnew">
            <Button className="px-20">Publish</Button>
          </Link>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par titre, responsable..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">{filteredProjects.length} projet(s) trouvé(s)</p>
        </div>

        <div className="space-y-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={getStatusVariant(project.status)}>{project.status}</Badge>
                      <Badge variant="outline">{project.type}</Badge>
                      <Badge variant="secondary">{project.department}</Badge>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-900">{project.title}</h3>
                    <p className="text-gray-700 mb-4">{project.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={project.responsible.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {project.responsible.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{project.responsible.name}</p>
                          <p className="text-xs text-gray-600">Responsable</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">
                            {new Date(project.startDate).toLocaleDateString("fr-FR")} -{" "}
                            {new Date(project.endDate).toLocaleDateString("fr-FR")}
                          </p>
                          <p className="text-xs text-gray-600">Période</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">{project.budget}</p>
                          <p className="text-xs text-gray-600">Budget</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">{project.team} membres</p>
                          <p className="text-xs text-gray-600">Équipe</p>
                        </div>
                      </div>
                    </div>

                    {project.status !== "Planifié" && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">Progression</span>
                          <span className="text-sm text-gray-600">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    )}

                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Objectifs principaux :</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {project.objectives.map((objective, index) => (
                          <li key={index} className="text-sm text-gray-700">
                            {objective}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Partenaires :</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.partners.map((partner, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {partner.name} ({partner.type})
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div className="text-center">
                        <p className="text-lg font-semibold text-blue-600">{project.publications}</p>
                        <p className="text-xs text-gray-600">Publications</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold text-green-600">{project.partners.length}</p>
                        <p className="text-xs text-gray-600">Partenaires</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <p className="text-sm text-gray-500">Financement: {project.funding}</p>
                  <Button variant="outline">Voir les détails</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
