import React from 'react';
import { useAuth } from '../providers/auth.provider';
import { AuthTabRoutes } from './auth.routes';
import { PublicTabRoutes } from './public.routes';

export const Routes = () => {
  const { isLogged } = useAuth();
  return isLogged ? <AuthTabRoutes /> : <PublicTabRoutes />;
};
