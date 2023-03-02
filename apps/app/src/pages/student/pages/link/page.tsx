import { Outlet } from "react-router-dom";

const StudentLinkPage = () => {
  return (
    <div>
      <div>StudentLinkPage</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default StudentLinkPage;
