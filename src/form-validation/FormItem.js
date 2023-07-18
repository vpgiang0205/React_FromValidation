import React, { Component } from 'react'
import { connect } from 'react-redux'
class FormItem extends Component {

    render() {
        const { sv, index, deleteSV } = this.props
        
        

        return (
            <tr key={index} className='border'>
                <td>{sv.masv}</td>
                <td>{sv.tensv}</td>
                <td>{sv.sdt}</td>
                <td>{sv.email}</td>
                <td>
                    <button type='button' className='btn btn-info m-2'>Edit</button>
                    <button type='button' className='btn btn-danger' onClick={() => { deleteSV(sv.masv) }} value={sv.masv}>Delete</button>
                </td>
            </tr>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteSV: (masv) => {
            const action = {
                type: 'DELETE_SV',
                payload: masv,
            };
            dispatch(action)
        }
    }
}
export default connect(null, mapDispatchToProps)(FormItem);