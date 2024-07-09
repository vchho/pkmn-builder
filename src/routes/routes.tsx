import Home from "../pages/Home";
import MainContainer from "../pages/MainContainer";
import Analytics from "../pages/Analytics";
import TeamsContainer from "../pages/TeamsContainer";
import TeamCreate from "../pages/TeamCreate";
import { createBrowserRouter } from "react-router-dom";
import Exporter from "../pages/Exporter";

export const router = createBrowserRouter([
  {
    element: <MainContainer />,
    children: [
      {
        element: <TeamsContainer />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          { path: "/create/:id", element: <TeamCreate /> },
        ],
      },
      {
        path: "/analytics",
        element: <Analytics />,
      },
      {
        path: "/exporter",
        element: <Exporter />,
      },
    ],
  },
]);
