import { Outlet } from "react-router-dom";

const UnknownIndexPage = () => {
  return (
    <div>
      <div>UnknownIndexPage</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default UnknownIndexPage;
