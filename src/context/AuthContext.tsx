import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut as signOutUser,
  updateProfile,
  updatePassword,
  getIdToken,
  UserCredential,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../lib/firebase/client/auth";
import appConfig from "@/app.config";

// Define the type for the context
interface AuthContextType {
  user: UserType;
  signUp: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<void>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signOut: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  isSignInWithLink: (emailLink: string) => Promise<boolean>;
  signInWithLink: (email: string, emailLink: string) => Promise<UserCredential>;
  signInWithGoogle: () => Promise<UserCredential>;
  setNewPassword: (password: string) => Promise<void | { error: string }>;
  loading: boolean;
  getAuthToken: () => Promise<string>;
}
export interface UserType {
  email: string | null;
  uid: string | null;
  displayName: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserType>({
    email: null,
    uid: null,
    displayName: null,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
        });
        setLoading(false);
      } else {
        setUser({ email: null, uid: null, displayName: null });
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log({
      email,
      password,
      displayName,
    });
    console.log("updateProfile", { displayName });
    return updateProfile(result.user, {
      displayName,
    });
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const isSignInWithLink = async (emailLink: string) => {
    const result = await isSignInWithEmailLink(auth, emailLink);
    return result;
  };

  const signInWithLink = async (email: string, emailLink: string) => {
    const result = await signInWithEmailLink(auth, email, emailLink);
    return result;
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = signInWithPopup(auth, provider);
    return result;
  };

  const signOut = async () => {
    setUser({ email: null, uid: null, displayName: null });
    await signOutUser(auth);
  };

  const setNewPassword = async (password: string) => {
    if (auth.currentUser) {
      return updatePassword(auth.currentUser, password);
    } else {
      return { error: "Current User not found" };
    }
  };

  const requestPasswordReset = async (email: string) => {
    const requestPasswordResetResult = await sendSignInLinkToEmail(
      auth,
      email,
      {
        url:
          process.env.NODE_ENV === "production"
            ? "https://" + appConfig.url + "/reset"
            : "https://localhost:3000/reset",
        handleCodeInApp: true,
      }
    );
    console.log({ requestPasswordResetResult });
    return requestPasswordResetResult;
  };

  const getAuthToken = async (): Promise<string> => {
    if (auth.currentUser) {
      return await getIdToken(auth.currentUser);
    }
    return "";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        signIn,
        signOut,
        requestPasswordReset,
        isSignInWithLink,
        signInWithLink,
        signInWithGoogle,
        setNewPassword,
        loading,
        getAuthToken,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
