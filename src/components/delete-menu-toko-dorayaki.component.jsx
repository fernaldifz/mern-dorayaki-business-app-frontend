import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class DeleteMenuTokoDorayaki extends Component {
  constructor(props) {
    super(props);

    this.onChangeDorayaki = this.onChangeDorayaki.bind(this);
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
      persediaanDorayaki: this.state.menu[e.target.value].persediaan,
      kapasitasDorayaki: this.state.menu[e.target.value].kapasitas,
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

    tokoDorayaki.menu.splice(this.state.indeksDorayaki, 1);

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
        <h3>Delete Menu Toko Dorayaki </h3>
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
            <label>Persediaan: {this.state.persediaanDorayaki}</label>
          </div>
          <div className="form-group">
            <label>Kapasitas: {this.state.kapasitasDorayaki}</label>
          </div>
          <br />
          <div className="form-group">
            <input
              type="submit"
              value="Delete Menu Toko Dorayaki"
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
