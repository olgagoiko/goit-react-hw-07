import { createSlice, createSelector } from '@reduxjs/toolkit';
// import { nanoid } from 'nanoid';
import { addContact, deleteContact, fetchContacts } from './contactsOps';
import { selectContacts, selectNameFilters } from '../redux/selectors';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    loading: false,
    error: null,

    // filters: {
    //   name: '',
    // },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchContacts.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(addContact.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(addContact.rejected, state => {
        state.loading = false;
        state.error = true;
      })

      .addCase(deleteContact.pending, state => {
        state.loading = true;
      })

      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload.id);
        state.loading = false;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilters],

  (contacts, nameContact) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(nameContact.toLowerCase())
    );
  }
  // switch (nameFilter) {
  //   case nameFilter.active:
  //     return contacts.filter(contact => !contact.completed);
  //   case nameFilter.completed:
  //     return contacts.filter(contact => contact.completed);
  //   default:
  //     return contacts;
  // }
);

// export const { addContact, deleteContact } = contactsSlice.actions;
// export const selectContacts = state => state.contacts.items;
export default contactsSlice.reducer;
