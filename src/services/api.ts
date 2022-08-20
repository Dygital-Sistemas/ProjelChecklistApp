import axios from 'axios';
import Realm from 'realm';
import { config } from '../commons/config';
import { realmConfig } from '../databases/config';
import { User } from '../databases/schemas/user';

export const api = axios.create({
  baseURL: config.baseURL,
  timeout: 20000, // 20s
});

api.interceptors.request.use(async axiosConfig => {
  const realm = await Realm.open(realmConfig);
  const user = realm.objects<User>('User')[0];

  if (user) {
    axiosConfig.headers = {
      ...axiosConfig.headers,
      authorization: `Bearer ${user.token}`,
    };
  }

  return axiosConfig;
});
