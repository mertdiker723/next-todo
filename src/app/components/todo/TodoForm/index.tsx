// Lib
import { apiRequest } from '@/lib/helpers';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

// Commons
import Input from '@/app/common/Input'
import ITodo from '@/models/api/todo';
import SubmitButton from '@/app/common/SubmitButton';
import { routeUrls } from '@/lib/routes';

const TodoForm = () => {
    const handleAction = async (formData: FormData) => {
        "use server";
        const cookieStorage = await cookies();
        const token = cookieStorage.get("token")?.value;

        const res = await apiRequest(`${process.env.NEXT_PUBLIC_BASE_URL}/api/todo`, "POST", {
            title: formData.get("todo"),
            description: formData.get("description"),
        }, token);
        if (!res.ok) {
            console.error("API isteği başarısız oldu:", res.status, await res.text());
            return;
        }
        const data = await res.json();
        const { todo } = data as { todo: ITodo };

        if (res.ok && todo) {
            revalidatePath(routeUrls.todoPath);
        }
    }
    return (
        <form className="max-w-sm mx-auto mt-3" action={handleAction}>
            <Input label='Todo' name='todo' required type='text' />
            <Input label='Description' name='description' type='text' />
            <SubmitButton label='Add Todo' />
        </form>
    )
}

export default TodoForm