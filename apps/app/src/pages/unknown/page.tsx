import { Outlet } from "react-router-dom";

const UnknownPage = () => {
  return (
    <div>
      <div>UnknownPage</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default UnknownPage;
