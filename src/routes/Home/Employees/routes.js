// Components
import { Employees } from "./Employees";
import { List } from "./List";
import { DeletedList } from "./DeletedList";
import { NewEmployee } from "./NewEmployee";
import { Edit } from "./Edit";
import { Employee, DeletedEmployee } from "./Detail";
import { SendMessage } from "./SendMessage";

const routes = {
  path: "/",
  element: <Employees />,
  parent: "home",
  children: [
    {
      name: "list",
      path: "/",
      element: <List />,
    },

    {
      name: "employee-detail",
      path: "/employees/list/:id",
      element: <Employee />,
    },
    {
      name: "deleted-list",
      path: "/employees/deleted-list",
      element: <DeletedList />,
    },
    {
      name: "deleted-employee-detail",
      path: "/employees/deleted-list/:id",
      element: <DeletedEmployee />,
    },
    {
      name: "new-employee",
      path: "/employees/new-employee",
      element: <NewEmployee />,
    },
    {
      name: "edit-employee",
      path: "/employees/edit-employee/:id",
      element: <Edit />,
    },
    {
      name: "send-message",
      path: "/employees/send-message",
      element: <SendMessage />,
    },
  ],
};

export default routes;
