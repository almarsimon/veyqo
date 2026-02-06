// "use client";
// import React, { createContext, useContext, useState, useEffect } from "react";
// import { User, onAuthStateChanged } from "firebase/auth";
// import { auth } from "../firebase/config";

// interface AuthContextType {
//   user: User | null;
// }

// const AuthContext = createContext<AuthContextType>({ user: null });

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, setUser);
//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
//   );
// };
