"use client"
import { Text } from "@medusajs/ui"
import React, { useState, FormEvent } from "react"
import { FaEnvelope } from "react-icons/fa"

const SubscribeForm = () => {
  const [email, setEmail] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [error, setError] = useState<string>("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // Simple email validation
    if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setError("Please enter a valid email address.")
      return
    }

    // Simulate form submission
    setTimeout(() => {
      setMessage("Thank you for subscribing!")
      setError("")
      setEmail("")
    }, 500)
  }

  return (
    <div>
      <p className="text-xs text-gray-600 font-normal">
        Subscribe to our newsletter and stay up to date with the latest news,
        updates, and exclusive offers. Get valuable insights. Join our community
        today!
      </p>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-gray-100 flex items-center mt-5 rounded-full px-1 py-1 border focus-within:border-gray-700"
      >
        <FaEnvelope className="text-gray-500 ml-3" />
        <input
          type="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full outline-none bg-transparent text-sm px-3 py-3"
          required
        />
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-600 transition-all text-white font-semibold text-sm rounded-full px-4 py-3"
        >
          Submit
        </button>
      </form>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  )
}

export default SubscribeForm
