import { useData } from '../../../hooks/useData';
import { DataStatut } from '../../../enums/DataStatut';

export default function RecentProject(props) {
  const { isLoading, error, getProjects } = useData();

  const projects = !isLoading && !error ? getProjects({
    where: { statut: DataStatut.ACTIF },
    order: { priority: 1 },
    limit: 3
  }) : [];

  return (
    <section className={props.className + " block recentproject"}>
      <div className="title">
        <h2>{ props.children ? props.children : "Les projets les plus récents"}</h2>
      </div>
      <div className='content'>
        {isLoading && <p>Chargement...</p>}
        {error && <p className="error">{error}</p>}
        {!isLoading && !error && (
          <>
            {projects.length > 0 ? (
              projects.sort((p1, p2) => p1.date < p2.date).map((project, index) => (
                <figure key={index}>
                  <img src={"/image/uploads/images/project/card/" + project.illustrationCardName} 
                    alt={project.title} 
                    title={project.title}
                  />
                  <figcaption>
                    <h4>{project.title}</h4>
                    <div>
                      {new Date(project.date).toLocaleDateString("fr-FR", {
                        month: "long", 
                        year: "numeric"
                      })}
                    </div>
                  </figcaption>
                </figure>
              ))
            ) : (
              <p>Aucun projet trouvé</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}