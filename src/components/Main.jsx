import { useState } from "react";
import NavProjects from "./NavProjects";
import Details from "./Project/Details";
import Projects from "./Projets";
import Menu from "./Menu"

export default function Main() {
  const [project, setProject] = useState(null);

  return (
    <>
      <main id="home">
        <NavProjects project={project} setProject={setProject} />
        {project && typeof project === 'object' && <Details project={project} />}

        {project && project === "all" && <Projects />}

        {!project && <Menu />}
      </main>
    </>
  );
}