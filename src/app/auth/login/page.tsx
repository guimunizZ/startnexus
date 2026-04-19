"use client";

import Link from "next/link";

export default function LoginPage() {
    return (
        <div style={{ padding: 20 }}>
            <h1>StartNexus</h1>

            <p>Escolha o tipo de cadastro:</p>

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