"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Search, Send, Plus, MessageSquare, Users, Paperclip, MoreVertical } from "lucide-react"
import { Navigation } from "../components/navigation"

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(1)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const conversations = [
    {
      id: 1,
      participant: {
        name: "Prof. Fatma Gharbi",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "en ligne",
      },
      lastMessage: "Merci pour les documents sur les énergies renouvelables",
      timestamp: "Il y a 5 min",
      unread: 2,
      type: "direct",
    },
    {
      id: 2,
      participant: {
        name: "Dr. Mohamed Triki",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "hors ligne",
      },
      lastMessage: "Pouvons-nous programmer une réunion pour discuter du projet ?",
      timestamp: "Il y a 1h",
      unread: 0,
      type: "direct",
    },
    {
      id: 3,
      participant: {
        name: "Équipe IA Santé",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "groupe",
      },
      lastMessage: "Ahmed: Les résultats des tests sont prometteurs",
      timestamp: "Il y a 2h",
      unread: 5,
      type: "group",
    },
    {
      id: 4,
      participant: {
        name: "Dr. Leila Mansouri",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "en ligne",
      },
      lastMessage: "J'ai partagé les dernières publications sur le développement durable",
      timestamp: "Hier",
      unread: 0,
      type: "direct",
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "Prof. Fatma Gharbi",
      content:
        "Bonjour Ahmed, j'espère que vous allez bien. J'ai lu votre dernier article sur l'IA et je trouve vos approches très intéressantes.",
      timestamp: "10:30",
      isOwn: false,
    },
    {
      id: 2,
      sender: "Moi",
      content:
        "Bonjour Professeur Gharbi ! Merci beaucoup pour votre retour. Je serais ravi de discuter de possibles collaborations entre nos domaines.",
      timestamp: "10:35",
      isOwn: true,
    },
    {
      id: 3,
      sender: "Prof. Fatma Gharbi",
      content:
        "Excellente idée ! Je pense qu'il y a de belles synergies possibles entre l'IA et les énergies renouvelables. Avez-vous du temps cette semaine pour une réunion ?",
      timestamp: "10:40",
      isOwn: false,
    },
    {
      id: 4,
      sender: "Moi",
      content:
        "Absolument ! Je suis disponible jeudi après-midi ou vendredi matin. Quel créneau vous conviendrait le mieux ?",
      timestamp: "10:42",
      isOwn: true,
    },
    {
      id: 5,
      sender: "Prof. Fatma Gharbi",
      content:
        "Parfait ! Jeudi à 14h me conviendrait parfaitement. Je vous envoie les documents sur notre projet Smart Grid en pièce jointe.",
      timestamp: "10:45",
      isOwn: false,
    },
    {
      id: 6,
      sender: "Prof. Fatma Gharbi",
      content: "Merci pour les documents sur les énergies renouvelables",
      timestamp: "11:20",
      isOwn: false,
    },
  ]

  const filteredConversations = conversations.filter((conv) =>
    conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Logique d'envoi de message
      setNewMessage("")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Messages</h1>
          <p className="text-gray-600">Communiquez avec vos collègues chercheurs</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Conversations
                </CardTitle>
                <Button size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher une conversation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 cursor-pointer hover:bg-gray-50 border-l-4 ${
                      selectedConversation === conversation.id ? "border-blue-500 bg-blue-50" : "border-transparent"
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={conversation.participant.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {conversation.participant.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.type === "direct" && conversation.participant.status === "en ligne" && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                        {conversation.type === "group" && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                            <Users className="w-2 h-2 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm truncate">{conversation.participant.name}</p>
                          <div className="flex items-center space-x-1">
                            {conversation.unread > 0 && (
                              <Badge className="text-xs px-1.5 py-0.5">{conversation.unread}</Badge>
                            )}
                            <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 truncate mt-1">{conversation.lastMessage}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-2 flex flex-col">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={
                            conversations.find((c) => c.id === selectedConversation)?.participant.avatar ||
                            "/placeholder.svg"
                          }
                        />
                        <AvatarFallback>
                          {conversations
                            .find((c) => c.id === selectedConversation)
                            ?.participant.name.split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">
                          {conversations.find((c) => c.id === selectedConversation)?.participant.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {conversations.find((c) => c.id === selectedConversation)?.participant.status}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isOwn ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"
                        }`}
                      >
                        {!message.isOwn && <p className="text-xs font-medium mb-1 opacity-75">{message.sender}</p>}
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${message.isOwn ? "text-blue-100" : "text-gray-500"}`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex items-end space-x-2">
                    <Button variant="ghost" size="sm">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Tapez votre message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        rows={1}
                        className="resize-none"
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                      />
                    </div>
                    <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Sélectionnez une conversation</h3>
                  <p className="text-gray-600">Choisissez une conversation pour commencer à échanger</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
