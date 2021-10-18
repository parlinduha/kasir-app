import axios from 'axios';
import React, { Component } from 'react'
import { Button, Card, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { API_URL } from '../utils/constants';

export default class Sukses extends Component {
    componentDidMount() {
        axios.get(API_URL + "keranjangs")
            .then(res => {
                // console.log("Response:", res)
                const keranjangs = res.data;
                keranjangs.map(function (item) {
                    return axios
                        .delete(API_URL + "keranjangs/" + item.id)
                        .then((res) => console.log(res))
                        .catch((error) => console.log(error))
                })
            })
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        return (
            <div className="mt-4 text-center">
                <Card className="col-md-6 offset-md-3">
                    <Card.Body>
                        <Image src="assets/images/sukses.png" width="500" />
                        <Card.Title>Pemesanan telah sukses</Card.Title>
                        <Card.Text>
                            Terimakasih sudah melakukan pemesanan. Mohon menunggu...
                        </Card.Text>
                        <Button variant="primary" as={Link} to="/" >Back</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
