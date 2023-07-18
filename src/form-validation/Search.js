import React, { Component } from 'react'
import { connect } from 'react-redux'
class Search extends Component {
    handleOnChange = (e) => {
        this.props.getKeyword(e.target.value);
    }
    render() {
        return (
            <input type="text" name="" id="" className='form-control' onChange={this.handleOnChange} />
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getKeyword: (keyword) => {
            const action = {
                type: "GET_KEYWORD",
                payload: keyword
            }
            dispatch(action)
        }
    }
}
export default connect(null, mapDispatchToProps)(Search)