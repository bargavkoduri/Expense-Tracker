import { useAuth } from "@clerk/clerk-react"
import { useEffect, useState } from "react"

const Dashboard = () => {
    const [token,setToken] = useState('')
    const {getToken} = useAuth()

    useEffect(() => {
        getToken().then(result => setToken(result))
    },[])

    useEffect(() => {
        if(token === '')
            return
        
    },[token])

    return (
        <div className="flex p-11">
            <div className="h-full">

            </div>
            <div>

            </div>
        </div>
    )
}

export default Dashboard