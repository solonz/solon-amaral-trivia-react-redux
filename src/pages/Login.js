import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetchTokenTrivia from '../services';

// import { connect } from 'react-redux';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    const token = await fetchTokenTrivia();
    localStorage.setItem('token', token);
    const { history } = this.props;
    history.push('/game');
  }

  render() {
    const { userName, email } = this.state;
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
          disabled={ !((userName.length > 0 && email.length > 0)) }
          data-testid="btn-play"
          type="button"
          onClick={ this.handleClick }
        >
          Play
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
