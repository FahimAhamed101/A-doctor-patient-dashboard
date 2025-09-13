"use client"
import React, { useState } from "react"
import { Send } from "lucide-react"
import Link from "next/link"

export default function ContactForm() {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", { subject, message })
  }

  return (
    <div className="flex w-full   justify-center     ">
      <form onSubmit={handleSubmit} className="space-y-4 w-1/3 bg-white border shadow-sm border-gray-200 p-6 rounded-lg">
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <input
            id="subject"
            type="text"
            placeholder="Write problem..."
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <div className="text-xs text-gray-500 mb-2">
            Please provide a more detailed explanation of your message
          </div>
          <textarea
            id="message"
            placeholder="Type here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full min-h-[120px] px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            rows={5}
          />
        </div>
        <Link href="/support/success"> <button 
          type="submit" 
          className="w-full bg-[#2E8BC9] hover:bg-[#2E8BC9] text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
        >
           
             <Send className="w-4 h-4 mr-2" />
          Send
            
         
        </button></Link>
      </form>
    </div>
  )
}