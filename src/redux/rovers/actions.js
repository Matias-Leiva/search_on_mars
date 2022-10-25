import _ from 'lodash';
import * as types from './types';
import nasaApi from '../../api/api';
import querysMaker from '../../helpers/querysMaker';

const setLoading = (payload) => ({ type: types.SET_LOADING, payload });
const setError = (payload) => ({ type: types.SET_ERROR, payload });
const setImages = (payload) => ({ type: types.SET_IMAGES, payload });

export const getRoversImages = () => {
  return async (dispatch, getState) => {
    dispatch(setLoading());
    try {
      const { rover, querys } = getState().rovers;
      const querysEndpoint = querysMaker(querys);
      const dinamicLoading = sessionStorage.getItem(rover) ?
        JSON.parse(sessionStorage.getItem(rover)) :
        false;
      let roverImages;
      if (dinamicLoading) {
        const storageImages = _.filter(dinamicLoading, _.matches(querys));
        if (storageImages.length > 0) {
          dispatch(setImages(storageImages[0].images));
        } else {
          roverImages = await nasaApi.getRoversImages(
            rover.toLowerCase(),
            querysEndpoint,
          );
          dispatch(setImages(roverImages.data.photos));
          const storage = [
            ...dinamicLoading,
            {
              ...querys,
              images: roverImages.data.photos,
            },
          ];
          sessionStorage.setItem(rover, JSON.stringify(storage));
        }
      } else {
        roverImages = await nasaApi.getRoversImages(
          rover.toLowerCase(),
          querysEndpoint,
        );
        dispatch(setImages(roverImages.data.photos));
        const storage = [
          {
            ...querys,
            images: roverImages.data.photos,
          },
        ];
        sessionStorage.setItem(rover, JSON.stringify(storage));
      }
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};

export const setRover = (payload) => ({ type: types.SET_ROVER, payload });
export const setPage = (payload) => ({ type: types.SET_PAGE, payload });
export const setQuerys = (payload) => ({ type: types.SET_QUERYS, payload });
export const setFavourites = (payload) => ({ type: types.SET_FAVOURITES, payload });
