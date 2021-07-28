import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class AddMenuTokoDorayaki extends Component {
  constructor(props) {
    super(props);

    this.onChangeToko = this.onChangeToko.bind(this);
    this.onChangeDorayaki = this.onChangeDorayaki.bind(this);
    this.onChangePersediaan = this.onChangePersediaan.bind(this);
    this.onChangeKapasitas = this.onChangeKapasitas.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      listDorayaki: [],
      rasaDorayaki: "",
      persediaanDorayaki: 0,
      kapasitasDorayaki: 0,
      menu: [],
      listToko: [],
      indeksToko: 0,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/tokoDorayaki/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            listToko: response.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/dorayaki/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            listDorayaki: response.data.map((dorayaki) => dorayaki.rasa),
            rasaDorayaki: response.data[0].rasa,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeToko(e) {
    this.setState({
      indeksToko: e.target.value,
    });
  }

  onChangeDorayaki(e) {
    this.setState({
      rasaDorayaki: e.target.value,
    });
  }

  onChangePersediaan(e) {
    this.setState({
      persediaanDorayaki: e.target.value,
    });
  }

  onChangeKapasitas(e) {
    this.setState({
      kapasitasDorayaki: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const addMenu = {
      rasa: this.state.rasaDorayaki,
      persediaan: this.state.persediaanDorayaki,
      kapasitas: this.state.kapasitasDorayaki,
    };

    const newMenu = this.state.listToko[this.state.indeksToko].menu.slice();

    newMenu.push(addMenu);

    const tokoDorayaki = {
      nama: this.state.listToko[this.state.indeksToko].nama,
      jalan: this.state.listToko[this.state.indeksToko].jalan,
      kecamatan: this.state.listToko[this.state.indeksToko].kecamatan,
      provinsi: this.state.listToko[this.state.indeksToko].provinsi,
      tanggal: this.state.listToko[this.state.indeksToko].tanggal,
      menu: newMenu,
    };

    console.log(tokoDorayaki);

    axios
      .post(
        "http://localhost:5000/tokoDorayaki/update/" +
          this.state.listToko[this.state.indeksToko]._id,
        tokoDorayaki
      )
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Add Menu Toko Dorayaki</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Nama toko: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.indeksToko}
              onChange={this.onChangeToko}
            >
              {this.state.listToko.map(function (toko, indeks) {
                return (
                  <option key={toko.nama} value={indeks}>
                    {toko.nama}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Rasa dorayaki: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.rasaDorayaki}
              onChange={this.onChangeDorayaki}
            >
              {this.state.listDorayaki.map(function (dorayaki) {
                return (
                  <option key={dorayaki} value={dorayaki}>
                    {dorayaki}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Persediaan dorayaki: </label>
            <input
              type="number"
              className="form-control"
              value={this.state.persediaanDorayaki}
              onChange={this.onChangePersediaan}
              min="0"
              max={this.state.kapasitasDorayaki}
            />
          </div>
          <div className="form-group">
            <label>Kapasitas dorayaki: </label>
            <input
              type="number"
              className="form-control"
              value={this.state.kapasitasDorayaki}
              onChange={this.onChangeKapasitas}
              min="0"
            />
          </div>
          <br />
          <div className="form-group">
            <input
              type="submit"
              value="Add Menu Toko Dorayaki"
              className="btn btn-primary"
            />
            &nbsp;
            <Link to="/">
              <button
                className="btn btn-danger
            "
              >
                Cancel
              </button>{" "}
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
