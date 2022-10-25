import _ from 'lodash';

export default {
  deleteFavourite(favourites, rovers) {
    const storageFavourites = _.differenceWith(favourites, [{
      rover: rovers.rover,
      querys: rovers.querys,
      images: rovers.images,
      id: rovers.id,
    }], _.isEqual);
    localStorage.setItem('favourites', JSON.stringify(storageFavourites));
    return storageFavourites;
  },
  addFavourite(favourites, rovers) {
    const favouritesArray = favourites;
    favouritesArray.push({
      rover: rovers.rover,
      querys: rovers.querys,
      images: rovers.images,
      id: Date.now(),
    });
    localStorage.setItem('favourites', JSON.stringify(favouritesArray));
  },
};
