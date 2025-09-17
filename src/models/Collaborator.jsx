import { Model, many, attr } from 'redux-orm';

class Collaborator extends Model {
  toString() {
    return `Collaborator: ${this.surname} ${this.name}`;
  }
}

Collaborator.modelName = 'Collaborator';

Collaborator.fields = {
  id: attr(),
  statut: attr(),
  surname: attr(),
  name: attr(),
  description: attr(),
  illustrationName: attr(),
  profileName: attr(),
  linkLinkedin: attr(),
  linkGithub: attr(),
  linkWeb: attr(),
  createdAt: attr(),
  updatedAt: attr(),
  projects: many('Project'),
};

export default Collaborator;