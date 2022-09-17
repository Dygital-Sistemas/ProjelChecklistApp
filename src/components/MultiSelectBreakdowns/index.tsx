import React from 'react';
import { Image, ImageSourcePropType } from 'react-native';
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
  { value: 'X' },
  { value: 'R' },
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
        style={{ width: 48, marginRight: 10 }}
        resizeMode="contain"
      />

      {options.map(({ value }) => (
        <Checkbox.Item
          key={value}
          label={value}
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
    </Container>
  );
};
