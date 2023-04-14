import { db, auth } from "./firebaseInit";

export interface Status {
  status: string;
  uid: string;
  timestamp: number;
  displayName?: string;
}

export const saveStatus = async (status: string, userToken: string) => {
  try {
    // Verify the user token
    const decodedToken = await auth.verifyIdToken(userToken);

    // Use the UID from the decoded token
    const uid = decodedToken.uid;

    const statusRecord: Status = {
      status,
      uid,
      timestamp: Date.now(),
    };
    const collectionName =
      process.env.NODE_ENV === "production" ? "status" : "status-test";
    await db.collection(collectionName).add(statusRecord);
    return { success: true, message: "Status saved successfully." };
  } catch (error) {
    return {
      success: false,
      message: "Failed to save status.",
      error,
    };
  }
};

export const getCurrentStatus = async (
  userToken: string
): Promise<Status | null> => {
  try {
    // Verify the user token
    const decodedToken = await auth.verifyIdToken(userToken);

    // Use the UID from the decoded token
    const uid = decodedToken.uid;

    // Define the collection name based on the environment
    const collectionName =
      process.env.NODE_ENV === "production" ? "status" : "status-test";

    // Query the status collection to get the latest status for the user
    const querySnapshot = await db
      .collection(collectionName)
      .where("uid", "==", uid)
      .orderBy("timestamp", "desc")
      .limit(1)
      .get();

    // If there's a result, return the latest status
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const statusData: Status = {
        status: doc.data().status,
        uid: doc.data().uid,
        timestamp: doc.data().timestamp,
      };
      return statusData;
    } else {
      return {
        status: "",
        uid,
        timestamp: Date.now(),
      };
    }
  } catch (error) {
    console.error("Error fetching current status:", error);
    throw error;
  }
};

// Helper function to get user's displayName by UID
const getUserDisplayName = async (uid: string): Promise<string | null> => {
  try {
    const userRecord = await auth.getUser(uid);
    return userRecord.displayName || null;
  } catch (error) {
    console.error("Error fetching user display name:", error);
    return null;
  }
};

export const getRecentStatuses = async (
  startAfterTimestamp?: number,
  pageSize: number = 24
): Promise<{ statuses: Status[]; lastTimestamp: number | null }> => {
  try {
    // Define the collection name based on the environment
    const collectionName =
      process.env.NODE_ENV === "production" ? "status" : "status-test";

    // Create the initial query to get the most recent statuses
    let query = db
      .collection(collectionName)
      .orderBy("timestamp", "desc")
      .limit(pageSize);

    // Apply pagination using the startAfterTimestamp parameter, if provided
    if (startAfterTimestamp) {
      query = query.startAfter(startAfterTimestamp);
    }

    // Execute the query and get the statuses
    const querySnapshot = await query.get();

    // Map the query results to an array of Status objects
    const statusesPromises: Promise<Status>[] = querySnapshot.docs.map(
      async (doc) => {
        const data = doc.data();
        const displayName = await getUserDisplayName(data.uid);
        return {
          status: data.status,
          uid: data.uid,
          displayName,
          timestamp: data.timestamp,
        };
      }
    );

    const statuses = await Promise.all(statusesPromises);

    // Determine the last timestamp for pagination
    const lastTimestamp =
      querySnapshot.docs.length > 0
        ? querySnapshot.docs[querySnapshot.docs.length - 1].data().timestamp
        : null;

    // Return the statuses and the last timestamp for pagination
    return { statuses, lastTimestamp };
  } catch (error) {
    console.error("Error fetching recent statuses:", error);
    throw error;
  }
};
