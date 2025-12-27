import { createHashRouter, RouterProvider } from "react-router-dom";
import { Home, AboutMePresentation, AboutMeCollaborator, AboutMeProject, Contact, Project, Trophies, ProjectTrophy, Login, Logout } from "./pages";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/aboutme/presentation",
    element: <AboutMePresentation />,
  },
  {
    path: "/aboutme/collaborators",
    element: <AboutMeCollaborator />,
  },
  {
    path: "/aboutme/projects",
    element: <AboutMeProject />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/project/:title",
    element: <Project />,
  },
  {
    path: "/trophies",
    element: <Trophies />,
  },
  {
    path: "/project/trophy/:title",
    element: <ProjectTrophy />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;