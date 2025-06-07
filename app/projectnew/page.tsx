"use client"

import { useState } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"

export default function CreateResearchProject() {
  const supabase = useSupabaseClient()
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("planned")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [budget, setBudget] = useState("")
  const [fundingSource, setFundingSource] = useState("")
  const [keywords, setKeywords] = useState("")
  const [objectives, setObjectives] = useState("")
  const [methodology, setMethodology] = useState("")
  const [expectedOutcomes, setExpectedOutcomes] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const user = (await supabase.auth.getUser()).data.user
    if (!user) {
      setError("Utilisateur non connecté")
      setLoading(false)
      return
    }

    const { error } = await supabase.from("research_projects").insert({
      title,
      description,
      principal_investigator_id: user.id,
      status,
      start_date: startDate,
      end_date: endDate,
      budget: budget ? parseFloat(budget) : null,
      funding_source: fundingSource,
      keywords: keywords ? keywords.split(",").map((k) => k.trim()) : [],
      objectives,
      methodology,
      expected_outcomes: expectedOutcomes,
    })

    if (error) {
      setError(error.message)
    } else {
      setSuccessMessage("Projet de recherche créé avec succès.")
      router.push("/projects")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Créer un projet de recherche</h1>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded-md">{error}</div>}
        {successMessage && <div className="bg-green-50 text-green-600 p-3 rounded-md">{successMessage}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Titre</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Statut</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-md"
            >
              <option value="planned">Prévu</option>
              <option value="active">Actif</option>
              <option value="completed">Terminé</option>
              <option value="suspended">Suspendu</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date de début</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date de fin</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Budget (€)</label>
            <input
              type="number"
              step="0.01"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Source de financement</label>
            <input
              type="text"
              value={fundingSource}
              onChange={(e) => setFundingSource(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mots-clés (séparés par des virgules)</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Objectifs</label>
            <textarea
              value={objectives}
              onChange={(e) => setObjectives(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Méthodologie</label>
            <textarea
              value={methodology}
              onChange={(e) => setMethodology(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Résultats attendus</label>
            <textarea
              value={expectedOutcomes}
              onChange={(e) => setExpectedOutcomes(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              {loading ? "Création en cours..." : "Créer le projet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
