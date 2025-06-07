"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
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
  const [notifications] = useState(3)
  const [user, setUser] = useState<any>(null);
  const supabase = createClientComponentClient();

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
    });

    return () => subscription.unsubscribe();
  }, []);
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">UG</span>
            </div>
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
            <Link href="/dashboard" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <BarChart3 className="w-4 h-4" />
              <span>Tableau de bord</span>
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
    <Button variant="ghost" size="icon" className="relative">
      <Bell className="w-5 h-5" />
      {notifications > 0 && (
        <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs">
          {notifications}
        </Badge>
      )}
    </Button>

    {/* Messages */}
    <Button variant="ghost" size="icon" asChild>
      <Link href="/messages">
        <MessageSquare className="w-5 h-5" />
      </Link>
    </Button>

    {/* User Menu */}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Profile" />
            <AvatarFallback>AB</AvatarFallback>
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
        <DropdownMenuItem onClick={() => supabase.auth.signOut()}>
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
