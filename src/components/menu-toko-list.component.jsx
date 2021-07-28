import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MenuToko = (props) => (
  <tr>
    <td>{props.tokoDorayaki.nama}</td>
    <td>
      {props.tokoDorayaki.menu.length > 0
        ? props.tokoDorayaki.menu.map((currentmenu, indeks) =>
            indeks == 0
              ? currentmenu.rasa +
                " (" +
                currentmenu.persediaan +
                "/" +
                currentmenu.kapasitas +
                ")"
              : ", " +
                currentmenu.rasa +
                " (" +
                currentmenu.persediaan +
                "/" +
                currentmenu.kapasitas +
                ")"
          )
        : "-"}
    </td>
    <td>
      <Link to={"/editMenu/" + props.tokoDorayaki._id}>edit menu</Link> |{" "}
      <Link to={"/deleteMenu/" + props.tokoDorayaki._id}>delete menu</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          const tokoDorayaki = {
            nama: props.tokoDorayaki.nama,
            jalan: props.tokoDorayaki.jalan,
            kecamatan: props.tokoDorayaki.kecamatan,
            provinsi: props.tokoDorayaki.provinsi,
            tanggal: props.tokoDorayaki.tanggal,
            menu: [],
          };

          console.log(tokoDorayaki);

          axios
            .post(
              "http://localhost:5000/tokoDorayaki/update/" +
                props.tokoDorayaki._id,
              tokoDorayaki
            )
            .then((res) => console.log(res.data));

          window.location = "/menu";
        }}
      >
        delete all menu
      </a>
    </td>
  </tr>
);

export default class MenuTokoList extends Component {
  constructor(props) {
    super(props);

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

  tokoDorayakiList() {
    return this.state.listTokoDorayaki.map((currenttokodorayaki) => {
      return (
        <MenuToko
          tokoDorayaki={currenttokodorayaki}
          key={currenttokodorayaki._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Data Menu Toko Dorayaki</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Nama Toko</th>
              <th>Menu Dorayaki [Format: Rasa(Persediaan/Kapasitas)]</th>
            </tr>
          </thead>
          <tbody>{this.tokoDorayakiList()}</tbody>
        </table>
      </div>
    );
  }
}
