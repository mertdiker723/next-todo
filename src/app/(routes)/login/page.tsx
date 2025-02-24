// Common
import Input from "@/app/common/Input"

// Styles
import "./Style.scss"
import Button from "@/app/common/Button"
import Link from "next/link"

const Login = () => {
  return (
    <div className="login-container">
      <form className="flex flex-col form-elements">
        <Input
          label="Email"
          type="email"
          required
        />
        <Input
          label="Password"
          type="password"
          customClass="mt-3"
          required
        />
        <Button
          title="Sign In"
          type="submit"
          widthFull
          customClass="btn-primary mt-4 mb-5"
        />
        <Link href="/register" className="link-route">
          Register
        </Link>
      </form>
    </div>
  )
}

export default Login