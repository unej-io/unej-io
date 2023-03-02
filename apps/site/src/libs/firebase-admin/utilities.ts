import type { DecodedIdToken } from "firebase-admin/auth";

import type { CustomParsedToken } from "@unej-io/types/firebase";

import { auth } from "./const";

type CustomDecodedIdToken = DecodedIdToken & CustomParsedToken;

const authVerifyIdToken = async (token: string) => (await auth.verifyIdToken(token)) as CustomDecodedIdToken;
const authSetAuthTokenClaims = async (uid: string, custom: CustomParsedToken) => {
  await auth.setCustomUserClaims(uid, custom);
  return true;
};

export type { CustomDecodedIdToken };
export { authVerifyIdToken, authSetAuthTokenClaims };
