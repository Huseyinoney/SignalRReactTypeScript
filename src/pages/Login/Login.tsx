import { FC, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import { ClearOldMessageState, LoginAsync } from "../../redux/features/Auth/AuthSlice";
import { createHubConnection } from "../../redux/features/Message/chatThunks";



const Login: FC = () => {

    const UseNavigate: NavigateFunction = useNavigate()
    const [Username, setUsername] = useState<string>("")
    const dispatch = useAppDispatch()
    const { hubConnection } = useAppSelector((state: RootState) => state.Message)
    const { user, isAuth, Message } = useAppSelector((state: RootState) => state.auth);


    const LoginFunction = () => {

        dispatch(LoginAsync(Username))
    }

    useEffect(() => {

        if (isAuth == true && user.id) {
            dispatch(createHubConnection(user.id))
            UseNavigate("/Home")
            //hubConnection?.invoke("Connect", user.id);
            console.log(user)
        }
        else {
            if (Message != null) {
                alert(Message)
                dispatch(ClearOldMessageState())
                setUsername("")
            }
        }
    }, [isAuth, Message, user, hubConnection, dispatch, UseNavigate])

    return (
        <div className="Main">
            <input value={Username} onChange={(e) => { setUsername(e.target.value) }} />
            <button onClick={LoginFunction}>Giriş Yap</button>
        </div>
    )
}
export default Login

