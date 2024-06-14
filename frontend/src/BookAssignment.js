import React, { useState } from 'react';
import {
  Container,
  TextField,
  IconButton,
  Typography,
  Box, Grid, Autocomplete
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import { gql, useLazyQuery} from '@apollo/client';

const SEARCH_BOOKS = gql`
  query SearchBooks($title: String) {
    books(title: $title) {
      title
      author
      coverPhotoURL
  }
  }`;

const BookAssignmentView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [readingList, setReadingList] = useState([]);
  const [fetchBooks, { data, loading, error }] = useLazyQuery(SEARCH_BOOKS);

  React.useEffect(()=>{
    if (searchQuery.trim() !== '') {
      fetchBooks({ variables: { title: searchQuery } });
      console.log(searchQuery)
    }
  },[searchQuery, fetchBooks])

  const handleAddToReadingList = (book) => {
    if (!readingList.some(item => item.title === book.title)) {
      setReadingList([...readingList, book]);
    }
  };

  const handleRemoveFromReadingList = (bookId) => {
    setReadingList(readingList.filter(book => book.title !== bookId));
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Autocomplete
          id="free-solo-demo"
          getOptionLabel={(option) => option.title}
          renderOption={(props, option, index) => (
          loading ? <li>Loading...</li> : error? <li>{error}</li> :
          <li {...props} key={option.title + index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'  }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                alt="Remy Sharp"
                src={ require('./frontend/'.concat(option.coverPhotoURL))}
                sx={{ width: 100, height: 100, mr: 2 }}
                variant="square"
              />
              <div>
                <Typography variant="h6" component="h2" sx={{ mt: 4,  mr: 2  }}>
                  {option.title}
                </Typography>
                <p>{option.author}</p>
              </div>

              </div>
              <Fab onClick={() => handleAddToReadingList(option)} color="primary" aria-label="add">
                <AddIcon />
              </Fab>
            </li>
          )}
          options={data && data.books.length > 0 ? data.books.map((option, index) =>  ({ ...option, index })) : []}
          renderInput={(params) => <TextField {...params} label="Search for a book"  variant="outlined"
          fullWidth value={searchQuery}  onChange={(e) => setSearchQuery(e.target.value)} sx={{ my: 2 }} />}/>


        <Typography variant="h6" component="h2" sx={{ mt: 4 }}>
          Reading List
        </Typography>
        <Box sx={{ width: '100%' }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {readingList.map((book, i) => (
              
              <Grid item xs={6} lg={3} md={4} key={i}>
                <img src={ require('./frontend/'.concat(book.coverPhotoURL))} alt='cover' width='100%' max-height='180'/>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div>
                    <p>{book.title}</p>
                    <p>{book.author}</p>
                  </div>
                    

                  <IconButton    aria-label="delete"  onClick={() => handleRemoveFromReadingList(book.title)} >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </Grid>))
            }
          </Grid>
        </Box>
       </Box>
    </Container>
  );
};

export default BookAssignmentView;
