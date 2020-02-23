import { Dialog, Translate } from '~/components'

interface CompleteProps {
  closeDialog: () => void
}

const Complete = ({ closeDialog }: CompleteProps) => (
  <>
    <Dialog.Message
      headline={<Translate id="changeEmail" />}
      description={<Translate id="changeEmailSuccess" />}
    />

    <Dialog.Footer>
      <Dialog.Footer.Button
        bgColor="grey-lighter"
        textColor="black"
        onClick={closeDialog}
      >
        <Translate id="close" />
      </Dialog.Footer.Button>
    </Dialog.Footer>
  </>
)

export default Complete
