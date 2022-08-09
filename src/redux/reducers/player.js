import { COUNT_ASSERTIONS, LOGIN_INFO } from '../actions/typeNames';

const INITIAL_STATE = {
  nome: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

export default function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN_INFO:
    return {
      ...state,
      nome: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case COUNT_ASSERTIONS:
    return {
      ...state,
      assertions: action.countAssertions,
    };
  default:
    return state;
  }
}
