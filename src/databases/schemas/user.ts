import { ObjectSchema } from 'realm';

export const UserSchema: ObjectSchema = {
  name: 'User',
  primaryKey: 'id',
  properties: {
    id: 'int',
    cpf: 'string',
    email: 'string',
    is_admin: 'bool',
    name: 'string',
    rg: 'string',
    token: 'string',
  },
};

export interface User {
  id: number;
  cpf: string;
  email: string;
  is_admin: boolean;
  name: string;
  rg: string;
  token: string;
}

export const UserRepository = {
  create: (dto: User): User => {
    return dto;
  },
};
