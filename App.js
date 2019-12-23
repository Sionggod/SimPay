import React, { useState } from 'react';
import { StyleSheet, Text, View ,TextInput, Button, ScrollView, FlatList} from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCoursegoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState('');
  

  const addGoalHandler = goalTitle => {
    setCoursegoals(currentGoals => [...courseGoals, 
      { id: Math.random().toString(), value: goalTitle }
    ]);
    setIsAddMode(false);
  };

  const removeGoalHandler = goalId => {
    setCoursegoals(currentGoals => {
        return currentGoals.filter((goal) => goal.id !== goalId);
    });
  };

  const CancelGoalAddHandler = () => {
    setIsAddMode(false);
  };

  return (
    <ScrollView>
    <View style={styles.screen}>
      <Button title="Add New Card" onPress={() => setIsAddMode(true)}/>
      <GoalInput visible={isAddMode} onAddGoal={addGoalHandler} onCancel={CancelGoalAddHandler}/>
        <FlatList 
          keyExtractor={(item, index) => item.id}
          data={courseGoals} 
          renderItem={itemData => (
          <GoalItem 
            id={itemData.item.id} 
            onDelete={removeGoalHandler} 
            title={itemData.item.value} 
            />
          )}

        />
    </View>
    </ScrollView> 
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
  

});


