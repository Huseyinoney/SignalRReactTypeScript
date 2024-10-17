import { FC } from "react";
import { User } from "../types/types";
import { Button } from "react-bootstrap";

interface UserProp {
    userProp: User,

}

const UserListObject: FC<UserProp> = ({ userProp }) => {

    return (
        <div className="UserListObject">
            <Button variant="success">
                {[userProp.name + " ", userProp.id + " ", userProp.status]}
            </Button>
        </div>
    )
}

export default UserListObject