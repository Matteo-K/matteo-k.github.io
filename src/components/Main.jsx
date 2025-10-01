import { useState, useEffect } from "react";
import { useData } from '../hooks/useData';
import { DataStatut } from '../enums/DataStatut';
import NavProjects from "./NavProjects";
import Details from "./Project/Details";

export default function Main() {
  const { isLoading, getProjects } = useData();
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (!isLoading) {
      const loadedProjects = getProjects({
          where: { statut: DataStatut.ACTIF },
          order: { priority: 1},
          limit: 1
        });
      if (loadedProjects.length > 0) {
        setProject(loadedProjects[0]);
      }
    }
  }, [isLoading, getProjects]);

  return (
    <>
      <main>
        {project && <NavProjects project={project} setProject={setProject} />}
        {project && <Details project={project} />}
      </main>
    </>
  );
}