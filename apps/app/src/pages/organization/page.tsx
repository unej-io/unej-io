import { Outlet } from "react-router-dom";

const OrganizationPage = () => {
  return (
    <div>
      <div>OrganizationPage</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default OrganizationPage;
