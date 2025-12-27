import { useData } from '../../../hooks/useData';

export default function Collaborator() {
  const { isLoading, error, getCollaborators } = useData();
  
  const collaborator = !isLoading && !error ? getCollaborators({ limit: 4 }) : [];
  return (
    <section className="block collaborateur">
      <div className="title">
        <h2>Collaborateurs</h2>
      </div>
      <div className='content'>
        {isLoading && <p>Chargement...</p>}
        {error && <p className="error">{error}</p>}
        {!isLoading && !error && (
          <>
            {collaborator.length > 0 ? (
              collaborator.map((collab, index) => (
                <figure key={index}>
                  <img src={collab.profileName === null 
                      ? "/image/avatar/1.png" 
                      : "/image/uploads/images/collaborator/profile/" + collab.profileName
                    }
                    alt={collab.surname + " " + collab.name} 
                    title={collab.surname + " " + collab.name}
                  />
                  <figcaption>{collab.name}</figcaption>
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