import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 16px;
`;

export const Header = styled.View`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  margin-bottom: 16px;
  border-radius: 4px;
  border: 1px solid #e4e4e4;
`;

export const SectionTitle = styled.Text`
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  margin: 20px 0 10px 0;
`;

export const ItemsLabel = styled.View`
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;
