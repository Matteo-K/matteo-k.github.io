import { Page } from "../components/_partials";
import { useData } from '../hooks/useData';
import { DataStatut } from '../enums/DataStatut';
import { Trophies as ComposantTrophies} from '../components/_partials/Menu'

export default function Trophies() {
  const { isLoading, error, getProjects } = useData();

  if (isLoading) return <div>🔄 Chargement...</div>;
  if (error) return <div>❌ Erreur: {error}</div>;
  const projects = !isLoading && !error ? getProjects({
    where: { statut: DataStatut.ACTIF },
    order: { priority: 1}
  }) : [];

  return (
    <Page>
      <header>
        <h1>Trophées</h1>
        <ComposantTrophies type="summary"></ComposantTrophies>
      </header>
      {projects.map((project) => (
        <ComposantTrophies type="projects" project={project}></ComposantTrophies>
      ))}
    </Page>
  );
}