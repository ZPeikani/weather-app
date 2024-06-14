import { ReactNode, createContext, useContext, useState } from "react";

interface AuthContextType {
  authentication: boolean;
  signIn: () => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authentication, setAuthentication] = useState(false);
  const signIn = () => setAuthentication(true);
  const logout = () => setAuthentication(false);
  return (
    <AuthContext.Provider value={{ authentication, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}