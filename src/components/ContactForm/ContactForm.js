import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { contactsArray } from '../ContactList/contactList-selector';
import { toast } from 'react-toastify';
import isMobilePhone from 'validator/es/lib/isMobilePhone';
import s from './ContactForm.module.css';
import { addContacts } from '../../redux/contacts-action';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(contactsArray);
  const dispatch = useDispatch();

  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!name || !number) {
      toast.info('👺 All fields must be filled!');
      return;
    }

    if (!isMobilePhone(number)) {
      toast.info('👺 Telephone number must be numeric!');
      return;
    }

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      console.log('work');
      toast.info(`🙄 ${name} is already in contacts!`);
      return;
    }

    if (contacts.find(contact => contact.number === number)) {
      toast.info(`This number is already in contacts!`);
      return;
    }

    dispatch(addContacts(name, number));
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <label className={s.label}>
        Name
        <input
          type="text"
          name="name"
          className={s.input}
          placeholder="Enter name"
          value={name}
          onChange={handleChange}
        />
      </label>
      <label className={s.label}>
        Number
        <input
          type="tel"
          name="number"
          className={s.input}
          placeholder="+380(__)-___-__-__"
          value={number}
          onChange={handleChange}
        />
      </label>
      <button type="submit" className={s.button}>
        Add contact
      </button>
    </form>
  );
}
