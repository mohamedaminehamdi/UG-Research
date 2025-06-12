"use client"
import Link from "next/link"

import { useEffect, useState } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
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

  const supabase = useSupabaseClient()
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from("research_projects")
        .select("*")

      if (error) {
        console.error("Error fetching research projects:", error.message)
        setLoading(false)
        return
      }

      const transformed = data.map((project: any, i: number) => ({
        id: project.id,
        title: project.title,
        description: project.description || "Aucune description disponible.",
        responsible: {
          name: `Chercheur #${i + 1}`, // Since you only have `principal_investigator_id`, no names
          avatar: "/placeholder.svg?height=40&width=40",
        },
        department: getRandom(departments), // Since no department field in DB
        type: getRandom(types), // Not in DB either
        status: project.status || getRandom(statuses),
        progress: Math.floor(Math.random() * 101), // Assuming not in DB
        startDate: project.start_date || "2023-01-01",
        endDate: project.end_date || "2025-12-31",
        budget: project.budget ? `${project.budget.toLocaleString()} TND` : "Non spécifié",
        funding: project.funding_source || "Inconnu",
        partners: [], // Not available in schema
        objectives: project.objectives?.split("\n") || ["Objectif non spécifié"],
        team: Math.floor(Math.random() * 20 + 5),
        publications: Math.floor(Math.random() * 10),
      }))

      setProjects(transformed)
      setLoading(false)
    }

    fetchProjects()
  }, [supabase])

const statuses = ["active", "completed", "suspended", "planned"]
const types = ["Recherche Fondamentale", "Recherche Appliquée", "Valorisation", "Innovation"]
const departments = ["Informatique", "Génie Électrique", "Sciences Biologiques", "Génie Civil", "Histoire", "Chimie"]

const getRandom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]


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
