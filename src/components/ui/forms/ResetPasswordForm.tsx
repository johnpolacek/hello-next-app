import { useEffect } from "react";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { UserCredential } from "firebase/auth";
import Input from "../controls/Input";
import Link from "next/link";

const ResetPasswordForm = () => {
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [emailMissing, setEmailMissing] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [isValidLink, setIsValidLink] = useState<boolean>(false);
  const { isSignInWithLink, signInWithLink, setNewPassword, auth } = useAuth();

  useEffect(() => {
    if (isSignInWithLink) {
      isSignInWithLink(window.location.href).then((linkCheck: boolean) => {
        setIsValidLink(linkCheck);
      });
    }
  }, [isSignInWithLink]);

  useEffect(() => {
    if (isValidLink && signInWithLink) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      const emailForSignIn = window.localStorage.getItem("emailForSignIn");
      if (emailForSignIn) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        // email = window.prompt('Please provide your email for confirmation');
        // The client SDK will parse the code from the link for you.
        signInWithLink(emailForSignIn, window.location.href)
          .then((result: UserCredential) => {
            setEmail(emailForSignIn);
            // Clear email from storage.
            window.localStorage.removeItem("emailForSignIn");
            // You can access the new user via result.user
            // Additional user info profile not available via:
            // result.additionalUserInfo.profile == null
            // You can check if the user is new or existing:
            // result.additionalUserInfo.isNewUser
            // router.push("/")
          })
          .catch((error: any) => {
            // Some error occurred, you can inspect the code: error.code
            // Common errors could be invalid email and invalid or expired OTPs.
          });
      } else {
        setEmailMissing(true);
      }
    }
  }, [isValidLink, signInWithLink]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await setNewPassword(password);
      setSuccess(true);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <>
      {success ? (
        <div className="flex flex-col gap-8 text-black bg-white rounded-xl max-w-lg p-16 text-2xl text-center">
          <span className="font-bold">Password was set successfully!</span>
          <Link
            className="bg-indigo-600 text-white rounded-xl py-3 px-8 text-xl"
            href="/"
          >
            Go Home
          </Link>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="text-black bg-white rounded-xl max-w-lg px-16 py-12"
        >
          <h2 className="font-bold text-4xl pb-6">Set New Password</h2>
          {emailMissing && (
            <div className="grid gap-4">
              <label htmlFor="email" className="pt-2 text-center">
                Email
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
          )}
          <div className="grid gap-4">
            <label htmlFor="password" className="pt-2 text-center sr-only">
              New Password
            </label>
            <Input
              className="text-center"
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

export default ResetPasswordForm;
