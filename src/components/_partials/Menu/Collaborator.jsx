import { useData } from '../../../hooks/useData';
import { NavLink } from "react-router-dom";

export default function Collaborator() {
  const { isLoading, error, getCollaborators } = useData();
  
  const collaborator = !isLoading && !error ? getCollaborators({ limit: 4 }) : [];
  return (
    <section className="block collaborateur">
      <NavLink
        to="/aboutme/collaborators"
        end
      >
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
                  <figure key={index}
                    className='tooltips'
                    data-content={collab.name + " " + collab.surname}
                  >
                    <img src={collab.profileName === null 
                        ? "/image/avatar/1.png" 
                        : "/image/uploads/images/collaborator/profile/" + collab.profileName
                      }
                      alt={collab.name + " " + collab.surname} 
                      title={collab.name + " " + collab.surname}
                    />
                  </figure>
                ))
              ) : (
                <p>Aucun collaborateur trouvé</p>
              )}
            </>
          )}
        </div>
      </NavLink>
    </section>
  );
}