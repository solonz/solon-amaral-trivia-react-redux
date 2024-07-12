<<<<<<< HEAD
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { gravatarEmail, nome, score } = this.props;

    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}` }
          alt="gravatar"
          data-testid="header-profile-picture"
        />
        <h1 data-testid="header-player-name">{ nome }</h1>
        <h1 data-testid="header-score">
          {score}
        </h1>
      </div>
=======
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { gravatarEmail, name, score } = this.props;
    const hash = md5(gravatarEmail).toString();

    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${hash}` }
          data-testid="header-profile-picture"
          alt="avatar do usuário"
        />
        <span
          data-testid="header-player-name"
        >
          { name }
        </span>
        <span
          data-testid="header-score"
        >
          { score }
        </span>
      </header>
>>>>>>> e80a25aaf03cceee5dd116bdbe0f808ffa0343d4
    );
  }
}

<<<<<<< HEAD
const mapStateToProps = ({ player: { gravatarEmail, nome, score } }) => ({
  gravatarEmail,
  nome,
  score,
});

Header.propTypes = {
  gravatarEmail: PropTypes.string,
  nome: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
=======
const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
>>>>>>> e80a25aaf03cceee5dd116bdbe0f808ffa0343d4
