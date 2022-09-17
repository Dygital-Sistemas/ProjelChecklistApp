import { api } from '../../services/api';

export const createChecklistRepository = {
  create: (data: Realm.Object) => {
    return api.post('/checklists', { data: [data] });
  },
};
