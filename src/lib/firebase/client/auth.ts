// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "../config";

try {
  initializeApp(firebaseConfig);
} catch (error) {
  // firebase is already initialized
}
export const auth = getAuth();
