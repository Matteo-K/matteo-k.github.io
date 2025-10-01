import { createHashRouter, RouterProvider } from "react-router-dom";
import { Home, About, Contact, Projects, Project, Trophies, ProjectTrophy } from "./pages";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "/project/:title",
    element: <Project />,
  },
  {
    path: "trophies",
    element: <Trophies />,
  },
  {
    path: "/project/trophy/:title",
    element: <ProjectTrophy />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
