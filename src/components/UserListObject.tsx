import { FC, useState } from "react";
import { User } from "../types/types";
import { Button } from "react-bootstrap";
import UserChat from "./UserChat";

interface UserProp {
    userProp: User,

}

const UserListObject: FC<UserProp> = ({ userProp }) => {
    const [isSelected, setIsSeleted] = useState<boolean>(false)
    

    const SelectUserHandle = () => {

        setIsSeleted(!isSelected)
    }

    return (
        <div className="UserListObject">
            <Button variant="success" onClick={SelectUserHandle}>
                {[userProp.name + " ", userProp.id + " ", userProp.status]}
            </Button>
            {isSelected && <UserChat toUserId={userProp.id} />}

        </div>
    )
}

export default UserListObject