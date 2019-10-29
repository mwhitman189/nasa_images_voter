import React, { Component } from 'react'
import Image from './Image'
import './ImageCollection.css'
import axios from 'axios'
import uuid from 'uuid/v4'
import { getRandomDate } from './helperFuncs'


const API_KEY = "gGgx7Gx1BYZE5gFL9ghhbXwFteS83IIAgPGMY9gO"
// "LNxgNwd0dZYw3It0lLzXRi5yUSzumi7i1Ayigys5"
const API_BASE_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
const START_DATE = 2000

class ImageCollection extends Component {
    static defaultProps = {
        numImagesToGet: 2
    }
    constructor(props) {
        super(props)
        this.state = {
            images: [],
            is_loaded: false,
        }
        this.getImage = this.getImage.bind(this)
        this.vote = this.vote.bind(this)
    }

    componentDidMount() {
        // Query the API the given number of times, and return an image object
        for (let i = 0; i < this.props.numImagesToGet; i++) {
            this.getImage()
        }
        this.setState({ is_loaded: true })
    }

    async getImage() {
        // Make API call to NASA APOD with a random date to return an image object
        // using the getRandomDate helper function
        let imgObj = await axios.get(`${API_BASE_URL}&date=${getRandomDate(START_DATE)}`)
        let imgData = imgObj.data

        this.setState(prevState => ({
            images: [
                ...prevState.images,
                {
                    id: uuid(),
                    url: imgData.url,
                    title: imgData.title,
                    explanation: imgData.explanation,
                    votes: 0,
                }
            ]
        }))
    }

    vote(id, delta) {
        // Make a copy of the images array with the updated vote count
        this.setState(prevState => ({
            images: prevState.images.map(img =>
                img.id === id ? { ...img, votes: img.votes + delta } : img
            )
        }))
    }

    render() {
        let images = this.state.images.map(img => (
            <Image key={img.id}
                id={img.id}
                url={img.url}
                title={img.title}
                expl={img.explanation}
                votes={img.votes}
                vote={this.vote}
            />
        ))

        return (
            <div className="ImageCollection">
                <div className="ImageCollection-images">
                    {images}
                </div>
                <button
                    className="ImageCollection-btn" onClick={this.getImage}>Click Me!</button>
            </div>
        )
    }
}
export default ImageCollection