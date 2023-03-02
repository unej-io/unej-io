import { create } from "zustand";

import type { User } from "firebase/auth";

import type { UserDocument, AuthUser, ExtendedIdTokenResult } from "@unej-io/types/firebase";

import { withDevtools } from "./@utilities";

const NAME = "unej-io:auth-store";

type AuthStoreState = {
  user: AuthUser | null;
  detail: UserDocument | null;
  tokenResult: ExtendedIdTokenResult | null;
  signedIn: boolean;
};
type AuthStoreAction = {
  setUser: (user: AuthUser | null) => void;
  setDetail: (detail: UserDocument | null) => void;
  setTokenResult: (tokenResult: any | null) => void;
};
type AuthStoreType = AuthStoreState & AuthStoreAction;
const useAuthStore = create<AuthStoreType>()(
  withDevtools(
    (set) => ({
      user: null,
      detail: null,
      tokenResult: null,
      signedIn: false,
      setUser: (user) => {
        set({ user, signedIn: Boolean(user) }, false, { type: "set-user" });
      },
      setDetail: (detail) => {
        set({ detail }, false, { type: "set-detail" });
      },
      setTokenResult: (tokenResult) => {
        set({ tokenResult }, false, { type: "set-token-result" });
      },
    }),
    { name: NAME }
  )
);

function getAuthUserFromFirebaseUser(user: User): AuthUser {
  const { uid, email, emailVerified, displayName, photoURL } = user;
  return { uid, email, emailVerified, displayName, photoURL };
}

const userSelector = ({ user, setUser, signedIn }: AuthStoreType) => ({ user, setUser, signedIn });
const detailSelector = ({ detail, setDetail, signedIn }: AuthStoreType) => ({ detail, setDetail, signedIn });
const tokenResultSelector = ({ tokenResult, setTokenResult, signedIn }: AuthStoreType) => ({ tokenResult, setTokenResult, signedIn });

export type { AuthStoreState, AuthStoreAction, AuthStoreType };
export { getAuthUserFromFirebaseUser };
export { userSelector, detailSelector, tokenResultSelector };
export default useAuthStore;
