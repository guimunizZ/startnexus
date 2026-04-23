// ===============================================
// ChatGPT
// src/components/dashboard/assistance/ServicesManager.tsx
// COMPLETO NOVO
// ===============================================

"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Plus,
    Pencil,
    Trash2,
    Monitor,
    Smartphone,
    Laptop,
    Tablet,
    Printer,
    Wrench,
    X,
} from "lucide-react";

type Service = {
    id: number;
    title: string;
    description: string;
    price: number;
    time: string;
    icon: string;
    active: boolean;
};

type Props = {
    fullPage?: boolean;
};

const ICONS = {
    computador: Monitor,
    celular: Smartphone,
    notebook: Laptop,
    tablet: Tablet,
    impressora: Printer,
};

export default function ServicesManager({ fullPage = false }: Props) {
    const [services, setServices] = useState<Service[]>([
        {
            id: 1,
            title: "Formatação Windows 11",
            description: "Instalação completa e drivers",
            price: 150,
            time: "3h",
            icon: "computador",
            active: true,
        },
        {
            id: 2,
            title: "Troca de Tela iPhone",
            description: "Tela original premium",
            price: 850,
            time: "1h",
            icon: "celular",
            active: true,
        },
        {
            id: 3,
            title: "Upgrade SSD",
            description: "Instalação + otimização",
            price: 350,
            time: "2h",
            icon: "notebook",
            active: true,
        },
        {
            id: 4,
            title: "Limpeza Preventiva",
            description: "Limpeza interna completa",
            price: 120,
            time: "2h",
            icon: "computador",
            active: false,
        },
    ]);

    const [editing, setEditing] = useState<number | null>(null);
    const [iconModal, setIconModal] = useState<number | null>(null);

    function update(id: number, field: keyof Service, value: any) {
        setServices((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    }

    function remove(id: number) {
        const item = services.find((x) => x.id === id);
        if (!item) return;

        const confirmDelete = confirm(
            `Tem certeza que deseja excluir "${item.title}" ?`
        );

        if (confirmDelete) {
            setServices((prev) => prev.filter((x) => x.id !== id));
        }
    }

    function addService() {
        setServices((prev) => [
            ...prev,
            {
                id: Date.now(),
                title: "Novo Serviço",
                description: "Descrição do serviço",
                price: 100,
                time: "1h",
                icon: "computador",
                active: true,
            },
        ]);
    }

    // =====================================================
    // HOME (cards)
    // =====================================================
    if (!fullPage) {
        return (
            <div className="bg-white rounded-[32px] p-8 space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-black text-slate-900">
                            Serviços Oferecidos
                        </h3>
                        <p className="text-sm text-slate-500 font-semibold">
                            Seus principais serviços ativos.
                        </p>
                    </div>

                    <Link
                        href="/b2b/servicos"
                        className="px-6 py-3 rounded-2xl bg-primary font-black text-slate-900"
                    >
                        Gerenciar
                    </Link>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {services.slice(0, 4).map((service) => {
                        const Icon =
                            ICONS[service.icon as keyof typeof ICONS] || Monitor;

                        return (
                            <div
                                key={service.id}
                                className="p-5 rounded-2xl border border-slate-200"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-4 items-center">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                            <Icon size={24} />
                                        </div>

                                        <div>
                                            <h4 className="font-black text-slate-900 text-sm">
                                                {service.title}
                                            </h4>
                                            <p className="text-xs text-slate-500">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="font-black text-slate-900">
                                            R$ {service.price}
                                        </p>
                                        <p className="text-xs text-slate-500">{service.time}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    // =====================================================
    // FULL PAGE LISTA
    // =====================================================
    return (
        <>
            <div className="bg-white rounded-[32px] p-8 space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-black text-slate-900">
                        Serviços Oferecidos
                    </h3>

                    <button
                        onClick={addService}
                        className="px-6 py-3 rounded-2xl bg-primary font-black text-slate-900 flex items-center gap-2"
                    >
                        <Plus size={18} />
                        Novo Serviço
                    </button>
                </div>

                <div className="space-y-4">
                    {services.map((service) => {
                        const Icon =
                            ICONS[service.icon as keyof typeof ICONS] || Monitor;

                        const isEdit = editing === service.id;

                        return (
                            <div
                                key={service.id}
                                className="border border-slate-200 rounded-3xl p-6"
                            >
                                <div className="grid grid-cols-12 gap-4 items-start">
                                    {/* ICON */}
                                    <button
                                        onClick={() =>
                                            isEdit && setIconModal(service.id)
                                        }
                                        className="col-span-1 w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center"
                                    >
                                        <Icon size={24} />
                                    </button>

                                    {/* INFO */}
                                    <div className="col-span-7 space-y-3">
                                        {isEdit ? (
                                            <>
                                                <input
                                                    value={service.title}
                                                    onChange={(e) =>
                                                        update(
                                                            service.id,
                                                            "title",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border rounded-xl px-4 py-3 text-slate-900 font-black"
                                                />

                                                <input
                                                    value={service.description}
                                                    onChange={(e) =>
                                                        update(
                                                            service.id,
                                                            "description",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="w-full border rounded-xl px-4 py-3 text-slate-700"
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <h4 className="text-xl font-black text-slate-900">
                                                    {service.title}
                                                </h4>
                                                <p className="text-slate-500 font-semibold">
                                                    {service.description}
                                                </p>
                                            </>
                                        )}
                                    </div>

                                    {/* PRICE */}
                                    <div className="col-span-2 space-y-3">
                                        {isEdit ? (
                                            <div className="flex">
                                                <div className="px-3 bg-slate-100 border rounded-l-xl flex items-center font-bold">
                                                    R$
                                                </div>
                                                <input
                                                    type="number"
                                                    value={service.price}
                                                    onChange={(e) =>
                                                        update(
                                                            service.id,
                                                            "price",
                                                            Number(e.target.value)
                                                        )
                                                    }
                                                    className="w-full border border-l-0 rounded-r-xl px-3 py-3 text-slate-900 font-black"
                                                />
                                            </div>
                                        ) : (
                                            <p className="text-2xl font-black text-slate-900">
                                                R$ {service.price}
                                            </p>
                                        )}

                                        {isEdit ? (
                                            <select
                                                value={service.time}
                                                onChange={(e) =>
                                                    update(
                                                        service.id,
                                                        "time",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full border rounded-xl px-3 py-3 text-slate-900"
                                            >
                                                <option>1h</option>
                                                <option>2h</option>
                                                <option>3h</option>
                                                <option>1 dia</option>
                                                <option>3 dias</option>
                                                <option>7 dias</option>
                                                <option>15 dias</option>
                                            </select>
                                        ) : (
                                            <p className="text-slate-500 font-semibold">
                                                {service.time}
                                            </p>
                                        )}
                                    </div>

                                    {/* ACTIONS */}
                                    <div className="col-span-2 flex gap-2 justify-end">
                                        <button
                                            onClick={() =>
                                                setEditing(
                                                    isEdit ? null : service.id
                                                )
                                            }
                                            className="w-11 h-11 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-slate-200"
                                        >
                                            <Pencil size={18} />
                                        </button>

                                        <button
                                            onClick={() =>
                                                update(
                                                    service.id,
                                                    "active",
                                                    !service.active
                                                )
                                            }
                                            className={`px-4 h-11 rounded-xl font-bold ${
                                                service.active
                                                    ? "bg-primary text-slate-900"
                                                    : "bg-slate-200 text-slate-600"
                                            }`}
                                        >
                                            {service.active
                                                ? "Ativo"
                                                : "Pausado"}
                                        </button>

                                        <button
                                            onClick={() => remove(service.id)}
                                            className="w-11 h-11 rounded-xl bg-red-50 text-red-500 flex items-center justify-center"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* MODAL ICONE */}
            {iconModal && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                    <div className="bg-white w-[520px] rounded-[32px] p-8 space-y-6 shadow-2xl">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-black text-slate-900">
                                Escolher Dispositivo
                            </h3>

                            <button
                                onClick={() => setIconModal(null)}
                                className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {Object.entries(ICONS).map(([key, Comp]) => (
                                <button
                                    key={key}
                                    onClick={() => {
                                        update(iconModal, "icon", key);
                                        setIconModal(null);
                                    }}
                                    className="border border-slate-200 rounded-2xl p-5 hover:border-primary hover:bg-primary/5 transition text-left"
                                >
                                    <Comp
                                        size={28}
                                        className="text-primary mb-3"
                                    />

                                    <p className="font-black text-slate-900 capitalize">
                                        {key}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}