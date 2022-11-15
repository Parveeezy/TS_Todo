import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

const EditableSpan = (props: EditableSpanPropsType) => {
    let [title, setTitle] = useState<string>(props.title);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const onEditMode = () => {
        setIsEditMode(true)
    }
    const offEditMode = () => {
        setIsEditMode(false)
        props.changeTitle(title)
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    };

    return (
        isEditMode
            ? <input
                autoFocus
                onBlur={offEditMode}
                value={title}
                onChange={onChangeInputHandler}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
};

export default EditableSpan;