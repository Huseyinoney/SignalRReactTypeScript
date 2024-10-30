import { FC } from "react";
import { User } from "../types/types";
import UserListObject from "./UserListObject";
import { useAppSelector } from "../redux/Hooks";
import { RootState } from "../redux/store";

interface UserList {
    Users?: User[]; // Users is optional
}

const UserList: FC<UserList> = ({ Users = [] }) => {
    const { user } = useAppSelector((state: RootState) => state.auth);

    return (
        <div className="UserList">
            {Array.isArray(Users) && Users.length > 0 ? ( // Check if Users is an array
                Users.filter((u: User) => u.id !== user.id).map((filteredUser: User, index: number) => (
                    
                    <UserListObject key={index} userProp={filteredUser} />
                ))
            ) : (
                <p>No users available.</p> // Handle when Users is not an array or empty
            )}
        </div>
    );
}

export default UserList;
