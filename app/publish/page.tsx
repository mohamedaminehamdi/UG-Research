"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"

export default function CreatePublicationForm() {
  const supabase = useSupabaseClient()
  const user = useUser()
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [abstract, setAbstract] = useState("")
  const [publicationType, setPublicationType] = useState("article")
  const [journalName, setJournalName] = useState("")
  const [conferenceName, setConferenceName] = useState("")
  const [publicationDate, setPublicationDate] = useState("")
  const [doi, setDoi] = useState("")
  const [isbn, setIsbn] = useState("")
  const [pages, setPages] = useState("")
  const [volume, setVolume] = useState("")
  const [issue, setIssue] = useState("")
  const [publisher, setPublisher] = useState("")
  const [keywords, setKeywords] = useState("")
  const [coAuthors, setCoAuthors] = useState("")
  const [pdfUrl, setPdfUrl] = useState("")
  const [externalUrl, setExternalUrl] = useState("")
  const [isPublished, setIsPublished] = useState(true)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!user) {
      setError("Utilisateur non connecté.")
      setLoading(false)
      return
    }

    const { data, error } = await supabase.from("publications").insert({
      author_id: user.id,
      title,
      abstract,
      publication_type: publicationType,
      journal_name: journalName,
      conference_name: conferenceName,
      publication_date: publicationDate,
      doi,
      isbn,
      pages,
      volume,
      issue,
      publisher,
      keywords: keywords.split(",").map((k) => k.trim()),
      co_authors: coAuthors.split(",").map((c) => c.trim()),
      pdf_url: pdfUrl,
      external_url: externalUrl,
      is_published: isPublished,
    })

    if (error) {
      setError(error.message)
      return;
    } 
// 2. Create a notification to all users
  const notif = {
    user_id: null, // broadcast
    title: "Nouvelle publication",
    message: `📚 Une nouvelle publication intitulée "${title}" vient d’être ajoutée.`,
    type: "publication",
    action_url: "/publications", // you can make this dynamic if needed
  };

  const { error: notifError } = await supabase.from("notifications").insert(notif);

  if (notifError) {
    console.warn("Échec de la création de la notification :", notifError.message);
  }

  setSuccessMessage("Publication ajoutée avec succès !");
  setTimeout(() => {
    router.push("/publications");
  }, 1500);

  setLoading(false);
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Ajouter une publication</h1>

        {successMessage && <div className="bg-green-50 text-green-600 p-3 rounded-md mb-4">{successMessage}</div>}
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Titre *</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full mt-1 p-2 border rounded-md" />
          </div>

          <div>
            <label className="block font-medium">Résumé</label>
            <textarea value={abstract} onChange={(e) => setAbstract(e.target.value)} className="w-full mt-1 p-2 border rounded-md" />
          </div>

          <div>
            <label className="block font-medium">Type *</label>
            <select value={publicationType} onChange={(e) => setPublicationType(e.target.value)} required className="w-full mt-1 p-2 border rounded-md">
              <option value="article">Article</option>
              <option value="conference">Conférence</option>
              <option value="thesis">Thèse</option>
              <option value="book">Livre</option>
              <option value="chapter">Chapitre</option>
              <option value="patent">Brevet</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Nom du journal</label>
              <input value={journalName} onChange={(e) => setJournalName(e.target.value)} className="w-full mt-1 p-2 border rounded-md" />
            </div>
            <div>
              <label className="block font-medium">Nom de la conférence</label>
              <input value={conferenceName} onChange={(e) => setConferenceName(e.target.value)} className="w-full mt-1 p-2 border rounded-md" />
            </div>
          </div>

          <div>
            <label className="block font-medium">Date de publication</label>
            <input type="date" value={publicationDate} onChange={(e) => setPublicationDate(e.target.value)} className="w-full mt-1 p-2 border rounded-md" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input placeholder="DOI" value={doi} onChange={(e) => setDoi(e.target.value)} className="w-full p-2 border rounded-md" />
            <input placeholder="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} className="w-full p-2 border rounded-md" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <input placeholder="Pages" value={pages} onChange={(e) => setPages(e.target.value)} className="w-full p-2 border rounded-md" />
            <input placeholder="Volume" value={volume} onChange={(e) => setVolume(e.target.value)} className="w-full p-2 border rounded-md" />
            <input placeholder="Issue" value={issue} onChange={(e) => setIssue(e.target.value)} className="w-full p-2 border rounded-md" />
          </div>

          <input placeholder="Éditeur" value={publisher} onChange={(e) => setPublisher(e.target.value)} className="w-full p-2 border rounded-md" />

          <input placeholder="Mots-clés (séparés par des virgules)" value={keywords} onChange={(e) => setKeywords(e.target.value)} className="w-full p-2 border rounded-md" />

          <input placeholder="Co-auteurs (séparés par des virgules)" value={coAuthors} onChange={(e) => setCoAuthors(e.target.value)} className="w-full p-2 border rounded-md" />

          <div className="grid grid-cols-2 gap-4">
            <input placeholder="URL du PDF" value={pdfUrl} onChange={(e) => setPdfUrl(e.target.value)} className="w-full p-2 border rounded-md" />
            <input placeholder="Lien externe" value={externalUrl} onChange={(e) => setExternalUrl(e.target.value)} className="w-full p-2 border rounded-md" />
          </div>

          <div className="flex items-center gap-2">
            <input id="isPublished" type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
            <label htmlFor="isPublished">Publié ?</label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
          >
            {loading ? "Enregistrement..." : "Ajouter la publication"}
          </button>
        </form>
      </div>
    </div>
  )
}
