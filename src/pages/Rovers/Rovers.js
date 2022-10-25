import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Paper, Stack, Tab, Tabs } from '@mui/material';

import { getRoversImages } from '../../redux/rovers/actions';
import ImageSearch from '../../components/ImagesSearch/ImageSearch';
import Pagination from '../../components/Pagination/Pagination';
import RoversImages from '../../components/RoversImages/RoversImages';
import FavouritesSearch from '../../components/FavouritesSearch/FavouritesSearch';

function Rovers() {
  const dispatch = useDispatch();
  const rovers = useSelector((state) => state.rovers);

  const [valueTab, setValueTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setValueTab(newValue);
  };

  useEffect(() => {
    dispatch(getRoversImages());
  }, [rovers.querys, dispatch]);

  return (
    <Container fixed >
      <Paper elevate={3} className="container_rovers">
        <Stack spacing={3}>
          <Tabs
            value={valueTab}
            onChange={handleTabChange}
            aria-label="Search"
          >
            <Tab label="Search" />
            <Tab label="Favourites" />
          </Tabs>
          {!valueTab ? (
            <ImageSearch rovers={rovers} />
          ) : (
            <FavouritesSearch rovers={rovers} />
          )}
          {!valueTab && <Pagination rovers={rovers} />}
          <RoversImages rovers={rovers} />
          {!valueTab && <Pagination rovers={rovers} />}
        </Stack>
      </Paper>
    </Container>
  );
}

export default Rovers;
