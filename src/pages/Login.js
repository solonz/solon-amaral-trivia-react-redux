import React from 'react';

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

  render() {
    const { name, email } = this.state;
    return (
      <form>
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
          type="submit"
          data-testid="btn-play"
          disabled={ this.emailValidation() }
        >
          Play
        </button>
      </form>
    );
  }
}

export default Login;
