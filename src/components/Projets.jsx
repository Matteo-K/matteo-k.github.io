import { useSearchParams, NavLink } from "react-router-dom";
import { DataStatut } from '../enums/DataStatut';
import { useData } from '../hooks/useData';

export default function Projects() {
  const [ searchParams, setSearchParams ] = useSearchParams();

  const filters = {
    search: searchParams.get('search') || '',
    sort: searchParams.get('sort') || 'priority',
    order: searchParams.get('order') || 'asc',
  }

  const { isLoading, error, getProjects } = useData();
  if (isLoading) return <div>🔄 Chargement...</div>;
  if (error) return <div>❌ Erreur: {error}</div>;

  const projects = getProjects({
    where: { 
      statut: DataStatut.ACTIF,
      ...(filters.search ? { title: { contains: filters.search }} : {})
     },
    order: { [filters.sort]: filters.order === "asc" ? 1 : -1 }
  });

  const updateFilters = (newFilters) => {
    const merge = { ...filters, ...newFilters };
    setSearchParams(merge);
  }

  return (
    <>
      <aside>
        <select
          value={filters.sort}
          onChange={(e) => updateFilters({ sort: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="priority">Priorité</option>
          <option value="title">Nom</option>
          <option value="date">Date</option>
        </select>

        <select
          value={filters.order}
          onChange={(e) => updateFilters({ order: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>

        <input
          type="text"
          placeholder="🔍 Rechercher..."
          value={filters.search}
          onChange={(e) => updateFilters({ search: e.target.value })}
          className="border p-2 rounded flex-1"
        />
      </aside>
      <main id="projets">
        {projects.map((project) => (
          <NavLink
            to={"/project/" + project.title}
          >
            <div className="card-project">
              <img src={"/image/uploads/images/project/card/" + project.illustrationCardName} alt={project.title} title={project.title}/>
            </div>
          </NavLink>
        ))}
      </main>
    </>
  );
}