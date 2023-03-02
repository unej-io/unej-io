import { Outlet } from "react-router-dom";

const AuthActionPage = () => {
  return (
    <div>
      <div>AuthActionPage</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthActionPage;
