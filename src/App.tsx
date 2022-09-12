import React from 'react';
import './App.css';
import  {Todolist, TaskType} from "./Todolist";


function App() {

    const todoListTitle: string = 'What to learn'
    const tasks_1: Array<TaskType> = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: true},
    ]

    const todoListTitle_2: string = "What to buy"
    const tasks_2: Array<TaskType> = [
        {id: 4, title: "Beer", isDone: true},
        {id: 5, title: "Cheese", isDone: true},
        {id: 6, title: "Fish", isDone: false},
    ]

    return (
        <div className="App">
            <Todolist title={todoListTitle} tasks={tasks_1}/>
            <Todolist title={todoListTitle_2} tasks={tasks_2}/>
        </div>
    );
}


export default App;
