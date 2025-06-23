import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '@/components/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from '@/components/ui/use-toast';
import { sendSignupNotification } from '@/services/emailService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signup = async ({ name, email, phone, password }) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name });

      // ✅ Store user data in Firestore
      await setDoc(doc(db, 'users', result.user.uid), {
        name,
        email,
        phone,
        createdAt: new Date()
      });

      // ✅ Send email with name, email, and phone
      await sendSignupNotification({ name, email, phone });

      toast({
        title: "Signed up!",
        description: "Account created successfully.",
      });

      return true;
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error.message,
        variant: "destructive"
      });
      return false;
    }
  };

  const login = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Logged in!",
        description: "Welcome back!",
      });
      return true;
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive"
      });
      return false;
    }
  };

  const logout = async () => {
    await signOut(auth);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, isLoading }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
