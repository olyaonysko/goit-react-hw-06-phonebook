import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContacts } from '../../redux/contacts-action';
import { contactsArray } from './contactList-selector';
import { filterValue } from '../Filter/filter-selector';
import s from './ContactList.module.css';

const ContactList = () => {
  const contacts = useSelector(contactsArray);
  const filter = useSelector(filterValue);
  const dispatch = useDispatch();

  const onFilteredContacts = (contacts, filter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  const filteredContacts = onFilteredContacts(contacts, filter);

  return (
    <>
      {contacts.length > 0 ? (
        <ul className={s.list}>
          {filteredContacts.map(({ id, name, number }) => (
            <li key={id} className={s.listItem}>
              <p>
                {name}: {number}
              </p>
              <button
                type="button"
                className={s.button}
                onClick={() => dispatch(deleteContacts(id))}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your phonebook is empty. Add contact.</p>
      )}
    </>
  );
};

ContactList.propTypes = {
  filteredContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
};

export default ContactList;
