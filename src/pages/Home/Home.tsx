import { FC, useEffect } from "react";
//import Chat from "../../Chat";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import { RootState } from "../../redux/store";
import UserList from "../../components/UserList";

import { Button } from "react-bootstrap";
import { LogOutAsync } from "../../redux/features/Auth/AuthSlice";
import { NavigateFunction, useNavigate } from "react-router-dom";


const Home: FC = () => {
  const { user, isAuth } = useAppSelector((state: RootState) => state.auth);
  const { hubConnection, users } = useAppSelector((state: RootState) => state.Message)
  const dispatch = useAppDispatch();
  const UseNavigate: NavigateFunction = useNavigate();

  const LogOut = async () => {
    if (user.name && hubConnection?.state === "Connected") {
      try {
        // 1. Redux ile çıkış işlemini başlat
        await dispatch(LogOutAsync(user.name));

        // 2. Kullanıcıyı offline duruma getir ve backend'e bildir
        await hubConnection.invoke("SetUserOffline", user.connectionId);

        // 3. SignalR bağlantısını durdur (disconnect)
        await hubConnection.stop();
        console.log("Connection stopped successfully.");
      } catch (error) {
        console.error("Error during logout process: ", error);
      }
    } else {
      console.log("User is not logged in or connection is not in 'Connected' state.");
      UseNavigate("/");
    }
  };

  useEffect(() => {

    if (isAuth == false) {

      UseNavigate("/")
    }

  }, [isAuth, user])

  return (
    <div className="App d-flex align-items-start flex-column justify-content-start me-auto">
      <Button onClick={LogOut}>LogOut</Button>
      <header className="App-header ">
        {/* <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={SendMessage}>Mesaj Gönder</button> */}
        <div>
          <div className="UserList">
            <h2>Kullanıcılar</h2>
            <UserList Users={users} />
          </div>
          {/* <h2>Mesaj Listesi</h2>
          <ul>
            {messages?.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
            {/* <Chat chats={chats} /> */}
          {/*</ul> */}
        </div>
      </header>
    </div>
  );
};

export default Home;
