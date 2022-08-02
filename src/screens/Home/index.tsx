import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Checkbox, List, TextInput} from 'react-native-paper';
import {colors} from '../../commons/styles';
import {useQuery, useRealm} from '../../models/realm';
import {Task, TaskRepository, TaskSchema} from '../../models/tasks';

export const HomeScreen: React.FC = () => {
  const realm = useRealm();
  const tasks = useQuery<Task>('Task');

  const [task, setTask] = useState('');

  const addTask = (content: string) => {
    realm.write(() => {
      realm.create<Task>(TaskSchema.name, TaskRepository.create({content}));
    });
  };

  const updateTask = (item: Task) => {
    realm.write(() => {
      let saved = tasks.filter(t => (t._id = item._id))[0];
      saved.done = item.done;
      saved.content = item.content;
    });
  };

  return (
    <View>
      <View style={{padding: 16}}>
        <TextInput
          value={task}
          onChangeText={setTask}
          mode="outlined"
          label="task"
        />

        <Button
          mode="contained"
          style={{marginTop: 16}}
          onPress={() => addTask(task)}>
          salvar
        </Button>
      </View>

      <List.Section>
        <List.Subheader>Tasks</List.Subheader>
        {tasks.map(item => (
          <List.Item
            description={item.done ? 'concluída' : 'não concluida'}
            title={item.content}
            key={String(item._id)}
            left={() => (
              <Checkbox
                color={item.done ? colors.success : colors.error}
                status={item.done ? 'checked' : 'unchecked'}
                onPress={() => {
                  updateTask({...item.toJSON(), done: !item.done});
                }}
              />
            )}
          />
        ))}
      </List.Section>
    </View>
  );
};
