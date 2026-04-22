"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Solutions from "@/components/home/Solutions";

import { AuthService } from "@/client/services/authService";

const authService = new AuthService();

export default function HomePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<unknown>(null);

  useEffect(() => {
    void init();
  }, []);

  async function init() {
    try {
      const user = await authService.getCurrentUser();

      if (user) {
        const role = await authService.getUserRole();

        setSession(user);

        if (role === "client") {
          router.replace("/b2c");
          return;
        }

        if (role === "assistance") {
          router.replace("/b2b");
          return;
        }
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          carregando...
        </div>
    );
  }

  if (session) return null;

  return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />

        <main>
          <Hero />
          <About />
          <Solutions />
        </main>
      </div>
  );
}