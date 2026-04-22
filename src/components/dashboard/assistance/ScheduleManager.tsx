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

type ExtraState = {
    urgent: boolean;
    home: boolean;
    remote: boolean;
    pickup: boolean;
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
    const [schedule, setSchedule] = useState<DayItem[]>(DEFAULT_SCHEDULE);

    const [extras, setExtras] = useState<ExtraState>({
        urgent: true,
        home: true,
        remote: false,
        pickup: true,
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        void loadSchedule(); // ✅ corrige Promise ignored
    }, []);

    async function loadSchedule(): Promise<void> {
        try {
            setLoading(true);

            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) return;

            const { data, error } = await supabase
                .from("assistance_schedule")
                .select("*")
                .eq("assistance_id", user.id)
                .order("day_of_week", { ascending: true });

            if (error || !data?.length) return;

            const mapped = DEFAULT_SCHEDULE.map((item) => {
                const found = data.find((row) => row.day_of_week === item.day_of_week);

                if (!found) return item;

                return {
                    ...item,
                    start: found.start_time?.slice(0, 5) ?? item.start,
                    end: found.end_time?.slice(0, 5) ?? item.end,
                    active: found.is_active,
                };
            });

            const first = data[0];

            setSchedule(mapped);

            setExtras({
                urgent: first?.is_urgent ?? false,
                home: first?.is_home_service ?? false,
                remote: first?.is_remote_service ?? false,
                pickup: first?.is_pickup_delivery ?? false,
            });
        } catch (error) {
            console.error(error);
            setMessage("Erro ao carregar agenda.");
        } finally {
            setLoading(false);
        }
    }

    function updateDay(
        index: number,
        field: keyof DayItem,
        value: string | boolean
    ): void {
        setSchedule((prev) => {
            const copy = [...prev];
            copy[index] = { ...copy[index], [field]: value };
            return copy;
        });
    }

    async function saveSchedule(): Promise<void> {
        try {
            setSaving(true);
            setMessage("");

            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                setMessage("Usuário não autenticado.");
                return;
            }

            await supabase
                .from("assistance_schedule")
                .delete()
                .eq("assistance_id", user.id);

            const payload = schedule.map((item) => ({
                assistance_id: user.id,
                day_of_week: item.day_of_week,
                start_time: item.start,
                end_time: item.end,
                is_active: item.active,
                is_urgent: extras.urgent,
                is_home_service: extras.home,
                is_remote_service: extras.remote,
                is_pickup_delivery: extras.pickup,
            }));

            const { error } = await supabase
                .from("assistance_schedule")
                .insert(payload);

            if (error) {
                setMessage(error.message);
                return;
            }

            setMessage("Agenda salva com sucesso.");
        } catch (error) {
            console.error(error);
            setMessage("Erro ao salvar agenda.");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="bg-white rounded-[32px] border border-gray shadow-sm p-8 flex items-center justify-center min-h-[320px]">
                <Loader2 className="animate-spin text-primary" size={28} />
            </div>
        );
    }

    return (
        <div className="bg-white rounded-[32px] border border-gray shadow-sm p-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h3 className="text-xl font-black text-dark tracking-tighter">
                        Agenda Operacional
                    </h3>

                    <p className="text-sm text-dark/50 font-semibold">
                        Configure horários e formas de atendimento.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => void saveSchedule()}
                    disabled={saving}
                    className="px-6 py-3 bg-dark text-white rounded-2xl font-bold text-sm hover:bg-dark/90 transition disabled:opacity-60 flex items-center gap-2"
                >
                    {saving ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : (
                        <Save size={16} />
                    )}

                    {saving ? "Salvando..." : "Salvar Agenda"}
                </button>
            </div>

            <div className="space-y-4">
                {schedule.map((item, i) => (
                    <div
                        key={item.day}
                        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-5 rounded-2xl border border-gray bg-gray/20"
                    >
                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                onClick={() => updateDay(i, "active", !item.active)}
                                className={`w-10 h-10 rounded-xl flex items-center justify-center transition ${
                                    item.active
                                        ? "bg-primary/20 text-primary"
                                        : "bg-gray text-dark/30"
                                }`}
                            >
                                {item.active ? <Check size={18} /> : <X size={18} />}
                            </button>

                            <span
                                className={`font-bold ${
                                    item.active ? "text-dark" : "text-dark/40"
                                }`}
                            >
                {item.day}
              </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                type="time"
                                value={item.start}
                                disabled={!item.active}
                                onChange={(e) => updateDay(i, "start", e.target.value)}
                                className="border border-gray rounded-xl px-3 py-2 text-sm font-bold disabled:opacity-50"
                            />

                            <span className="text-dark/40 text-sm font-bold">até</span>

                            <input
                                type="time"
                                value={item.end}
                                disabled={!item.active}
                                onChange={(e) => updateDay(i, "end", e.target.value)}
                                className="border border-gray rounded-xl px-3 py-2 text-sm font-bold disabled:opacity-50"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <h4 className="font-black text-dark mb-4">Recursos Disponíveis</h4>

                <div className="grid sm:grid-cols-2 gap-4">
                    <ToggleCard
                        label="Atendimento urgente"
                        active={extras.urgent}
                        onClick={() =>
                            setExtras((p) => ({ ...p, urgent: !p.urgent }))
                        }
                    />

                    <ToggleCard
                        label="Atendimento em domicílio"
                        active={extras.home}
                        onClick={() =>
                            setExtras((p) => ({ ...p, home: !p.home }))
                        }
                    />

                    <ToggleCard
                        label="Atendimento remoto"
                        active={extras.remote}
                        onClick={() =>
                            setExtras((p) => ({ ...p, remote: !p.remote }))
                        }
                    />

                    <ToggleCard
                        label="Retirada e entrega"
                        active={extras.pickup}
                        onClick={() =>
                            setExtras((p) => ({ ...p, pickup: !p.pickup }))
                        }
                    />
                </div>
            </div>

            {message && (
                <div className="rounded-2xl px-4 py-3 bg-primary/10 text-primary font-bold text-sm">
                    {message}
                </div>
            )}
        </div>
    );
}

function ToggleCard({
                        label,
                        active,
                        onClick,
                    }: {
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="p-4 rounded-2xl border border-gray flex items-center justify-between hover:border-primary/40 transition bg-white"
        >
            <span className="text-sm font-bold text-dark">{label}</span>

            <div
                className={`w-11 h-6 rounded-full relative transition ${
                    active ? "bg-primary" : "bg-gray"
                }`}
            >
                <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                        active ? "right-1" : "left-1"
                    }`}
                />
            </div>
        </button>
    );
}