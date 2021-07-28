import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class EditMenuTokoDorayaki extends Component {
  constructor(props) {
    super(props);

    this.onChangeDorayaki = this.onChangeDorayaki.bind(this);
    this.onChangePersediaan = this.onChangePersediaan.bind(this);
    this.onChangeKapasitas = this.onChangeKapasitas.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      nama: "",
      jalan: "",
      kecamatan: "",
      provinsi: "",
      tanggal: new Date(),
      menu: [],
      indeksDorayaki: 0,
      persediaanDorayaki: 0,
      kapasitasDorayaki: 0,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/tokoDorayaki/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          nama: response.data.nama,
          jalan: response.data.jalan,
          kecamatan: response.data.kecamatan,
          provinsi: response.data.provinsi,
          tanggal: response.data.tanggal,
          menu: response.data.menu,
          persediaanDorayaki: response.data.menu[0].persediaan,
          kapasitasDorayaki: response.data.menu[0].kapasitas,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeDorayaki(e) {
    this.setState({
      indeksDorayaki: e.target.value,
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

    const tokoDorayaki = {
      nama: this.state.nama,
      jalan: this.state.jalan,
      kecamatan: this.state.kecamatan,
      provinsi: this.state.provinsi,
      tanggal: this.state.tanggal,
      menu: this.state.menu,
    };

    const editMenu = {
      rasa: this.state.menu[this.state.indeksDorayaki].rasa,
      persediaan: this.state.persediaanDorayaki,
      kapasitas: this.state.kapasitasDorayaki,
    };

    tokoDorayaki.menu[this.state.indeksDorayaki] = editMenu;

    console.log(tokoDorayaki);

    axios
      .post(
        "http://localhost:5000/tokoDorayaki/update/" +
          this.props.match.params.id,
        tokoDorayaki
      )
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Edit Menu Toko Dorayaki {this.state.nama}</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Rasa dorayaki: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.indeksDorayaki}
              onChange={this.onChangeDorayaki}
            >
              {this.state.menu.map(function (currentmenu, indeks) {
                return (
                  <option key={currentmenu.rasa} value={indeks}>
                    {currentmenu.rasa}
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
              value="Edit Menu Toko Dorayaki"
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
