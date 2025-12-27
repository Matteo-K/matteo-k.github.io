import { useData } from '../../../hooks/useData';
import { TrophyType } from '../../../enums/TrophyType';
import React from 'react';

export default function Trophies(props) {

const { isLoadingTrophy, error, countTrophyByType } = useData();
  // Trophée
  let trophies = React.useMemo(() => ({
    "platinium": {
      "type" : TrophyType.PLATINUM,
      "img" : "platinium.svg",
      "alt" : "",
      "count" : 0
    },
    "gold": {
      "type" : TrophyType.GOLD,
      "img" : "gold.svg",
      "alt" : "",
      "count" : 0
    },
    "silver": {
      "type" : TrophyType.SILVER,
      "img" : "silver.svg",
      "alt" : "",
      "count" : 0
    },
    "bronze": {
      "type" : TrophyType.BRONZE,
      "img" : "bronze.svg",
      "alt" : "",
      "count" : 0
    }
  }), []);

  const enrichedTrophies = React.useMemo(() => {
    // Si les données sont en cours de chargement, retourner les trophées par défaut
    if (isLoadingTrophy || error) {
      return trophies;
    }
    
    // Une fois chargé, enrichir avec les vrais compteurs
    try {
      return Object.fromEntries(
        Object.entries(trophies).map(([key, trophy]) => [
          key,
          {
            ...trophy,
            count: countTrophyByType(trophy.type)
          }
        ])
      );
    } catch (error) {
      console.error('Erreur lors du comptage des trophées:', error);
      return trophies;
    }
  }, [isLoadingTrophy, error, trophies, countTrophyByType]);

  return (
    <section className={props.className + " block trophies"}>
      <div className="title">
        <h2>{ props.children ? props.children : "Trophies"}</h2>
        {props.total && <span>
          {Object.entries(enrichedTrophies).reduce(
            (accumulator, [,currentValue]) => accumulator + currentValue.count,
            0
          )}
        </span>}
      </div>
      <div className='content'>
        {Object.entries(enrichedTrophies).map(([key, trophy]) => (
          <figure key={key}>
            <img 
              src={`/image/icons/trophy/${trophy.img}`} 
              alt={trophy.alt}
              title={trophy.alt}
            />
            <figcaption>{trophy.count}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}