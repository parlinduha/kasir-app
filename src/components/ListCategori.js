// rcc 
import axios from 'axios';
import React, { Component } from 'react'
import { Col, ListGroup } from 'react-bootstrap';
import { API_URL } from '../utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faCoffee, faCheese } from '@fortawesome/free-solid-svg-icons'

const Icon = ({ nama }) => {
    if (nama === "Makanan") return <FontAwesomeIcon icon={faUtensils} className="ml-3" />
    if (nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} />
    if (nama === "Cemilan") return <FontAwesomeIcon icon={faCheese} className="ml-3" />

    return <FontAwesomeIcon icon={faUtensils} />
}

export default class ListCategori extends Component {
    // rcons => cara cepat membuat constractor
    constructor(props) {
        super(props)

        this.state = {
            categories: []
        }
    }
    componentDidMount() {
        axios.get(API_URL + "categories")
            .then(res => {
                // console.log("Response:", res)
                const categories = res.data;
                this.setState({ categories });
            })
            .catch(error => {
                console.log("Hasil error !", error);
            });
    }

    render() {
        // console.log("Categories:", this.state.categories)
        const { categories } = this.state
        const { changeCategory, categoryYangdiPilih } = this.props
        return (
            <Col md={2} mt="2">
                <h5><strong>Daftar Kategori</strong></h5><hr />
                <ListGroup>
                    {categories && categories.map((category) => (
                        <ListGroup.Item key={category.id} onClick={() => changeCategory(category.nama)} className={categoryYangdiPilih === category.nama && 'category-aktif'} style={{ cursor: 'pointer' }}>
                            <h6>
                                <Icon nama={category.nama} /> {category.nama}
                            </h6>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
        )
    }
}
