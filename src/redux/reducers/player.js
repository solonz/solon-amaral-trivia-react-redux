<<<<<<< HEAD
import { COUNT_ASSERTIONS, LOGIN_INFO } from '../actions/typeNames';

const INITIAL_STATE = {
  nome: '',
  assertions: '',
=======
import { ASSERTION_REGISTER,
  EMAIL_LOGIN,
  SCORE_REGISTER,
  USERNAME_LOGIN,
} from '../actions';

const INITAL_STATE = {
  name: '',
  assertions: 0,
>>>>>>> e80a25aaf03cceee5dd116bdbe0f808ffa0343d4
  score: 0,
  gravatarEmail: '',
};

<<<<<<< HEAD
export default function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SCORE_ASSERTIONS_RESET':
    return {
      ...state,
      ...action.reset,
    };
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
  case 'SCORE_UPDATE':
    return {
      ...state,
      score: action.score,
    };
  default:
    return state;
  }
}
=======
const player = (state = INITAL_STATE, action) => {
  switch (action.type) {
  case EMAIL_LOGIN:
    return { ...state, gravatarEmail: action.payload };
  case USERNAME_LOGIN:
    return { ...state, name: action.payload };
  case SCORE_REGISTER:
    return { ...state, score: state.score + action.payload };
  case ASSERTION_REGISTER:
    return { ...state, assertions: state.assertions + 1 };
  default:
    return state;
  }
};

export default player;
>>>>>>> e80a25aaf03cceee5dd116bdbe0f808ffa0343d4
