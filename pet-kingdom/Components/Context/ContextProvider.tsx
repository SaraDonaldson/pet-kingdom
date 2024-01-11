"use client";
import React from "react";

import { SessionProvider } from "./SessionProvider";

export default function ContextProvider({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <SessionProvider>
          
        </SessionProvider>
    )
}