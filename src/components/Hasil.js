// rcc
import axios from 'axios';
import React, { Component } from 'react'
import { Badge, Card, Col, ListGroup, Row } from 'react-bootstrap';
import swal from 'sweetalert';
import { API_URL } from '../utils/constants';
import { numberWithCommas } from '../utils/utils';
import ModalKeranjang from './ModalKeranjang';
import TotalBayar from './TotalBayar'

export default class Hasil extends Component {

    // rcons
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            keranjangDetail: false,
            jumlah: 0,
            keterangan: "",
            totalHarga: 0
        }
    }
    handleShow = (menuKeranjang) => {
        this.setState({
            showModal: true,
            keranjangDetail: menuKeranjang,
            jumlah: menuKeranjang.jumlah,
            keterangan: menuKeranjang.keterangan,
            totalHarga: menuKeranjang.total_harga
        })
    }
    handleClose = () => {
        this.setState({
            showModal: false
        })
    }

    tambah = () => {
        this.setState({
            jumlah: this.state.jumlah + 1,
            totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah + 1)
        })
    }
    kurang = () => {
        if (this.state.jumlah !== 1) {
            this.setState({
                jumlah: this.state.jumlah - 1,
                totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah - 1)
            })
        }
    }

    changeHandler = (event) => {
        this.setState({
            keterangan: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // console.log("Tes doang", this.state.keterangan);

        this.handleClose();

        const data = {
            jumlah: this.state.jumlah,
            total_harga: this.state.totalHarga,
            product: this.state.keranjangDetail.product,
            keterangan: this.state.keterangan
        }

        axios.put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
            .then(res => {
                this.props.getListKeranjang();
                swal({
                    title: "Update pesanan",
                    text: "Pesanan berhasil di update: " + data.product.nama,
                    icon: "success",
                    button: false,
                    timer: 1000,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    hapusPesanan = (id) => {

        this.handleClose();


        axios.delete(API_URL + "keranjangs/" + id)
            .then(res => {
                this.props.getListKeranjang();
                swal({
                    title: "Hapus pesanan",
                    text: "Pesanan berhasil di hapus: " + this.state.keranjangDetail.product.nama,
                    icon: "error",
                    button: false,
                    timer: 1000,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }


    render() {
        const { keranjangs } = this.props;
        return (
            <Col md={3} mt="2">
                <h5><strong>Hasil</strong></h5><hr />
                {keranjangs.length !== 0 && (
                    <Card className="overflow-auto hasil">
                        <ListGroup variant="flush">
                            {keranjangs.map((menuKeranjang) => (
                                <ListGroup.Item key={menuKeranjang.id} onClick={() => this.handleShow(menuKeranjang)} >
                                    <Row>
                                        <Col xs={2}>
                                            <p>
                                                <Badge pill bg="success">
                                                    {menuKeranjang.jumlah}
                                                </Badge>
                                            </p>
                                        </Col>
                                        <Col className="float-right">
                                            <p  >
                                                {menuKeranjang.product.nama}
                                            </p>
                                            <p>
                                                Rp. {numberWithCommas(menuKeranjang.product.harga)}
                                            </p>
                                        </Col>{""}
                                        <Col style={{ float: 'right' }}>
                                            <strong>
                                                <p>
                                                    Rp. {numberWithCommas(menuKeranjang.total_harga)}
                                                </p>
                                            </strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                            <ModalKeranjang handleClose={this.handleClose} {...this.state} tambah={this.tambah} kurang={this.kurang} changeHandler={this.changeHandler} handleSubmit={this.handleSubmit} hapusPesanan={this.hapusPesanan} />
                        </ListGroup>
                    </Card>
                )}
                <TotalBayar keranjangs={keranjangs} {...this.props} />
            </Col>
        )
    }
}
