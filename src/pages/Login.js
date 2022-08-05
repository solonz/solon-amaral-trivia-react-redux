import React, { Component } from 'react';
// import { connect } from 'react-redux';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      email: '',
      buttonDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
      buttonDisabled: false,
    });
  }

  render() {
    const { userName, email, buttonDisabled } = this.state;
    return (
      <form action="">
        <input
          type="text"
          name="userName"
          id="userName"
          data-testid="input-player-name"
          onChange={ this.handleChange }
          value={ userName }
        />
        <input
          type="email"
          name="email"
          id="email"
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
          value={ email }
        />
        <button
          disabled={ buttonDisabled }
          data-testid="btn-play"
          type="button"
        >
          Play
        </button>
      </form>
    );
  }
}

export default Login;
