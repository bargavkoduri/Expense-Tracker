const InvalidUserSignin = () => {
    return (
        <div className="flex justify-center mt-11">
            <h2>User Doesn't exist!</h2>
            <a href="/sign-up" className="text-blue-400 underline ml-2" >Click Here to Sign up</a>
        </div>
    )
}

export default InvalidUserSignin