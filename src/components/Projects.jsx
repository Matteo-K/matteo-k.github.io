import { useData } from '../hooks/useData';

export default function Projects() {
  const { isLoading, error, getAllProjects } = useData();
    
  if (isLoading) return <div>🔄 Chargement...</div>;
  if (error) return <div>❌ Erreur: {error}</div>;
  const projects = getAllProjects();

  return (
    <>
      <nav>
        <div>
            <h2>Projets ({projects.length})</h2>
            {projects.map(project => (
              <div className="text-white px-4 sm:px-8 py-2 sm:py-3 bg-sky-700 hover:bg-sky-800">
                {project.title}
              </div>
            ))}
        </div>
      </nav>
    </>
  );
}