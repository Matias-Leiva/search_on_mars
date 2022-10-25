import moment from 'moment';
import { roversList } from '../../constant/rovers';
import * as types from './types';

const initialState = {
  loading: false,
  images: [],
  rover: roversList[0].name,
  cameras: roversList[0].cameras,
  querys: {
    camera: '',
    sol: '',
    earth_date: moment(Date.now()).format('YYYY-MM-DD'),
    page: 1,
  },
  error: undefined,
};

function roversReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.SET_ROVER:
      return {
        ...state,
        loading: false,
        rover: action.payload.name,
        cameras: action.payload.cameras,
        querys: initialState.querys,
      };
    case types.SET_IMAGES:
      return {
        ...state,
        loading: false,
        images: action.payload,
      };
    case types.SET_QUERYS:
      return {
        ...state,
        loading: false,
        querys: {
          ...state.querys,
          ...action.payload,
          page: 1,
        },
      };
    case types.SET_PAGE:
      return {
        ...state,
        querys: {
          ...state.querys,
          page: action.payload,
        },
        loading: false,
      };
    case types.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case types.SET_FAVOURITES:
      return {
        ...state,
        images: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

export default roversReducer;
