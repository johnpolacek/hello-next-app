import React, { useState, useEffect } from "react";
import { Status } from "@/lib/firebase/admin/status";

interface StatusCardProps {
  status: Status;
}

const StatusCard: React.FC<StatusCardProps> = ({ status }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-center mb-4">
      <p className="text-7xl text-gray-500 border p-8 mb-1">{status.status}</p>
      <p className="text-lg py-1 font-bold">{status.displayName}</p>
      <p className="text-sm text-gray-500">
        {new Date(status.timestamp).toLocaleString()}
      </p>
    </div>
  );
};

const StatusesList: React.FC = () => {
  const [statuses, setStatuses] = useState<Status[]>([]);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await fetch("/api/status/read/all");
        const data = await response.json();
        setStatuses(data.statuses);
      } catch (error) {
        console.error("Failed to fetch statuses:", error);
      }
    };

    fetchStatuses();
  }, []);

  return (
    <div className="text-center">
      <h3 className="py-8 text-2xl font-bold">Recent Statuses</h3>
      <div className="flex flex-wrap justify-center gap-4 w-[100vw]">
        {statuses?.map((status) => (
          <StatusCard key={status.timestamp} status={status} />
        )) || (
          <div className="text-xl italic text-gray-400 py-8">
            No Statuses yet...
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusesList;
