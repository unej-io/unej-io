import { Outlet } from "react-router-dom";

const StudentPage = () => {
  return (
    <div>
      <div>StudentPage</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default StudentPage;
