import React, { Component } from 'react'
import './Image.css'


class Image extends Component {
    constructor(props) {
        super(props)
        this.state = {
            is_open: false,
        }
        this.handleUpVote = this.handleUpVote.bind(this)
        this.handleDownVote = this.handleDownVote.bind(this)
        this.handleMouseIn = this.handleMouseIn.bind(this)
        this.handleMouseOut = this.handleMouseOut.bind(this)
    }

    handleUpVote() {
        // Add 1 to the vote count of the image with the given id
        this.props.vote(this.props.id, 1)
    }

    handleDownVote() {
        // Subtract 1 from the vote count of the image with the given id
        this.props.vote(this.props.id, -1)
    }

    handleMouseIn() {
        this.setState({ is_open: true })
    }

    handleMouseOut() {
        this.setState({ is_open: false })
    }

    getStyles() {
        let stdDev = this.props.stdDev
        if (stdDev > 10) {
            return { fontSize: '3rem', color: '#4caf50' }
        } else if (stdDev > 7) {
            return { fontSize: '2.5rem', color: '#cddc39' }
        } else if (stdDev > 5) {
            return { fontSize: '2rem', color: '#ffeb3b' }
        } else if (stdDev > 2) {
            return { fontSize: '1.8rem', color: '#ffc107' }
        } else if (stdDev > 0) {
            return { fontSize: '1.5rem', color: '#ff9800' }
        } else if (stdDev === null) {
            return { fontSize: '1.2rem', color: '#000' }
        } else {
            return { fontSize: '.8rem', color: '#f44336' }
        }
    }

    render() {
        const { id, url, title, expl, votes } = this.props

        let popup = (
            <div className="Image-popup">
                <h2 className="Image-title">{title}</h2>
                <p className="Image-explanation">{expl}</p>
            </div>
        )

        return (
            <div className="Image">
                <img
                    className="Image-img"
                    id={id}
                    src={url}
                    alt={title}
                    onMouseEnter={this.handleMouseIn}
                    onMouseLeave={this.handleMouseOut}
                    onClick={this.handleUpVote}
                />
                <div className="Image-votes">
                    <i className="far fa-arrow-alt-circle-up" onClick={this.handleUpVote}></i>
                    <i className="fas fa-globe-americas" style={this.getStyles()}>{votes}</i>
                    <i className="far fa-arrow-alt-circle-down" onClick={this.handleDownVote}></i>
                </div>
                {this.state.is_open && popup}
            </div>
        )
    }
}
export default Image