import { useData } from '../../../hooks/useData';
import { TrophyType } from '../../../enums/TrophyType';
import React from 'react';

import { Menu, Profil, Projects, Summary } from "./TrophyDisplay"

export default function Trophies(props) {
  const project = props.project ?? null
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

  const TROPHIES_CONFIG = {
    menu: {
      showTotal: true,
      className: "trophies-menu",
      view: Menu,
      navigation: "/trophies"
    },
    profil: {
      showTotal: true,
      className: "trophies-profil",
      view: Profil,
      navigation: "/trophies"
    },
    projects: {
      showTotal: false,
      className: "trophies-projects",
      view: Projects,
      navigation: "/project/trophy/" + project?.title
    },
    summary: {
      showTotal: true,
      className: "trophies-summary",
      view: Summary,
      navigation: "/project/trophy/" + project?.title
    }
  };
  const config = TROPHIES_CONFIG[props.type] ?? TROPHIES_CONFIG.menu;

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
            count: countTrophyByType(
              trophy.type,
              project ? project : null
            )
          }
        ])
      );
    } catch (error) {
      console.error('Erreur lors du comptage des trophées:', error);
      return trophies;
    }
  }, [isLoadingTrophy, error, project, trophies, countTrophyByType]);

  return (
    <config.view
      trophies={enrichedTrophies}
      config={config}
      {...props}
    />
  );
}