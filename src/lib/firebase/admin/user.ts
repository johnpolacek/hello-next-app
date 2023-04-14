import { auth } from "./firebaseInit";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { FirebaseError } from "firebase-admin";

export interface UpdateUserOptions {
  displayName?: string;
  email?: string;
  password?: string;
}

export interface UpdateUserResult {
  success: boolean;
  message: string;
  updatedUser?: UserRecord;
  error?: FirebaseError;
}

export const updateUser = async (
  uid: string,
  options: UpdateUserOptions
): Promise<UpdateUserResult> => {
  try {
    const updatedUser = await auth.updateUser(uid, { ...options });
    return {
      success: true,
      message: "User updated successfully.",
      updatedUser,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to update user.",
      error: error as FirebaseError,
    };
  }
};
