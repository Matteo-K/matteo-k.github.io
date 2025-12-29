export default function Collaborators(props) {
  const project = props.project;

  return (
    <>
      {/* Collaborateurs */}
      {project.collaborators.length > 0 &&
        <section>
          <h2>Collaborateurs</h2>
          {project.collaborators.map(collaborateur => (
            <div
              className="block"
              key={collaborateur.id}
              style={
                collaborateur.illustrationName
                  ? {
                      backgroundImage: `url(/image/uploads/images/collaborator/illustration/${collaborateur.illustrationName})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }
                  : {
                    backgroundImage: `url(/image/avatar/1.png`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }
              }
            >
              <p>{collaborateur.surname} {collaborateur.name}</p>
            </div>
          ))}
        </section>
      }
    </>
  );
}