import { TouchableOpacity } from 'react-native';
import { DefaultTheme, Text } from 'react-native-paper';
import styled from 'styled-components/native';
import { RadioOptionType } from '.';
import { colors } from '../../commons/styles';

export const Container = styled.View`
  background: ${colors.extraLightGray};
  margin-top: 16px;
  padding: 12px;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  border-bottom-color: ${colors.lightGray};
  border-bottom-width: 1px;
`;

export const Label = styled(Text)`
  margin-bottom: 10px;
  font-size: 12px;
  color: ${DefaultTheme.colors.placeholder};
`;

export const Options = styled.View`
  flex-direction: row;
  justify-content: space-around;
  border-radius: 4px;
`;

export const Option = styled(TouchableOpacity)<{
  type: RadioOptionType;
  selected?: boolean;
}>`
  flex-direction: row;
  align-items: center;
  background: ${props =>
    props.selected ? colors[props.type] : colors.extraLightGray};
  padding: 16px;
  flex: 1;
  justify-content: center;
  border-radius: 4px;
  opacity: 0.5;
`;

export const OptionText = styled.Text`
  font-weight: bold;
  color: ${colors.darkGray};
`;
