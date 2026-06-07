import { createContext, useContext, useState, ReactNode } from "react";

const USUARIOS = [
  { id: "1", email: "teacher@app.com",    password: "1234", rol: "teacher" },
  { id: "2", email: "business@app.com", password: "1234", rol: "business" },
  { id: "3", email: "student@app.com",  password: "1234", rol: "student" },
];

type Usuario = typeof USUARIOS[0];

type AuthContextType = {
  usuario: Usuario | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const login = (email: string, password: string) => {
    const encontrado = USUARIOS.find(
      (u) => u.email === email && u.password === password
    );
    if (!encontrado) return false;
    setUsuario(encontrado);
    return true;
  };

  const logout = () => {
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};