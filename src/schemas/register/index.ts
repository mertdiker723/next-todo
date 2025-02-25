import mongoose, { Schema } from "mongoose";

// Register API
import IUser from "@/models/api/register";

const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;