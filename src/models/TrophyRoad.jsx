import { Model, fk, many, attr } from 'redux-orm';

class TrophyRoad extends Model {
  toString() {
    return `TrophyRoad: ${this.title}`;
  }
}

TrophyRoad.modelName = 'TrophyRoad';

TrophyRoad.fields = {
  id: attr(),
  statut: attr(),
  type: attr(),
  name: attr(),
  project: fk('Project'),
  trophies: many('Trophy'),
  createdAt: attr(),
  updatedAt: attr(),
};

export default TrophyRoad;