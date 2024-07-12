<<<<<<< HEAD
import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { getApi } from '../services/api';
import { LOGIN_INFO } from '../redux/actions/typeNames';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
  };

  emailValidation = () => {
    const { email, name } = this.state;
    const check = /\S+@\S+\.\S+/;
    if (check.test(email) && name.length !== 0) return false;
    return true;
  }

  fetchToken = async () => {
    await getApi();
    const { history, dispatch } = this.props;
    history.push('/game');
    dispatch({ type: LOGIN_INFO, payload: this.state });
  }

  render() {
    const { name, email } = this.state;
    const { history } = this.props;
    return (
      <form autoComplete="off">
        <label htmlFor="name">
          <input
            value={ name }
            placeholder="Nome..."
            type="text"
            id="name"
            onChange={ (e) => this.setState({ name: e.currentTarget.value }) }
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="email">
          <input
            value={ email }
            placeholder="Email..."
            type="email"
            id="email"
            data-testid="input-gravatar-email"
            onChange={ (e) => this.setState({ email: e.currentTarget.value }) }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          onClick={ this.fetchToken }
          disabled={ this.emailValidation() }
=======
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchTokenTrivia from '../services';
import { emailAction, usernameAction } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.configPagePush = this.configPagePush.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  async handleClick() {
    const token = await fetchTokenTrivia();
    localStorage.setItem('token', token);
    const { history, emailDispatch, usernameDispatch } = this.props;
    const { email, userName } = this.state;
    history.push('/game');
    emailDispatch(email);
    usernameDispatch(userName);
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
>>>>>>> e80a25aaf03cceee5dd116bdbe0f808ffa0343d4
        >
          Play
        </button>
        <button
<<<<<<< HEAD
          type="button"
          data-testid="btn-settings"
          onClick={ () => history.push('/config') }
        >
          Configurações

=======
          data-testid="btn-settings"
          type="button"
          onClick={ this.configPagePush }
        >
          Configurações
>>>>>>> e80a25aaf03cceee5dd116bdbe0f808ffa0343d4
        </button>
      </form>
    );
  }
}

<<<<<<< HEAD
Login.propTypes = {
  history: propTypes.objectOf(propTypes.any),
  dispatch: propTypes.func,
}.isRequired;

export default connect()(Login);
=======
const mapDispatchToProps = (dispatch) => ({
  emailDispatch: (payload) => dispatch(emailAction(payload)),
  usernameDispatch: (payload) => dispatch(usernameAction(payload)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  emailDispatch: PropTypes.func.isRequired,
  usernameDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
>>>>>>> e80a25aaf03cceee5dd116bdbe0f808ffa0343d4
