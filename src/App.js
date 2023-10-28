import React, { useState, useEffect } from 'react';
import Form from "./components/Form";
import Todo from "./components/Todo";
import FilterButton from "./components/FilterButton";
import {nanoid} from 'nanoid';
import { ToggleDarkMode } from './components/ToggleDarkMode';

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {

  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All')

  useEffect(() =>{
    const savedTasks = JSON.parse(
      localStorage.getItem('to-do-app-data')
    )
    // console.log('Saved tasks:', savedTasks);
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('to-do-app-data', JSON.stringify(tasks));
    // console.log('Tasks saved to local storage', tasks)
  }, [tasks])

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => 

      <Todo 
      key={task.id} 
      id={task.id} 
      name={task.name} 
      completed={task.completed}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask = {deleteTask}
      editTask = {editTask}
      />
      );

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton 
      key={name} 
      name={name} 
      isPressed={name === filter}
      setFilter={setFilter}/>
  ));

  function addTask(name) {
    const newTask = {id: `todo-${nanoid()}`, name, completed: false}
    setTasks([...tasks, newTask])
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks)
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id)
    setTasks(remainingTasks)
  }
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  
   function editTask(id, newName){
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
   }
  
  const [ darkMode, setDarkMode ] = useState(false);
 
 
   return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className={`todoapp stack-large ${darkMode && 'dark-mode'}`}>
        <header>
          <h1>TodoMatic</h1>
          <ToggleDarkMode toggleDarkMode={setDarkMode}/>
        </header>
        
        <Form onSubmit={addTask}/>
        <div className="filters btn-group stack-exception">
          {filterList}
        </div>
        <div className="tasks-remaining">
        <h2 id="list-heading">{headingText}</h2>
        </div>
        
        <ul
          className="todo-list stack-large stack-exception"
          aria-labelledby="list-heading">
          {taskList}
        </ul>
      </div>
    </div>
  );
}

export default App;
