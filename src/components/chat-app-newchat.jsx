import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { useEffect, useState } from 'react'
import { Badge, Table } from '@mantine/core'
import { API,CONTACTS_ENDPOINT } from '../constants/constants';
import { useLogin } from './login-provider';


async function fetchContacts() {
  const response = await fetch(`${API}${CONTACTS_ENDPOINT}`)
  const data = await response.json()
  return data
}

export function Newchatmodal(props) {
  const { isLoggedIn, login, logout } = useLogin();
  const [opened, { open, close }] = useDisclosure(false);
  const [contacts, setContacts] = useState([])

  async function loadContacts() {
    const data = await fetchContacts()
    setContacts(data)
  }

  useEffect(() => {
    loadContacts()
  }, [])

  return (
    <>
      {isLoggedIn ? <Modal opened={opened} onClose={close} title="Choose a new contact to chat:" size={700}>
        
        <Table verticalSpacing="md"  >
          <Table.Thead>
            <Table.Tr>
              <Table.Th w={300}>Name</Table.Th>
              <Table.Th>Id</Table.Th>
              <Table.Th>Actions</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
  
          <Table.Tbody>
            {contacts.map((contact) => (
              <Table.Tr key={contact.id}>
                <Table.Td> {contact.name}</Table.Td>
                <Table.Td>
                  <Badge color="blue" variant="light">
                    {contact.id}
                  </Badge>
                </Table.Td>
  
                <Table.Td>
                  <Button variant="outline" color="blue">
                    Select
                  </Button>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        </Modal>
        : <Modal opened={opened} onClose={close} title="Please LOG IN First!" size={700}>
        </Modal>}

      <Button onClick={open} className='bg-custom-color 
      px-5
      mx-2
      mt-3
      hover:bg-navbar-color
      hover:text-custom-color
      hover:border-custom-color'>Show contacts</Button>
    </>
  );
}