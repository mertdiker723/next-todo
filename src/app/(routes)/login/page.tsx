import { redirect } from "next/navigation"
import Link from "next/link"

// Common
import Input from "@/app/common/Input"
import SubmitButton from "@/app/common/SubmitButton"

// Lib
import { apiRequest } from "@/lib/helpers"

// Styles
import "./Style.scss"

const Login = async ({ searchParams }: { searchParams?: { error?: string } }) => {

  const handleLogin = async (formData: FormData) => {
    "use server";
    const res = await apiRequest(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
      email: formData.get("email"),
      password: formData.get("password"),
    }, "POST");

    if (res.ok) {
      redirect("/");
    } else {
      const data = await res.json();
      redirect(`/login?error=${encodeURIComponent(data.message)}`);
    }
  };

  const { error } = await Promise.resolve(searchParams) || {};

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
        {error && (
          <p className="text-red-700 mt-4">{decodeURIComponent(error)}</p>
        )}
      </form>
    </div>
  )
}

export default Login