import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/router";
import Input from "../controls/Input";

const SignUpForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSubmitting) {
      setIsSubmitting(true);
      try {
        await signUp(email, password, name);
        window.location.href = "/";
      } catch (error: any) {
        setError(error.message);
        setIsSubmitting(false);
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="text-black bg-white px-16 py-12 shadow-lg rounded-xl max-w-lg mx-auto"
    >
      <h2 className="font-bold text-2xl sm:text-4xl pb-12 text-center">
        Create Account
      </h2>
      <div
        className="text-sm sm:text-lg sm:grid gap-x-2 gap-y-6"
        style={{ gridTemplateColumns: "1fr 2fr" }}
      >
        <label
          htmlFor="name"
          className="pt-2 px-2 pb-1 text-base w-full block text-left sm:text-right"
        >
          Display Name
        </label>
        <Input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
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
        className={`py-2 text-sm sm:text-base text-red-600 ${
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
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
