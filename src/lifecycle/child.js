import React, { Component } from 'react'

export default class Child extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameChild: "componentChild",
            numberChild: 3,
        }
    }

    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     if (nextProps && nextProps.number === this.state.numberChild) {
    //         console.log("recive", nextProps);
    //         this.setState({
    //             usernameChild: "component da duoc cap nhat"
    //         })

    //     }
    // }

    static getDerivedStateFromProps(nextProps, currentState) {
        if (nextProps.number === currentState.numberChild) {
            // Cap nhat state
            return {
                usernameChild: "da dc cap nhat",
            }
        }
        return null
    }

    render() {
        console.log("render_Child");
        return (
            <div>
                usernameChild: {this.state.usernameChild} <br />
                numberChild: {this.state.numberChild}
            </div>
        )
    }
}
