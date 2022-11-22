import React from 'react';
import { Image, ImageSourcePropType, ScrollView } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Container } from './styles';

interface MultiSelectBreakdownsProps {
  onChange: (selecteds: string[]) => void;
  selected: string[];
  label?: string;
  source: ImageSourcePropType;
}

const options = [
  { value: 'A' },
  { value: 'R' },
  { value: 'T' },
  { value: 'X' },
  { value: 'F' },
];

export const MultiSelectBreakdowns: React.FC<MultiSelectBreakdownsProps> = ({
  source,
  selected,
  onChange,
}) => {
  return (
    <Container>
      <Image
        source={source}
        style={{ width: 28, marginRight: 5 }}
        resizeMode="contain"
      />
      <ScrollView horizontal={true}>
        {options.map(({ value }) => (
          <Checkbox.Item
            key={value}
            label={value}
            style={{ padding: 0, margin: 0, borderRadius: 10 }}
            status={selected?.includes(value) ? 'checked' : 'unchecked'}
            onPress={() =>
              onChange(
                selected.includes(value)
                  ? selected.filter(i => i !== value)
                  : [...selected, value],
              )
            }
          />
        ))}
      </ScrollView>
    </Container>
  );
};
