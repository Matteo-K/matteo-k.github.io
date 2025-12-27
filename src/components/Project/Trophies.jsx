import { RoadType } from '../../enums/RoadType';

export default function Trophies(props) {
  const project = props.project;
  const trophyRoads = project.trophyRoads;

  const road = trophyRoads.find((element) => {
    return element.type === RoadType.MAIN;
  }) ?? null;

  return (
    <>
      {/* Trophy */}
      {road != null &&
        <section>
          <h2>Trophées</h2>
          {road.trophies.map(trophy => (
            <div
              key={trophy.id}
              style={
                trophy.illustrationName
                  ? {
                      backgroundImage: `url(/image/uploads/images/collaborator/illustration/${trophy.illustrationName})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }
                  : {}
              }
            >
              <p>{trophy.name}</p>
            </div>
          ))}
        </section>
      }
    </>
  );
}