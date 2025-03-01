import mongoose, { Schema } from "mongoose";

// Models
import ITodo from "@/models/api/todo";


const todoSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


const Todo = mongoose.models.Todo || mongoose.model<ITodo>('Todo', todoSchema);

export default Todo;