// src/components/home/AuthCard.tsx
"use client";

import { useState } from "react";

export default function AuthCard() {
  const [tab, setTab] = useState<"assistance" | "client">("client");

  return (
      <div className="flex justify-center lg:justify-end">

        {/* IPHONE FRAME */}
        <div className="relative w-[360px] h-[720px] rounded-[52px] p-[10px] bg-zinc-800 shadow-2xl border border-white/10">

          {/* BORDA METÁLICA */}
          <div className="absolute inset-0 rounded-[52px] ring-2 ring-zinc-600 pointer-events-none" />

          {/* BOTÕES LATERAIS */}
          <div className="absolute -left-[3px] top-32 w-[4px] h-14 rounded-full bg-zinc-500" />
          <div className="absolute -left-[3px] top-52 w-[4px] h-20 rounded-full bg-zinc-500" />
          <div className="absolute -right-[3px] top-44 w-[4px] h-24 rounded-full bg-zinc-500" />

          {/* TELA */}
          <div className="relative w-full h-full rounded-[42px] overflow-hidden bg-white">

            {/* NOTCH */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 w-32 h-7 bg-black rounded-full" />

            {/* CONTEÚDO */}
            <div className="h-full px-7 pt-20 pb-8 bg-white flex flex-col justify-center">

              <h2 className="text-[42px] font-black text-slate-900 leading-none text-center">
                Acesse sua conta
              </h2>

              <p className="mt-3 text-center text-slate-500 text-lg">
                Acesso para Clientes
              </p>

              {/* TABS */}
              <div className="mt-8 p-2 rounded-2xl bg-slate-100 grid grid-cols-2 gap-2">
                <button
                    onClick={() => setTab("assistance")}
                    className={`h-14 rounded-xl font-semibold text-lg transition ${
                        tab === "assistance"
                            ? "bg-black text-white"
                            : "text-slate-600"
                    }`}
                >
                  Assistência
                </button>

                <button
                    onClick={() => setTab("client")}
                    className={`h-14 rounded-xl font-semibold text-lg transition ${
                        tab === "client"
                            ? "bg-black text-white"
                            : "text-slate-600"
                    }`}
                >
                  Cliente
                </button>
              </div>

              {/* INPUTS */}
              <input
                  type="email"
                  placeholder="exemplo@email.com"
                  className="mt-7 h-16 px-5 rounded-2xl border border-slate-200 text-slate-700 placeholder:text-slate-400 outline-none"
              />

              <input
                  type="password"
                  placeholder="********"
                  className="mt-5 h-16 px-5 rounded-2xl border border-slate-200 text-slate-700 placeholder:text-slate-400 outline-none"
              />

              {/* BOTÃO */}
              <button className="mt-6 h-16 rounded-2xl bg-black text-white font-bold text-xl hover:scale-[1.02] transition">
                Entrar
              </button>

              <button className="mt-4 h-16 rounded-2xl border border-slate-200 text-slate-400 font-semibold text-lg">
                Cadastre-se
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}