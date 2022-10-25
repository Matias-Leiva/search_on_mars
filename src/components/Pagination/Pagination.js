import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Grid, IconButton } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import { setPage } from '../../redux/rovers/actions';

function Pagination({ rovers }) {
  const dispatch = useDispatch();

  const [disabledLeft, setDisabledLeft] = useState(false);
  const [disabledRight, setDisabledRight] = useState(false);

  const handleChangePage = (direction) => {
    let { page } = rovers.querys;
    dispatch(setPage(direction === 'left' ? --page : ++page));
  };

  useEffect(() => {
    rovers.images.length < 25 ?
      setDisabledRight(true) :
      setDisabledRight(false);
    rovers.querys.page === 1 ? setDisabledLeft(true) : setDisabledLeft(false);
  }, [rovers.querys, rovers.images]);

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item sm={1} className="justify_center">
        <IconButton
          size="small"
          onClick={() => handleChangePage('left')}
          disabled={disabledLeft}
        >
          <ArrowLeftIcon fontSize="inherit" />
        </IconButton>
      </Grid>
      <Grid item sm={1} className="justify_center">
        <Button>{rovers.querys.page}</Button>
      </Grid>
      <Grid item sm={1} className="justify_center">
        <IconButton
          size="small"
          onClick={() => handleChangePage('right')}
          disabled={disabledRight}
        >
          <ArrowRightIcon fontSize="inherit" className="justify_center" />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default Pagination;
