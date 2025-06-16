"use client"

import { useEffect, useState } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Edit,
  Save,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Plus,
  Trash2,
  BookOpen,
  Target,
  Users,
  Award,
} from "lucide-react"
import { Navigation } from "../components/navigation"

export default function ProfilePage() {
 const supabase = useSupabaseClient()

  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<any>({
    specialties: [],
    education: [],
    experience: [],
    bio: "",
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserProfileAndAvatar = async () => {
      setLoading(true)
      setError(null)

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession()

      if (sessionError || !session?.user) {
        setError("Utilisateur non connecté.")
        setLoading(false)
        return
      }

      const userId = session.user.id
      const userEmail = session.user.email
      console.log("User ID:", userId)

      // Fetch profile data
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId) // or use .eq("user_id", userId) depending on your schema
        .single()

      if (profileError || !profileData) {
        console.error("Profile error:", profileError)
        setError("Profil introuvable.")
      } else {
        setProfile(profileData)
      }

      /// Format email to storage key: replace @ and . with _
      const formattedEmail = userEmail.replace(/[@.]/g, "_")

      // Build storage path
      const avatarPath = `users/${formattedEmail}.jpg`

      // Get public URL for avatar
      const { data: avatarData } = supabase.storage
        .from("avatars")
        .getPublicUrl(avatarPath)

        setAvatarUrl(avatarData.publicUrl)
  
      

      setLoading(false)
    }

    fetchUserProfileAndAvatar()
  }, [supabase])


  if (loading) return <p className="text-center py-10">Chargement du profil...</p>
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>
  
  const publications = [
    {
      title: "Intelligence Artificielle et Traitement du Langage Naturel : Approches Modernes",
      journal: "Journal of AI Research",
      year: 2024,
      type: "Article",
      citations: 15,
      doi: "10.1016/j.jair.2024.01.001",
    },
    {
      title: "Deep Learning for Arabic Text Classification",
      journal: "Computer Science Review",
      year: 2023,
      type: "Article",
      citations: 28,
      doi: "10.1016/j.cosrev.2023.08.002",
    },
    {
      title: "Machine Learning Applications in Education",
      journal: "Educational Technology Research",
      year: 2023,
      type: "Communication",
      citations: 12,
      doi: "10.1080/etr.2023.12.4.001",
    },
  ]

  const projects = [
    {
      title: "Intelligence Artificielle pour la Santé",
      role: "Responsable Principal",
      status: "En cours",
      period: "2023-2026",
      budget: "200,000 TND",
    },
    {
      title: "Plateforme d'Apprentissage Adaptatif",
      role: "Co-investigateur",
      status: "Terminé",
      period: "2021-2023",
      budget: "120,000 TND",
    },
  ]

  const collaborations = [
    {
      name: "Prof. Sarah Johnson",
      institution: "MIT",
      country: "États-Unis",
      projects: 3,
    },
    {
      name: "Dr. Pierre Martin",
      institution: "Université de Montpellier",
      country: "France",
      projects: 2,
    },
    {
      name: "Prof. Maria Garcia",
      institution: "Universidad de Barcelona",
      country: "Espagne",
      projects: 1,
    },
  ]

  const awards = [
    {
      title: "Prix d'Excellence en Recherche",
      organization: "Université de Gabès",
      year: 2023,
      description: "Pour contributions exceptionnelles en IA",
    },
    {
      title: "Best Paper Award",
      organization: "International Conference on AI",
      year: 2022,
      description: "Meilleur article de la conférence",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Mon Profil</h1>
            <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "default" : "outline"}>
              {isEditing ? (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Sauvegarder
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <img
            src={avatarUrl || "/placeholder.svg?height=96&width=96"}
            alt="Avatar"
            width={96}
            height={96}
            className="rounded-full"
          />
                  </Avatar>
                  {isEditing ? (
                    <div className="space-y-2">
                      <Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                      <Input
                        value={profile.title}
                        onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                      />
                    </div>
                  ) : (
                    <>
                      <h2 className="text-xl font-bold">{profile.name}</h2>
                      <p className="text-blue-600 font-medium">{profile.title}</p>
                    </>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    {isEditing ? (
                      <Input
                        value={profile.department}
                        onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                        className="text-sm"
                      />
                    ) : (
                      <span className="text-sm">{profile.department}</span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    {isEditing ? (
                      <Input
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="text-sm"
                      />
                    ) : (
                      <span className="text-sm">{profile.email}</span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    {isEditing ? (
                      <Input
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="text-sm"
                      />
                    ) : (
                      <span className="text-sm">{profile.phone}</span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <ExternalLink className="w-4 h-4 text-gray-500" />
                    {isEditing ? (
                      <Input
                        value={profile.orcid}
                        onChange={(e) => setProfile({ ...profile, orcid: e.target.value })}
                        className="text-sm"
                        placeholder="ORCID ID"
                      />
                    ) : (
                      <a
                        href={`https://orcid.org/${profile.orcid}`}
                        target="_blank"
                        className="text-sm text-blue-600 hover:underline"
                        rel="noreferrer"
                      >
                        ORCID: {profile.orcid}
                      </a>
                    )}
                  </div>
                </div>

                

                <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{publications.length}</p>
                    <p className="text-xs text-gray-600">Publications</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{projects.length}</p>
                    <p className="text-xs text-gray-600">Projets</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Aperçu</TabsTrigger>
                <TabsTrigger value="publications">Publications</TabsTrigger>
                <TabsTrigger value="projects">Projets</TabsTrigger>
                <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
                <TabsTrigger value="awards">Distinctions</TabsTrigger>
              </TabsList>

                {/* Bio */}
                <Card>
                  <CardHeader>
                    <CardTitle>Biographie</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <Textarea
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        rows={4}
                      />
                    ) : (
                      <p className="text-gray-700">{profile.bio}</p>
                    )}
                  </CardContent>
                </Card>

              <TabsContent value="publications">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Publications ({publications.length})
                    </CardTitle>
                    <CardDescription>Liste de mes publications scientifiques</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {publications.map((pub, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold mb-1">{pub.title}</h4>
                              <p className="text-gray-600 text-sm mb-2">
                                {pub.journal} • {pub.year}
                              </p>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{pub.type}</Badge>
                                <span className="text-sm text-gray-500">{pub.citations} citations</span>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                              <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noreferrer">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="projects">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Projets de Recherche ({projects.length})
                    </CardTitle>
                    <CardDescription>Mes projets de recherche actuels et passés</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {projects.map((project, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold">{project.title}</h4>
                            <Badge variant={project.status === "En cours" ? "default" : "secondary"}>
                              {project.status}
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">Rôle: {project.role}</p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>{project.period}</span>
                            <span className="font-medium text-green-600">{project.budget}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="collaborations">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Collaborations Internationales ({collaborations.length})
                    </CardTitle>
                    <CardDescription>Mes collaborateurs de recherche</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {collaborations.map((collab, index) => (
                        <div key={index} className="flex items-center justify-between border rounded-lg p-4">
                          <div>
                            <h4 className="font-semibold">{collab.name}</h4>
                            <p className="text-gray-600 text-sm">{collab.institution}</p>
                            <p className="text-gray-500 text-xs">{collab.country}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-semibold text-blue-600">{collab.projects}</p>
                            <p className="text-xs text-gray-600">Projets</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="awards">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Prix et Distinctions ({awards.length})
                    </CardTitle>
                    <CardDescription>Reconnaissances et prix reçus</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {awards.map((award, index) => (
                        <div key={index} className="border-l-4 border-yellow-500 pl-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold">{award.title}</h4>
                              <p className="text-gray-600 text-sm">{award.organization}</p>
                              <p className="text-gray-700 text-sm mt-1">{award.description}</p>
                            </div>
                            <Badge variant="outline">{award.year}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
