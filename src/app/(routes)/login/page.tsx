import Link from "next/link";
import { redirect } from "next/navigation"

// Common
import Input from "@/app/common/Input";
import SubmitButton from "@/app/common/SubmitButton";

// Lib
import { apiRequest } from "@/lib/helpers";
import { createCookie } from "@/lib/auth";

// Styles
import "./Style.scss";

const Login = async ({ searchParams }: { searchParams?: { message?: string } }) => {
  const handleLogin = async (formData: FormData) => {
    "use server";
    const res = await apiRequest(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
      email: formData.get("email"),
      password: formData.get("password"),
    }, "POST");
    const data = await res.json();
    const { token } = data as { token: string };
    if (res.ok && token) {
      await createCookie(token)
      redirect('/');
    } else {
      redirect(`/login?message=${encodeURIComponent(data.message)}`);
    }
  };

  const { message } = await Promise.resolve(searchParams) || {};

  return (
    <div className="login-container">
      <form className="flex flex-col form-elements" action={handleLogin}>
        <Input
          label="Email"
          type="email"
          name="email"
          required
        />
        <Input
          label="Password"
          type="password"
          name="password"
          customClass="mt-3"
          required
        />
        <SubmitButton label="Login" />

        <Link href="/register" className="link-route">
          Register
        </Link>
        {message && (
          <p className="text-red-700 mt-4">{decodeURIComponent(message)}</p>
        )}
      </form>
    </div>
  );
};

export default Login;
