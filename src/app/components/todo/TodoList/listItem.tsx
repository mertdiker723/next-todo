"use client";

import Button from "@/app/common/Button";
import ITodo from "@/models/api/todo";

type ListItemProps = {
    todo: ITodo;
    token: string | undefined;
    onClick: (_id: string | undefined) => void;
}

const ListItem = ({ todo, onClick }: ListItemProps) => {
    const { title, description, _id } = todo || {};


    return (
        <li className="mt-2">
            {title} - Desc: {description}
            <Button type="button" title="Delete" customClass="btn-danger ml-2" onClick={() => onClick(_id)} />
        </li>
    )
}

export default ListItem