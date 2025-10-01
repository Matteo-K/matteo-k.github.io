import { useLocation, NavLink } from "react-router-dom";
import { DataStatut } from '../enums/DataStatut';
import { useData } from '../hooks/useData';

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

export default function Projects() {
  const query = useQuery();
  const id = query.get("id");
  const name = query.get("name");

  const { isLoading, error, getProjects } = useData();
  if (isLoading) return <div>🔄 Chargement...</div>;
  if (error) return <div>❌ Erreur: {error}</div>;

  const projects = getProjects({
    where: { statut: DataStatut.ACTIF },
    order: { priority: 1}
  });


  return (
    <>
      <div>
        Id : {id}
      </div>
      <div>
        Name : {name}
      </div>
      {projects.map((project) => (
        <NavLink
            to={"/project/" + project.title}
          >
            {project.title}
          </NavLink>
      ))}
    </>
  );
}