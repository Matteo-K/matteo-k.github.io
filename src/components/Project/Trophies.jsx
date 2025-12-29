import { RoadType } from '../../enums/RoadType';
import { TrophyType } from '../../enums/TrophyType';

export default function Trophies(props) {
  const project = props.project;
  const trophyRoads = project.trophyRoads;

  const road = trophyRoads.find((element) => {
    return element.type === RoadType.MAIN;
  }) ?? null;

  const trophies = {
    [TrophyType.PLATINUM]: ["platinium.svg", 1],
    [TrophyType.GOLD]: ["gold.svg", 2],
    [TrophyType.SILVER]: ["silver.svg", 3],
    [TrophyType.BRONZE]: ["bronze.svg", 4],
  }

  return (
    <>
      {/* Trophy */}
      {road != null &&
        <section className='detailsTrophy'>
          <div className='title'>
            <h2>Trophées</h2>
          </div>
          <div className='content'>
            {road.trophies.sort((trophy1, trophy2) => trophies[trophy1.type][1] > trophies[trophy2.type][1])
              .map(trophy => (
              <div
                className={'illustration ' + trophy.type}
                key={trophy.id}
                style={
                  {
                    backgroundImage: `url(/image/icons/trophy/${trophies[trophy.type][0]})`,
                    backgroundSize: 'contain',
                    backgroundPosition: '80px',
                  }
                }
              >
                <p>{trophy.name}</p>
              </div>
            ))}
          </div>
        </section>
      }
    </>
  );
}