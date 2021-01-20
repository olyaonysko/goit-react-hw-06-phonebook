import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { contactsOperations, contactsSelectors } from 'redux/contacts';
import s from './ContactList.module.css';

const ContactList = () => {
  const visibleContacts = useSelector(contactsSelectors.getVisibleContacts);
  const contacts = useSelector(contactsSelectors.getContacts);
  const dispatch = useDispatch();

  useEffect(() => dispatch(contactsOperations.getContacts()), [dispatch]);

  return (
    <>
      {contacts.length > 0 ? (
        <ul className={s.list}>
          {visibleContacts.map(({ id, name, number }) => (
            <li key={id} className={s.listItem}>
              <p>
                {name}: {number}
              </p>
              <button
                type="button"
                className={s.button}
                onClick={() => dispatch(contactsOperations.deleteContact(id))}
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
