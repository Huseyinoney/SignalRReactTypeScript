import { FC, useState } from "react";
import { User } from "../types/types";
import { Button, Container, Row, Col } from "react-bootstrap";
import UserChat from "./UserChat";

interface UserProp {
    userProp: User,
}

const UserListObject: FC<UserProp> = ({ userProp }) => {
    const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

    const handleToggleChat = () => setIsChatOpen(!isChatOpen);

    return (
        <Container className="d-flex mt-4">
            {/* Kullanıcı Bilgisi */}
            <Row className="d-flex">
                <Col md={4}>
                    <Button className="Userbutton" variant="success" onClick={handleToggleChat}>
                        {userProp.name + " " + userProp.status}
                    </Button>
                </Col>

                {/* UserChat Bileşeni Yan Tarafta Gösterilecek */}
                {isChatOpen && (
                    <Col md={8} className="border-start">
                        <div className="p-3">
                            <h5>Chat with {userProp.name}</h5>
                            <UserChat toUserId={userProp.id} />
                        </div>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default UserListObject;
