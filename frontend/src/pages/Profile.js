// import { Container, Box, Typography, Card, CardContent, Avatar, Button, IconButton, TextField } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { Edit, PhotoCamera, Report, Block } from '@mui/icons-material';
// import TabSelector from '../components/TabSelector';

// import { Add } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import { useEffect, useState } from "react"
// import { getPortfolio } from "../actions/post"

// const ProfilePage = () => {
//   const [tabValue, setTabValue] = useState(0);
//   const [isEditing, setIsEditing] = useState(false);
//   const { user, token } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const {artPieces, isLoading, error} = useSelector((state) => state.post)

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   const handleEditProfile = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleUploadPic = (event) => {
//     const file = event.target.files[0];
//   };

//   const handleReportUser = () => {
//   };

//   const handleBlockUser = () => {
//   };

//   useEffect(() => {

//     console.log("arts ", artPieces)
//     console.log("ehy")

//     if(!artPieces && !isLoading && !error){
//         dispatch(getPortfolio())  
//     }

// }, [isLoading])

//   return (
//     <Container>
//       <Box sx={{ my: 4 }}>
        
//         <Card sx={{ mb: 4, boxShadow: 1 }}>
//           <CardContent sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
//           <Box sx={{ minWidth: '120px', position: 'relative' }}>
//               <Avatar
//                 sx={{ width: 100, height: 100, fontSize: '40px', backgroundColor: 'black', mb: 2 }}
//               >
//                 {user.username[0].toUpperCase()}
//               </Avatar>
//               <input
//                 accept="image/*"
//                 style={{ display: 'none' }}
//                 id="icon-button-file"
//                 type="file"
//                 onChange={handleUploadPic}
//               />
//               <label htmlFor="icon-button-file">
//                 <IconButton
//                   color="primary"
//                   aria-label="upload picture"
//                   component="span"
//                   sx={{
//                     position: 'absolute',
//                     bottom: 10,
//                     right: 10,
//                     color: 'purple'
//                   }}
//                 >
//                   <PhotoCamera />
//                 </IconButton>
//               </label>
//             </Box>
//             <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
//               <Typography gutterBottom variant="h5" component="div">
//                 {user.fullName}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {user.email}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {user.bio}
//               </Typography>
              
//               <Typography variant="body2" color="text.secondary">
//                 {user.followers.length} Followers | {user.following.length} Following
//               </Typography>
//               <Button
//                 variant="outlined"
//                 startIcon={<Edit />}
//                 onClick={handleEditProfile}
//                 sx={{ mt: 2, alignSelf: 'start', color: 'purple', borderColor: 'purple' }}
//               >
//                 {isEditing ? 'Save' : 'Edit Profile'}
//               </Button>
              
              
//             </Box>
//             <Box sx={{flexGrow: '1',display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//                     <Typography variant="h4" component="h1" gutterBottom>
//                         Welcome, {user.username}!
//                     </Typography>
//                     <Button
//                         variant="contained"
//                         onClick={() => navigate('/post')}

//                         startIcon={<Add />}
//                         sx={{ backgroundColor: 'purple', '&:hover': { backgroundColor: 'purple'} }}
//                      >
//                         Post
//                     </Button>
//               {!token && (
//                 <Box sx={{display: 'flex', justifyContent: 'space-around', width: '100%'}}>
//                   <Button
//                     variant="text"
//                     color="secondary"
//                     startIcon={<Report />}
//                     onClick={handleReportUser}
//                     sx={{  }}
//                   >
//                     Report
//                   </Button>
//                   <Button
//                     variant="text"
//                     color="secondary"
//                     startIcon={<Block />}
//                     onClick={handleBlockUser}
//                   >
//                     Block User
//                   </Button>
//                 </Box>
//               )}
//             </Box>
//           </CardContent>
//         </Card>
//         <TabSelector />
//       </Box>
//     </Container>
//   );
// };

// export default ProfilePage;




import { Container, Box, Typography, Card, CardContent, Avatar, Button, IconButton, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Edit, PhotoCamera, Report, Block } from '@mui/icons-material';
import TabSelector from '../components/TabSelector';

import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react"
import { getPortfolio } from "../actions/post"

const ProfilePage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const { user, token } = useSelector((state) => state.auth)
  
  const {selectedUser} = useSelector((state) => state.search)
  const profile = selectedUser ? selectedUser : user

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {artPieces, isLoading, error} = useSelector((state) => state.post)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleUploadPic = (event) => {
    const file = event.target.files[0];
  };

  const handleReportUser = () => {
  };

  const handleBlockUser = () => {
  };

  useEffect(() => {

    console.log("arts ", artPieces)
    console.log("ehy selectedUser", selectedUser)

    if(!selectedUser && !artPieces && !isLoading && !error){
        dispatch(getPortfolio())  
    }

}, [])

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        
        <Card sx={{ mb: 4, boxShadow: 1 }}>
          <CardContent sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Box sx={{ minWidth: '120px', position: 'relative' }}>
              <Avatar
                sx={{ width: 100, height: 100, fontSize: '40px', backgroundColor: 'black', mb: 2 }}
              >
                {profile.username[0].toUpperCase()}
              </Avatar>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="icon-button-file"
                type="file"
                onChange={handleUploadPic}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  sx={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    color: 'purple'
                  }}
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </Box>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography gutterBottom variant="h5" component="div">
                {profile.fullName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {profile.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {profile.bio}
              </Typography>
              
              <Typography variant="body2" color="text.secondary">
                {profile.followers.length} Followers | {profile.following.length} Following
              </Typography>
              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={handleEditProfile}
                sx={{ mt: 2, alignSelf: 'start', color: 'purple', borderColor: 'purple' }}
              >
                {isEditing ? 'Save' : 'Edit Profile'}
              </Button>
              
              
            </Box>
            <Box sx={{flexGrow: '1',display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Welcome, {profile.username}!
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/post')}

                        startIcon={<Add />}
                        sx={{ backgroundColor: 'purple', '&:hover': { backgroundColor: 'purple'} }}
                     >
                        Post
                    </Button>
              {!token && (
                <Box sx={{display: 'flex', justifyContent: 'space-around', width: '100%'}}>
                  <Button
                    variant="text"
                    color="secondary"
                    startIcon={<Report />}
                    onClick={handleReportUser}
                    sx={{  }}
                  >
                    Report
                  </Button>
                  <Button
                    variant="text"
                    color="secondary"
                    startIcon={<Block />}
                    onClick={handleBlockUser}
                  >
                    Block User
                  </Button>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
        <TabSelector portfolio={selectedUser ? profile.portfolio : artPieces} />
      </Box>
    </Container>
  );
};

export default ProfilePage;
