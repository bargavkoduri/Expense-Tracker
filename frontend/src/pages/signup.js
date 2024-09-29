import { SignUp } from '@clerk/clerk-react'

export default function SignUpPage() {
    return (
        <div className="flex justify-center mt-11">
            <SignUp path="/sign-up" forceRedirectUrl={"/dashboard"} signInUrl='/sign-in'/>
        </div>
    )
}