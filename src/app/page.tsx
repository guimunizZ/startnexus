"use client";

import Link from "next/link";

export default function Home() {
    return (
        <div style={{ padding: 20 }}>
            <h1>StartNexus</h1>

            <h2>Cadastro</h2>

            <Link href="/auth/register/client">
                <button>Sou Cliente</button>
            </Link>

            <br /><br />

            <Link href="/auth/register/assistance">
                <button>Sou Assistência</button>
            </Link>
        </div>
    );
}