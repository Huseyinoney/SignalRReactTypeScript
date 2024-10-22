import {FC} from "react";

interface IChat {
    chats:string[]
}
const Chat: FC<IChat> = ({ chats }) => {

    return (
        <div className="AllChats">
            {chats?.map((item: string, index: number) => {
                return (
                    <li key={index}>{item}</li>
                )
            })}
        </div>
            
    )

}
export default Chat