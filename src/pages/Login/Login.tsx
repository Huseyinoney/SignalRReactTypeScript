import { FC, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import { ClearOldMessageState, LoginAsync } from "../../redux/features/Auth/AuthSlice";
import { shallowEqual } from "react-redux";


const Login: FC = () => {

    const UseNavigate: NavigateFunction = useNavigate()
    const [Username, setUsername] = useState<string>("")
    const dispatch = useAppDispatch()
    const { Message, isAuth } = useAppSelector((state: RootState) => ({
        Message: state.auth.Message,
        isAuth: state.auth.isAuth
    }), shallowEqual
    );

    const LoginFunction = () => {
        dispatch(LoginAsync(Username))
    }

    useEffect(() => {

        if (isAuth == true) {
            UseNavigate("/Home")
        }
        else {
            if (Message != null) {
                alert(Message)
                dispatch(ClearOldMessageState())
                setUsername("")
            }
        }
    }, [isAuth, Message])

    return (
        <div className="Main">
            <input value={Username} onChange={(e) => { setUsername(e.target.value) }} />
            <button onClick={LoginFunction}>Giriş Yap</button>
        </div>
    )
}
export default Login

