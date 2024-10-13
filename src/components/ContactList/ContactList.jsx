import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import { selectFilteredContacts } from '../../redux/contactsSlice';
import { selectContacts } from '../../redux/selectors';
import { selectNameFilters } from '../../redux/filtersSlice';

import css from './ContactList.module.css';

const getVisibleContacts = (contacts, filteredName) => {
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filteredName.toLowerCase())
  );
};

export default function ContactList() {
  const contacts = useSelector(selectContacts);
  const nameFilter = useSelector(selectFilteredContacts);
  const filteredName = useSelector(selectNameFilters);

  const visibleContacts = getVisibleContacts(
    contacts,
    filteredName,
    nameFilter
  );

  return (
    <ul className={css.container}>
      {visibleContacts.map(contact => (
        <li key={contact.id}>
          <Contact contact={contact} />
        </li>
      ))}
    </ul>
  );
}
