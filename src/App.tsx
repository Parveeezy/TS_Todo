import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type TasksValueType = 'all' | 'active' | 'completed'

function App() {

    const todoListTitle = 'What to learn?'

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
        {id: 5, title: 'RTK', isDone: false}
    ]);

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    let taskForTodoList = tasks;

    const [filter, setFilter] = useState<TasksValueType>('all');

    const changeFilter = (filter: TasksValueType) => {
        setFilter(filter)
    }

    switch (filter) {
        case "active":
            taskForTodoList = tasks.filter(t => !t.isDone)
            break
        case "completed":
            taskForTodoList = tasks.filter(t => t.isDone)
    }

    return(
        <div className={'App'}>
            <Todolist title={todoListTitle}
                      tasks={taskForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    )

}

export default App;