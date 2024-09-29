import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
    return  (
    <div className="flex justify-center mt-11">
        <SignIn path="/sign-in" forceRedirectUrl={"/dashboard"} signUpUrl="/sign-up"/>
    </div>
    )
}