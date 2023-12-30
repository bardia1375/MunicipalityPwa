// Routes
import { Navigate } from "react-router-dom";
import EmployeesRoutes from "routes/Home/Employees/routes";

// Components
import Home from "routes/Home/Home";

const routes = [
  {
    name: "home",
    path: "/",
    element: <Home />,

    children: [{ ...EmployeesRoutes }],
  },

  {
    path: "*",
    element: <Navigate to="/" />,
  },
];

export default routes;
