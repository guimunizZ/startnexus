"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { AuthService } from "@/server/services/authService";

const authService = new AuthService();

export default function AuthCard() {
  const router = useRouter();

  const [authType, setAuthType] =
      useState<"client" | "assistance">("client");

  const [mode, setMode] =
      useState<"login" | "register">("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
      e: SubmitEvent & {
        currentTarget: HTMLFormElement;
        preventDefault(): void;
      }
  ) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      if (mode === "login") {
        await authService.login(email, password);

        router.push(
            authType === "assistance"
                ? "/b2b"
                : "/b2c"
        );
      } else {
        router.push(
            authType === "assistance"
                ? "/auth/register/assistance"
                : "/auth/register/client"
        );
      }
    } catch (err: any) {
      setError(
          err?.message ||
          "Erro ao processar solicitação"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
      <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md mx-auto"
      >
        <div className="bg-white p-8 rounded-3xl shadow-2xl">
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold">
                {mode === "login"
                    ? "Acesse sua conta"
                    : "Criar conta"}
              </h3>

              <p className="text-sm text-gray-500">
                {authType === "assistance"
                    ? "Equipe técnica"
                    : "Clientes e alunos"}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                  type="button"
                  onClick={() =>
                      setAuthType("assistance")
                  }
                  className="flex-1 border rounded-xl py-3"
              >
                Assistência
              </button>

              <button
                  type="button"
                  onClick={() =>
                      setAuthType("client")
                  }
                  className="flex-1 border rounded-xl py-3"
              >
                Cliente
              </button>
            </div>

            {error && (
                <div className="text-red-500 text-sm">
                  {error}
                </div>
            )}

            <form
                onSubmit={(e) => handleSubmit(e as any)}
                className="space-y-4"
            >
              <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) =>
                      setEmail(e.target.value)
                  }
                  className="w-full border rounded-xl px-4 py-3"
                  required
              />

              <input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) =>
                      setPassword(e.target.value)
                  }
                  className="w-full border rounded-xl px-4 py-3"
                  required
              />

              <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-3 rounded-xl"
              >
                {loading
                    ? "Processando..."
                    : mode === "login"
                        ? "Entrar"
                        : "Cadastrar"}
              </button>
            </form>

            <button
                type="button"
                onClick={() =>
                    setMode(
                        mode === "login"
                            ? "register"
                            : "login"
                    )
                }
                className="text-sm w-full"
            >
              {mode === "login"
                  ? "Não possui conta? Cadastre-se"
                  : "Já possui conta? Entrar"}
            </button>
          </div>
        </div>
      </motion.div>
  );
}