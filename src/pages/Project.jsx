import { useParams } from "react-router-dom";
import { useData } from "../hooks/useData";
import { DataStatut } from "../enums/DataStatut";
import Details from "../components/Project/Details";

export default function Project() {
  const { title } = useParams();
  const { isLoading, error, getProjects } = useData();

  if (isLoading) return <div>🔄 Chargement...</div>;
  if (error) return <div>❌ Erreur: {error}</div>;

  console.log(title);
  const project = getProjects({
    where: { title: title, statut: DataStatut.ACTIF },
  })[0];

  if (!project) return <div>Projet introuvable</div>;

  return (
    <>
      <div>
        {project.title}
      </div>
      <Details project={project} />
    </>
  );
}