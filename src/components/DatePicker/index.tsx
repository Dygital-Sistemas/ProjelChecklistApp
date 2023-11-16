import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import React, { createRef, useState } from 'react';
import { TextInput } from 'react-native-paper';
import { Container } from './styles';

const formatDate = (date: Date) => format(date, 'dd/MM/yyyy');

interface DatePickProps {
  value: Date;
  onChange: (date: Date) => void;
  label?: string;
}

export const DatePicker: React.FC<DatePickProps> = ({
  onChange,
  value,
  label,
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  const inputRef = createRef<any>();

  const handleChangeDate = (_: any, date?: Date) => {
    setVisible(false);
    onChange(new Date(date || value));
  };

  return (
    <Container>
      <TextInput
        ref={inputRef}
        label={label}
        disabled
        value={formatDate(value)}
        onPressIn={() => setVisible(true)}
        onFocus={() => {
          if (inputRef.current.blur) {
            inputRef.current.blur();
          }
        }}
      />
      {visible && (
        <DateTimePicker value={value} mode="date" onChange={handleChangeDate} />
      )}
    </Container>
  );
};
