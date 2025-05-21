'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/SupabaseAuthContext'
import { getChatsForUser } from '@/utils/supabaseQueries'
import { supabase } from '@/lib/supabaseClient'

export default function ChatsPage() {
  const { user } = useAuth()
  const router = useRouter()

  const [chats, setChats] = useState<any[]>([])
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user])

  // Fetch chats for logged-in user
  useEffect(() => {
    const fetchChats = async () => {
      if (user) {
        const userChats = await getChatsForUser(user.id)
        setChats(userChats)
      }
    }
    fetchChats()
  }, [user])

  // Fetch messages for selected chat
  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedChatId) {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .eq('chat_id', selectedChatId)
          .order('created_at', { ascending: true })

        if (!error) {
          setMessages(data)
        } else {
          console.error('Failed to fetch messages:', error)
        }
      }
    }

    fetchMessages()
  }, [selectedChatId])

  // Send a message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChatId || !user) return

    const { error } = await supabase.from('messages').insert([
      {
        chat_id: selectedChatId,
        sender_id: user.id,
        content: newMessage.trim()
      }
    ])

    if (error) {
      console.error('Failed to send message:', error)
    } else {
      setNewMessage('')
    }
  }

  if (!user) return null

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/3 border-r p-4">
        <h2 className="text-xl font-bold mb-4">Chats</h2>
        <ul className="space-y-2">
          {chats.map((chat) => (
            <li
              key={chat.id}
              onClick={() => setSelectedChatId(chat.id)}
              className={`p-2 border rounded cursor-pointer hover:bg-gray-100 ${
                chat.id === selectedChatId ? 'bg-blue-100' : ''
              }`}
            >
              {chat.title || 'Untitled Chat'}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Chat Window */}
      <div className="w-2/3 p-4 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto border-b mb-2 space-y-2 p-2">
          {messages.map((msg) => (
            <div key={msg.id} className="bg-gray-200 p-2 rounded">
              {msg.content}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 border px-4 py-2 rounded-l"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-r"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}