import { createSlice, createSelector } from '@reduxjs/toolkit';
// import { nanoid } from 'nanoid';
import { addContact, deleteContact } from './contactsOps';
import { selectContacts, selectNameFilters } from '../redux/selectors';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    loading: false,
    error: null,

    filters: {
      name: '',
    },
  },

  extraReducers: builder => {
    builder
      .addCase(addContact.pending, state => {
        state.loading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(deleteContact.pending, state => {
        state.loading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.items.findIndex(
          contact => contact.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilters],
  (contacts, nameFilter) => {
    switch (nameFilter) {
      case nameFilter.active:
        return contacts.filter(contact => !contact.completed);
      case nameFilter.completed:
        return contacts.filter(contact => contact.completed);
      default:
        return contacts;
    }
  }
);

// export const { addContact, deleteContact } = contactsSlice.actions;
// export const selectContacts = state => state.contacts.items;
export default contactsSlice.reducer;
