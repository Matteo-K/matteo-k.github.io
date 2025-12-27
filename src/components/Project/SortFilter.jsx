import { useSearchParams } from "react-router-dom";
import { useData } from "../../hooks/useData";
import PopUp from "../PopUp";
import { useState } from "react";

/**
 * 
 * @param {*} props paramètre
 * options : liste d'option
 * exemple :
 * [
 *  { label: "Priorité croissant", value: "priority:asc" },
 *  { label: "Priorité décroissant", value: "priority:desc" },
 *  { label: "Nom (A-Z)", value: "title:asc" },
 *  { label: "Nom (Z-A)", value: "title:desc" },
 *  { label: "Date récente", value: "date:desc" },
 *  { label: "Date ancienne", value: "date:asc" },
 *]
 * @returns 
 */
export default function SortFilter(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading, error, getAllTags } = useData();
  const [countTag, setCountTag] = useState(0)

  const tags = !isLoading && !error ? getAllTags() : [];

  /* -----------------------------
     TRI + ORDRE combinés
  ------------------------------ */

  const sortParam = searchParams.get("sort") || "priority:asc";

  const updateSort = (value) => {
    searchParams.set("sort", value);
    setSearchParams(searchParams);
  };

  /* -----------------------------
     SEARCH
  ------------------------------ */
  const search = searchParams.get("search") || "";
  const updateSearch = (value) => {
    if (value === "") searchParams.delete("search");
    else searchParams.set("search", value);
    setSearchParams(searchParams);
  };

  /* -----------------------------
     TAGS MULTI-SELECT
  ------------------------------ */
  const selectedTags =
    searchParams.get("tags")?.split(",").filter(Boolean) || [];

  const toggleTag = (tagLabel) => {
    const next = selectedTags.includes(tagLabel)
      ? selectedTags.filter((t) => t !== tagLabel)
      : [...selectedTags, tagLabel];

    setCountTag(next.length);
    const nextParams = new URLSearchParams(searchParams);

    if (next.length === 0) nextParams.delete("tags");
    else nextParams.set("tags", next.join(","));
    setSearchParams(nextParams);
  };

  return (
    <aside>
      <PopUp src="/image/icons/search.svg" title="Recherche">
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => updateSearch(e.target.value)}
          className="search"
        />
      </PopUp>

      <PopUp src="/image/icons/sort&filter.svg" title="Filtre" count={countTag}>
        <div className="sort">
          {/* TRI + ORDRE */}
          <select
            value={sortParam}
            onChange={(e) => updateSort(e.target.value)}
          >
            {props.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="filter">
          {/* TAGS MULTI-SELECT */}
          <details open>
            <summary>Tags</summary>

            <div>
              {isLoading && <p>Chargement…</p>}
              {error && <p>Erreur de chargement</p>}

              {!isLoading && !error 
                && tags.map((tag) => {
                  const label = tag._fields.label;
                  return (
                    <label
                      key={tag._fields.id}
                      className="checkbox"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(label)}
                        onChange={() => toggleTag(label)}
                      />
                      <span 
                        className="checkbox-box" 
                        tabIndex={1} 
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            toggleTag(label)
                          }
                        }}
                      ></span>
                      <span className="checkbox-label">{label}</span>
                    </label>
                  );
                })
              }
            </div>
          </details>
        </div>
      </PopUp>
    </aside>
  );
}
