"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Bell, MessageSquare, Settings, LogOut, User, Home, Users, BookOpen, Target, BarChart3 } from "lucide-react"

export function Navigation() {

  const [unreadCount, setUnreadCount] = useState<number>(0);

  const [user, setUser] = useState<any>(null);
  const supabase = useSupabaseClient();
  const router = useRouter();
  
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
        const formattedEmail = userEmail?.replace(/[@.]/g, "_")
  
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
  

  useEffect(() => {
    if (user?.id) {
      fetchUnreadCount();
    }
  }, [user]);

  const fetchUnreadCount = async () => {
    const { count, error } = await supabase
      .from("notifications")
      .select("*", { count: "exact", head: true }) // Only return count
      .eq("user_id", user.id)
      .eq("is_read", false); // Only unread

    if (error) {
      console.error("Error fetching unread count:", error);
    } else {
      setUnreadCount(count ?? 0);
    }
  };
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getUser();

    // Optional: listen for real-time changes (login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
      // Clear cookies if user signed out
      document.cookie = 'sb-access-token=; Max-Age=0; path=/'
      document.cookie = 'sb-refresh-token=; Max-Age=0; path=/'
    }
    });

    return () => subscription.unsubscribe();
  }, []);
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
              <img src="/logo.jpg" alt="UG Logo" className="h-8 w-auto" />
            
            <span className="font-bold text-xl">UG-Research</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <Home className="w-4 h-4" />
              <span>Accueil</span>
            </Link>
            <Link href="/researchers" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <Users className="w-4 h-4" />
              <span>Chercheurs</span>
            </Link>
            <Link href="/publications" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <BookOpen className="w-4 h-4" />
              <span>Publications</span>
            </Link>
            <Link href="/projects" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <Target className="w-4 h-4" />
              <span>Projets</span>
            </Link>
            
            
          <div className="flex justify-between items-center h-16">
            {!user && (
        <div className="flex items-center space-x-4">
          <Link href="/login">
            <Button variant="ghost">Se connecter</Button>
          </Link>
          <Link href="/register">
            <Button>S&apos;inscrire</Button>
          </Link>
        </div>
      )}
          </div>
        

          </div>

          {/* Right side */}
          {user && (
  <div className="flex items-center space-x-4">
    {/* Notifications */}
    <Link href="/notifications">
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs">
            {unreadCount}
          </Badge>
        )}
      </Button>
    </Link>


    {/* User Menu */}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <img
            src={avatarUrl || "/placeholder.svg?height=96&width=96"}
            alt="Avatar"
            width={96}
            height={96}
            className="rounded-full"
          />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.first_name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <User className="mr-2 h-4 w-4" />
            <span>Mon Profil</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">
            <Settings className="mr-2 h-4 w-4" />
            <span>Paramètres</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
        onClick={async () => {
    await supabase.auth.signOut()
    document.cookie = 'sb-access-token=; Max-Age=0; path=/'
    document.cookie = 'sb-refresh-token=; Max-Age=0; path=/'
    router.push("/")
  }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Déconnexion</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
)}
        </div>
      </div>
    </nav>
  )
}
