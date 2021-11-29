import "./App.css";
import Create from "./components/Create/Create";
import Admin from "./components/Admin/Admin";
import "semantic-ui-css/semantic.min.css";
import { Menu, Image } from "semantic-ui-react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import logo from "./assets/images/navbar_logo.jpg";

function App() {

  // Handle navbar selections
  function handleNewQuoteNavSelection(){
    if(window.location.pathname === "/"){
      window.location.reload()
    }
  }

  function handleAdminPanelNavSelection(){
    if(window.location.pathname === "/admin"){
      window.location.reload()
    }
  }

  return (
      <BrowserRouter>
        <Menu className="fixed" size="massive" color="blue" inverted>
          <Image className="allstate-navbar-logo" src={logo} circular/>
          <Menu.Item header>Allstate Vehicle Insurance</Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item name="NEW QUOTE" as={Link} to="/" onClick={() => handleNewQuoteNavSelection()}/>
            <Menu.Item name="ADMIN PANEL" as={Link} to="/admin" onClick={() => handleAdminPanelNavSelection()}/>
          </Menu.Menu>
        </Menu>
        <div className="app-container">
          <div className="App">
            <div></div>
            <div>
              <Route exact path="/" component={Create} />
            </div>
            <div>
              <Route exact path="/admin" component={Admin} />
            </div>
          </div>
        </div>
      </BrowserRouter>
  );
}

export default App;
