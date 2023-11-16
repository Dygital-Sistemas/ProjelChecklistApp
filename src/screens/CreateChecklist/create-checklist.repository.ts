import { api } from '../../services/api';

interface CreateChecklistResponse {
  withErrors: [];
}

export const createChecklistRepository = {
  create: (data: Realm.Object) => {
    return api.post('/checklists', data);
  },
};
