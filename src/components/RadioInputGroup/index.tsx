import React from 'react';
import { Container, Label, Option, Options, OptionText } from './styles';

export type RadioOptionType = 'error' | 'success' | 'default';

interface RadioOption<T extends string> {
  value: T;
  label?: string;
  type: RadioOptionType;
}

interface RadioInputGroupProps<T extends string> {
  options: RadioOption<T>[];
  selected: T;
  label?: string;
  onChange: (value: T) => void;
}

export const RadioInputGroup = <T extends string>({
  options,
  onChange,
  selected,
  label,
}: RadioInputGroupProps<T>) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Options>
        {options.map(({ type, value, label: optionLabel }) => (
          <Option
            selected={selected === value}
            onPress={() => onChange(value)}
            type={type}
            key={String(value)}>
            <OptionText>{optionLabel || value}</OptionText>
          </Option>
        ))}
      </Options>
    </Container>
  );
};
