import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValueType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

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
    addTodoList: (title: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
};

export function Todolist(props: TodolistPropsType) {

    const handlerCreator = (filter: FilterValueType) => {
        return () => props.changeTodoListFilter(filter, props.todoListId)
    };
    const getTaskListItem = (t: TaskType) => {

        const removeTask = () => props.removeTask(t.id, props.todoListId);
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListId);

        const chageTaskTitle = (title: string) =>
            props.changeTaskTitle(t.id, title, props.todoListId)

        return (
            <li key={t.id} className={t.isDone ? 'isDone' : ''}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeTaskStatus}
                />
                {/*<span>{t.title}</span>*/}
                <EditableSpan title={t.title} changeTitle={chageTaskTitle}/>
                <button onClick={removeTask}>x</button>
            </li>
        )
    }

    const tasksList = props.tasks.length
        ? <ul>{props.tasks.map(getTaskListItem)}</ul>
        : <span>Список пуст...</span>

    const addTaskHandler = (title: string) => {
        props.addTask(title, props.todoListId)
    };
    const removeTodoList = () => props.removeTodoList(props.todoListId);
    const changeTodoListTitle = (title: string) => {
    props.changeTodoListTitle(title, props.todoListId)
    }

    //Возвращение JSX разметки
    return (
        <div>
            <h2>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
                <button onClick={removeTodoList}>x</button>
            </h2>
            <AddItemForm addItem={addTaskHandler}/>
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