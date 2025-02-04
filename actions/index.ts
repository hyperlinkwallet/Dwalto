// File: lib/authActions.ts

"use client";

import { signIn, signOut } from "next-auth/react";
import { web3auth } from "@/lib/web3auth";

export async function handleSignIn() {
  try {
    const result = await signIn("google", { redirect: false });
    if (result?.error) {
      console.error("Sign-in error:", result.error);
      throw new Error(result.error);
    }
    return result;
  } catch (error) {
    console.error("Error during sign in:", error);
    throw error;
  }
}

export async function handleSignOut() {
  try {
    if (web3auth.status === "connected") {
      await web3auth.logout();
    }

    // Clear all Web3Auth-related items from local storage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('openlogin_store') || 
          key.startsWith('Web3Auth') || 
          key.startsWith('w3a') ||
          key.includes('wagmi') ||
          key.includes('connectKit'))) {
        localStorage.removeItem(key);
      }
    }

    await signOut({ redirect: false });

    // Clear any client-side state if necessary
    // For example:
    // clearUserState();

    return { success: true };
  } catch (error) {
    console.error("Error during sign out:", error);
    throw error;
  }
}

export function checkWeb3AuthStatus() {
  try {
    if (web3auth) {
      return web3auth.status;
    }
  } catch (error) {
    console.error("Error checking Web3Auth status:", error);
  }
  return "disconnected";
}

export async function initializeWeb3Auth() {
  if (web3auth.status === "not_ready") {
    try {
      await web3auth.init();
      console.log("Web3Auth initialized successfully");
    } catch (error) {
      console.error("Error initializing Web3Auth:", error);
      if (error instanceof Error) {
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      throw error;
    }
  } else {
    console.log("Web3Auth already initialized or connected");
  }
}