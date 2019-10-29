import React, { Component } from 'react'
import './Image.css'


class Image extends Component {
    constructor(props) {
        super(props)
        this.state = {
            is_open: false,
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleMouseIn = this.handleMouseIn.bind(this)
        this.handleMouseOut = this.handleMouseOut.bind(this)
    }

    handleClick() {
        // Add 1 to the vote count of the image with the given id
        this.props.vote(this.props.id, 1)
    }

    handleMouseIn() {
        this.setState({ is_open: true })
    }

    handleMouseOut() {
        this.setState({ is_open: false })
    }

    render() {
        const { id, url, title, expl, votes } = this.props

        let popup = (
            <div className="Image-popup">
                <p className="Image-explanation">
                    {title}
                    {expl}
                </p>
            </div>
        )

        return (
            <div className="Image">
                <img
                    className="Image-img"
                    id={id}
                    src={url}
                    alt={title}
                    onClick={this.handleClick}
                    onMouseEnter={this.handleMouseIn}
                    onMouseLeave={this.handleMouseOut}
                />
                {votes}
                {this.state.is_open && popup}
            </div>
        )
    }
}
export default Image