import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Badge, Table,TextInput } from '@mantine/core';
import { API_SELF, CONTACTS_ENDPOINT, DISCUSSIONS_ENDPOINT } from '../constants/constants';
import { useLogin } from './login-provider';

const contacts_API = 'http://localhost:8000/api/contacts';

async function postDiscussion(DiscussionName, ids, names, USER_ID) {
  let body;
  ids.push(USER_ID)
  console.log(ids)
  if (DiscussionName !== '') {
    body = {
      contacts: ids,
      name: DiscussionName
    };
  } else {
    body = {
      contacts: ids,
      name: names
    };
  }

  const response = await window.fetch(`${API_SELF}${DISCUSSIONS_ENDPOINT}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return data;
}


export function NewChatModal({User}) {
  const { isLoggedIn } = useLogin();
  const [opened, { open, close }] = useDisclosure(false);
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [discussionName, setDiscussionName] = useState('');

  async function fetchContacts() {
    const response = await fetch(contacts_API);
    const data = await response.json();
    return data;
  }

  async function loadContacts() {
    const data = await fetchContacts();
    setContacts(data);
  }

  useEffect(() => {
    loadContacts();
  }, []);

  const handleRowSelect = (contact) => {
    const isSelected = selectedContacts.some((selectedContact) => selectedContact.id === contact.id);

    if (isSelected) {
      setSelectedContacts((prevContacts) =>
        prevContacts.filter((selectedContact) => selectedContact.id !== contact.id)
      );
    } else {
      setSelectedContacts((prevContacts) => [...prevContacts, contact]);
    }
  };

  const handleDiscussionNameChange = (value) => {
    setDiscussionName(value);
  };

  const handleCreateDiscussion = async () => {
    const selectedIds = selectedContacts.map((contact) => contact.id);
    const selectedNames = selectedContacts.map((contact) => contact.name).join(', ');
    await postDiscussion(discussionName, selectedIds, selectedNames, User);
    close();
  };

  return (
    <>
      {isLoggedIn ? (
        <Modal opened={opened} onClose={close} title="Choose a new contact to chat:" size={500}>
          <div style={{ maxHeight: '50vh', overflowY: 'auto' }} className='mb-10'>
            <Table verticalSpacing="md">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th w={300}>Name</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {contacts.map((contact) => (
                  <Table.Tr key={contact.id} selected={selectedContacts.includes(contact)}>
                    <Table.Td>{contact.name}</Table.Td>

                    <Table.Td>
                      <Button
                        variant="outline"
                        color="blue"
                        onClick={() => handleRowSelect(contact)}
                      >
                        {selectedContacts.includes(contact) ? 'Deselect' : 'Select'}
                      </Button>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </div>
          <div>
          <TextInput
              className="fixed bottom-0 left-0 mb-4 ml-4"
              placeholder="Enter a discussion name"
              value={discussionName}
              onChange={(event) => handleDiscussionNameChange(event.target.value)}
            />
            <Button
              className="bg-custom-color fixed bottom-0 right-0 mb-4 mr-4"
              onClick={handleCreateDiscussion}
            >
              Create Discussion
            </Button>
          </div>
        </Modal>
      ) : (
        <Modal opened={opened} onClose={close} title="Please LOG IN First!" size={700}></Modal>
      )}

      <Button
        onClick={open}
        className="bg-custom-color
        hover:bg-navbar-color
        hover:text-custom-color
        hover:border-custom-color px-5 mx-2 mt-3"
      >
        Show contacts
      </Button>
    </>
  );
}
