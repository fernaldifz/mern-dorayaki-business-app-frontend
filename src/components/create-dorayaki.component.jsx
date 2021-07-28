import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class CreateDorayaki extends Component {
  constructor(props) {
    super(props);

    this.onChangeRasa = this.onChangeRasa.bind(this);
    this.onChangeDeskripsi = this.onChangeDeskripsi.bind(this);
    this.onChangeGambar = this.onChangeGambar.bind(this);
    this.onChangeHarga = this.onChangeHarga.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      rasa: "",
      deskripsi: "",
      gambar: "",
      harga: 0,
    };
  }

  onChangeRasa(e) {
    this.setState({
      rasa: e.target.value,
    });
  }

  onChangeDeskripsi(e) {
    this.setState({
      deskripsi: e.target.value,
    });
  }

  onChangeGambar(e) {
    this.setState({
      gambar: e.target.value,
    });
  }

  onChangeHarga(e) {
    this.setState({
      harga: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newDorayaki = {
      rasa: this.state.rasa,
      deskripsi: this.state.deskripsi,
      gambar: this.state.gambar,
      harga: this.state.harga,
    };

    console.log(newDorayaki);

    axios
      .post("http://localhost:5000/dorayaki/add", newDorayaki)
      .then((res) => console.log(res.data));

    window.location = "/dorayaki";
  }

  render() {
    return (
      <div>
        <h3>Create Dorayaki</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Rasa: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.rasa}
              onChange={this.onChangeRasa}
            />
          </div>
          <div className="form-group">
            <label>Deskripsi: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.deskripsi}
              onChange={this.onChangeDeskripsi}
            />
          </div>
          <div className="form-group">
            <label>Path ke gambar: </label>
            <details>
              <summary>N.B. List path tersedia:</summary>
              <img
                src="src/components/images/listpathdorayaki.png"
                width="345.5"
                height="83"
              />
            </details>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.gambar}
              onChange={this.onChangeGambar}
            />
          </div>
          <div className="form-group">
            <label>Harga: </label>
            <input
              type="number"
              required
              className="form-control"
              value={this.state.harga}
              onChange={this.onChangeHarga}
            />
          </div>
          <br />
          <div className="form-group">
            <input
              type="submit"
              value="Create Dorayaki"
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
