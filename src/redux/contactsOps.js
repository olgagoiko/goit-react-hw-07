import axios from 'axios';
// import { fetchingSuccess, fetchingError } from './contactsSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://670bee7e7e5a228ec1cf164d.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContacts, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', { newContacts });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);
