import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Game extends Component {
  render() {
    const { gravatarEmail, nome, score } = this.props;
    console.log(nome, gravatarEmail, score);
    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}` }
          alt="gravatar"
          data-testid="header-profile-picture"
        />
        <h1 data-testid="header-player-name">{ nome }</h1>
        <h1 data-testid="header-score">
          { `Score: ${score}` }
        </h1>
      </div>
    );
  }
}

const mapStateToProps = ({ player: { gravatarEmail, nome, score } }) => ({
  gravatarEmail,
  nome,
  score,
});

Game.propTypes = {
  gravatarEmail: PropTypes.string,
  nome: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Game);
