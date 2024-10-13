import './App.css';
import ContactList from './ContactList/ContactList';
import SearchBox from './SearchBox/SearchBox';
import ContactForm from './ContactForm/ContactForm';
import { fetchContacts } from '../redux/contactsOps';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoading, selectError } from '../redux/selectors';
import { useEffect } from 'react';

export default function App() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    console.log('Calculating visible contacts. Now memoized!');
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm />
      {loading && !error && <b>Request in progress...</b>}
      <SearchBox />
      <ContactList />
    </>
  );
}
