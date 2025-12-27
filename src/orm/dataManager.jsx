import { ORM } from 'redux-orm';
import * as models from '../models';

class DataManager {
  constructor() {
    // Créer l'ORM
    this.orm = new ORM();
    
    // Enregistrer tous les modèles
    Object.values(models).forEach(model => {
      this.orm.register(model);
    });
    
    // État des données
    this.state = null;
    this.session = null;
    this.isLoaded = false;
  }
  
  /**
   * Charge toutes les données depuis les fichiers JSON
   */
  async loadData() {
    if (this.isLoaded) {
        return this.session;
    }
    
    try {
      console.log('🔄 Chargement des données...');
      
      // Charger tous les fichiers JSON
      const entitiesData = await this.fetchAllEntities();
      
      this.state = this.orm.getEmptyState();
      this.session = this.orm.session(this.state);
      
      // Insérer les données dans l'ordre correct
      this.insertEntitiesData(entitiesData);
      

      this.state = this.session.state;
      this.session = this.orm.session(this.state);      
      this.isLoaded = true;
      console.log('✅ Données chargées avec succès');
      
      return this.session;
        
    } catch (error) {
      console.error('❌ Erreur lors du chargement des données:', error);
      throw error;
    }
  }
  
  /**
   * Récupère tous les fichiers JSON
   */
  async fetchAllEntities() {
    const entityFiles = [
        'collaborator',
        'society',
        'school', 
        'technology',
        'trophy',
        'projectTechnology',
        'trophyRoad',
        'project'
    ];
    
    const entitiesData = {};
    
    for (const entityName of entityFiles) {
      try {
        const response = await fetch(`/entities/${entityName}.json`);
        if (response.ok) {
          console.log(response);
          const data = await response.json();
          const modelName = this.capitalize(entityName);
          entitiesData[modelName] = Array.isArray(data) ? data : [data];
        } else {
          console.warn(`${entityName}.json non trouvé`);
          entitiesData[this.capitalize(entityName)] = [];
        }
      } catch (error) {
        console.warn(`Erreur ${entityName}.json:`, error.message);
        entitiesData[this.capitalize(entityName)] = [];
      }
    }
    
    return entitiesData;
  }
  
  /**
   * Insère les données dans Redux-ORM
   */
  insertEntitiesData(entitiesData) {
    Object.entries(entitiesData).forEach(([modelName, data]) => {
      if (this.session[modelName] && Array.isArray(data)) {
        console.log(`📁 Insertion de ${data.length} ${modelName}(s)`);
        data.forEach(item => {
          this.session[modelName].upsert(item);
        });
      }
    });
  }
  
  /**
   * Retourne la session courante (pour les requêtes)
   */
  getSession() {
    if (!this.isLoaded) {
      throw new Error('Les données ne sont pas encore chargées. Appelez loadData() d\'abord.');
    }
    return this.session;
  }
  
  /**
   * Utilitaire pour capitaliser
   */
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Hydratation des entités
   */
  hydrateProject(project) {
    if (!project) return null;

    return {
      ...project.ref,
      projectTechnologies: project.projectTechnologies != null
        ? project.projectTechnologies.toModelArray().map(pt => ({
          id: pt.id,
          statut: pt.statut,
          pourcentage_using: pt.pourcentage_using,
          technologie: pt.technologie ? pt.technologie.ref : null,
          createdAt: pt.createdAt,
          updatedAt: pt.updatedAt,
        }))
        : [],
      society: project.society ? project.society.ref : null,
      school: project.school ? project.school.ref : null,
      collaborators: project.collaborators.toRefArray(),

      trophyRoads: project.trophyRoads != null
        ? project.trophyRoads.toModelArray().map(tph => ({
          id: tph.id,
          statut: tph.statut,
          type: tph.type,
          name: tph.name,
          trophies: tph.trophies.toRefArray(),
          createdAt: tph.createdAt,
          updatedAt: tph.updatedAt,
        }))
        : [],
      tags: project.tags.toRefArray(),
    };
  }

  /**
   * Méthodes helper pour des requêtes courantes
   */
  getAllProjects() {
    return this.getSession().Project.all().toModelArray().map(p => this.hydrateProject(p));
  }

  getProjectById(id) {
    const project = this.getSession().Project.withId(id);
    return project ? this.hydrateProject(project) : null;
  }

  getProjects({ where = {}, order = {}, limit = -1 } = {}) {
    let query = this.getSession().Project.all();

    // Filtrage
    if (where && Object.keys(where).length > 0) {
      query = query.filter(project => {
        return Object.entries(where).every(([key, condition]) => {
          const projectValue = String(project[key] || "").toUpperCase();

          if (typeof condition === "string") {
            return projectValue === condition.toUpperCase();
          }

          if (typeof condition === "object") {
            if (condition.equals) {
              return projectValue === condition.equals.toUpperCase();
            }
            if (condition.contains) {
              return projectValue.includes(condition.contains.toUpperCase());
            }
            if (condition.startsWith) {
              return projectValue.startsWith(condition.startsWith.toUpperCase());
            }
            if (condition.endsWith) {
              return projectValue.endsWith(condition.endsWith.toUpperCase());
            }
          }

          return true;
        });
      });
    }

    // Hydratation des projets
    let projects = query.toModelArray().map(p => this.hydrateProject(p));

    // Tri
    if (order && Object.keys(order).length > 0) {
      projects.sort((a, b) => {
        for (const [key, direction] of Object.entries(order)) {
          if (a[key] < b[key]) return -1 * direction;
          if (a[key] > b[key]) return 1 * direction;
        }
        return 0;
      });
    }

    // Limite
    if (limit > -1) {
      projects = projects.slice(0, limit);
    }

    return projects;
  }


  getProjectsByStatus(status) {
    return this.getSession().Project.filter({ statut: status })
      .toModelArray()
      .map(p => this.hydrateProject(p));
  }

  getAllProjectsSortedByPriority(descending = false) {
    const projects = this.getSession().Project.all().toModelArray();
    const sortedProjects = projects.sort((a, b) => {
      if (descending) {
        return b.priority - a.priority;
      } else {
        return a.priority - b.priority;
      }
    });
    return sortedProjects.map(p => this.hydrateProject(p));
  }

  // Récupérer les N premiers projets
  getLimitedProjects(limit) {
    const projects = this.getSession().Project.all().toModelArray();
    const limitedProjects = projects.slice(0, limit);
    return limitedProjects.map(p => this.hydrateProject(p));
  }
  
  getAllCollaborators() {
    return this.getSession().Collaborator.all().toModelArray();
  }
  
  getCollaboratorProjects(collaboratorId) {
    const collaborator = this.getSession().Collaborator.withId(collaboratorId);
    return collaborator ? collaborator.projects.toModelArray() : [];
  }

  getCollaborators({ where = {}, order = {}, limit = -1 } = {}) {
    let query = this.getSession().Collaborator.all();

    // Filtrage
    if (where && Object.keys(where).length > 0) {
      query = query.filter(collaborator => {
        return Object.entries(where).every(([key, condition]) => {
          const collaboratorValue = String(collaborator[key] || "").toUpperCase();

          if (typeof condition === "string") {
            return collaboratorValue === condition.toUpperCase();
          }

          if (typeof condition === "object") {
            if (condition.equals) {
              return collaboratorValue === condition.equals.toUpperCase();
            }
            if (condition.contains) {
              return collaboratorValue.includes(condition.contains.toUpperCase());
            }
            if (condition.startsWith) {
              return collaboratorValue.startsWith(condition.startsWith.toUpperCase());
            }
            if (condition.endsWith) {
              return collaboratorValue.endsWith(condition.endsWith.toUpperCase());
            }
          }

          return true;
        });
      });
    }

    // Hydratation des projets
    let collaborators = query.toModelArray();

    // Tri
    if (order && Object.keys(order).length > 0) {
      collaborators.sort((a, b) => {
        for (const [key, direction] of Object.entries(order)) {
          if (a[key] < b[key]) return -1 * direction;
          if (a[key] > b[key]) return 1 * direction;
        }
        return 0;
      });
    }

    // Limite
    if (limit > -1) {
      collaborators = collaborators.slice(0, limit);
    }

    return collaborators;
  }

  
  getSocietyProjects(societyId) {
    return this.getSession().Project.filter({ society: societyId }).toModelArray();
  }
  
  getProjectTechnologies(projectId) {
    const project = this.getSession().Project.withId(projectId);
    if (!project) return [];

    return project.projectTechnologies.toModelArray().map(pt => pt.technology);
  }

  countTrophyByType(type) {
    return this.getSession().Trophy.filter({ type, accomplished: true }).count();
  }

  getAllTags() {
    return this.getSession().Tag.all().toModelArray();
  }
}

const dataManager = new DataManager();

export default dataManager;