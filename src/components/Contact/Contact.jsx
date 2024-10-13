import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsOps';
import { MdPhone } from 'react-icons/md';
import { IoPerson } from 'react-icons/io5';
import css from './Contact.module.css';

export default function Contact({ contact }) {
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(deleteContact(contact.id));

  return (
    <div className={css.container}>
      <ul className={css.list}>
        <li className={css.wrapper}>
          <p>
            <IoPerson style={{ width: 20, height: 20 }} /> Name: {contact.name}
          </p>
        </li>
        <li className={css.wrapper}>
          <p>
            <MdPhone style={{ width: 20, height: 20 }} /> Number:{' '}
            {contact.number}
          </p>
        </li>
      </ul>
      <button className={css.button} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
