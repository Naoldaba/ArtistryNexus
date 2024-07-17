import api from './index';
import { setSearchResults } from '../reducers/search';

export const searchUsers = (query) => async (dispatch) => {
    try {
        console.log("searching", query)
      const response = await api.get(`/user/search?username=${query}`);
      console.log("serached", response)
      dispatch(setSearchResults(response.data));
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };


