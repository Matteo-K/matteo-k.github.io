import CompanyDetails from "../_partials/CompanyDetails";

export default function Goal({ project }) {

  const renderGoalContent = () => {
    switch (true) {
      case !!project.society:
        return (
          <>
            <CompanyDetails company={project.society} type={project.objective}></CompanyDetails>
          </>
        );

      case !!project.school:
        return (
          <>
            <CompanyDetails company={project.school} type={project.objective}></CompanyDetails>
          </>
        );

      default:
        return (
          <>
            <p>
              Projet réalisé à titre personnel dans une démarche d’apprentissage
              et d’expérimentation.
            </p>
          </>
        );
    }
  };

  return (
    <section className="block goal">
      <div className="title">
        <h2>Cadre du projet</h2>
      </div>

      <div className="content">
        {renderGoalContent()}
      </div>
    </section>
  );
}
