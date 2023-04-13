import admin from "firebase-admin";
import { firebaseConfig } from "./config";

try {
  admin.instanceId();
} catch (err) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: firebaseConfig.projectId,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
    databaseURL: `https://${firebaseConfig.projectId}.firebaseio.com`,
  });
}

const db = admin.firestore();

export interface UpdateUserOptions {
  displayName?: string;
  email?: string;
  password?: string;
}

export interface UpdateUserResult {
  success: boolean;
  message: string;
  updatedUser?: admin.auth.UserRecord;
  error?: admin.FirebaseError;
}

export const updateUser = async (
  uid: string,
  options: UpdateUserOptions
): Promise<UpdateUserResult> => {
  try {
    const updatedUser = await admin.auth().updateUser(uid, { ...options });
    return {
      success: true,
      message: "User updated successfully.",
      updatedUser,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to update user.",
      error: error as admin.FirebaseError,
    };
  }
};
