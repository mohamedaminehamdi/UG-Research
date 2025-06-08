"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle2, XCircle } from "lucide-react"

export default function ConfirmPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tokenHash = searchParams.get("token_hash")
  const type = searchParams.get("type")
  const nextUrl = searchParams.get("next") || "/login"

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")

  useEffect(() => {
    if (tokenHash && type === "email") {
      // Supabase already verifies the user with token_hash in the background
      setStatus("success")

       // Wait for Supabase to confirm the user in the background
      setTimeout(() => {
        router.push(nextUrl)
      }, 3000)

      
    } else {
      setStatus("error")
    }
  }, [tokenHash, type, nextUrl, router])

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <>
            <p className="text-gray-700">Vérification de votre email...</p>
            <div className="flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            </div>
          </>
        )
      case "success":
        return (
          <>
            <CheckCircle2 className="h-12 w-12 mx-auto text-green-600" />
            <p className="text-green-700">Email confirmé avec succès. Redirection en cours...</p>
          </>
        )
      case "error":
        return (
          <>
            <XCircle className="h-12 w-12 mx-auto text-red-600" />
            <p className="text-red-600">Lien invalide ou expiré.</p>
            <div className="space-y-2">
              <Link href="/auth/signin">
                <Button className="w-full">Se connecter</Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full">
                  Retour à l'accueil
                </Button>
              </Link>
            </div>
          </>
        )
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-blue-600">Confirmation d'email</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">{renderContent()}</CardContent>
      </Card>
    </div>
  )
}
