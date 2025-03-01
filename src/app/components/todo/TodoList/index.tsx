import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// Models
import ITodo from "@/models/api/todo";

// Libs
import { apiRequest } from "@/lib/helpers"
import ListItem from "./listItem";


const TodoList = async () => {
    const cookieStorage = await cookies();
    const token = cookieStorage.get("token")?.value;
    let todos = [];

    if (token) {
        const response = await apiRequest(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todo`, "GET", undefined, token);
        const data = await response.json();
        todos = data.todos;
    }

    const handleClick = async (_id: string | undefined) => {
        "use server"
        const res = await apiRequest(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todo`, "DELETE", { id: _id }, token);
        const data = await res.json();

        if (res.ok) {
            revalidatePath("/todo");
        } else {
            console.log(data.message);            
        }
    }

    return (
        <div className="max-w-sm mx-auto mt-3">
            <ul>
                {todos.map((todo: ITodo) => (
                    <ListItem key={todo._id} todo={todo} token={token} onClick={handleClick} />
                ))}
            </ul>
        </div>
    )
}

export default TodoList