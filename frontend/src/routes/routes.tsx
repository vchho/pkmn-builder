
import Home from "../pages/Home";
import Team from "../pages/Team";
import Analytics from "../pages/Analytics";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Team />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/analytics',
        element: <Analytics />
      }
    ]
  },
  
])
