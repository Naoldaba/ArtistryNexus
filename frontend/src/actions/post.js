import api from './index';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const postArt = createAsyncThunk(
    'post/postArt',
    async (artData, thunkAPI) => {
  
      try {
        console.log("post data", artData)
        const response = await api.post('/artwork', artData,{
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        });

        console.log("res post", response)
        
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response ? error.response.data.message : error.message);
      }
    }
  );


export const getPortfolio = createAsyncThunk(
    'post/getPortfolio',
    async (thunkAPI) => { 
  
      try {
        const response = await api.get('/artwork/my_artwork');
        console.log("response my art", response)
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response ? error.response.data.message : error.message);
      }
    }
  );


  export const commentArt = createAsyncThunk(
    'post/commentArt',
    async (comment, artId, thunkAPI) => {
  
      try {
        console.log("post comment", comment, artId)
        const response = await api.post(`/artwork/${artId}`, comment,{
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        });

        console.log("res post", response)
        
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response ? error.response.data.message : error.message);
      }
    }
  );
