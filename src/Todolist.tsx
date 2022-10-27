import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValueType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
};
export type TodolistPropsType = {
    todoListId: string
    title: string
    tasks: TaskType[]
    filter: FilterValueType
    removeTask: (taskId: string, todoListId: string) => void
    changeTodoListFilter: (filter: FilterValueType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
};

export function Todolist(props: TodolistPropsType) {

    let [title, setTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const handlerCreator = (filter: FilterValueType) => {
        return () => props.changeTodoListFilter(filter, props.todoListId)
    };

    const getTaskListItem = (t: TaskType) => {

        const removeTask = () => props.removeTask(t.id, props.todoListId);
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListId);

        return (
            <li key={t.id} className={t.isDone ? 'isDone' : ''}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeTaskStatus}
                />
                <span>{t.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        )
    }

    const tasksList = props.tasks.length
        ? <ul>{props.tasks.map(getTaskListItem)}</ul>
        : <span>Список пуст...</span>

    const addTaskHandler = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle !== '') {
            props.addTask(trimmedTitle, props.todoListId);
        } else {
            setError(true);
        }
        setTitle('');
    };

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(event.currentTarget.value);
    };

    const onEnterDownAddTask = (event: KeyboardEvent<HTMLInputElement>) =>
        event.key === 'Enter' && addTaskHandler();

    const removeTodoList = () => props.removeTodoList(props.todoListId);

    const errorMessage = error
        ? <div className={'errorMessage'}>Поле ввода не может быть пустым...</div>
        : null

    //Возвращение JSX разметки
    return (
        <div>
            <h2>
                {props.title}
                <button onClick={removeTodoList}>x</button>
            </h2>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={title}
                    onChange={onChangeInputHandler}
                    onKeyDown={onEnterDownAddTask}
                />
                <button onClick={addTaskHandler}>+</button>
                {errorMessage}
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? 'activeBtn btn' : 'btn'}
                    onClick={handlerCreator('all')}
                >All
                </button>
                <button
                    className={props.filter === "active" ? 'activeBtn btn' : 'btn'}
                    onClick={handlerCreator('active')}
                >Active
                </button>
                <button
                    className={props.filter === "completed" ? 'activeBtn btn' : 'btn'}
                    onClick={handlerCreator('completed')}
                >Completed
                </button>
            </div>
        </div>
    )
}