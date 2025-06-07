"use client"
import Link from "next/link"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Download, ExternalLink, Calendar, User } from "lucide-react"
import { Navigation } from "../components/navigation"

export default function PublicationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  const publications = [
    {
      id: 1,
      title: "Intelligence Artificielle et Traitement du Langage Naturel : Approches Modernes",
      authors: ["Dr. Ahmed Ben Salem", "Prof. Sarah Johnson"],
      journal: "Journal of Artificial Intelligence Research",
      year: 2024,
      type: "Article",
      department: "Informatique",
      doi: "10.1016/j.jair.2024.01.001",
      citations: 15,
      abstract:
        "Cette étude présente une nouvelle approche pour le traitement du langage naturel utilisant des techniques d'apprentissage profond...",
      keywords: ["IA", "NLP", "Deep Learning", "Transformers"],
    },
    {
      id: 2,
      title: "Énergies Renouvelables en Tunisie : Défis et Opportunités pour un Développement Durable",
      authors: ["Prof. Fatma Gharbi", "Dr. Mohamed Ali"],
      journal: "Renewable Energy & Environment",
      year: 2024,
      type: "Article",
      department: "Génie Électrique",
      doi: "10.1016/j.renene.2024.02.015",
      citations: 8,
      abstract: "Analyse des potentiels énergétiques renouvelables en Tunisie et stratégies d'implémentation...",
      keywords: ["Énergies Renouvelables", "Photovoltaïque", "Éolien", "Tunisie"],
    },
    {
      id: 3,
      title: "Biodiversité Marine du Golfe de Gabès : État des Lieux et Conservation",
      authors: ["Prof. Mohamed Triki", "Dr. Amina Khelifi"],
      journal: "Marine Biology International",
      year: 2024,
      type: "Communication",
      department: "Sciences Biologiques",
      doi: "10.1007/s00227-024-4321-x",
      citations: 12,
      abstract:
        "Étude exhaustive de la biodiversité marine dans le golfe de Gabès et recommandations pour la conservation...",
      keywords: ["Biodiversité", "Marine", "Conservation", "Golfe de Gabès"],
    },
    {
      id: 4,
      title: "Matériaux de Construction Écologiques : Innovation et Performance",
      authors: ["Dr. Leila Mansouri", "Prof. Jean Dupont"],
      journal: "Construction Materials Today",
      year: 2023,
      type: "Article",
      department: "Génie Civil",
      doi: "10.1016/j.conmat.2023.11.008",
      citations: 22,
      abstract: "Développement de nouveaux matériaux de construction respectueux de l'environnement...",
      keywords: ["Matériaux", "Écologie", "Construction", "Durabilité"],
    },
    {
      id: 5,
      title: "Patrimoine Culturel Tunisien à l'Ère Numérique",
      authors: ["Dr. Karim Bouaziz"],
      journal: "Digital Heritage Quarterly",
      year: 2023,
      type: "Chapitre",
      department: "Histoire",
      doi: "10.1080/dhq.2023.15.3.001",
      citations: 6,
      abstract: "Exploration des méthodes de digitalisation du patrimoine culturel tunisien...",
      keywords: ["Patrimoine", "Digitalisation", "Culture", "Tunisie"],
    },
    {
      id: 6,
      title: "Spectroscopie Avancée pour l'Analyse Environnementale",
      authors: ["Prof. Sonia Hammami", "Dr. Pierre Martin"],
      journal: "Analytical Chemistry Letters",
      year: 2023,
      type: "Article",
      department: "Chimie",
      doi: "10.1021/acs.analchem.2023.05.012",
      citations: 18,
      abstract: "Nouvelles techniques spectroscopiques pour l'analyse de polluants environnementaux...",
      keywords: ["Spectroscopie", "Environnement", "Analyse", "Pollution"],
    },
  ]

  const publicationTypes = ["Article", "Communication", "Chapitre", "Thèse", "Rapport"]
  const years = [2024, 2023, 2022, 2021, 2020]
  const departments = ["Informatique", "Génie Électrique", "Sciences Biologiques", "Génie Civil", "Histoire", "Chimie"]

  const filteredPublications = publications.filter((pub) => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.authors.some((author) => author.toLowerCase().includes(searchQuery.toLowerCase())) ||
      pub.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesType = selectedType === "all" || pub.type === selectedType
    const matchesYear = selectedYear === "all" || pub.year.toString() === selectedYear
    const matchesDepartment = selectedDepartment === "all" || pub.department === selectedDepartment

    return matchesSearch && matchesType && matchesYear && matchesDepartment
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Publications Scientifiques</h1>
          <p className="text-gray-600">Découvrez les travaux de recherche de l'Université de Gabès</p>
          </div>
          <Link href="/publish">
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
                  placeholder="Rechercher par titre, auteur, mots-clés..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Type de publication" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  {publicationTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Année" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les années</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
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
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-600">{filteredPublications.length} publication(s) trouvée(s)</p>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exporter (BibTeX)
          </Button>
        </div>

        <div className="space-y-6">
          {filteredPublications.map((publication) => (
            <Card key={publication.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{publication.type}</Badge>
                      <Badge variant="secondary">{publication.department}</Badge>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        {publication.year}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-900">{publication.title}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <User className="w-4 h-4 mr-1" />
                      {publication.authors.join(", ")}
                    </div>
                    <p className="text-gray-600 font-medium mb-3">{publication.journal}</p>
                    <p className="text-gray-700 mb-4">{publication.abstract}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {publication.keywords.map((keyword, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2 ml-4">
                    <Button variant="outline" size="sm" asChild>
                      <a href={`https://doi.org/${publication.doi}`} target="_blank" rel="noreferrer">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        DOI
                      </a>
                    </Button>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-green-600">{publication.citations}</p>
                      <p className="text-xs text-gray-600">Citations</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <p className="text-sm text-gray-500">DOI: {publication.doi}</p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      PDF
                    </Button>
                    <Button variant="outline" size="sm">
                      Citer
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
