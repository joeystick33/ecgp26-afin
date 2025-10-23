import { useState, useRef, useEffect } from 'react'
import { X, Send, Loader2, MessageCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import axios from 'axios'
import { apiUrl } from '../utils/api'

export default function ChatAssistant({ onClose, niveau, contexte }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `👋 Bonjour! Je suis votre assistant pédagogique en analyse financière.\n\nJe suis là pour répondre à vos questions sur les concepts financiers, les ratios, les SIG, et tout ce qui concerne l'analyse des états financiers.\n\nN'hésitez pas à me poser vos questions! 😊`
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    
    // Ajouter le message de l'utilisateur
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    
    setLoading(true)
    try {
      const response = await axios.post(apiUrl('/chat'), {
        message: userMessage,
        niveau: niveau,
        contexte: contexte ? {
          sig: contexte.sig,
          ratios: contexte.ratios
        } : null
      })
      
      if (response.data.success) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: response.data.reponse
        }])
      }
    } catch (error) {
      console.error('Erreur chat:', error)
      toast.error('Erreur lors de l\'envoi du message')
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '❌ Désolé, je rencontre une erreur. Pouvez-vous reformuler votre question?'
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const quickQuestions = [
    "C'est quoi l'EBE?",
    "Comment interpréter le ROE?",
    "Qu'est-ce que la valeur ajoutée?",
    "À quoi sert le ratio d'endettement?"
  ]

  return (
    <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200 animate-slide-up">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-indigo-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h3 className="font-bold">Assistant Pédagogique</h3>
            <p className="text-xs text-primary-100">Niveau: {niveau}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="hover:bg-white/20 rounded-full p-1 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                msg.role === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-800'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-primary-600" />
              <span className="text-sm text-gray-600">L'assistant réfléchit...</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Questions rapides */}
      {messages.length <= 2 && (
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
          <p className="text-xs text-gray-600 mb-2">💡 Questions rapides:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInput(q)
                  setTimeout(sendMessage, 100)
                }}
                className="text-xs bg-white hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded-full px-3 py-1 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Posez votre question..."
            rows="2"
            className="flex-1 resize-none border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="bg-primary-600 text-white rounded-xl px-4 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Appuyez sur Entrée pour envoyer
        </p>
      </div>
    </div>
  )
}
