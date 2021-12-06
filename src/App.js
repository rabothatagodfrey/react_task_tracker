import Header from "./componants/Header";
import Tasks from "./componants/Tasks";
import { useState,useEffect } from "react"
import AddTask from "./componants/AddTask";


function App() {

  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks,setTasks] = useState([])

  useEffect(()=>{

    const getTasks = async() => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  },[])

  // Fetch Tasks
  const fetchTasks = async ()  => {
    const res = await fetch ('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  //Add Task 
  const addTask = (task) => { 
    const id = Math.floor(Math.random() * 100) + 1
    const newTask = {id, ...task}
    setTasks ([...tasks,newTask])
  }

  //Delete task 

  const deleteTask = async (id) =>{

    await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'DELETE'
    })

    setTasks(tasks.filter((task)=> task.id !== id))

  }
  //Toggle Reminder
  const toggleReminder = (id) => {

    //means copy everything on task but change the reminder to opposite eg.. if reminder is true the let it be opposite which means false

    setTasks(tasks.map((task)=> 
      task.id === id ? {...task,reminder: 
      !task.reminder }: task))
  }
   

  return (
    <div className="container">
     <Header  onAdd = {()=>setShowAddTask 
      (!showAddTask)} 
      showAdd = {showAddTask}/>
           
     {showAddTask && <AddTask onAdd = {addTask} />}
     
     {tasks.length> 0 ? <Tasks tasks = {tasks} onDelete = {deleteTask}
      onToggle = {toggleReminder} 
     />: ('No Tasks Today')}

    </div>
  );
}

export default App;
