import { devConfig } from './config.dev';
import { prodConfig } from './config.prod';

export interface Config {
  baseURL: string;
}

export const config = __DEV__ ? devConfig : prodConfig;
