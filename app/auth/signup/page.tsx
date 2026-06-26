"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'inscription
    console.log("Signup:", { name, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-[#E2E8F0]">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[#0A5C36]">NCS ⚖️</h1>
          <p className="text-[#64748B] mt-2">Créez votre compte</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1D283A] mb-1">
              Nom complet
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-[#E2E8F0] px-4 py-2 focus:outline-none focus:border-[#0A5C36]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1D283A] mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-[#E2E8F0] px-4 py-2 focus:outline-none focus:border-[#0A5C36]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1D283A] mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-[#E2E8F0] px-4 py-2 focus:outline-none focus:border-[#0A5C36]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0A5C36] text-white py-2 rounded-lg hover:bg-[#064528] transition-colors font-medium"
          >
            S'inscrire
          </button>
        </form>

        <p className="text-center text-sm text-[#64748B] mt-4">
          Déjà un compte ?{" "}
          <Link href="/login" className="text-[#0A5C36] hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}