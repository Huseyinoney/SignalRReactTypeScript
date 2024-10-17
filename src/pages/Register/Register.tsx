import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import { ClearOldMessageState, RegisterAsync } from "../../redux/features/Auth/AuthSlice";
import { RootState } from "../../redux/store";
import { NavigateFunction, useNavigate } from "react-router-dom";

const Register: FC = () => {
    const [Username, setUsername] = useState<string>("")
    const dispatch = useAppDispatch()
    let { Message} = useAppSelector((state: RootState) => state.auth)
    const UseNavigate: NavigateFunction = useNavigate()
    const Register = () => {
        dispatch(RegisterAsync(Username))
    }

    useEffect(() => {
        if (Message != null) {
            alert(Message)
            dispatch(ClearOldMessageState())
            setUsername("")
            if(Message =="Kayıt İşlemi Başarılı") {
                UseNavigate("/")
            }
        }
    }, [Message])

    return (
        <div className="Main">
            <input value={Username} onChange={(e) => { setUsername(e.target.value) }} />
            <button onClick={Register}>Kayıt Ol</button>
        </div>
    )

}
export default Register