"use client";

import { useEffect, useState } from "react";
import { Check, X, Loader2, Save } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type DayItem = {
    day: string;
    day_of_week: number;
    start: string;
    end: string;
    active: boolean;
};

const DEFAULT_SCHEDULE: DayItem[] = [
    { day: "Domingo", day_of_week: 0, start: "00:00", end: "00:00", active: false },
    { day: "Segunda", day_of_week: 1, start: "08:00", end: "18:00", active: true },
    { day: "Terça", day_of_week: 2, start: "08:00", end: "18:00", active: true },
    { day: "Quarta", day_of_week: 3, start: "08:00", end: "18:00", active: true },
    { day: "Quinta", day_of_week: 4, start: "08:00", end: "18:00", active: true },
    { day: "Sexta", day_of_week: 5, start: "08:00", end: "18:00", active: true },
    { day: "Sábado", day_of_week: 6, start: "09:00", end: "14:00", active: true },
];

export default function ScheduleManager() {
    const [schedule, setSchedule] = useState(DEFAULT_SCHEDULE);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, []);

    function updateDay(
        index: number,
        field: keyof DayItem,
        value: string | boolean
    ) {
        setSchedule((prev) => {
            const copy = [...prev];
            copy[index] = { ...copy[index], [field]: value };
            return copy;
        });
    }

    if (loading) {
        return (
            <div className="bg-white rounded-[32px] p-8 min-h-[280px] flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={28} />
            </div>
        );
    }

    return (
        <div className="bg-white rounded-[32px] p-6 border border-slate-200 shadow-sm overflow-hidden">
            {/* TOPO */}
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 leading-tight">
                        Agenda Operacional
                    </h2>

                    <p className="mt-2 text-slate-500 text-base font-semibold">
                        Configure horários e formas de atendimento.
                    </p>
                </div>

                <button className="h-12 px-5 rounded-2xl bg-slate-950 text-white text-sm font-bold flex items-center gap-2 shrink-0 self-start">
                    {saving ? (
                        <Loader2 size={15} className="animate-spin" />
                    ) : (
                        <Save size={15} />
                    )}
                    Salvar
                </button>
            </div>

            {/* LINHAS */}
            <div className="space-y-3">
                {schedule.map((item, i) => (
                    <div
                        key={item.day}
                        className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3"
                    >
                        {/* GRID ENCAIXADO */}
                        <div className="grid grid-cols-[44px_1fr_88px_22px_88px] gap-2 items-center">
                            {/* STATUS */}
                            <button
                                onClick={() =>
                                    updateDay(i, "active", !item.active)
                                }
                                className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                                    item.active
                                        ? "bg-primary/15 text-primary"
                                        : "bg-slate-200 text-slate-400"
                                }`}
                            >
                                {item.active ? (
                                    <Check size={16} />
                                ) : (
                                    <X size={16} />
                                )}
                            </button>

                            {/* DIA */}
                            <span
                                className={`text-base font-bold truncate ${
                                    item.active
                                        ? "text-slate-900"
                                        : "text-slate-400"
                                }`}
                            >
                {item.day}
              </span>

                            {/* HORA INICIO */}
                            <input
                                type="time"
                                value={item.start}
                                onChange={(e) =>
                                    updateDay(i, "start", e.target.value)
                                }
                                className="w-full h-10 rounded-xl border border-slate-200 bg-white px-2 text-xs font-bold text-slate-900"
                            />

                            {/* ATE */}
                            <span className="text-[11px] font-bold text-slate-500 text-center">
                até
              </span>

                            {/* HORA FIM */}
                            <input
                                type="time"
                                value={item.end}
                                onChange={(e) =>
                                    updateDay(i, "end", e.target.value)
                                }
                                className="w-full h-10 rounded-xl border border-slate-200 bg-white px-2 text-xs font-bold text-slate-900"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
