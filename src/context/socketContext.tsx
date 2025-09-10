"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
    socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = (): Socket | null => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket debe ser usado dentro de un SocketProvider");
    }
    return context.socket;
};

interface SocketProviderProps {
    children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const s = io("http://localhost:5045/mvt-notification-graphs/v1/altenar", {
            extraHeaders: {
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJhcGktYWNjZXNzIiwicHJvdmlkZXIiOiJwcnVlYmEga3VyYXgiLCJpYXQiOjE3NTY5MTUxNTIsImV4cCI6MTc1NjkxNTE1Mn0.WJGFYCsczy5zop6apLye7vcifu1Kc8Uu3ckdOX4Zz7I",
            },
        });

        setSocket(s);

        // 🔹 Handlers de eventos de conexión
        // s.on("connect", () => console.log("✅ Socket conectado:", s.id));
        // s.on("connect_error", (err) => console.error("❌ Error de conexión:", err.message));
        // s.on("disconnect", (reason) => console.warn("⚠️ Socket desconectado:", reason));

        return () => {
            s.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};
