"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  BookOpen,
  Target,
  TrendingUp,
  Award,
  Calendar,
  Download,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react"
import { Navigation } from "../components/navigation"

export default function DashboardPage() {
  const stats = {
    totalResearchers: 0,
    totalPublications: 0,
    activeProjects: 0,
    collaborations: 0,
    hIndexAverage: 0,
    citationsTotal: 0,
  }

  const departmentStats = [
    { name: "Informatique", researchers: 45, publications: 234, projects: 8, color: "bg-blue-500" },
    { name: "Génie Électrique", researchers: 38, publications: 189, projects: 6, color: "bg-green-500" },
    { name: "Sciences Biologiques", researchers: 52, publications: 298, projects: 7, color: "bg-purple-500" },
    { name: "Génie Civil", researchers: 41, publications: 167, projects: 4, color: "bg-orange-500" },
    { name: "Chimie", researchers: 35, publications: 201, projects: 2, color: "bg-red-500" },
    { name: "Histoire", researchers: 28, publications: 89, projects: 1, color: "bg-yellow-500" },
    { name: "Mathématiques", researchers: 33, publications: 69, projects: 0, color: "bg-indigo-500" },
  ]

  const recentAchievements = [
    {
      title: "Prix d'Excellence en Recherche",
      recipient: "Prof. Mohamed Triki",
      description: "Pour ses travaux sur la biodiversité marine",
      date: "2024-01-15",
      type: "Prix",
    },
    {
      title: "Publication dans Nature",
      recipient: "Dr. Ahmed Ben Salem",
      description: "Article sur l'IA et le traitement du langage naturel",
      date: "2024-01-10",
      type: "Publication",
    },
    {
      title: "Nouveau Projet Horizon Europe",
      recipient: "Prof. Fatma Gharbi",
      description: "Financement de 200,000€ pour les énergies renouvelables",
      date: "2024-01-05",
      type: "Financement",
    },
  ]

  const publicationTrends = [
    { year: 2020, count: 156 },
    { year: 2021, count: 189 },
    { year: 2022, count: 234 },
    { year: 2023, count: 298 },
    { year: 2024, count: 370 },
  ]

  const topJournals = [
    { name: "Journal of Artificial Intelligence Research", publications: 15, impact: 4.5 },
    { name: "Renewable Energy & Environment", publications: 12, impact: 3.8 },
    { name: "Marine Biology International", publications: 18, impact: 3.2 },
    { name: "Construction Materials Today", publications: 9, impact: 2.9 },
    { name: "Analytical Chemistry Letters", publications: 11, impact: 4.1 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Tableau de Bord</h1>
              <p className="text-gray-600">Vue d'ensemble de l'activité scientifique de l'Université de Gabès</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Exporter PDF
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Exporter Excel
              </Button>
            </div>
          </div>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
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
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Award className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">h-index Moyen</p>
                  <p className="text-2xl font-bold">{stats.hIndexAverage}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Citations Totales</p>
                  <p className="text-2xl font-bold">{stats.citationsTotal.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Department Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Statistiques par Département
              </CardTitle>
              <CardDescription>Répartition des chercheurs, publications et projets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentStats.map((dept, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{dept.name}</span>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{dept.researchers} chercheurs</span>
                        <span>{dept.publications} publications</span>
                        <span>{dept.projects} projets</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${dept.color}`}></div>
                      <Progress value={(dept.publications / stats.totalPublications) * 100} className="flex-1 h-2" />
                      <span className="text-sm text-gray-500">
                        {Math.round((dept.publications / stats.totalPublications) * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Réalisations Récentes
              </CardTitle>
              <CardDescription>Derniers succès et reconnaissances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAchievements.map((achievement, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold">{achievement.title}</h4>
                      <Badge variant="outline">{achievement.type}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{achievement.recipient}</p>
                    <p className="text-sm text-gray-700 mb-2">{achievement.description}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(achievement.date).toLocaleDateString("fr-FR")}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Publication Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="w-5 h-5" />
                Évolution des Publications
              </CardTitle>
              <CardDescription>Tendance des publications par année</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {publicationTrends.map((trend, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium">{trend.year}</span>
                    <div className="flex items-center space-x-2 flex-1 mx-4">
                      <Progress
                        value={(trend.count / Math.max(...publicationTrends.map((t) => t.count))) * 100}
                        className="flex-1 h-3"
                      />
                      <span className="text-sm font-semibold text-blue-600">{trend.count}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <TrendingUp className="w-4 h-4 inline mr-1" />
                  Croissance de 24% par rapport à l'année précédente
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Top Journals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Revues de Publication
              </CardTitle>
              <CardDescription>Principales revues où publient nos chercheurs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topJournals.map((journal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{journal.name}</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs">
                          IF: {journal.impact}
                        </Badge>
                        <span className="text-sm font-semibold text-green-600">{journal.publications}</span>
                      </div>
                    </div>
                    <Progress
                      value={(journal.publications / Math.max(...topJournals.map((j) => j.publications))) * 100}
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
