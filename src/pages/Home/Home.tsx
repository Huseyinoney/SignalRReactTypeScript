import { FC, useEffect, useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
//import Chat from "../../Chat";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import { RootState } from "../../redux/store";
import UserList from "../../components/UserList";
import { Chat, User } from "../../types/types";
import { Button } from "react-bootstrap";
import { LogOutAsync } from "../../redux/features/Auth/AuthSlice";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { setHubConnection } from "../../redux/features/SignalRConnection/HubConnectionSlice";
import { createHubConnection } from "../../redux/features/Message/chatThunks";

const Home: FC = () => {
  const [message, setMessage] = useState<string>("");
  //const [messages, setMessages] = useState<string[]>([]);
  const [chats, setChats] = useState<string[]>([]);
  const { user, isAuth, Message } = useAppSelector((state: RootState) => state.auth);
  //const { hubConnection } = useAppSelector((state: RootState) => state.signalR)
  const { hubConnection,users,messages } = useAppSelector((state: RootState) => state.Message)
  //const [users, setUsers] = useState<User[]>([]);
  const dispatch = useAppDispatch();
  const UseNavigate: NavigateFunction = useNavigate();

  /*useEffect(() => {

    const CreateHubConnection = async () => {
      const newConnection = new HubConnectionBuilder()
        .withUrl("http://localhost:5150/chatHub")
        .configureLogging(LogLevel.Information)
        .build();

      newConnection.on("Users", (users: User[]) => {
        setUsers(users);
      });
      newConnection.on("ReceivedMessage", (message: string) => {
        setMessages((prevState => prevState.concat(message)));
      });
      newConnection.on("SendMessageToUser",(chat:Chat)=> {
        console.log(chat)
        setMessages((prevState => prevState.concat(chat.message+" "+chat.date)))
    })

      try {
        await newConnection.start();
        dispatch(setHubConnection(newConnection));
        newConnection.invoke("Connect", user.id);
      } catch (error) {
        console.error("Connection failed: ", error);
      }
    };

    if (!hubConnection || hubConnection.state !== "Connected") {
      CreateHubConnection();

    }
    return () => {
      if (hubConnection) {
        hubConnection.off("ReceivedMessage");
        hubConnection.off("Users");
        //hubConnection.stop();
      }
    };

  }, [user, hubConnection]);
  */



  // useEffect(() => {
  //   if (!hubConnection && user.id != null) {
  //     console.log(user,hubConnection)
  //     dispatch(createHubConnection(user.id));
  //   }
  // }, [dispatch, hubConnection,user]);



  const SendMessage = () => {
    if (hubConnection && message) {
      hubConnection.invoke("SendMessage", message);
      setMessage("");
    } else {
      alert("Mesaj alanı boş bırakılamaz");
    }
  };


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
    <div className="App">
      <header className="App-header">
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={SendMessage}>Mesaj Gönder</button>
        <div>
          <div className="UserList">
            <UserList Users={users} />
          </div>
          <h2>Mesaj Listesi</h2>
          <ul>
            {messages?.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
            {/* <Chat chats={chats} /> */}
          </ul>
        </div>
      </header>
      <Button onClick={LogOut}>LogOut</Button>
    </div>
  );
};

export default Home;
