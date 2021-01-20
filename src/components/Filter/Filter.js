import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { contactsActions, contactsSelectors } from 'redux/contacts';
import s from './Filter.module.css';

const Filter = () => {
  const filter = useSelector(contactsSelectors.getFilter);
  const contacts = useSelector(contactsSelectors.getContacts);
  const dispatch = useDispatch();

  return (
    <>
      {contacts.length > 1 && (
        <label className={s.label}>
          Find contacts by name
          <input
            type="text"
            className={s.input}
            placeholder="Enter name"
            value={filter}
            onChange={event =>
              dispatch(contactsActions.changeFilter(event.target.value))
            }
          />
        </label>
      )}
    </>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
  changeFilter: PropTypes.func,
};

export default Filter;
