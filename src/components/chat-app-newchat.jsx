import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Badge, Table } from '@mantine/core';
import { API_SELF, CONTACTS_ENDPOINT, DISCUSSIONS_ENDPOINT } from '../constants/constants';
import { useLogin } from './login-provider';

const contacts_API = 'http://localhost:8000/api/contacts';


async function postDiscussion(ids) {
  const body = {
    contacts : ids
  }
  const response = await window.fetch(`${API_SELF}${DISCUSSIONS_ENDPOINT}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await response.json()

  return data
}

export function Newchatmodal({ addContact }) {
  const { isLoggedIn } = useLogin();
  const [opened, { open, close }] = useDisclosure(false);
  const [contacts, setContacts] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  
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

  const handleRowSelect = (id) => {
    const isSelected = selectedIds.includes(id);

    if (isSelected) {
      setSelectedIds((prevIds) => prevIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds((prevIds) => [...prevIds, id]);
    }
  };


  return (
    <>
      {isLoggedIn ? (
        <Modal opened={opened} onClose={close} title="Choose a new contact to chat:" size={500}>
          <Table verticalSpacing="md">
            <Table.Thead>
              <Table.Tr>
                <Table.Th w={300}>Name</Table.Th>
                <Table.Th >Actions</Table.Th>
                <Table.Th />
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {contacts.map((contact) => (
                <Table.Tr key={contact.id} selected={selectedIds.includes(contact.id)}>
                  <Table.Td>{contact.name}</Table.Td>

                  <Table.Td>
                    <Button
                      variant="outline"
                      color="blue"
                      onClick={() => handleRowSelect(contact.id)}
                    >
                      {selectedIds.includes(contact.id) ? 'Deselect' : 'Select'}
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
                  
            <Button className='bg-custom-color' onClick={() => {postDiscussion(selectedIds), close()}}>
              Create Discussion
            </Button>
          </Table>
        </Modal>
      ) : (
        <Modal opened={opened} onClose={close} title="Please LOG IN First!" size={700}></Modal>
      )}

      <Button
        onClick={open}
        className='bg-custom-color px-5 mx-2 mt-3 hover:bg-navbar-color hover:text-custom-color hover:border-custom-color'
      >
        Show contacts
      </Button>
    </>
  );
}
