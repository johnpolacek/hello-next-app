import React, { useState } from "react";
import Input from "../controls/Input";
import { UserType } from "../../../context/AuthContext";

const AccountForm = ({ user }: { user: UserType }) => {
  const DEFAULT_PASSWORD = "**********";
  const [displayName, setDisplayName] = useState<string>(
    user.displayName || ""
  );
  const [email, setEmail] = useState<string>(user.email || "");
  const [password, setPassword] = useState<string>(DEFAULT_PASSWORD);
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsUpdated(false);
    try {
      const options: { displayName: string; email: string; password?: string } =
        { displayName, email };
      if (password !== DEFAULT_PASSWORD) {
        options.password = password;
      }
      const response = await fetch("/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: user.uid,
          options,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsUpdated(true);
      } else {
        setError(result.message);
      }
      setIsSubmitting(false);
    } catch (error) {
      setError("Sorry there was a problem.");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <h2 className="font-bold text-2xl sm:text-4xl text-center">
        Manage Account
      </h2>
      <p
        className={`text-center pt-4 pb-16 text-green-600 ${
          isUpdated ? "" : "opacity-0"
        }`}
      >
        ✓ Account Updated
      </p>
      <div
        className="text-sm sm:text-lg sm:grid gap-x-2 gap-y-6 w-[480px]"
        style={{ gridTemplateColumns: "1fr 2fr" }}
      >
        <label
          htmlFor="name"
          className="pt-2 px-2 pb-1 text-base w-full block text-left sm:text-right"
        >
          Display Name
        </label>
        <Input
          value={displayName}
          onChange={(e) => {
            setDisplayName(e.target.value);
          }}
          name="name"
          type="text"
          required={true}
        />
        <label
          htmlFor="email"
          className="pt-2 px-2 pb-1 text-base w-full block text-left sm:text-right"
        >
          Email
        </label>
        <Input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          name="email"
          type="email"
          required={true}
        />
        <label
          htmlFor="password"
          className="pt-2 px-2 pb-1 text-base w-full block text-left sm:text-right"
        >
          Password
        </label>
        <Input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          name="password"
          type="password"
          required={true}
        />
      </div>
      <div
        className={`py-2 text-sm sm:text-base text-red-600 text-center ${
          error ? "opacity-100" : "opacity-0"
        }`}
      >
        {error && error.replace("Firebase: ", "")}
      </div>
      <div className="flex justify-end mb-2">
        <button
          disabled={isSubmitting}
          type="submit"
          className={`font-sans ${
            isSubmitting ? "bg-gray-600 opacity-20" : "bg-indigo-600"
          } w-full sm:w-auto text-white rounded-xl py-3 px-8 text-xl`}
        >
          Update Account
        </button>
      </div>
    </form>
  );
};

export default AccountForm;
