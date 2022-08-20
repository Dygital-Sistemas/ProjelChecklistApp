import { FAB } from 'react-native-paper';
import styled from 'styled-components/native';
import { colors } from '../../commons/styles';

export const Container = styled.View`
  flex: 1;
`;

export const Fab = styled(FAB)`
  position: absolute;
  bottom: 18px;
  right: 18px;
  background-color: ${colors.primary};
`;
