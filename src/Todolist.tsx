import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValueType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValueType) => void
    addTask: (title: string) => void
}

export function Todolist(props: TodolistPropsType) {

    let [title, setTitle] = useState<string>('')
    const handlerCreator = (filter: FilterValueType) => () => props.changeFilter(filter)
    const tasksList = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id)
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })
    const addTaskHandler = () => {
    const trimmedTitle = title.trim()
        if (trimmedTitle !== '') {
            props.addTask(trimmedTitle)
        }
        setTitle('')
    }
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
    const onEnterDownAddTask = (event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && addTaskHandler()

    return (
        <div>
            <h2>{props.title}</h2>
            <div>
                <input value={title}
                       onChange={onChangeInputHandler}
                       onKeyDown={onEnterDownAddTask}
                />
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button onClick={handlerCreator('all')}>All</button>
                <button onClick={handlerCreator('active')}>Active</button>
                <button onClick={handlerCreator('completed')}>Completed</button>
            </div>
        </div>
    )
}