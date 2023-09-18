import React, {useState} from 'react';
import Form from "./components/Form";
import Todo from "./components/Todo";
import FilterButton from "./components/FilterButton";
import {nanoid} from 'nanoid';

function App(props) {

  const [tasks, setTasks] = useState(props.tasks);

  const taskList = tasks.map((task) => 
    <li>
      <Todo 
      key={task.id} 
      id={task.id} 
      name={task.name} 
      completed={task.completed}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask = {deleteTask}
      />
    </li>);

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
  
   
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
        <Form onSubmit={addTask}/>
        <div className="filters btn-group stack-exception">
          {/* <FilterButton />
          <FilterButton />
          <FilterButton /> */}
      </div>
      <div className="tasks-remaining">
      <h2 id="list-heading">{headingText}</h2>
      </div>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}
        
      </ul>
    </div>
  );
}
export default App;
