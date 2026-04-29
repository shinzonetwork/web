import { Providers } from "@/components/providers";
import { headers } from "next/headers";
import React from 'react';

export default async function RootLayout(props: { children: React.ReactNode }) {
    const { children } = props;
    const headersList = await headers();
    const cookies = headersList.get("cookie");

    return (
        <Providers cookies={cookies}>
            {children}
        </Providers>
    )
}
