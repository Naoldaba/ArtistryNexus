// src/pages/ArtDetailsPage.js
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Link,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  TextField,
  Button
} from '@mui/material';
import { Favorite as FavoriteIcon, Comment as CommentIcon } from '@mui/icons-material';

const ArtDetailsPage = () => {
  const art = useSelector((state) => state.post.currArt);
  const [comments, setComments] = React.useState(art?.comments);
  const [newComment, setNewComment] = React.useState('');

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentData = {
        id: comments.length + 1,
        username: "currentUser", // Replace with the current logged-in user
        content: newComment.trim()
      };
      setComments([...comments, newCommentData]);
      setNewComment('');
    }
  };

  useEffect(() => {
    console.log("art", art)
  }, [])

  if (!art) {
    return <Typography variant="h6">No art piece selected</Typography>;
  }

  return (
    <Box display="flex" justifyContent="center" mt={5} mb={5}>
      <Card sx={{ display: 'flex', width: '90%', maxWidth: 800 }}>
        <CardMedia
          component="img"
          sx={{ width: '50%' }}
          image={art.images[0]}
          alt={art.title}
        />
        <CardContent sx={{ width: '50%' }}>
          <Typography variant="h5" component="div">
            {art.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {art.description}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Type: {art.type}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Price: {art.price}
          </Typography>
          <Box display="flex" alignItems="center" mt={2}>
            <Link href={`/profile/${art.username}`} underline="hover">
              {art.username}
            </Link>
          </Box>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Box display="flex" alignItems="center">
              <FavoriteIcon sx={{ mr: 0.5 }} />
              <Typography variant="body2">
                {art.likes}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <CommentIcon sx={{ mr: 0.5 }} />
              <Typography variant="body2">
                {comments.length}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              width: '100%',
              maxHeight: '200px',
              overflowY: 'auto',
              mt: 2
            }}
          >
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h6" component="div" gutterBottom>
              Comments
            </Typography>
            <List>
              {comments.map((comment) => (
                <React.Fragment key={comment.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt={comment.username} src={`https://example.com/avatar/${comment.username}`} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Link href={`/profile/${comment.username}`} underline="hover">
                          {comment.username}
                        </Link>
                      }
                      secondary={comment.content}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Box>
          <Box mt={2}>
            <TextField
              label="Add a comment"
              variant="outlined"
              fullWidth
              value={newComment}
              onChange={handleCommentChange}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 1, backgroundColor: 'purple', '&:hover': { backgroundColor: 'purple' } }}
              onClick={handleAddComment}
            >
              Comment
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ArtDetailsPage;
