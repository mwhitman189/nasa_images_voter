import React, { Component } from 'react'
import Image from './Image'
import axios from 'axios'


const API_KEY = "LNxgNwd0dZYw3It0lLzXRi5yUSzumi7i1Ayigys5"
const API_BASE_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`

class ImageCollection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            images: [],
            is_loaded: false,
        }
    }

    async componentDidMount() {
        let start = new Date().setFullYear(2000)
        let end = new Date()
        let unform_date = new Date(start + Math.random() * (end - start))
        let year = unform_date.getFullYear()
        let month = unform_date.getMonth() + 1
        let date = unform_date.getDate()
        let imgObj = await axios.get(`${API_BASE_URL}&date=${year}-${month}-${date}`)
        let imgData = imgObj.data

        this.setState(prevState => ({
            images: [ ...prevState.images, { id: imgData.url, url: imgData.url, title: imgData.title, explanation: imgData.explanation } ]
        }))
    }

    render() {
        let images = this.state.images.map(img => (
            <Image key={img.id}
                id={img.id}
                url={img.url}
                title={img.title}
                expl={img.explanation}
            />
        ))
        return (
            <div className="ImageCollection">
                {images}
            </div>
        )
    }
}
export default ImageCollection