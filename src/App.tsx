import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = 'all' | 'active' | 'completed';

type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

type TaskStateTypeType = {
    [todoListId: string]: Array<TaskType>;
}

function App() {
    const todoListId_1 = v1();
    const todoListId_2 = v1();

    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'},
    ]);
    const [tasks, setTasks] = useState<TaskStateTypeType>({
        [todoListId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'RTK', isDone: false}
        ],
        [todoListId_2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Cheese', isDone: true},
            {id: v1(), title: 'Water', isDone: false},
            {id: v1(), title: 'Egs', isDone: false},
            {id: v1(), title: 'Meat', isDone: false}
        ]
    });
    const [filter, setFilter] = useState<FilterValueType>('all');

    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({
                ...tasks, // Делаем копию объекта
                [todoListId]: [newTask, // в новый массив добавляем новую таску(newTask)
                    ...tasks[todoListId]] // и добавляем копию оставшегося массива
            }
        );
    };
    const removeTask = (taskId: string, todoListId: string) => {
        setTasks({
            ...tasks, // Делаем копию объекта{...tasks}
            [todoListId]: // в объекте надо внести изменение в свойство [todoListId] - (todoListId пере затрется)
                tasks[todoListId]  // И положить отфильтрованный массив тасок которые принадлежали этому тудулисту
                    .filter(t => t.id !== taskId)
        }) //
    };
    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        setTasks({
            ...tasks, //делаем копию объекта
            [todoListId]: tasks[todoListId] // внутри объекта цепляем конкретный массив [todoListId] и возьмем тот массив, который был и мапаем
                .map(t => t.id === taskId ? {...t, isDone} : t)
        })
    };
    const changeTodoListFilter = (filter: FilterValueType, todoListId: string) => {
        setTodoLists(todoLists.map(t => t.id === todoListId ? {...t, filter: filter} : t));
    };
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(t => t.id !== todoListId))
        delete tasks[todoListId]
    };
    const getFilteredTasks = (t: TaskType[], f: FilterValueType) => {
        let taskForTodoList = t;
        switch (f) {
            case "active":
                taskForTodoList = t.filter(t => !t.isDone);
                break
            case "completed":
                taskForTodoList = t.filter(t => t.isDone);
        }
        return taskForTodoList;
    };

    const todoListComponents = todoLists.map(tl => {
        return (
            <Todolist
                key={tl.id}
                todoListId={tl.id}
                tasks={getFilteredTasks(tasks[tl.id], tl.filter)}
                title={tl.title}
                filter={tl.filter}

                addTask={addTask}
                removeTask={removeTask}
                removeTodoList={removeTodoList}
                changeTaskStatus={changeTaskStatus}
                changeTodoListFilter={changeTodoListFilter}
            />
        )
    })

    return (
        <div className={'App'}>
            {todoListComponents}
        </div>
    )
}

export default App;