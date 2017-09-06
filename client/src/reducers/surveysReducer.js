import { FETCH_SURVEYS } from '../actions/types';
// setting an empty array for the state which will be populated with the list of surveys for a user
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }
}
