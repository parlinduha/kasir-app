import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { Component } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { API_URL } from '../utils/constants';
import { numberWithCommas } from '../utils/utils';

export default class TotalBayar extends Component {
    submitTotalBayar = (totalBayar) => {
        const pesanan = {
            total_bayar: totalBayar,
            menus: this.props.pesanans
        }
        axios.post(API_URL + "pesanans", pesanan).then((res) => {
            this.props.history.push('/sukses');
        });
    };
    render() {
        const totalBayar = this.props.keranjangs.reduce(function (result, item) {
            return result + item.total_harga;
        }, 0);
        return (
            <>
                {/* Tampilan untuk web */}
                <div className="fixed-bottom d-none d-md-block">
                    <Row >
                        <Col md={{ span: 3, offset: 9 }} className="px-4" style={{ backgroundColor: 'white' }}>
                            <h5>
                                Total Bayar : {""}
                                <strong className="float-right mr-2" style={{ float: 'right' }}>RP. {numberWithCommas(totalBayar)}
                                </strong>
                            </h5>
                            <div className="d-grid gap-2">
                                <Button variant="primary" size="lg" className="mb-2 mt-2 mr-2" onClick={() => this.submitTotalBayar(totalBayar)}>
                                    <FontAwesomeIcon icon={faShoppingCart} /> <strong>Bayar</strong>
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>

                {/* Tampilan Mobile */}
                <div className="d-sm-block d-sm-none">
                    <Row >
                        <Col md={{ span: 3, offset: 9 }} className="px-4 mt-3" style={{ backgroundColor: 'white' }}>
                            <h5 className="mt-3" >
                                Total Bayar : {""}
                                <strong className="float-right mr-2" style={{ float: 'right' }}>RP. {numberWithCommas(totalBayar)}
                                </strong>
                            </h5>
                            <div className="d-grid gap-2">
                                <Button variant="primary" size="lg" className="mb-2 mt-2 mr-2" onClick={() => this.submitTotalBayar(totalBayar)}>
                                    <FontAwesomeIcon icon={faShoppingCart} /> <strong>Bayar</strong>
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </>
        )
    }
}
