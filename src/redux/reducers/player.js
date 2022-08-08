const INITAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

const player = (state = INITAL_STATE, action) => {
  switch (action.type) {
  case 'EMAIL_LOGIN':
    return { ...state, gravatarEmail: action.payload };
  case 'USERNAME_LOGIN':
    return { ...state, name: action.payload };
  default:
    return state;
  }
};

export default player;
