import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          Stand With Dorayaki
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Toko Dorayaki
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/menu" className="nav-link">
                Menu Toko
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/dorayaki" className="nav-link">
                Dorayaki
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/createToko" className="nav-link">
                Create Toko Dorayaki
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/createDorayaki" className="nav-link">
                Create Dorayaki
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/addMenu" className="nav-link">
                Add Menu Toko Dorayaki
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/sendDorayaki" className="nav-link">
                Send Dorayaki
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
