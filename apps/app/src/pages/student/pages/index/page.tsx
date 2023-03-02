import { Outlet } from "react-router-dom";

const StudentIndexPage = () => {
  return (
    <div>
      <div>StudentIndexPage</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default StudentIndexPage;
