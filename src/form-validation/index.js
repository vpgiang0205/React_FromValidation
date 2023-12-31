import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormItem from './FormItem'
import Search from './Search'
import Modal from './modal'

class FromValidation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      listSV: this.props.listSV,
      svEdit: this.props.svEdit,
    }
  }
  renderListSV = () => {
    let { listSV, keyword, svEdit } = this.props;
    listSV = listSV.filter(
      (sv) =>
        sv.tensv.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
    )
    return listSV?.map((sv, index) => {
      return (
        <FormItem sv={sv} key={index} getHandleEdit={this.getHandleEdit} />
      )
    })
  }

  gethandleSubmidAdd = (user) => {
    const { addUser } = this.props;
    return addUser(user)
  }

  getHandleEdit = (svEditNew) => {
    this.setState({
      svEdit: svEditNew
    })
    console.log(this.state)

  }

  render() {
    return (
      <div>
        <div className='container'>
          <h3 className="title">*FormValidation</h3>
          <div className='row my-3'>
            <div className='col-7'>
              <Search />
            </div>

            {/** render modal */}
            <div className='col-5'>
              <Modal getSubmit={this.gethandleSubmidAdd}/>
            </div>
          </div>


          {/** render list */}
          <table className='w-100'>
            <tbody>
              <tr className='bg-dark  text-white'>
                <td className='p-3'>Mã SV</td>
                <td>Họ Tên</td>
                <td>Số Điện Thoại</td>
                <td>Email</td>
                <td>Hành động</td>
              </tr>
              {this.renderListSV()}
            </tbody>
          </table>

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listSV: state.svReducer.listSV,
    keyword: state.svReducer.keyword,
    svEdit: null
  }
};


const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user) => {
      const action = {
        type: "SUBMIT_SV",
        payload: user
      };
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FromValidation)