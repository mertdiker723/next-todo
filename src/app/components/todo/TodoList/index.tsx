import { cookies } from "next/headers";

// Models
import ITodo from "@/models/api/todo";

// Libs
import { apiRequest } from "@/lib/helpers"


const TodoList = async () => {
    const cookieStorage = await cookies();
    const token = cookieStorage.get("token")?.value;
    let todos = [];

    if (token) {
        const response = await apiRequest(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todo`, "GET", undefined, token);
        const data = await response.json();
        todos = data.todos;
    }

    return (
        <div className="max-w-sm mx-auto mt-3">
            <ul>
                {todos.map((todo: ITodo) => (
                    <li key={todo._id}>{todo.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default TodoList