import About from "./About";
import { useData } from '../hooks/useData';
import { DataStatut } from '../enums/DataStatut';

function AboutMeCollaborator() {
  const { isLoading, error, getCollaborators } = useData();
  const collaborators = !isLoading && !error ? getCollaborators({
    where: { statut: DataStatut.ACTIF },
    order: { surname: 1}
  }) : [];
  console.log(collaborators)
  return (
    <About>
      <main id="aboutme-collaborator">
        {collaborators.map((collab) => (
          <figure>
            <img src={collab.profileName === null 
                ? "/image/avatar/1.png" 
                : "/image/uploads/images/collaborator/profile/" + collab.profileName
              }
              alt={collab.name + " " + collab.surname}
              title={collab.name + " " + collab.surname}
            />
            <figcaption>{collab.name + " " + collab.surname}</figcaption>
          </figure>
        ))}
      </main>
    </About>
  );
}

export default AboutMeCollaborator;
