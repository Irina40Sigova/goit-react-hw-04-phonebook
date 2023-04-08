import React, { useState, useEffect } from 'react';

import { nanoid } from 'nanoid';

import { LoginForm } from '../LoginForm/LoginForm';
import { Filter } from 'components/Filter/Filter';
import { Contacts } from 'components/Contacts/Contacts';

import { Container, Title } from './App.styled';

const primaryContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? primaryContacts
  );
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    const isInContacts = contacts.find(
      e => e.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isInContacts) {
      alert(`"${contact.name}" is alredy in contacts`, '', 'warning');
      return;
    }

    setContacts(prevState => [{ ...contact, id: nanoid() }, ...prevState]);
  };

  const getFilter = e => {
    setFilter(e.target.value.toLowerCase());
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contacts => contacts.id !== id));
  };

  const getFilteredContacs = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };
  const visibleContacts = getFilteredContacs();
  return (
    <Container>
      <Title> Phonebook</Title>
      <LoginForm addContact={addContact} />
      <Filter getFilter={getFilter} />{' '}
      <Contacts contacts={visibleContacts} deleteContact={deleteContact} />
    </Container>
  );
  //   state = {
  //     contacts: [
  //       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //     ],
  //     filter: '',
  //   };

  //   componentDidMount() {
  //     const contacts = localStorage.getItem('contacts');
  //     const parsedContacts = JSON.parse(contacts);
  //     if (parsedContacts) {
  //       this.setState({ contacts: parsedContacts });
  //     }
  //   }

  //   componentDidUpdate(prevProps, prevState) {
  //     const newAddContacts = this.state.contacts;
  //     const prevContacts = prevState.contacts;

  //     if (newAddContacts !== prevContacts) {
  //       localStorage.setItem('contacts', JSON.stringify(newAddContacts));
  //     }
  //   }

  //   addContact = contact => {
  //     const isInContacts = this.state.contacts.find(
  //       e => e.name.toLowerCase() === contact.name.toLowerCase()
  //     );

  //     if (isInContacts) {
  //       alert(`"${contact.name}" is alredy in contacts`, '', 'warning');
  //       return;
  //     }

  //     this.setState(prevState => {
  //       return {
  //         contacts: [{ ...contact, id: nanoid() }, ...prevState.contacts],
  //       };
  //     });
  //   };

  //   getFilter = e => {
  //     this.setState({
  //       filter: e.target.value.toLowerCase(),
  //     });
  //   };

  //   deleteContact = id => {
  //     this.setState(prevState => ({
  //       contacts: prevState.contacts.filter(contacts => contacts.id !== id),
  //     }));
  //   };

  //   getFilteredContacs = () => {
  //     const { filter, contacts } = this.state;
  //     return contacts.filter(contact =>
  //       contact.name.toLowerCase().includes(filter)
  //     );
  //   };

  //   render() {
  //     const contacts = this.getFilteredContacs();
  //     return (
  //       <Container>
  //         <Title> Phonebook</Title>
  //         <LoginForm addContact={this.addContact} />
  //         <Filter getFilter={this.getFilter} />
  //         <Contacts contacts={contacts} deleteContact={this.deleteContact} />
  //       </Container>
  //     );
  //   }
};
