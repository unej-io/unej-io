import { useContext } from "react";
import type { Context } from "react";

import { useStore } from "zustand";
import type { StoreApi } from "zustand";
import { devtools } from "zustand/middleware";

const createBoundedUseContextStore = <S>(context: Context<StoreApi<S>>) =>
  ((selector?: any, equals?: any) => useStore(useContext(context), selector!, equals)) as unknown as {
    (): S;
    <T>(selector: (state: S) => T, equals?: ((a: T, b: T) => boolean) | undefined): T;
  };

const withDevtools = (process.env.NODE_ENV === "production" ? (fn: any) => fn : devtools) as unknown as typeof devtools;

export { createBoundedUseContextStore, withDevtools };
