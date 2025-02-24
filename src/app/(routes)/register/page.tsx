import Link from "next/link";

// Input
import Input from "@/app/common/Input";
import Button from "@/app/common/Button";

// Styles
import "./Style.scss";

const Register = () => {
    return (
        <div className="register-container">
            <form className="form-elements">
                <Link href="/" className="link-route">
                    Back
                </Link>
                <Input
                    label="Name"
                    type="name"
                    customClass="mt-3"
                    required
                />
                <Input
                    label="Email"
                    type="email"
                    customClass="mt-3"
                    required
                />
                <Input
                    label="Password"
                    type="password"
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