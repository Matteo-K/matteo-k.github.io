import { useData } from '../hooks/useData';
import { DataStatut } from '../enums/DataStatut';
import { NavLink } from "react-router-dom";

export default function NavProjects(props) {
  const { isLoading, error, getProjects } = useData();
    
  if (isLoading) return <div>🔄 Chargement...</div>;
  if (error) return <div>❌ Erreur: {error}</div>;
  const projects = getProjects({
    where: { statut: DataStatut.ACTIF },
    order: { priority: 1}
  });

  const handleClick = (project) => {
    props.setProject(project);
  };
  return (
    <nav>
      {projects.map((project) => (
        <div
          key={project.id}
          className={props.project && props.project.id === project.id ? "actif" : ""}
          onClick={() => handleClick(project)}
        >
          <div>
            <img src={"/image/uploads/images/project/card/" + project.illustrationCardName} alt={project.title} title={project.title}/>
          </div>
        </div>
      ))}
      <NavLink
        to="/projects"
      >
        CARD PROJECTS
      </NavLink>

    </nav>
  );
}