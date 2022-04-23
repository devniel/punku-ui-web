import axios from 'axios';
import { BASE_API_URL } from '../constants';

axios.defaults.baseURL = BASE_API_URL;

export const getRecord = async function (recordId: string): Promise<any> {
  return (await axios.get(`/records/${recordId}`))?.data;
};

export const createRecord = async function (record): Promise<any> {
  return (await axios.post(`/records/`, record))?.data;
};

export const searchRecord = async function ({
  query,
  page,
}: {
  query: string;
  page?: number;
}): Promise<any[]> {
  return (
    await axios.get(`/search`, {
      params: {
        query,
        page,
      },
    })
  )?.data;
};
