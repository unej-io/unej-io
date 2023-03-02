import {} from "react";
import type { PropsWithChildren } from "react";

type AuthProviderProps = PropsWithChildren<{}>;

function AuthProvider(props: AuthProviderProps) {
  return <>{props.children}</>;
}

export type { AuthProviderProps };
export default AuthProvider;
