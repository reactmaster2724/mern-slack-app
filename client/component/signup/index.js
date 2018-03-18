import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { browserHistory } from 'react-router';
import * as userAction from '../../actions/users';

function formValidation(field, value1, value2) {
  switch (field) {
    case 'userName':
      var nameValid = value1 !== '';
      return nameValid ? false : 'User name must not be empty';
    case 'email':
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(value1) ? false : "Invalid email format!";
    case 'pass':
      var passwordValid = value1.length >= 8;
      return passwordValid ? false : ' Password is too short!';
    case 'confirmPass':
      var passwordConfirmationValid = value1 === value2;
      return passwordConfirmationValid ? false : 'Password mismatch!';
    default:
      return "Unknown error!";

  }
}

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      pass: null,
      confirmPass: null,
      userName: null,
      error: null
    }
  }

  componentWillMount() {
    const { currentUser, error } = this.props
    if (!error && currentUser) browserHistory.push('/login')
  }

  componentWillReceiveProps(nextProps) {
    const { currentUser, error } = nextProps;
    if (!error && currentUser) browserHistory.push('/login')
    if (error) this.setState({ error: error });
  }

  _onChangeMailHander(e) { this.setState({ email: e.target.value }); }

  _onChangePassHander(e) { this.setState({ pass: e.target.value }); }

  _onConfirmPassHander(e) { this.setState({ confirmPass: e.target.value }); }

  _onChangeUserNameHander(e) { this.setState({ userName: e.target.value }); }

  loginHandler() { browserHistory.push('/login') }

  signUpHandler() {
    const { email, pass, confirmPass, userName } = this.state;
    const userInfo = { email, pass, confirmPass, userName };
    const keys = Object.keys(userInfo);
    for (var i = 0; i < keys.length; i++) {
      let error = formValidation(keys[i], userInfo[keys[i]], userInfo.pass);
      if (error) {
        this.setState({ error });
        return;
      }
    }
    this.props.SignUp(userInfo);
  }

  render() {
    const { email, pass, error, confirmPass, userName } = this.state;
    return (
      <div className="container main">
        <div className="col-md-offset-4 col-md-4 login-form">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3>SignUp</h3>
            </div>
            <div className="panel-body">
              {error ? (
                <div className="alert alert-danger">
                  <strong>Error!</strong> {error}
                </div>
              ) : null}
              <div className="form-group field">
                <span className="glyphicon air-icon-user"></span>
                <input type="email" name="email" placeholder="Your email" className="form-control" onChange={this._onChangeMailHander.bind(this)} value={email} />
              </div>
              <div className="form-group field">
                <span className="glyphicon air-icon-user"></span>
                <input type="email" name="text" placeholder="User Name" className="form-control" onChange={this._onChangeUserNameHander.bind(this)} value={userName} />
              </div>
              <div className="form-group field">
                <span className="glyphicon air-icon-password"></span>
                <input type="password" name="pass" placeholder="Your password" className="form-control" onChange={this._onChangePassHander.bind(this)} value={pass} />
              </div>

              <div className="form-group field">
                <span className="glyphicon air-icon-password"></span>
                <input type="password" name="confirm" placeholder="Confirm pasword" className="form-control" onChange={this._onConfirmPassHander.bind(this)} value={confirmPass} />
              </div>

              <div className="row button-area">
                <div className="col-md-offset-1 col-md-5">
                  <a className="btn btn-success" onClick={this.signUpHandler.bind(this)}> SignUp</a>
                </div>
                <div className="col-md-5">
                  <a className="btn btn-primary" onClick={this.loginHandler.bind(this)}> Cancel</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(userAction, dispatch);
}

function mapStateToProps(state) {
  return {
    currentUser: state.users.currentUser,
    error: state.users.error,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);