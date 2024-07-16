import React from 'react';
import { Box } from '@mui/material';
import Masonry from '@mui/lab/Masonry'



const ImageGrid = ({images}) => {
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Masonry
        columns={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }} 
        spacing={1} 
      >
        {images.map((src, index) => (
          <Box
            key={index}
            sx={{
              width: 200, 
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#f0f0f0',
            }}
          >
            <img
              src={src}
              alt={`image-${index}`}
              style={{
                width: '100%',
                height: 'auto', 
                objectFit: 'contain',
              }}
            />
          </Box>
        ))}
      </Masonry>
    </Box>
  );
};

export default ImageGrid;
