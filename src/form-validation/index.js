import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormItem from './FormItem'
import Search from './Search'

class FromValidation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      values: {
        manv: "",
        tennv: "",
        email: ""
      },

      errors: {
        manv: "",
        tennv: "",
        email: ""
      },
      fromValid: false,

      manvValie: false,
      tennvValie: false,
      emailValie: false,
    }
  }
  handleOnChange = (e) => {
    const { name, value } = e.target;
    // Cap nhat values trong state
    this.setState({
      values: { ...this.state.values, [name]: value },
    }, () => {
      console.log(this.state)
    })
  }

  handleValidation = (e) => {
    const { name, value } = e.target;

    let mess = value.trim() ? "" : `${name} kh dc rong`;

    let { manvValie, tennvValie, emailValie } = this.state

    switch (name) {
      case "manv":
        manvValie = mess === "" ? true : false;
        if (value && value.trim().length < 4) {
          mess = "Kí tự từ 4 trở lên"
          manvValie = false;
        }
        break;
      case "tenvn":
        tennvValie = mess === "" ? true : false;
        break;
      case "email":
        emailValie = mess === "" ? true : false;
        if (value && !value.match("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")) {
          mess = "Vui lòng điền lại email đúng định dạng"
          emailValie = false;
        }
        break;
      default:
        break;
    }

    console.log(mess);
    // Cap nhat state.error
    this.setState({
      errors: { ...this.state.errors, [name]: mess },
      manvValie,
      tennvValie,
      emailValie,
      formValid: manvValie && tennvValie && emailValie,
    },
      () => {
        console.log(this.state);
      }
    )
  }

  renderListSV = () => {
    let { listSV, keyword } = this.props;
    listSV = listSV.filter(
      (sv) =>
        sv.tensv.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
    )
    return listSV?.map((sv, index) => {
      console.log(sv)
      return (
        <FormItem sv={sv} key={index} />
      )
    })
  }

  render() {


    return (
      <div>
        <div className="container text-left">
          <h3 className="title">*FormValidation</h3>
          <form>
            <div className="form-group">
              <label>Mã Nhân Viên</label>
              <input name='manv'
                type="text"
                className="form-control"
                onChange={this.handleOnChange}
                onBlur={this.handleValidation} />

              {this.state.errors.manv &&
                (
                  <div className='text-danger'>{this.state.errors.manv}</div>
                )}
            </div>

            <div className="form-group">
              <label>Tên Nhân Viên</label>
              <input name='tennv'
                type="text"
                className="form-control"
                onChange={this.handleOnChange}
                onBlur={this.handleValidation} />
              {this.state.errors.tennv &&
                (
                  <div className='text-danger'>{this.state.errors.tennv}</div>
                )}
            </div>

            <div className="form-group">
              <label>Email</label>
              <input name='email'
                type="email"
                className="form-control"
                onChange={this.handleOnChange}
                onBlur={this.handleValidation} />
              {this.state.errors.email &&
                (
                  <div className='text-danger'>{this.state.errors.email}</div>
                )}
            </div>

            <button
              type="submit" disabled={!this.state.FromValid}
              className="btn btn-success"
            >
              Submit
            </button>
          </form>
        </div>

        <div className='container'>
          <div className='row my-3'>
            <div className='col-7'>
              <Search />
            </div>
            <div className='col-5'>
              <button className=' w-100 btn btn-success'>Thêm Sinh Viên</button>
            </div>
          </div>
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