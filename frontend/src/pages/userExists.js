const InvalidUserSignup = () => {
    return (
        <div className="flex justify-center mt-11">
            <h2>User Already exist!</h2>
            <a href="/sign-in" className="text-blue-400 underline ml-2" >Click Here to Sign in</a>
        </div>
    )
}

export default InvalidUserSignup