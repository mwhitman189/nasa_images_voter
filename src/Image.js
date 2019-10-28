import React, { Component } from 'react'
import './Image.css'


class Image extends Component {
    render() {
        const { id, url, title, expl } = this.props

        return (
            <div className="Image">
                <img className="Image-img" id={id} src={url} alt={title} />
                <p className="Image-explanation">{expl}</p>
            </div>
        )
    }
}
export default Image