"use client";

import { Bell } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Notifications() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  return (
    <div className="relative">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setHasUnread(false);
        }}
        className="p-2.5 rounded-xl hover:bg-slate-100 transition-all relative text-slate-500 hover:text-black border border-transparent hover:border-slate-200"
      >
        <Bell size={20} />
        {hasUnread && (
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#00FF88] rounded-full border-2 border-white" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden"
            >
              <div className="p-4 border-b border-slate-50 flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-900">Notificações</h3>
                <span className="text-[10px] font-bold text-[#00FF88] bg-emerald-50 px-2 py-0.5 rounded-full uppercase">Recentes</span>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <div className="p-4 text-center space-y-2">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                    <Bell size={24} />
                  </div>
                  <p className="text-xs text-slate-500">Nenhuma nova notificação por enquanto.</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
