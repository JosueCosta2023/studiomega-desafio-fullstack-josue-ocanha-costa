import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"

const AuthCallBack = () => {

    const [params] = useSearchParams();
    const navigate = useNavigate()

    useEffect(() => {
        const token = params.get("token")

        if(token){
            localStorage.setItem("token", token)
            navigate("/painel")
        } else {    
            navigate("/login")
        }
    }, [params, navigate])
    return(
        <div>Redirecionando...</div>
    )
}

export default AuthCallBack