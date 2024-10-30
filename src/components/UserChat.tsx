import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { RootState } from "../redux/store";
import { SendMessageToUserAsync } from "../redux/features/Message/MessageSlice";
import { Chat } from "../types/types";

interface UserProp {
    toUserId: string
}

const UserChat: FC<UserProp> = ({ toUserId }) => {
    const [message, setMessage] = useState<string>("")
    const { user } = useAppSelector((state: RootState) => state.auth);
    const { messages } = useAppSelector((state: RootState) => state.Message)
    const dispatch = useAppDispatch()

    const SendMessage = () => {
        if (message && user.id) {
            dispatch(SendMessageToUserAsync({ UserId: user.id, ToUserId: toUserId, Message: message }))
            setMessage("")
        }
        else {
            alert("Mesaj alanı boş bırakılamaz");
        }
    }

    return (
        <div className="main">

            <input value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={SendMessage}>Mesaj Gönder</button>
            <div>{toUserId + " " + user.connectionId}</div>
            <div>
                <ul>

                    {messages?.filter((c: Chat) =>  (c.userId == user.id && c.toUserId == toUserId) || 
                            (c.userId == toUserId && c.toUserId == user.id)).map((item: Chat, index: number) => (
                        <li key={index}>{item.message}</li>

                    ))}

                </ul>
            </div>

        </div>
    )
}
export default UserChat