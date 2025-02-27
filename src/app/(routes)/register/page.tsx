import Link from "next/link";
import { redirect } from "next/navigation";

// Common
import Input from "@/app/common/Input";
import SubmitButton from "@/app/common/SubmitButton";

// Lib
import { apiRequest } from "@/lib/helpers";
import { createCookie } from "@/lib/auth";

// Styles
import "./Style.scss";

const Register = async ({ searchParams }: { searchParams?: { error?: string } }) => {
    const handleRegister = async (formData: FormData) => {
        "use server";
        const res = await apiRequest(`${process.env.NEXT_PUBLIC_BASE_URL}/api/register`, {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
        }, "POST");
        const data = await res.json();
        const { token } = data as { token: string };

        if (res.ok && token) {
            await createCookie(token);
            redirect("/");
        } else {
            const data = await res.json();
            redirect(`/register?error=${encodeURIComponent(data.message)}`);
        }
    };

    const { error } = await Promise.resolve(searchParams) || {};

    return (
        <div className="register-container">
            <form className="form-elements" action={handleRegister}>
                <Link href="/login" className="link-route">
                    Back
                </Link>
                <Input
                    label="Name"
                    type="text"
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
                <SubmitButton label="Register" />
                {error && (
                    <p className="text-red-700">{decodeURIComponent(error)}</p>
                )}
            </form>
        </div>
    );
};

export default Register;
