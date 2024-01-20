import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import { API, AUTHENTICATE } from '../constants/constants';
import { useLogin } from './login-provider';

import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Checkbox,
  Anchor,
  Stack,
} from '@mantine/core';



async function letAuthenticate(formValues : any) {
  const { name, email, password } = formValues;
  //Login/Register Code |||
  // const body = {
  //   name: name,
  //   password: password,
  // }

  // const response = await window.fetch(`${API}${AUTHENTICATE}`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(body),
  // })
  // const data = await response.json()
  // return data
  console.log(name, email, password)
}


export function AuthenticationForm(props: PaperProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const [type, toggle] = useToggle(['login', 'register']);
  const { isLoggedIn, login, logout } = useLogin();

  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });


  return (
    <>
    <Modal opened={opened} onClose={close} title="Authentication" centered overlayProps={{backgroundOpacity: 0.55,blur: 3,}}>
      <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" fw={500} className='text-center mb-5'>
        Welcome to Chat App </Text>
      <form onSubmit={form.onSubmit(() => letAuthenticate(form.values))}>
        <Stack>
          {type === 'register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
          />
          
          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )}
        </Stack>
            
        <Group justify="space-between" mt="xl" className='bg-red'>
          <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type='submit' onClick={() => {letAuthenticate(form.values),login(), close()}} className='text-black bg-custom-color'>
            {upperFirst(type)}
          </Button>
          
        </Group>
        
      </form>
    </Paper>
      </Modal>
      

      {isLoggedIn ? <Button onClick={() => logout()} className='bg-custom-color 
      absolute top-0 right-10 mr-5 float-right flex mt-3
      hover:bg-navbar-color
      hover:text-custom-color
      hover:border-custom-color'>Logout</Button> : 
      <Button onClick={open} className='bg-custom-color 
      absolute top-0 right-10 mr-5 float-right flex mt-3
      hover:bg-navbar-color
      hover:text-custom-color
      hover:border-custom-color'>Login</Button>}
      
    </>
  );
}