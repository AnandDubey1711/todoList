import "./App.css";
import TaskForm from './TaskForm';
import Task from "./Task";
import { useEffect, useState } from "react";
function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    setTasks(tasks || []);
  }, []);


   function addTask(name) {
    setTasks(prev => {
      return [...prev, {name:name,done:false}];
    });
  }

  function updateTasksDone(taskIndex, newDone){
    setTasks(prev=>{
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }

  function getMessage(){
    const percentage = numberComplete/totalTasks*100;
    if(percentage===0){
      return 'Try to do atleast one! 🙏'
    }
    else if(percentage===100){
      return 'Nice job for today! 🔥';
    }
    else{
      return 'Keep it going! 💪';
    }
  }

  
  function removeTask(indexToRemove) {
    setTasks(prev => {
      return prev.filter((taskObject,index) => index !== indexToRemove);
    });
  }

function renameTasks(index,newName){
  setTasks(prev=>{
    const newTasks = [...prev];
    newTasks[index].name = newName;
    return [...prev];
  })
}

  // To get details of the tasks we are doing
  const numberComplete = tasks.filter(t=>t.done).length;
  const totalTasks = tasks.length;
  
  return (
    <main>
    <h1>{numberComplete}/{totalTasks} of task completed</h1>
    <h2>{getMessage()}</h2>
     <TaskForm onAdd={addTask}/>
      {tasks.map((task, index)=>(
        <Task {...task} 
        onRename={newName=> renameTasks(index,newName)}
        onTrash={() => removeTask(index)}
        onToggle={done=>updateTasksDone(index,done)}       
        />
      ))}
    </main>
  );
}

export default App;
