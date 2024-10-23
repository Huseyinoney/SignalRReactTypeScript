import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { RootState } from "../redux/store";
import { SendMessageToUserAsync } from "../redux/features/Message/MessageSlice";
import { Chat } from "../types/types";
interface UserProp {
    toUserId: string
}

const UserChat: FC<UserProp> = ({ toUserId }) => {
    const [message, setMessage] = useState<string>("")
    const [messages, setMessages] = useState<string[]>([])

    const { user } = useAppSelector((state: RootState) => state.auth);
    const { hubConnection } = useAppSelector((state: RootState) => state.signalR)
    const dispatch = useAppDispatch()

    const SendMessage = () => {
        if(user.id)
        dispatch(SendMessageToUserAsync({UserId: user.id,ToUserId:toUserId,Message:message}))
        setMessage("")

    }
   
    return (
        <div className="main">

            <input value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={SendMessage}>Mesaj Gönder</button>
            <div>{toUserId + " " + user.connectionId}</div>
            <div>
            <ul>
            {messages.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
           
          </ul>
            </div>

        </div>
    )
}

export default UserChat