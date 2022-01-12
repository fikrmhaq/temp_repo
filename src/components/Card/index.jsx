import React from 'react';

class Card extends React.Component {
    /**
     * Ini ada component untuk membuat card
     * @param {Object} props
     * @param {Boolean} props.withNoShadow Jika true maka card tidak akan memiliki shadow
     * @param {String} [props.className] Parameter ini digunakan untuk memasukkan custom class
     * @param {String} [props.classBody] Parameter ini digunakan untuk memasukkan custom class ke card-body
     * @param {Object} [props.style] Parameter ini digunakan untuk memasukkan custom style
     * @param {Object} [props.styleBody] Parameter ini digunakan untuk memasukkan custom style ke card-body
     * @param {Object} [props.action] Parameter ini digunakan untuk event
     * @param {Object} [props.actionBody] Parameter ini digunakan untuk event di card-body
     */
    constructor(props) {
        super(props);
        this.state = {
            data: props
        }
    }

    render() { 
        return (
            <div className={`card border-0 ${this.state.data.withNoShadow && 'no-shadow'} ${this.state.data.className}`} style={this.state.data.style} {...this.state.data.action}>
                <div className={`card-body ${this.state.data.classBody}`} style={this.state.data.styleBody} {...this.state.data.actionBody}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
 
export default Card;