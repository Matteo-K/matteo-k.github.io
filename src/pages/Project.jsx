import { useParams } from "react-router-dom";
import { useData } from "../hooks/useData";
import { DataStatut } from "../enums/DataStatut";
import { Page } from "../components/_partials";
import NotFound from "../components/NotFound";
import Details from "../components/Project/Details";

export default function Project() {
  const { title } = useParams();
  const { isLoading, error, getProjects } = useData();

  if (isLoading) return <div>🔄 Chargement...</div>;
  if (error) return <div>❌ Erreur: {error}</div>;

  const project = getProjects({
    where: { title: title, statut: DataStatut.ACTIF },
  })[0];

  if (!project) return <NotFound></NotFound>;

  return (
    <Page>
      <div id="project-info">
        <header>
          <figure>
            <img src={"/image/uploads/images/project/card/" + project.illustrationCardName}
              alt={project.title}
              title={project.title}
            />
            <figcaption>{project.title}</figcaption>
          </figure>
        </header>
        <Details project={project}></Details>
      </div>
    </Page>
  );
}