import { useSearchParams, NavLink } from "react-router-dom";
import { DataStatut } from "../enums/DataStatut";
import { useData } from "../hooks/useData";
import SortFilter from "./Project/SortFilter";

export default function Projects() {
  const [searchParams] = useSearchParams();
  const { isLoading, error, getProjects } = useData();

  if (isLoading) return <div>🔄 Chargement...</div>;
  if (error) return <div>❌ Erreur: {error}</div>;

  const SORT_OPTIONS = [
    { label: "Priorité croissant", value: "priority:asc" },
    { label: "Priorité décroissant", value: "priority:desc" },
    { label: "Nom (A-Z)", value: "title:asc" },
    { label: "Nom (Z-A)", value: "title:desc" },
    { label: "Date récente", value: "date:desc" },
    { label: "Date ancienne", value: "date:asc" },
  ];

  /* -----------------------------
     Récupération des filtres
  ------------------------------ */
  const search = searchParams.get("search") || "";
  const sortParam = searchParams.get("sort") || "priority:asc";
  const selectedTags = searchParams.get("tags")?.split(",").filter(Boolean) || [];

  const [sortField, sortOrder] = sortParam.split(":");

  /* -----------------------------
     Récupération des projets
  ------------------------------ */
  let projects = getProjects({
    where: {
      statut: DataStatut.ACTIF,
      ...(search ? { title: { contains: search } } : {}),
    },
    order: { [sortField]: sortOrder === "asc" ? 1 : -1 },
  });

  /* -----------------------------
     Filtrage multi-tags
     Vérifie que le projet contient tous les tags sélectionnés
  ------------------------------ */
  if (selectedTags.length > 0) {
    projects = projects.filter((project) =>
      selectedTags.every((tagLabel) =>
        project.tags.some((t) => t.label === tagLabel)
      )
    );
  }

  const currentSort =
    SORT_OPTIONS.find(option => option.value === sortParam) 
    || SORT_OPTIONS[0];

  return (
    <div id="projets">
      {/* Liste des projets */}
      <div>
        <div>Nombre de projets : {projects.length}</div>
        <div>Trier par : {currentSort.label}</div>
      </div>
      <main>
        {/* Composant de filtres */}
        <SortFilter options={SORT_OPTIONS}/>
        <div>
          {projects.map((project) => (
            <NavLink
              key={project.id}
              to={`/project/${project.title}`}
            >
              <div className="card-project border-hover">
                <img
                  src={`/image/uploads/images/project/card/${project.illustrationCardName}`}
                  alt={project.title}
                  title={project.title}
                />
              </div>
            </NavLink>
          ))}
        </div>
      </main>
    </div>
  );
}
