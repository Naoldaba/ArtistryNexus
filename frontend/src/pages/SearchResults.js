// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Box, Typography, List, ListItem, ListItemText, ListItemButton } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { setSelectedUser } from '../reducers/search';

// const SearchResults = () => {
//   const { searchResults, selectedUser } = useSelector((state) => state.search);
//   const navigate = useNavigate();
//   const dispatch = useDispatch()

//   useEffect(() => { 
//     console.log("searched",searchResults[0].username )
//   }, [searchResults])


//   if(!searchResults){
//     return (<Typography variant="h1" color="primary">No user found with that username</Typography>)
//   }

//   const handleUser = (user) => {
//     dispatch(setSelectedUser(user))
//     navigate('/profile')
//   }


//   return (
//     <Box sx={{ color: 'black'}}>
//       <Typography variant="h6" component="div">
//         Search Results
//       </Typography>
//       <List>
//         {searchResults.map((user) => (
//           <ListItemButton
//             key={user?._id}
//             onClick={() => handleUser(user)}
//             sx={{borderRadius: '5px', boxShadow: '3'}}
//           >
//             <ListItemText primary={user?.username} />
//           </ListItemButton>
//         ))}
//       </List>
//     </Box>
//   );
// };

// export default SearchResults;


import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, List, ListItem, Card, CardContent, Avatar, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setSelectedUser } from '../reducers/search';

const SearchResults = () => {
  const { searchResults, selectedUser } = useSelector((state) => state.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchResults.length > 0) {
      console.log("searched", searchResults[0].username);
    }
  }, [searchResults]);

  if (!searchResults || searchResults.length === 0) {
    return (
      <Container maxWidth="md">
        <Typography variant="h3" color="primary">
        No user found with that username
      </Typography>
      </Container>
    );
  }

  const handleUser = (user) => {
    dispatch(setSelectedUser(user));
    navigate(`/profile`);
  };

  return (
    <Box sx={{ color: 'black', padding: 2 }}>
      <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
        Search Results
      </Typography>
      <List>
        {searchResults.map((user) => (
          <ListItem key={user?._id} sx={{ padding: 0, marginBottom: 2 }}>
            <Card
              onClick={() => handleUser(user)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: 2,
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 3,
                },
              }}
            >
              <Avatar sx={{ marginRight: 2 }}>
                {user?.fullName?.charAt(0).toUpperCase()}
              </Avatar>
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6">{user?.username}</Typography>
                <Typography variant="body1">{user?.fullName}</Typography>
                <Typography variant="body2">
                  {user?.followers.length} Followers | {user?.following.length} Following
                </Typography>
              </CardContent>
            </Card>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SearchResults;
