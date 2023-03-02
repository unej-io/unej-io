import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

const IndexPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/sign-in");
  }, []);

  return null;
};

export default IndexPage;
