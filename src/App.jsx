import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import TokoDorayakiList from "./components/toko-dorayaki-list.component";
import EditTokoDorayaki from "./components/edit-toko-dorayaki.component";
import CreateTokoDorayaki from "./components/create-toko-dorayaki.component";
import DorayakiList from "./components/dorayaki-list.component";
import EditDorayaki from "./components/edit-dorayaki.component";
import CreateDorayaki from "./components/create-dorayaki.component";
import MenuTokoList from "./components/menu-toko-list.component";
import EditMenuTokoDorayaki from "./components/edit-menu-toko-dorayaki.component";
import DeleteMenuTokoDorayaki from "./components/delete-menu-toko-dorayaki.component";
import AddMenuTokoDorayaki from "./components/add-menu-toko-dorayaki.component";
import SendDorayaki from "./components/send-dorayaki.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={TokoDorayakiList} />
        <Route path="/editToko/:id" component={EditTokoDorayaki} />
        <Route path="/createToko" component={CreateTokoDorayaki} />
        <Route path="/dorayaki" component={DorayakiList} />
        <Route path="/editDorayaki/:id" component={EditDorayaki} />
        <Route path="/createDorayaki" component={CreateDorayaki} />
        <Route path="/menu" component={MenuTokoList} />
        <Route path="/editMenu/:id" component={EditMenuTokoDorayaki} />
        <Route path="/deleteMenu/:id" component={DeleteMenuTokoDorayaki} />
        <Route path="/addMenu" component={AddMenuTokoDorayaki} />
        <Route path="/sendDorayaki" component={SendDorayaki} />
      </div>
    </Router>
  );
}

export default App;
// npm run dev
