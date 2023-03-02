import { Outlet } from "react-router-dom";

const StudentSettingsPage = () => {
  return (
    <div>
      <div>StudentSettingsPage</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default StudentSettingsPage;
