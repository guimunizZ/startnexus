"use client";

import Link from "next/link";

export default function Navbar() {
  return (
      <header className="border-b">
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/">Start Nexus</Link>

          <div className="flex gap-6">
            <Link href="/#inicio">Início</Link>

            <Link href="/#quem-somos">
              Quem Somos
            </Link>

            <Link href="/#solucoes">
              Soluções
            </Link>

            <Link href="/#marketplace-preview">
              Marketplace
            </Link>
          </div>
        </nav>
      </header>
  );
}