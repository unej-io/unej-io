import { Outlet } from "react-router-dom";

const UnknownSettingsPage = () => {
  return (
    <div>
      <div>UnknownSettingsPage</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default UnknownSettingsPage;
