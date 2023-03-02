import { Route } from "next-yesterday";

import { UserCollection } from "~/libs/firebase-admin/collections";
import { authSetAuthTokenClaims } from "~/libs/firebase-admin/utilities";

import { APIError, response } from "~/server/api";
import type { ResponseData, ResponseMessage } from "~/server/api";
import { cors, requireAuth } from "~/server/middlewares";

const route = new Route(async (req, res) => {
  await cors(req, res);
});

/**
 * POST /api/users/verify
 */
route.post<
  {
    Query: {
      as: "student" | "organization";
    };
    Body: {
      username: string;
      password: string;
    };
  },
  {
    Body: ResponseData<200, {}> | ResponseMessage<number & {}>;
  }
>(async (req, res) => {
  try {
    const claims = await requireAuth(req, res, ({ role }) => {
      if (role === "student" || role === "organization") return new APIError({ status: 400, message: "Already verified" });
    });

    const { uid } = claims,
      { as } = req.query,
      { username, password } = req.body;

    if (as !== "student" && as !== "organization") {
      return response.badRequest(res, { status: 400, message: "'As' query don't match rules" });
    }

    if (typeof username !== "string") {
      return response.badRequest(res, { status: 400, message: "Require username field" });
    }
    if (typeof password !== "string") {
      return response.badRequest(res, { status: 400, message: "Require password field" });
    }

    if (as === "student") {
      const found: boolean = true; /** Verify As Student */

      if (
        found &&
        (await UserCollection.setDoc({ id: uid, role: "student" })) &&
        (await authSetAuthTokenClaims(uid, { role: "student" }))
      ) {
        return response.ok(res, { status: 200, message: "Verified as student" });
      } else {
        return response.notFound(res, { status: 404, message: "Student not found" });
      }
    }

    if (as === "organization") {
      const found: boolean = true; /** Verify As Organization */

      if (
        found &&
        (await UserCollection.setDoc({ id: uid, role: "organization" })) &&
        (await authSetAuthTokenClaims(uid, { role: "organization" }))
      ) {
        return response.ok(res, { status: 200, message: "Verified as organization" });
      } else {
        return response.notFound(res, { status: 404, message: "Organization not found" });
      }
    }
  } catch (error) {
    console.error(error);

    if (error instanceof APIError) return response.$fromAPIError(res, error);
    else return response.internalServerError(res, { status: 500, message: "Internal Server Error" });
  }
});

export default route.handler();
