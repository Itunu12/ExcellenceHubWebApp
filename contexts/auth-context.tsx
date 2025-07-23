"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import {
  type User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

interface UserData {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  university: string;
  level: string;
  course: string;
  isPremium: boolean;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  isDevelopment: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    university: string;
    level: string;
    course: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDevelopment, setIsDevelopment] = useState(false);

  useEffect(() => {
    // Check if Firebase is configured
    const isFirebaseConfigured =
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;

    if (!isFirebaseConfigured) {
      console.log("🔧 Running in development mode - Firebase not configured");
      setIsDevelopment(true);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        // In a real app, you'd fetch user data from Firestore
        setUserData({
          uid: user.uid,
          email: user.email || "",
          firstName: user.displayName?.split(" ")[0] || "User",
          lastName: user.displayName?.split(" ")[1] || "",
          university: "University of Lagos",
          level: "300",
          course: "Computer Science",
          isPremium: false,
        });
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    if (isDevelopment) {
      // Demo login
      const demoUser = {
        uid: "demo-user-123",
        email: email,
        firstName: "Demo",
        lastName: "User",
        university: "University of Lagos",
        level: "300",
        course: "Computer Science",
        isPremium: false,
      };
      setUserData(demoUser);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const register = async (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    university: string;
    level: string;
    course: string;
  }) => {
    if (isDevelopment) {
      // Demo registration
      const demoUser = {
        uid: "demo-user-123",
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        university: data.university,
        level: data.level,
        course: data.course,
        isPremium: false,
      };
      setUserData(demoUser);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(userCredential.user, {
        displayName: `${data.firstName} ${data.lastName}`,
      });

      // In a real app, you'd save additional user data to Firestore
      setUserData({
        uid: userCredential.user.uid,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        university: data.university,
        level: data.level,
        course: data.course,
        isPremium: false,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    if (isDevelopment) {
      setUserData(null);
      return;
    }

    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const value = {
    user,
    userData,
    loading,
    isDevelopment,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
