import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';


export function ChatDiscussionsModal() {
  const [opened, { open, close }] = useDisclosure(false);
  

  return (
    <>
      <Modal opened={opened} onClose={close} title="Choose discussions:">
        <div>Discussions</div>
      </Modal>

      <Button onClick={open} className='bg-custom-color 
      px-5
      mx-2
      mt-3
      hover:bg-navbar-color
      hover:text-custom-color
      hover:border-custom-color'>Discussions</Button>
    </>
  );
}