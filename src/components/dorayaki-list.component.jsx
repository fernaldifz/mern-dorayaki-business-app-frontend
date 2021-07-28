import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dorayaki = (props) => (
  <tr>
    <td>{props.dorayaki.rasa}</td>
    <td>{props.dorayaki.deskripsi}</td>
    <td>
      <img src={props.dorayaki.gambar} width="200" height="200" />
    </td>
    <td>{props.dorayaki.harga}</td>
    <td>
      <Link to={"/editDorayaki/" + props.dorayaki._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteDorayaki(props.dorayaki._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class DorayakiList extends Component {
  constructor(props) {
    super(props);

    this.deleteDorayaki = this.deleteDorayaki.bind(this);

    this.state = { listDorayaki: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/dorayaki/")
      .then((response) => {
        this.setState({ listDorayaki: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteDorayaki(id) {
    axios
      .delete("http://localhost:5000/dorayaki/" + id)
      .then((res) => console.log(res.data));
    this.setState({
      listDorayaki: this.state.listDorayaki.filter((el) => el._id !== id),
    });
  }

  dorayakiList() {
    return this.state.listDorayaki.map((currentdorayaki) => {
      return (
        <Dorayaki
          dorayaki={currentdorayaki}
          deleteDorayaki={this.deleteDorayaki}
          key={currentdorayaki._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Variasi Rasa Dorayaki</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Rasa</th>
              <th>Deskripsi</th>
              <th>Gambar</th>
              <th>Harga</th>
            </tr>
          </thead>
          <tbody>{this.dorayakiList()}</tbody>
        </table>
      </div>
    );
  }
}
