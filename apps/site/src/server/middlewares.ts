import type { NextApiRequest, NextApiResponse } from "next";

import CORS from "cors";

import type { DecodedIdToken } from "firebase-admin/auth";

import type { CustomParsedToken } from "@unej-io/types/firebase";

import { authVerifyIdToken } from "~/libs/firebase-admin/utilities";

import { APIError } from "./api";

async function cors<T>(
  req: NextApiRequest,
  res: NextApiResponse<T>,
  options?: CORS.CorsOptions | CORS.CorsOptionsDelegate<CORS.CorsRequest>
) {
  try {
    await new Promise<unknown>((resolve, reject) => {
      CORS(options)(req, res, (result: Error | unknown) => (result instanceof Error ? reject(result) : resolve(result)));
    });
  } catch (error) {
    throw new APIError({ status: 401, message: "CORS" });
  }
}

type ExtendedDecodedIdToken = DecodedIdToken & CustomParsedToken;

async function requireAuth<T>(
  req: NextApiRequest,
  _res: NextApiResponse<T>,
  callback?: (claims: ExtendedDecodedIdToken) => APIError | any
) {
  const [, token] = (req.headers.authorization ?? "").split(" ") as any[];

  if (typeof token !== "string") throw new APIError({ status: 400, message: "Missing auth token" });

  try {
    const claims = await authVerifyIdToken(token);

    if (typeof callback === "function") {
      const result = callback(claims);
      if (result instanceof APIError) throw result;
    }

    return claims;
  } catch (error) {
    throw error instanceof APIError ? error : new APIError({ status: 401, message: "Unauthorized" });
  }
}

export { cors, requireAuth };
