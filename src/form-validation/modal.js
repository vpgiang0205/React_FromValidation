import React, { Component } from 'react'
import { connect } from 'react-redux';

class Modal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            values: {
                masv: "",
                tensv: "",
                sdt: "",
                email: ""
            },

            errors: {
                masv: "",
                tensv: "",
                sdt: "",
                email: ""
            },
            formValid: false,

            masvValid: false,
            tensvValid: false,
            sdtValid: false,
            emailValid: false,
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

        let mess = "";

        let { masvValid, tensvValid, emailValid, sdtValid } = this.state

        switch (name) {
            case "masv":
                mess = value.trim() ? "" : "Mã sinh viên không được để trống!";
                masvValid = mess === "" ? true : false;
                if (value && value.trim().length < 4) {
                    mess = "Kí tự từ 4 trở lên"
                    masvValid = false;
                }
                break;

            case "tensv":
                mess = value.trim() ? "" : "Tên sinh viên không được để trống!";

                tensvValid = mess === "" ? true : false;
                break;

            case "email":
                mess = value.trim() ? "" : "Email không được để trống!";
                emailValid = mess === "" ? true : false;
                if (value && !value.match("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")) {
                    mess = "Vui lòng điền lại email đúng định dạng"
                    emailValid = false;
                }
                break;

            case "sdt":
                mess = value.trim() ? "" : "Số điện thoại không được để trống!";

                sdtValid = mess === "" ? true : false;
                // Phone number regex: validate a Vietnamese phone number
                if (value && !value.match(/^(?:\+84|0)(?:1\d{9}|3\d{8}|5\d{8}|7\d{8}|8\d{8}|9\d{8})$/)) {
                    mess = "Vui lòng điền lại số điện thoại đúng định dạng (VD: +84901234567, 0901234567)";
                    sdtValid = false;
                } else {
                    // Format the phone number to +84xxxxxxxxx or 0xxxxxxxxx
                    const formattedPhoneNumber = value.replace(/^(?:\+84|0)(1\d{9}|3\d{8}|5\d{8}|7\d{8}|8\d{8}|9\d{8})$/, (match) => {
                        return match.charAt(0) === "0" ? `+84${match.slice(1)}` : match;
                    });
                    this.setState({
                        values: { ...this.state.values, [name]: formattedPhoneNumber },
                    });
                }

                break;

            default:
                break;
        }

        // Cap nhat state.error
        this.setState({
            errors: { ...this.state.errors, [name]: mess },
            masvValid,
            tensvValid,
            sdtValid,
            emailValid,
            formValid: masvValid && tensvValid && emailValid,
        },
            () => {
                console.log(this.state);
            }
        )
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const user = this.state.values
        this.props.getSubmit(user)
    }

    render() {
        return (
            <div>
                <button type="button" className=" w-100 btn btn-success" data-toggle="modal" data-target="#modelId">
                    Thêm Sinh Viên
                </button>

                <div className="modal fade" id="modelId" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                {/** Form */}
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label>Mã sinh viên</label>

                                        <input name='masv'
                                            type="text"
                                            className="form-control"
                                            onChange={this.handleOnChange}
                                            onBlur={this.handleValidation} />
                                        {this.state.errors.masv &&
                                            (
                                                <div className='text-danger'>{this.state.errors.masv}</div>
                                            )}
                                    </div>

                                    <div className="form-group">
                                        <label>Tên sinh viên</label>

                                        <input name='tensv'
                                            type="text"
                                            className="form-control"
                                            onChange={this.handleOnChange}
                                            onBlur={this.handleValidation} />
                                        {this.state.errors.tensv &&
                                            (
                                                <div className='text-danger'>{this.state.errors.tensv}</div>
                                            )}
                                    </div>

                                    <div className="form-group">
                                        <label>Số Điện Thoại</label>

                                        <input name='sdt'
                                            type="number"
                                            className="form-control"
                                            onChange={this.handleOnChange}
                                            onBlur={this.handleValidation} />
                                        {this.state.errors.sdt &&
                                            (
                                                <div className='text-danger'>{this.state.errors.sdt}</div>
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
                                        type="submit" disabled={!this.state.formValid}
                                        className="btn btn-success"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
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

export default connect(mapStateToProps)(Modal)