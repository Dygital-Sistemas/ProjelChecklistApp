import { Checklist } from '../../databases/schemas';
import { api } from '../../services/api';

export const sendChecklists = async (data: Checklist[]) => {
  return api.post<Checklist[]>('/checklists', { data });
};
