import { useState, useEffect, useCallback } from 'react';
import dataManager from '../orm/dataManager';

export function useData() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [session, setSession] = useState(null);

  const getProjects = useCallback(
    ({ where = {}, order = {}, limit = -1 } = {}) =>
      dataManager.getProjects({ where, order, limit }),
    []
  );

  const getCollaborators = useCallback(
    ({ where = {}, order = {}, limit = -1 } = {}) =>
      dataManager.getCollaborators({ where, order, limit }),
    []
  );
  
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const loadedSession = await dataManager.loadData();
        setSession(loadedSession);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);
  
  return { 
    isLoading, 
    error, 
    session,
    getProjects,
    getCollaborators,
    // Méthodes helper
    getAllProjects: () => dataManager.getAllProjects(),
    getAllProjectsSortedByPriority: (descending) => dataManager.getAllProjectsSortedByPriority(descending),
    getLimitedProjects: (limit) => dataManager.getLimitedProjects(limit),
    getProjectById: (id) => dataManager.getProjectById(id),
    getProjectsByStatus: (status) => dataManager.getProjectsByStatus(status),
    getAllCollaborators: () => dataManager.getAllCollaborators(),
    getCollaboratorProjects: (id) => dataManager.getCollaboratorProjects(id),
    getSocietyProjects: (id) => dataManager.getSocietyProjects(id),
    getProjectTechnologies: (id) => dataManager.getProjectTechnologies(id),
    countTrophyByType: (type, project, trophyRoad) => dataManager.countTrophyByType(type, project, trophyRoad),
    getAllTags: () => dataManager.getAllTags(),
  };
}

// Hook spécialisé pour un projet
export function useProject(projectId) {
  const { isLoading, error } = useData();
  const [project, setProject] = useState(null);
  
  useEffect(() => {
    if (!isLoading && !error && projectId) {
      try {
        const foundProject = dataManager.getProjectById(projectId);
        setProject(foundProject);
      } catch (err) {
        console.error('Erreur récupération projet:', err);
      }
    }
  }, [isLoading, error, projectId]);
  
  return { project, isLoading, error };
}