import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';

import _ from 'lodash';
import { roversList, camerasNames } from '../../constant/rovers';
import { setQuerys, setRover } from '../../redux/rovers/actions';
import favouritesHelpers from '../../helpers/favouritesHelpers';

function ImageSearch({ rovers }) {
  const dispatch = useDispatch();
  const [valueTab, setValueTab] = useState(0);

  const [localQuerys, setLocalQuerys] = useState(rovers.querys);
  const [isFavourite, setIsFavourite] = useState(false);

  const handleTabChange = (event, newValue) => {
    setValueTab(newValue);
  };

  const handleChange = (event, key) => {
    switch (key) {
      case 'rover':
        dispatch(
          setRover(
            roversList.find((rover) => rover.name === event.target.value),
          ),
        );
        break;
      case 'sol':
        setLocalQuerys((querys) => ({ ...querys, sol: event.target.value, earth_date: '' }));
        break;
      case 'earth_date':
        setLocalQuerys((querys) => ({ ...querys, [key]: moment(event).format('YYYY-MM-DD'), sol: '' }));
        break;
      default:
        setLocalQuerys((querys) => ({ ...querys, [key]: event.target.value }));
        break;
    }
  };

  const handleSubmit = () => {
    dispatch(setQuerys(localQuerys));
  };

  //Add or Remove Favourite Images Object
  const handleFavourite = () => {
    const favourites = localStorage.getItem('favourites') ? JSON.parse(localStorage.getItem('favourites')) : [];
    if (isFavourite) {
      favouritesHelpers.deleteFavourite(favourites, rovers);
      setIsFavourite(false);
    } else {
      favouritesHelpers.addFavourite(favourites, rovers);
      setIsFavourite(true);
    }
  };

  //Matches an existing favorite object if the queries are the same
  useEffect(() => {
    const favourites = localStorage.getItem('favourites') ? JSON.parse(localStorage.getItem('favourites')) : [];
    const storageFavourites = _.filter(favourites, _.matches({
      rover: rovers.rover,
      querys: rovers.querys,
      images: rovers.images,
    }));
    if (storageFavourites.length > 0) {
      setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }
  }, [localQuerys, rovers.querys, rovers.images]);

  useEffect(() => {
    setLocalQuerys(rovers.querys);
  }, [rovers.rover]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={11} md={5}>
        <FormControl fullWidth>
          <InputLabel id="select_rover">Rover</InputLabel>
          <Select
            labelId="select_rover"
            id="select_rover"
            value={rovers.rover}
            label="Rover"
            onChange={(e) => handleChange(e, 'rover')}
          >
            {roversList.map((rover) => (
              <MenuItem key={rover.name} value={rover.name}>
                {rover.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={11} md={6}>
        {rovers.cameras && (
          <FormControl fullWidth>
            <InputLabel id="camera">Camera</InputLabel>
            <Select
              labelId="camera"
              id="select_camera"
              value={localQuerys.camera}
              label="Camera"
              onChange={(e) => handleChange(e, 'camera')}
            >
              <MenuItem key="all" value="">
                All cameras
              </MenuItem>
              {rovers.cameras.map((camera) => (
                <MenuItem key={camera} value={camera}>
                  {camerasNames[camera]}
                </MenuItem>
              ))}

            </Select>
          </FormControl>
        )}
      </Grid>
      <Grid item xs={11} md={11} justifyItems="center">
        <Tabs
          value={valueTab}
          onChange={handleTabChange}
          aria-label="Search tabs"
        >
          <Tab label="Earth Date" />
          <Tab label="Sol" />
        </Tabs>
        {!valueTab ? (
          <FormControl sx={{ m: 1, width: '100%' }} variant="standard">
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                mask="____-__-__"
                orientation="portrait"
                label="Earth Date"
                inputFormat="YYYY-MM-DD"
                value={localQuerys.earth_date}
                onChange={(e) => handleChange(e, 'earth_date')}
                renderInput={(params) => (
                  <TextField variant="standard" {...params} />
                )}
              />
            </LocalizationProvider>
          </FormControl>
        ) : (
          <TextField
            id="sol"
            label="Sol"
            variant="standard"
            type="number"
            value={localQuerys.sol}
            onChange={(e) => handleChange(e, 'sol')}
            fullWidth
          />
        )}
      </Grid>
      <Grid item xs={11} md={6} justifyContent="start">
        <Button onClick={handleFavourite}>{isFavourite ? 'Remove Favourite' : 'Add Favourite'}</Button>
      </Grid>
      <Grid item xs={11} md={6} justifyContent="end">
        <Button onClick={handleSubmit}>Search</Button>
      </Grid>
    </Grid>
  );
}

export default ImageSearch;
