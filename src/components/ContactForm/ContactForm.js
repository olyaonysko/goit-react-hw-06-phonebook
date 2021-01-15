import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import InputMask from 'react-input-mask';
// import * as yup from 'yup';
import { toast } from 'react-toastify';
import { contactsArray } from '../ContactList/contactList-selector';
import s from './ContactForm.module.css';
import { addContacts } from '../../redux/contacts-action';

export default function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(contactsArray);
  const { register, handleSubmit, errors, reset, control } = useForm();

  const onSumbit = ({ name, number }) => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      toast.info(`🙄 ${name} is already in contacts!`);
      return;
    }

    if (contacts.find(contact => contact.number === number)) {
      toast.info(`This number is already in contacts!`);
      return;
    }

    dispatch(addContacts(name, number));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSumbit)} className={s.form}>
      <label className={s.label}>
        Name
        <input
          type="text"
          name="name"
          ref={register({
            minLength: { value: 2, message: 'Too short name' },
            maxLength: { value: 20, message: 'Too long name' },
            required: 'Is a required field',
          })}
          className={s.input}
          placeholder="Enter name"
        />
        {errors.name && <p className={s.errors}>{errors.name.message}</p>}
      </label>
      <label className={s.label}>
        Number
        <Controller
          as={InputMask}
          name="number"
          rules={{
            required: 'Phone number is required',
          }}
          defaultValue=""
          control={control}
          className={s.input}
          placeholder="+38 (___) ___-__-__"
          mask="+38 (999) 999-99-99"
        />
        {errors.number && <p className={s.errors}>{errors.number.message}</p>}
      </label>
      <button type="submit" className={s.button}>
        Add contact
      </button>
    </form>
  );
}

// old input number
{
  /* <input
          type="tel"
          name="number"
          ref={register({
            required: 'Is a required field',
            minLength: { value: 10, message: 'Too short number' },
            maxLength: { value: 20, message: 'Too long number' },
            pattern: {
              value: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
              message: 'work',
            },
          })}
          className={s.input}
          placeholder="Enter number"
        />
        {errors.number && <p className={s.errors}>{errors.number.message}</p>} */
}
