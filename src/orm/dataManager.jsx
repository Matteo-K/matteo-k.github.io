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
        const response = await fetch(`./entities/${entityName}.json`);
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
   * Méthodes helper pour des requêtes courantes
   */
  getAllProjects() {
    return this.getSession().Project.all().toModelArray();
  }
  
  getProjectById(id) {
    return this.getSession().Project.withId(id);
  }
  
  getProjectsByStatus(status) {
    return this.getSession().Project.filter({ statut: status }).toModelArray();
  }
  
  getAllCollaborators() {
    return this.getSession().Collaborator.all().toModelArray();
  }
  
  getCollaboratorProjects(collaboratorId) {
    const collaborator = this.getSession().Collaborator.withId(collaboratorId);
    return collaborator ? collaborator.projects.toModelArray() : [];
  }
  
  getSocietyProjects(societyId) {
    return this.getSession().Project.filter({ society: societyId }).toModelArray();
  }
  
  getProjectTechnologies(projectId) {
    const project = this.getSession().Project.withId(projectId);
    if (!project) return [];
      
    return project.projectTechnologies.toModelArray().map(pt => pt.technology);
  }
}

const dataManager = new DataManager();
export default dataManager;