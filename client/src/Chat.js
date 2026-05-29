import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5001");

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const username = "User-" + Math.floor(Math.random() * 1000);

  const sendMessage = () => {
    if (message.trim() === "") return;

    const messageData = {
      sender: username,
      content: message,
      timestamp: new Date().toLocaleTimeString(),
    };

    socket.emit("send_message", messageData);

    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  return (
    <div style={pageStyle}>
    <div style={styles.container}>
      <h2>Real-Time Chat</h2>

      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div key={index} style={styles.message}>
            <strong>{msg.sender}</strong>
            <p>{msg.content}</p>
            <small>{msg.timestamp}</small>
          </div>
        ))}
      </div>

      <div style={styles.inputArea}>
        <input
          type="text"
          placeholder="Type message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.input}
        />

        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
    </div>
  );
}
const pageStyle = { background: "linear-gradient(135deg,grey,white)", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", };
const styles = {
  container: {
    width: "400px",
    margin: "50px auto",
    fontFamily: "Arial",
  },
  chatBox: {
    border: "1px solid #ccc",
    height: "400px",
    overflowY: "scroll",
    padding: "10px",
    marginBottom: "10px",
  },
  message: {
    background: "#f1f1f1",
    padding: "8px",
    marginBottom: "8px",
    borderRadius: "5px",
  },
  inputArea: {
    display: "flex",
  },
  input: {
    flex: 1,
    padding: "10px",
  },
  button: {
    padding: "10px 20px",
  },
};

export default Chat;