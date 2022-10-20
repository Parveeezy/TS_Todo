import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";


export type FilterValueType = 'all' | 'active' | 'completed';

function App() {

    const todoListTitle = 'What to learn?';

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'RTK', isDone: false}
    ]);

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([newTask, ...tasks]);
    }
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId));
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone} : t))
    }

    const [filter, setFilter] = useState<FilterValueType>('all');

    const changeFilter = (filter: FilterValueType) => {
        setFilter(filter);
    }

    const getFilteredTasks = (t: TaskType[], f: FilterValueType) => {
        let taskForTodoList = tasks;
        switch (f) {
            case "active":
                taskForTodoList = t.filter(t => !t.isDone);
                break
            case "completed":
                taskForTodoList = t.filter(t => t.isDone);
        }
        return taskForTodoList;
    }

    return (
        <div className={'App'}>
            <Todolist title={todoListTitle}
                      tasks={getFilteredTasks(tasks, filter)}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
            />
        </div>
    )

}

export default App;