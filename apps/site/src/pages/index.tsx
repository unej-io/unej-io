import { useRouter } from "next/router";
import { useEffect } from "react";

export default () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/sign-in");
  }, []);

  return null;
};
