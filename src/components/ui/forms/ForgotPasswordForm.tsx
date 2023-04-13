import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Input from "../controls/Input";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isRequested, setIsRequested] = useState<boolean>(false);
  const { requestPasswordReset } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isRequested) {
      setIsRequested(true);
      try {
        const result = await requestPasswordReset(email);
        localStorage.setItem("emailForSignIn", email);
        setIsRequested(true);
      } catch (error: any) {
        setError(error.message);
      }
    }
  };

  return (
    <>
      {isRequested ? (
        <div className="relative z-10 mt-64 text-black bg-white rounded-xl max-w-lg px-16 py-12 text-center">
          <h2 className="font-bold text-3xl sm:text-4xl pb-6">
            Check Your Email
          </h2>
          <p className="text-lg text-gray-600 px-4">
            Password reset instructions have been sent to your inbox.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="relative z-10 mt-64 text-black bg-white rounded-xl max-w-lg px-16 py-12"
        >
          <h2 className="font-bold text-3xl sm:text-4xl pb-6">
            Forgot Password
          </h2>
          <div className="grid gap-4">
            <label htmlFor="email" className="pt-2 text-center">
              Enter Your Email
            </label>
            <Input
              className="text-center"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              name="email"
              type="email"
              required={true}
            />
          </div>
          <div
            className={`py-2 text-red-600 ${
              error ? "opacity-100" : "opacity-0"
            }`}
          >
            {error ? error : "no error"}
          </div>
          <div className="flex justify-center mb-2">
            <button
              type="submit"
              className="font-sans bg-indigo-600 text-white rounded-xl py-3 px-8 text-xl"
            >
              Reset Password
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default ForgotPasswordForm;
