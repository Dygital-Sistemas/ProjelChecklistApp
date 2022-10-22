import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 16px;
  position: relative;
`;

export const OptionsListContainer = styled.ScrollView`
  /* margin-top: 16px; */
  position: absolute;
  background: #fff;
  top: 72px;
  z-index: 10;
  width: 100%;
  border-radius: 3px;
  max-height: 200px;
`;

export const Option = styled.TouchableOpacity`
  padding: 14px;
`;

export const OptionText = styled.Text`
  font-size: 16px;
  color: #333;
`;
