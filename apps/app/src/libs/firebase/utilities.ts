import { FirebaseError } from "firebase/app";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  verifyPasswordResetCode,
  confirmPasswordReset,
  sendEmailVerification,
  applyActionCode,
  checkActionCode,
} from "firebase/auth";
import type { User } from "firebase/auth";

import { auth } from "./const";

const authSignIn = async (email: string, password: string) => await signInWithEmailAndPassword(auth, email, password);
const authSignUp = async (email: string, password: string) => await createUserWithEmailAndPassword(auth, email, password);
const authSignOut = async () => await signOut(auth);

const authSendPasswordResetEmail = async (email: string) => await sendPasswordResetEmail(auth, email);
const authVerifyPasswordResetCode = async (code: string) => await verifyPasswordResetCode(auth, code);
const authConfirmPasswordReset = async (code: string, newPassword: string) => await confirmPasswordReset(auth, code, newPassword);
const authSendEmailVerification = async (user: User) => await sendEmailVerification(user);
const authApplyActionCode = async (code: string) => await applyActionCode(auth, code);
const authCheckActionCode = async (code: string) => await checkActionCode(auth, code);

function getFirebaseErrorMessage(error: unknown, defaultMessage: string = "Something went wrong") {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/email-already-in-use":
        return { code: "auth/email-already-in-use", message: "Email already in use" } as const;

      case "auth/invalid-action-code":
        return { code: "auth/invalid-action-code", message: "Invalid action code" } as const;

      case "auth/network-request-failed":
        return { code: "auth/network-request-failed", message: "Network request failed" } as const;

      case "auth/too-many-requests":
        return { code: "auth/too-many-requests", message: "Too many requests" } as const;

      case "auth/user-not-found":
        return { code: "auth/user-not-found", message: "User not found" } as const;

      case "auth/wrong-password":
        return { code: "auth/wrong-password", message: "Wrong password" } as const;

      default:
        console.log({ fn: "getFirebaseErrorMessage", code: error.code, detail: "auth/unknown" });
        return { code: "auth/unknown", message: "Unknown" } as const;
    }
  }

  if (error instanceof Error) return { code: "error", message: error.message } as const;

  return { code: "unknown", message: defaultMessage } as const;
}

export {
  authSignIn,
  authSignUp,
  authSignOut,
  authSendPasswordResetEmail,
  authVerifyPasswordResetCode,
  authConfirmPasswordReset,
  authSendEmailVerification,
  authApplyActionCode,
  authCheckActionCode,
};
export { getFirebaseErrorMessage };
