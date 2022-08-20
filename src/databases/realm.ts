import { createRealmContext } from '@realm/react';
import { realmConfig } from './config';

const RealmContext = createRealmContext(realmConfig);

export const { RealmProvider, useObject, useQuery, useRealm } = RealmContext;
