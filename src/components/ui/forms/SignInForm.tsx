import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/router";
import Input from "../controls/Input";

const SignInForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSubmitting) {
      setIsSubmitting(true);
      try {
        await signIn(email, password);
        router.push("/");
      } catch (error: any) {
        setError(error.message);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-black bg-white px-12 py-9 shadow-lg rounded-xl max-w-lg mx-auto"
    >
      <h2 className="font-bold text-2xl sm:text-4xl pb-12 text-center">
        Sign In
      </h2>
      <div
        className="flex flex-col sm:grid sm:gap-4"
        style={{ gridTemplateColumns: "1fr 3fr" }}
      >
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
        className={`py-2 text-red-600 ${error ? "opacity-100" : "opacity-0"}`}
      >
        {error ? error : "no error"}
      </div>
      <div className="flex justify-end mb-2">
        <button
          disabled={isSubmitting}
          type="submit"
          className={`${
            isSubmitting ? "bg-gray-500 opacity-20" : "bg-indigo-600"
          } text-white rounded-xl py-3 px-8 text-xl`}
        >
          Sign In
        </button>
      </div>
    </form>
  );
};

export default SignInForm;
