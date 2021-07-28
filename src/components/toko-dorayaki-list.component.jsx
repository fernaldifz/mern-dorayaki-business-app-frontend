import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TokoDorayaki = (props) => (
  <tr>
    <td>{props.tokoDorayaki.nama}</td>
    <td>{props.tokoDorayaki.jalan}</td>
    <td>{props.tokoDorayaki.kecamatan}</td>
    <td>{props.tokoDorayaki.provinsi}</td>
    <td>{props.tokoDorayaki.tanggal.substring(0, 10)}</td>
    <td>
      <Link to={"/editToko/" + props.tokoDorayaki._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteTokoDorayaki(props.tokoDorayaki._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class TokoDorayakiList extends Component {
  constructor(props) {
    super(props);

    this.deleteTokoDorayaki = this.deleteTokoDorayaki.bind(this);

    this.state = { listTokoDorayaki: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/tokoDorayaki/")
      .then((response) => {
        this.setState({ listTokoDorayaki: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteTokoDorayaki(id) {
    axios
      .delete("http://localhost:5000/tokoDorayaki/" + id)
      .then((res) => console.log(res.data));
    this.setState({
      listTokoDorayaki: this.state.listTokoDorayaki.filter(
        (el) => el._id !== id
      ),
    });
  }

  tokoDorayakiList() {
    return this.state.listTokoDorayaki.map((currenttokodorayaki) => {
      return (
        <TokoDorayaki
          tokoDorayaki={currenttokodorayaki}
          deleteTokoDorayaki={this.deleteTokoDorayaki}
          key={currenttokodorayaki._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Data Toko Dorayaki</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Nama Toko</th>
              <th>Jalan</th>
              <th>Kecamatan</th>
              <th>Provinsi</th>
              <th>Tanggal Berdiri</th>
            </tr>
          </thead>
          <tbody>{this.tokoDorayakiList()}</tbody>
        </table>
      </div>
    );
  }
}
