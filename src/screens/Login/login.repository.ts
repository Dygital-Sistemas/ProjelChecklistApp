import { User } from '../../databases/schemas';
import { api } from '../../services/api';

export const submitLogin = async (email: string, password: string) => {
  return api.post<User>('/auth', { email, password });
};
