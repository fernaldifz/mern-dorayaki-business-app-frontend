import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class SendDorayaki extends Component {
  constructor(props) {
    super(props);

    this.onChangePengirim = this.onChangePengirim.bind(this);
    this.onChangePenerima = this.onChangePenerima.bind(this);
    this.onChangeDorayakiDikirim = this.onChangeDorayakiDikirim.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeBanyakDorayakiDikirim =
      this.onChangeBanyakDorayakiDikirim.bind(this);

    this.state = {
      menuPengirim: [],
      indeksPengirim: 0,
      indeksPenerima: 1,
      indeksDorayakiPengirim: 0,
      listToko: [],
      persediaanDorayakiPengirim: 0,
      banyakDorayakiDikirim: 0,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/tokoDorayaki/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            listToko: response.data,
            menuPengirim: response.data[0].menu,
            persediaanDorayakiPengirim: response.data[0].menu[0].persediaan,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangePengirim(e) {
    this.setState({
      indeksPengirim: e.target.value,
      menuPengirim: this.state.listToko[e.target.value].menu,
    });
  }

  onChangePenerima(e) {
    this.setState({
      indeksPenerima: e.target.value,
    });
  }

  onChangeDorayakiDikirim(e) {
    this.setState({
      indeksDorayakiPengirim: e.target.value,
      persediaanDorayakiPengirim:
        this.state.listToko[this.state.indeksPengirim].menu[e.target.value]
          .persediaan,
    });
  }

  onChangeBanyakDorayakiDikirim(e) {
    this.setState({
      banyakDorayakiDikirim: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const indeksDorayakiPenerima = this.state.listToko[
      this.state.indeksPenerima
    ].menu
      .map(function (dorayaki) {
        return dorayaki.rasa;
      })
      .indexOf(this.state.menuPengirim[this.state.indeksDorayakiPengirim].rasa);

    if (indeksDorayakiPenerima === -1) {
      alert(
        "Toko Dorayaki '" +
          this.state.listToko[this.state.indeksPenerima].nama +
          "' tidak menyediakan dorayaki rasa " +
          this.state.menuPengirim[this.state.indeksDorayakiPengirim].rasa
      );
    } else {
      if (
        this.state.banyakDorayakiDikirim >
        this.state.listToko[this.state.indeksPenerima].menu[
          indeksDorayakiPenerima
        ].kapasitas -
          this.state.listToko[this.state.indeksPenerima].menu[
            indeksDorayakiPenerima
          ].persediaan
      ) {
        alert(
          "Toko Dorayaki '" +
            this.state.listToko[this.state.indeksPenerima].nama +
            "' tidak memiliki kapasitas yang cukup untuk menerima dorayaki rasa " +
            this.state.menuPengirim[this.state.indeksDorayakiPengirim].rasa +
            " yang dikirim"
        );
      } else {
        const jumlahDorayakiDikirim = parseInt(
          this.state.banyakDorayakiDikirim
        );

        // Toko Dorayaki Pengirim
        const newMenuPengirim = this.state.menuPengirim.slice();

        let persediaanPengirim = parseInt(
          newMenuPengirim[this.state.indeksDorayakiPengirim].persediaan
        );

        persediaanPengirim -= jumlahDorayakiDikirim;

        newMenuPengirim[this.state.indeksDorayakiPengirim].persediaan =
          persediaanPengirim;

        const tokoDorayakiPengirim = {
          nama: this.state.listToko[this.state.indeksPengirim].nama,
          jalan: this.state.listToko[this.state.indeksPengirim].jalan,
          kecamatan: this.state.listToko[this.state.indeksPengirim].kecamatan,
          provinsi: this.state.listToko[this.state.indeksPengirim].provinsi,
          tanggal: this.state.listToko[this.state.indeksPengirim].tanggal,
          menu: newMenuPengirim,
        };

        // Toko Dorayaki Penerima
        const newMenuPenerima =
          this.state.listToko[this.state.indeksPenerima].menu.slice();

        let persediaanPenerima = parseInt(
          newMenuPenerima[indeksDorayakiPenerima].persediaan
        );

        persediaanPenerima += jumlahDorayakiDikirim;

        newMenuPenerima[indeksDorayakiPenerima].persediaan = persediaanPenerima;

        const tokoDorayakiPenerima = {
          nama: this.state.listToko[this.state.indeksPenerima].nama,
          jalan: this.state.listToko[this.state.indeksPenerima].jalan,
          kecamatan: this.state.listToko[this.state.indeksPenerima].kecamatan,
          provinsi: this.state.listToko[this.state.indeksPenerima].provinsi,
          tanggal: this.state.listToko[this.state.indeksPenerima].tanggal,
          menu: newMenuPenerima,
        };

        console.log("Toko Dorayaki Pengirim");
        console.log(tokoDorayakiPengirim);

        console.log("Toko Dorayaki Penerima");
        console.log(tokoDorayakiPenerima);

        axios
          .post(
            "http://localhost:5000/tokoDorayaki/update/" +
              this.state.listToko[this.state.indeksPengirim]._id,
            tokoDorayakiPengirim
          )
          .then((res) => console.log(res.data));

        axios
          .post(
            "http://localhost:5000/tokoDorayaki/update/" +
              this.state.listToko[this.state.indeksPenerima]._id,
            tokoDorayakiPenerima
          )
          .then((res) => console.log(res.data));

        window.location = "/";
      }
    }
  }

  render() {
    return (
      <div>
        <h3>Send Dorayaki</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Nama toko pengirim: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.indeksPengirim}
              onChange={this.onChangePengirim}
            >
              {this.state.listToko.map(function (tokoPengirim, indeks) {
                return (
                  <option key={tokoPengirim.nama} value={indeks}>
                    {tokoPengirim.nama}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Nama toko penerima: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.indeksPenerima}
              onChange={this.onChangePenerima}
            >
              {this.state.listToko.map(function (tokoPenerima, indeks) {
                return (
                  <option key={tokoPenerima.nama} value={indeks}>
                    {tokoPenerima.nama}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Rasa dorayaki yang dikirim: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.indeksDorayakiPengirim}
              onChange={this.onChangeDorayakiDikirim}
            >
              {this.state.menuPengirim.map(function (dorayaki, indeks) {
                return (
                  <option key={dorayaki.rasa} value={indeks}>
                    {dorayaki.rasa}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Banyak dorayaki dikirim: </label>
            <input
              type="number"
              className="form-control"
              value={this.state.banyakDorayakiDikirim}
              onChange={this.onChangeBanyakDorayakiDikirim}
              min="0"
              max={this.state.persediaanDorayakiPengirim}
            />
          </div>
          <br />
          <div className="form-group">
            <input
              type="submit"
              value="Send Dorayaki"
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
