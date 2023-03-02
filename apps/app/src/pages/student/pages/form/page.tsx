import { Outlet } from "react-router-dom";

const StudentFormPage = () => {
  return (
    <div>
      <div>StudentFormPage</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default StudentFormPage;
