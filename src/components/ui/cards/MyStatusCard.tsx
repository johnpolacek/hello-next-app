import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import EmojiPicker from "emoji-picker-react";

const MyStatusCard = () => {
  const { user, getAuthToken } = useAuth();
  const [status, setStatus] = useState("");
  const [openPicker, setOpenPicker] = useState(false);

  const fetchUserStatus = useCallback(async () => {
    if (user && getAuthToken) {
      try {
        const response = await fetch(`/api/status/read`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getAuthToken()}`,
          },
        });
        const data = await response.json();
        setStatus(data.status);
      } catch (error) {
        console.error("Failed to fetch user status:", error);
      }
    }
  }, [user, getAuthToken]);

  useEffect(() => {
    fetchUserStatus();
  }, [fetchUserStatus]);

  const onEmojiSelect = async (emoji: string) => {
    setStatus(emoji);
    setOpenPicker(false);
    try {
      const response = await fetch("/api/status/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getAuthToken()}`,
        },
        body: JSON.stringify({ status: emoji }),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  console.log({ status });
  console.log("status !== '' " + status !== "");

  return (
    <div className="bg-white shadow-md rounded-lg pt-8 px-8 pb-12 w-full max-w-sm text-center">
      <h2 className="text-xl mb-4">Your Current Status</h2>
      {openPicker ? (
        <>
          <EmojiPicker
            onEmojiClick={(selection) => {
              onEmojiSelect(selection.emoji);
            }}
          />
        </>
      ) : (
        <>
          <div className="border text-9xl py-16 mb-4">
            <span>{status !== "" ? status : "😀"}</span>
          </div>
          <button
            onClick={() => {
              setOpenPicker(true);
            }}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-xl"
          >
            Change
          </button>
        </>
      )}
    </div>
  );
};

export default MyStatusCard;
