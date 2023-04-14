import admin from "firebase-admin";
import { firebaseConfig } from "../config";

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
const auth = admin.auth();

export { db, auth };
