import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import { connect } from 'react-redux';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.configPagePush = this.configPagePush.bind(this);
  }

  configPagePush = () => {
    const { history } = this.props;
    history.push('/configuracao');
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
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
        >
          Play
        </button>
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ this.configPagePush }
        >
          Configurações
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Login;
