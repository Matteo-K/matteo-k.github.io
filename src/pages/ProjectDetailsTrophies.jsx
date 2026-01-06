import { Page } from "../components/_partials";
import { useParams } from "react-router-dom";
import { useData } from "../hooks/useData";
import { DataStatut } from "../enums/DataStatut";
import HeadTrophyPage from "../components/_partials/HeadTrophyPage";
import NotFound from "../components/NotFound";
import ListTrophyRoad from "../components/Project/ListTrophyRoad";

export default function ProjectDetailsTrophies () {
  const { title, trophyRoadId } = useParams();
  const { isLoading, error, getProjects } = useData();

  if (isLoading) return <div>🔄 Chargement...</div>;
  if (error) return <div>❌ Erreur: {error}</div>;

  const project = getProjects({
    where: { title: title, statut: DataStatut.ACTIF },
  })[0];

  if (!project) return <NotFound></NotFound>;

  const road = project.trophyRoads.find((road) => road.id.toString() === trophyRoadId.toString());
  if (!road) return <NotFound></NotFound>;
  console.log(road);
  return (
    <Page>
      <HeadTrophyPage project={project}></HeadTrophyPage>
      <main>
        <ListTrophyRoad road={road}>
        </ListTrophyRoad>
      </main>
    </Page>
  );
}