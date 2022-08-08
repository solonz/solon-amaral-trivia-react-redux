const INITAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITAL_STATE, action) => {
  switch (action.type) {
  case 'EMAIL_LOGIN':
    return { ...state, gravatarEmail: action.payload };
  case 'USERNAME_LOGIN':
    return { ...state, name: action.payload };
  case 'SCORE_REGISTER':
    return { ...state, score: state.score + action.payload };
  default:
    return state;
  }
};

export default player;
