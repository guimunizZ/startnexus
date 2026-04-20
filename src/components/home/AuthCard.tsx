"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function AuthCard() {
  const [authType, setAuthType] = useState<"client" | "assistance">("client");
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[32px] p-8 shadow-2xl shadow-primary/5 relative overflow-hidden group hover:shadow-primary/10 transition-all duration-500">
        {/* Decorative background gradient */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-500"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-colors duration-500"></div>

        <div className="relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-extrabold text-dark tracking-tight">
              {mode === "login" ? "Acesse sua conta" : "Crie sua conta"}
            </h3>
            <p className="text-sm text-dark/60 font-medium">
              {authType === "assistance" 
                ? "Acesso para equipe técnica e suporte" 
                : "Acesso para alunos e parceiros"}
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex p-1.5 bg-gray/50 rounded-2xl border border-gray/50">
            <button
              onClick={() => setAuthType("assistance")}
              className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition-all duration-300 ${
                authType === "assistance"
                  ? "bg-white text-primary shadow-md"
                  : "text-dark/40 hover:text-dark/60"
              }`}
            >
              Assistência
            </button>
            <button
              onClick={() => setAuthType("client")}
              className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition-all duration-300 ${
                authType === "client"
                  ? "bg-white text-primary shadow-md"
                  : "text-dark/40 hover:text-dark/60"
              }`}
            >
              Cliente
            </button>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-extrabold text-dark/40 uppercase tracking-widest ml-1">
                  E-mail
                </label>
                <input
                  type="email"
                  placeholder="exemplo@nexus.org"
                  className="w-full bg-white/50 border border-gray rounded-2xl px-5 py-3.5 text-sm text-dark outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all duration-300 placeholder:text-dark/20"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-extrabold text-dark/40 uppercase tracking-widest ml-1">
                  Senha
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-white/50 border border-gray rounded-2xl px-5 py-3.5 text-sm text-dark outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all duration-300 placeholder:text-dark/20"
                />
              </div>
            </div>

            <button
              type="button"
              className="w-full bg-primary hover:bg-secondary text-white hover:text-dark py-4 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20 hover:shadow-secondary/20 transition-all duration-500 active:scale-[0.98] mt-2"
            >
              {mode === "login" ? "Entrar na Plataforma" : "Finalizar Cadastro"}
            </button>
          </form>

          {/* Switch Mode */}
          <div className="text-center pt-2">
            <button
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="text-xs font-bold text-dark/40 hover:text-primary transition-colors duration-300"
            >
              {mode === "login" ? (
                <>Não possui conta? <span className="text-primary underline decoration-primary/20 underline-offset-4">Cadastrar</span></>
              ) : (
                <>Já possui conta? <span className="text-primary underline decoration-primary/20 underline-offset-4">Entrar</span></>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
