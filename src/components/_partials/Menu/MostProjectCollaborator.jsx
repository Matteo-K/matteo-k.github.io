import { useData } from '../../../hooks/useData';
import { Project } from '../../../models';

export default function MostProjectCollaborator(props) {
  const { isLoading, error, getAllCollaborators } = useData();

  const collaborators = !isLoading && !error 
    ? getAllCollaborators().map(collaborator => ({
        collaborator,
        projectCount: collaborator.projects.count(),
      }))
      .sort((a, b) => b.projectCount - a.projectCount)
      .slice(0, 3) 
    : [];

  return (
    <section className={props.className + " block mostprojectcollaborator"}>
      <div className="title">
        <h2>{ props.children ? props.children : "Les contributeurs majeurs"}</h2>
      </div>
      <div className='content'>
        {isLoading && <p>Chargement...</p>}
        {error && <p className="error">{error}</p>}
        {!isLoading && !error && (
          <>
            {collaborators.length > 0 ? (
              collaborators.map((collab, index) => (
                <figure key={index}>
                  <img src={
                    collab.collaborator.name === null 
                      ? "/image/avatar/1.png" 
                      : collab.collaborator.profileName === null ? "/image/avatar/1.png" : "/image/uploads/images/collaborator/profile/" + collab.collaborator.profileName
                    } 
                    alt={collab.collaborator.name + " " + collab.collaborator.surname} 
                    title={collab.collaborator.name + " " + collab.collaborator.surname}
                  />
                  {console.log(collab)}
                  <figcaption>
                    <h4>{collab.collaborator.name}</h4>
                    <div>Nombre de projets : {collab.projectCount}</div>
                  </figcaption>
                </figure>
              ))
            ) : (
              <p>Aucun collaborateur trouvé</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}