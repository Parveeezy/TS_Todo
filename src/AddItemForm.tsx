import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {

    const [error, setError] = useState<boolean>(false);
    let [title, setTitle] = useState<string>('');

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(event.currentTarget.value);
    };

    const onEnterDownAddTask = (event: KeyboardEvent<HTMLInputElement>) =>
        event.key === 'Enter' && addTaskHandler();

    const addTaskHandler = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle !== '') {
            props.addItem(trimmedTitle);
        } else {
            setError(true);
        }
        setTitle('');
    };


    const errorMessage = error
        ? <div className={'errorMessage'}>Поле ввода не может быть пустым...</div>
        : null

    return (
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
    );
};

export default AddItemForm;