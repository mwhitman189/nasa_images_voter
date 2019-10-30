import React, { Component } from 'react'
import Image from './Image'
import './ImageCollection.css'
import axios from 'axios'
import uuid from 'uuid/v4'
import { getRandomDate, getSD, getMean } from './helperFuncs'


const API_KEY = "gGgx7Gx1BYZE5gFL9ghhbXwFteS83IIAgPGMY9gO"
// "LNxgNwd0dZYw3It0lLzXRi5yUSzumi7i1Ayigys5"
const API_BASE_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
const START_DATE = 2000

class ImageCollection extends Component {
    static defaultProps = {
        numImagesToGet: 5
    }
    constructor(props) {
        super(props)
        this.state = {
            images: JSON.parse(window.localStorage.getItem("images") || "[]"),
            is_loading: true,
        }
        this.getImages = this.getImages.bind(this)
        this.vote = this.vote.bind(this)
        this.viewedImages = new Set(this.state.images.map(img => img.url))
    }

    componentDidMount() {
        if (this.state.images.length < this.props.numImagesToGet) {
            this.getImages()
        } else {
            this.setState({ is_loading: false })
        }
    }

    async getImages() {
        try {
            let images = []
            // Make an API call to NASA APOD with a random date to return an image object
            // using the getRandomDate helper function

            while (images.length < this.props.numImagesToGet) {
                let imgObj = await axios.get(`${API_BASE_URL}&date=${getRandomDate(START_DATE)}`, {
                    headers: { Accept: "application/json" }
                })
                let imgData = imgObj.data

                if (!this.viewedImages.has(imgData.url)) {
                    images.push({
                        id: uuid(),
                        url: imgData.url,
                        title: imgData.title,
                        explanation: imgData.explanation,
                        votes: null,
                        stdDev: 0,
                    })
                }
            }
            this.setState({ images: images, is_loading: false })
            window.localStorage.setItem("images", JSON.stringify(images))

        } catch (err) {
            alert(err)
            this.setState({ is_loading: true })
        }
    }

    vote(id, delta) {
        // Make a copy of the images array with the updated vote count
        this.setState(prevState => ({
            images: prevState.images.map(img =>
                img.id === id ? { ...img, votes: img.votes + delta } : img
            )
        }))

        this.setState(prevState => ({
            images: prevState.images.map((img) => (
                { ...img, stdDev: this.setVoteSD() }))
        }))

        let images = this.state.images.map(img => img)

        window.localStorage.setItem("images", JSON.stringify(images))
    }

    setVoteSD() {
        let sd = getSD(this.state.images.map(img => img.votes))
        return sd
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
                stdDev={img.stdDev}
                mean={getMean(this.state.images.map(img => img.votes))}
            />
        ))

        return (
            <div className="ImageCollection">
                {this.state.is_loading ? <div className="loader">Loading...</div>
                    : (
                        <div>
                            <div className="ImageCollection-images">
                                {images}
                            </div>
                            <button className="ImageCollection-btn" onClick={this.getImages}>Click Me!</button>
                        </div>
                    )
                }
            </div>
        )
    }
}
export default ImageCollection