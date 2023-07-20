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
    }
  }
  renderListSV = () => {
    let { listSV, keyword } = this.props;
    listSV = listSV.filter(
      (sv) =>
        sv.tensv.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
    )
    return listSV?.map((sv, index) => {
      return (
        <FormItem sv={sv} key={index} />
      )
    })
  }

  gethandleSubmidAdd = (user) => {

    console.log(this.state);
    let listSVClone = [...this.state.listSV, user];
    this.setState({
      listSV: listSVClone,
    })

    console.log(this.state.listSV)
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
              <Modal getSubmit={this.gethandleSubmidAdd} />
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
    keyword: state.svReducer.keyword
  }
};

export default connect(mapStateToProps)(FromValidation)