import { Outlet } from "react-router-dom";

const OrganizationIndexPage = () => {
  return (
    <div>
      <div>OrganizationIndexPage</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default OrganizationIndexPage;
