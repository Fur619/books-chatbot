import { Message } from '@/lib/validator/message'
import { nanoid } from 'nanoid'
import React, { ReactNode, createContext, useState } from 'react'

export const MessageContext = createContext<{
    messages: Message[]
    isMessageUpdating: boolean
    addMessages: (message: Message) => void
    removeMessage: (id: string) => void
    updateMessage: (id: string, updateFn: (prevText: string) => string) => void
    setIsMessageUpdating: (isUpdating: boolean) => void
}>({
    messages: [],
    isMessageUpdating: false,
    addMessages: () => { },
    removeMessage: () => { },
    updateMessage: () => { },
    setIsMessageUpdating: () => { }
})

export const MessagesProvider = ({ children }: { children: ReactNode }) => {
    const [messages, setMessages] = useState<Message[]>([{
        id: nanoid(),
        isUserMessage: false,
        text: "Hello, how can I assist you?"
    }])
    const [isMessageUpdating, setIsMessageUpdating] = useState<boolean>(false)

    const addMessages = (message: Message) => {
        setMessages((prev) => [...prev, message])
    }
    const removeMessage = (id: string) => {
        setMessages((prev) => [...prev.filter(item => item.id !== id)])
    }

    const updateMessage = (
        id: string,
        updateFn: (prevText: string) => string
    ) => {
        setMessages((prev) =>
            prev.map((message) => {
                if (message.id === id) {
                    return { ...message, text: updateFn(message.text) }
                }
                return  message
            })
        )
    }

    return (
        <MessageContext.Provider value={{
            messages,
            isMessageUpdating,
            addMessages,
            removeMessage,
            updateMessage,
            setIsMessageUpdating
        }}>
            {children}
        </MessageContext.Provider>
    )
}