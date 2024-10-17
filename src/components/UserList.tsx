import { FC } from "react"
import { User } from "../types/types"
import UserListObject from "./UserListObject"
import { useAppSelector } from "../redux/Hooks"
import { RootState } from "../redux/store";
interface UserList {
    Users: User[]
}
const UserList: FC<UserList> = ({ Users }) => {

    const { user } = useAppSelector((state: RootState) => state.auth);

    return (
        <div className="UserList">
            {Users.filter((u: User) => u.id !== user.id).map((filteredUser: User, index: number) => {
                return (

                    <UserListObject key={index} userProp={filteredUser} />
                )
            })}
        </div>
    )
}
export default UserList