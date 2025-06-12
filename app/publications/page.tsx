"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Download, ExternalLink, Calendar, User } from "lucide-react"
import { Navigation } from "../components/navigation"

type Publication = {
  id: string
  author_id: string
  title: string
  abstract?: string | null
  publication_type: string
  journal_name?: string | null
  conference_name?: string | null
  publication_date?: string | null // ISO date string
  doi?: string | null
  isbn?: string | null
  pages?: string | null
  volume?: string | null
  issue?: string | null
  publisher?: string | null
  keywords?: string[] | null
  co_authors?: string[] | null
  pdf_url?: string | null
  external_url?: string | null
  citation_count?: number | null
  is_published?: boolean | null
  created_at: string
  updated_at: string
}

export default function PublicationsPage() {
  const supabase = useSupabaseClient()

  const [publications, setPublications] = useState<Publication[]>([])
  const [loading, setLoading] = useState(true)

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")

  const publicationTypes = ["article", "conference", "chapter", "thesis", "report", "book", "patent"]
  const years = [2024, 2023, 2022, 2021, 2020]

  useEffect(() => {
    async function fetchPublications() {
      setLoading(true)
      const { data, error } = await supabase
        .from("publications")
        .select("*")
        .order("publication_date", { ascending: false })

      if (error) {
        console.error("Error fetching publications:", error)
      } else if (data) {
        setPublications(data)
      }
      setLoading(false)
    }

    fetchPublications()
  }, [supabase])

  const filteredPublications = publications.filter((pub) => {
    // Extract year from publication_date or fallback
    const pubYear = pub.publication_date ? new Date(pub.publication_date).getFullYear().toString() : "unknown"

    // Compose authors array with main author and co-authors (if any)
    // Note: author_id is just a UUID here, you'd fetch author name separately ideally
    const authors = [pub.author_id, ...(pub.co_authors ?? [])]

    const matchesSearch =
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      authors.some((author) => author.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (pub.keywords ?? []).some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesType = selectedType === "all" || pub.publication_type === selectedType
    const matchesYear = selectedYear === "all" || pubYear === selectedYear

    return matchesSearch && matchesType && matchesYear
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
            <Button className="px-20">Publier</Button>
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
                      {type.charAt(0).toUpperCase() + type.slice(1)}
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
              {/* Department removed because not in your DB schema */}
            </div>
          </CardContent>
        </Card>

        {/* Loading and Results */}
        {loading ? (
          <p className="text-center text-gray-500">Chargement des publications...</p>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">{filteredPublications.length} publication(s) trouvée(s)</p>
              <Button variant="outline" onClick={() => alert("Export BibTeX feature not implemented yet")}>
                <Download className="w-4 h-4 mr-2" />
                Exporter (BibTeX)
              </Button>
            </div>

            <div className="space-y-6">
              {filteredPublications.map((publication) => {
                const pubYear = publication.publication_date
                  ? new Date(publication.publication_date).getFullYear()
                  : "N/A"
                const authorsDisplay = [publication.author_id, ...(publication.co_authors ?? [])].join(", ")
                const citationCount = publication.citation_count ?? 0
                const journalOrConf = publication.journal_name ?? publication.conference_name ?? ""

                return (
                  <Card key={publication.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{publication.publication_type}</Badge>
                            <div className="flex items-center text-gray-500 text-sm">
                              <Calendar className="w-4 h-4 mr-1" />
                              {pubYear}
                            </div>
                          </div>
                          <h3 className="text-xl font-semibold mb-2 text-blue-900">{publication.title}</h3>
                          <div className="flex items-center text-gray-600 mb-2">
                            <User className="w-4 h-4 mr-1" />
                            {authorsDisplay}
                          </div>
                          {journalOrConf && <p className="text-gray-600 font-medium mb-3">{journalOrConf}</p>}
                          {publication.abstract && (
                            <p className="text-gray-700 mb-4">{publication.abstract}</p>
                          )}
                          <div className="flex flex-wrap gap-1 mb-4">
                            {(publication.keywords ?? []).map((keyword, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2 ml-4">
                          {publication.doi && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={`https://doi.org/${publication.doi}`} target="_blank" rel="noreferrer">
                                <ExternalLink className="w-4 h-4 mr-1" />
                                DOI
                              </a>
                            </Button>
                          )}
                          <div className="text-center">
                            <p className="text-lg font-semibold text-green-700">{citationCount}</p>
                            <p className="text-xs text-gray-500">Citations</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
