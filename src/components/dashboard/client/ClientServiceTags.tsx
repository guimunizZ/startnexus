"use client";

type Props = {
    label: string;
};

export default function ClientServiceTags({
                                              label
                                          }: Props) {
    return (
        <div className="px-4 py-2 rounded-full border border-slate-700 bg-slate-800 text-sm font-medium text-white">
            {label}
        </div>
    );
}