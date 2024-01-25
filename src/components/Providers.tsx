"use client"
import { MessagesProvider } from '@/context/MessageContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { FC, ReactNode } from 'react'

interface ProvidersProps {
    children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => {
    const client = new QueryClient();

    return (
        <QueryClientProvider client={client}>
            <MessagesProvider>
                {children}
            </MessagesProvider>
        </QueryClientProvider>
    )
}

export default Providers