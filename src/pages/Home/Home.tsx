import { FC, useEffect, useState } from "react";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import Chat from "../../Chat";
import { useAppSelector } from "../../redux/Hooks";
import { RootState } from "../../redux/store";
import UserList from "../../components/UserList";
import { User } from "../../types/types";

const Home: FC = () => {
  const [hubConnection, setHubConnection] = useState<HubConnection>();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const [chats, setChats] = useState<string[]>([]);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const CreateHubConnection = async () => {
      const newConnection = new HubConnectionBuilder()
        .withUrl("http://localhost:5150/chatHub")
        .configureLogging(LogLevel.Information)
        .build();

      newConnection.on("ReceivedMessage", (message: string) => {
        setMessages((prevState => prevState.concat(message)));
      });

      newConnection.on("Users", (users: User[]) => {
        setUsers(users);
      });

      try {
        await newConnection.start();
        newConnection.invoke("Connect", user.id);
        setHubConnection(newConnection);
      } catch (error) {
        console.error("Connection failed: ", error);
      }
    };

    CreateHubConnection();

    return () => {
      if (hubConnection) {
        hubConnection.off("ReceivedMessage");
        hubConnection.off("Users");
        hubConnection.stop();
      }
    };
  }, [hubConnection]);

  const SendMessage = () => {
    if (hubConnection && message) {
      hubConnection.invoke("SendMessage", message);
      setMessage("");
    } else {
      alert("Mesaj alanı boş bırakılamaz");
    }
  };

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
            {messages.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
            <Chat chats={chats} />
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Home;
