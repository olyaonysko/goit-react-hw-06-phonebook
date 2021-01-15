import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/contacts-action';
import { filterValue } from './filter-selector';
import { contactsArray } from '../ContactList/contactList-selector';
import s from './Filter.module.css';

const Filter = () => {
  const filter = useSelector(filterValue);
  const contacts = useSelector(contactsArray);
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
            onChange={event => dispatch(changeFilter(event.target.value))}
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
