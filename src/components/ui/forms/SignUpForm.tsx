import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import Input from "../controls/Input";

const SignUpForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { signUp, signInWithGoogle } = useAuth();

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

  const handleGoogleSignUp = async () => {
    setIsSubmitting(true);
    try {
      await signInWithGoogle();
      window.location.href = "/";
    } catch (error: any) {
      setError(error.message);
      setIsSubmitting(false);
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
      <div className="w-full text-center mt-12 mb-4 border-t py-4">
        <div className="tracking-widest uppercase text-sm pt-8 pb-4">OR</div>
        <button
          disabled={isSubmitting}
          onClick={(e) => {
            e.preventDefault();
            handleGoogleSignUp();
          }}
          className={`font-sans ${
            isSubmitting
              ? "opacity-50 border-2 border-gray-600"
              : "border-2 border-indigo-600"
          } text-indigo-600 bg-indigo-50 rounded-xl py-4 px-12 text-xl w-full`}
        >
          Sign Up with Google
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
