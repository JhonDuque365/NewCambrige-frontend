import React, { useState, createContext, useContext } from "react";
const AuthContext = createContext();


// ADVERTENCIA PARA FUTUROS DEVS DE ESTE PROYECTO:
// ESTE CODIGO SOLO SIMULA LA CONEXION CON BACKEND, SE DEBE MODIGICAR


export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    // LOGIN FALSO (sin backend)
    const login = async (usuario, contrasena) => {
        // Simula delay como si fuera servidor
        await new Promise((res) => setTimeout(res, 800));

        // Usuario fake
        if (usuario === "admin" && contrasena === "1234") {
            const fakeUser = {
                usuario: "admin",
                rol: "admin",
                token: "fake-jwt-token"
            };

            setUser(fakeUser);
            localStorage.setItem("user", JSON.stringify(fakeUser));
            return fakeUser;
        }

        throw new Error("Credenciales inválidas");
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}