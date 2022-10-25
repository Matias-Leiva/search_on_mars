import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import Delete from '@mui/icons-material/Delete';
import Search from '@mui/icons-material/Search';

import favouritesHelpers from '../../helpers/favouritesHelpers';
import { setFavourites } from '../../redux/rovers/actions';

function FavouritesSearch({ rovers }) {

  const dispatch = useDispatch();

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleDelete = (rover) => {
    const favouritesArray = favouritesHelpers.deleteFavourite(rows, rover);
    setRows(favouritesArray);
  };

  const handleImages = (rover) => {
    dispatch(setFavourites(rover.images));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const favourites = localStorage.getItem('favourites') ? JSON.parse(localStorage.getItem('favourites')) : [];
    setRows(favourites);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Rovers</TableCell>
            <TableCell align="right">Earth Date / Sol</TableCell>
            <TableCell align="right">Camera</TableCell>
            <TableCell align="right">Page</TableCell>
            <TableCell align="right">Delete</TableCell>
            <TableCell align="right">Watch</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length <= 0 ?
            <div className="div_no_favourites">No Favourites</div> :
            rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.rover}
                  </TableCell>
                  <TableCell align="right">
                    {row.querys.sol}
                    {row.querys.earth_date}
                  </TableCell>
                  <TableCell align="right">{row.querys.camera}</TableCell>
                  <TableCell align="right">{row.querys.page}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(row)}
                    >
                      <Delete fontSize="inherit" />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => handleImages(row)}
                    >
                      <Search fontSize="inherit" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}

export default FavouritesSearch;
