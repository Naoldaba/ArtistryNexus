import api from './index';
import { setSearchResults } from '../reducers/search';

export const searchUsers = (query) => async (dispatch) => {
    try {
      const response = await api.get(`/user/search?query=${query}`);
      dispatch(setSearchResults(response.data));
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };


