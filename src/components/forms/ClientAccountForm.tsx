"use client";

import ClientProfileEditor from "@/components/dashboard/client/ClientProfileEditor";

type Props = {
    userId: string;
    profile: any;
};

export default function ClientAccountForm({
                                              userId,
                                              profile
                                          }: Props) {
    return (
        <ClientProfileEditor
            userId={userId}
            profile={profile}
        />
    );
}