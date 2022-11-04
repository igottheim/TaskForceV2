import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Login";
import NavBar from "./NavBar";
import ChatRoom from "./Chatroom";
import SignUp from "./Signup";

function App() {
  // const [users, setUsers] = useState([]);
  const [user, setCurrentUser] = useState("")
  const [chatOpen, setChatOpen] = useState(null)

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setCurrentUser(user));
      }
    });
  }, []);

  // useEffect(() => {
  //   fetch("/users")
  //     .then((r) => r.json())
  //     .then((data) => setUsers(data));
  // }, []);

  console.log(user)

  return (
    <BrowserRouter>
      <div className="App">
      <NavBar user={user} setUser = {setCurrentUser} />
      {user ? (
        <Switch>
          <Route path="/testing">
      <button type="button" onClick={() => setChatOpen(prev => !prev)}>{chatOpen ? "Close Chat" : "Open Chat"}</button>
      {chatOpen ? <h1 user={user} /> : null}  
      {chatOpen ? <ChatRoom user={user} /> : null}  
          </Route>
          </Switch>
           ) : (
          <Switch>
            {/* <Route path="/signup">
          <SignUp setCurrentUser = {setCurrentUser}></SignUp>
          </Route> */}
          <Route path="/">
          <Login setCurrentUser = {setCurrentUser}></Login>
          </Route>

        </Switch>
           )}
      </div>

    </BrowserRouter>
  );
}

export default App;