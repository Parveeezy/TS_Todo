import React, {useState} from 'react';
import './App.css';
import {Todolist, TaskType} from "./Todolist";


export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    const todoListTitle: string = 'What to learn';

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
        {id: 5, title: 'RTK', isDone: false}
    ]);

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter((t) => t.id !== taskId))
    }

    const [filter, setFilter] = useState<FilterValuesType>('all')

    let tasksForTodoList = tasks;

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    switch (filter){
        case "active":
            tasksForTodoList = tasks.filter(t => !t.isDone);
            break
        case "completed":
            tasksForTodoList = tasks.filter(t => t.isDone)
            break
    }

    return (
        <div className="App">

            <Todolist tasks={tasksForTodoList}
                      title={todoListTitle}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
