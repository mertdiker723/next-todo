import axios from "axios";
import Link from "next/link";

// Input
import Input from "@/app/common/Input";
import Button from "@/app/common/Button";

// Styles
import "./Style.scss";

const Register = () => {
    const handleRegister = async (formData: FormData) => {
        'use server';
        await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/register`, {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
        }).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <div className="register-container">
            <form className="form-elements" action={handleRegister}>
                <Link href="/" className="link-route">
                    Back
                </Link>
                <Input
                    label="Name"
                    type="name"
                    name="name"
                    customClass="mt-3"
                    required
                />
                <Input
                    label="Email"
                    type="email"
                    name="email"
                    customClass="mt-3"
                    required
                />
                <Input
                    label="Password"
                    type="password"
                    name="password"
                    customClass="mt-3"
                    required
                />
                <Button
                    title="Register"
                    type="submit"
                    widthFull
                    customClass="btn-primary mt-4 mb-5"
                />
            </form>
        </div>
    )
}

export default Register