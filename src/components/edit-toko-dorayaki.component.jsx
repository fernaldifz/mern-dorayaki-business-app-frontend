import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default class EditTokoDorayaki extends Component {
  constructor(props) {
    super(props);

    this.onChangeNama = this.onChangeNama.bind(this);
    this.onChangeJalan = this.onChangeJalan.bind(this);
    this.onChangeKecamatan = this.onChangeKecamatan.bind(this);
    this.onChangeProvinsi = this.onChangeProvinsi.bind(this);
    this.onChangeTanggal = this.onChangeTanggal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      nama: "",
      jalan: "",
      kecamatan: "",
      provinsi: "",
      tanggal: new Date(),
      menu: [],
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
          tanggal: new Date(response.data.tanggal),
          menu: response.data.menu,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChangeNama(e) {
    this.setState({
      nama: e.target.value,
    });
  }

  onChangeJalan(e) {
    this.setState({
      jalan: e.target.value,
    });
  }

  onChangeKecamatan(e) {
    this.setState({
      kecamatan: e.target.value,
    });
  }

  onChangeProvinsi(e) {
    this.setState({
      provinsi: e.target.value,
    });
  }

  onChangeTanggal(tanggal) {
    this.setState({
      tanggal: tanggal,
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
        <h3>Edit Toko Dorayaki</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Nama: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.nama}
              onChange={this.onChangeNama}
            />
          </div>
          <div className="form-group">
            <label>Jalan: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.jalan}
              onChange={this.onChangeJalan}
            />
          </div>
          <div className="form-group">
            <label>Kecamatan: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.kecamatan}
              onChange={this.onChangeKecamatan}
            />
          </div>
          <div className="form-group">
            <label>Provinsi: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.provinsi}
              onChange={this.onChangeProvinsi}
            />
          </div>
          <div className="form-group">
            <label>Tanggal berdiri: </label>
            <div>
              <DatePicker
                selected={this.state.tanggal}
                onChange={this.onChangeTanggal}
              />
            </div>
          </div>
          <br />
          <div className="form-group">
            <input
              type="submit"
              value="Update Toko Dorayaki"
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
