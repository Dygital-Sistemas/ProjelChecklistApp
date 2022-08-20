import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { Checklist } from '../../databases/schemas';

export const Container = styled(FlatList<Checklist>)`
  padding: 16px;
  flex: 1;
`;
