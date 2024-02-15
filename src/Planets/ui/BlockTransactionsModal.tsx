import { Button, Group, Modal, Stack, Text } from '@mantine/core'

import { useUpdateBatch } from './hooks/useUpdateBatch'
import { type Transaction } from '../domain/transactions'

export function BlockTransactionsModal({
  opened,
  close,
  transactions
}: {
  opened: boolean
  close: () => void
  transactions?: Transaction[]
}) {
  const { mutate } = useUpdateBatch()

  function handleBlockClick() {
    mutate(transactions)
    close()
  }
  return (
    <Modal
      opened={opened}
      onClose={close}
      title='Block in progress transactions'
      centered
    >
      <Modal.Body>
        <Stack gap='xs'>
          <Text>
            Clicking on <b>Block transactions</b> you will block all in progress
            transactions
          </Text>
          <Text>Are you sure?</Text>
          <Group>
            <Button variant='default' color='gray' onClick={close}>
              Cancel
            </Button>
            <Button color='red' onClick={handleBlockClick}>
              Block transactions
            </Button>
          </Group>
        </Stack>
      </Modal.Body>
    </Modal>
  )
}
