
// Components
import TodoForm from '@/app/components/todo/TodoForm';
import TodoList from '@/app/components/todo/TodoList';

// Styles
import './Style.scss';

const Todo = () => {
    return (
        <div>
            <TodoForm />
            <TodoList />
        </div>
    )
}

export default Todo