import React, { Component } from "react";
import Child from "./child";
import ChildPure from "./childPure";
export default class Lifecycle extends Component {
  constructor(props) {
    super(props);
    console.log("contructor - chay 1 lan");
    this.state = {
      number: 0,
    };
    this.interval = null
  }

  UNSAFE_componentWillMount() {
    // console.log("UNSAFE_componentWillMount");
  }

  componentDidMount() {
    // console.log("goi api");

    //   // this.interval = setInterval(()=> {
    //   //   console.log("set giay")
    //   // }, 5000
    //   // )
  }

  UNSAFE_componentWillUpdate() {
    // console.log("UNSAFE_componentWillUpdate");
  }

  componentDidUpdate() {
    // console.log("componentDidUpdatea");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate", nextProps, nextState);

    // Neu = 2 thi ko tra ve
    if (nextState.number === 2) {
      return false
    }
    return true

  }

  componentWillUnmount() {
    console.log("chay khi component bi huy");
    clearInterval(this.interval);
  }

  render() {
    // console.log("render chay nhieu lan neu state dc cap nhat");
    return (
      <div>
        <Child number={this.state.number} />
        <ChildPure />
        <p> Numbers: {this.state.number}</p>
        <button
          className="btn btn-warning"
          onClick={() => {
            this.setState({
              number: this.state.number + 1,
            });
          }}
        >
          Click
        </button>
      </div>
    );
  }
}
