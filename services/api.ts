import axios from 'axios';
import { BASE_API_URL } from '../constants';

axios.defaults.baseURL = BASE_API_URL;

export const signUp = async function ({username, password, email}): Promise<any> {
  return (await axios({
    url: BASE_API_URL,
    method: 'post',
    data: {
      query: `
        mutation signUp($data: SignupInput!) {
          signUp(data: $SignupInput) {
            message
          }
        }
      `,
      variables: {
        data : {username, password, email}
      }
    }
  }))?.data;
}