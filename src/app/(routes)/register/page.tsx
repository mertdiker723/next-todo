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

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Register = async ({ searchParams }: PageProps) => {
    const handleRegister = async (formData: FormData) => {
        "use server";
        const res = await apiRequest(`${process.env.NEXT_PUBLIC_BASE_URL}/api/register`, "POST", {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
        });
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
    const { message } = await searchParams;


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
                {message && (
                    <p className="text-red-700">{message}</p>
                )}
            </form>
        </div>
    );
};

export default Register;
