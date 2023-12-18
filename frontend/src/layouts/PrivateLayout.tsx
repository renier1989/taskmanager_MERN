import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"

function PrivateLayout() {
    const { auth } = useAuth()

    return (
        <div>
            {auth._id ? <Outlet /> : <Navigate to={'/'} />}
        </div>
    )
}

export default PrivateLayout