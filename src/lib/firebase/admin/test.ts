import { existingUser } from "../../playwright/users";
import { updateUser } from "./user";

import { auth, db } from "./firebaseInit";

export const deleteTestUser = async (testUserEmail: string) => {
  const collectionName = "users-test";

  try {
    // Get the user's UID by email address from Firebase Authentication
    const userRecord = await auth.getUserByEmail(testUserEmail);
    const uid = userRecord.uid;

    console.log("Deleting test user...");

    // Delete the user from Firebase Authentication
    await auth.deleteUser(uid);
    console.log(
      `User with UID ${uid} has been deleted from Firebase Authentication.`
    );

    return { result: "success" };
  } catch (error) {
    console.log("deleteTestUser error, probably already deleted");
    return { result: "error" };
  }
};

export const resetTestUser = async () => {
  try {
    // Get the user's UID by email address from Firebase Authentication
    const userRecord = await auth.getUserByEmail(existingUser.email);
    const uid = userRecord.uid;

    updateUser(uid, {
      displayName: existingUser.name,
      email: existingUser.email,
      password: existingUser.password,
    });

    // Query the status-test collection for documents with the target uid
    const querySnapshot = await db
      .collection("status-test")
      .where("uid", "==", uid)
      .get();

    // Delete each document that matches the target uid
    const deletePromises = querySnapshot.docs.map((doc) => doc.ref.delete());
    await Promise.all(deletePromises);

    return { result: "success" };
  } catch (error) {
    console.log("deleteTestUser error, probably already deleted");
    return { result: "error" };
  }
};
