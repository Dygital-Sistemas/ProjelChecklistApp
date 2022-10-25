import React, { useState } from 'react';
import { Text, TextInput } from 'react-native-paper';
import { useQuery } from '../../databases/realm';
import { Vehicle, VehicleSchema } from '../../databases/schemas/vehicle';

import { Container, Option, OptionsListContainer, OptionText } from './styles';

interface SelectInputProps {
  selected: string;
  onChange: (selected: string) => void;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  onChange,
  selected,
}) => {
  const vehicles = useQuery<Vehicle>(VehicleSchema.name);

  const [optionsIsOpen, setOptionsIsOpen] = useState(false);
  const [filterValue, setFilterValue] = useState('');

  const filteredVehicles = filterValue
    ? vehicles.filter(item =>
        item.tag.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase()),
      )
    : vehicles;

  const onSelect = (item: Vehicle) => {
    onChange(item.id.toString());
    setFilterValue(item.tag);
    setOptionsIsOpen(false);
  };

  return (
    <Container>
      <TextInput
        label="Veículo"
        onChangeText={setFilterValue}
        onFocus={() => setOptionsIsOpen(true)}
        style={{
          height: 64,
        }}
        value={filterValue || vehicles.find(item => item.id === +selected)?.tag}
        right={
          <TextInput.Icon
            name={optionsIsOpen ? 'chevron-up' : 'chevron-down'}
            forceTextInputFocus={false}
            onPress={() => setOptionsIsOpen(isOpen => !isOpen)}
          />
        }
      />

      {optionsIsOpen && (
        <OptionsListContainer nestedScrollEnabled>
          {filteredVehicles.map(item => (
            <Option key={item.id} onPress={() => onSelect(item)}>
              <OptionText>{item.tag}</OptionText>
            </Option>
          ))}
        </OptionsListContainer>
      )}
    </Container>
  );
};
