import { FormattedMessage } from 'react-intl'

import {
  Dialog,
  IconRead16,
  IconReadTimeTotal16,
  TextIcon,
  useDialogSwitch,
} from '~/components'

import styles from './styles.module.css'

export type HelpDetailProps = {
  hasCount?: boolean
  hasTime?: boolean
}

type Props = {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
} & HelpDetailProps

const ReadTime = () => (
  <>
    <h2 className={styles.title}>
      <TextIcon icon={<IconReadTimeTotal16 size="md" />} weight="md">
        <FormattedMessage
          defaultMessage="Accumulated Read Time"
          description="src/components/Dialogs/HelpDialog/index.tsx"
        />
      </TextIcon>
    </h2>
    <p className={styles.description}>
      <FormattedMessage
        defaultMessage="Accumulated read time indicates the total time length that registered users read."
        description="src/components/Dialogs/HelpDialog/index.tsx"
      />
    </p>
  </>
)

const ReadCount = () => (
  <>
    <h2 className={styles.title}>
      <TextIcon icon={<IconRead16 size="md" />} weight="md">
        <FormattedMessage defaultMessage="Read Counts" description="" />
      </TextIcon>
    </h2>
    <p className={styles.description}>
      <FormattedMessage
        defaultMessage="Read counts indicates how many registered users read."
        description="src/components/Dialogs/HelpDialog/index.tsx"
      />
    </p>
  </>
)

const BaseHelpDialog = ({ children, hasCount, hasTime }: Props) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={<FormattedMessage defaultMessage="Help" description="" />}
        />

        <Dialog.Message align="left">
          {hasTime && <ReadTime />}
          {hasCount && <ReadCount />}
        </Dialog.Message>

        <Dialog.Footer
          closeDialog={closeDialog}
          cancelText={
            <FormattedMessage defaultMessage="I see" description="" />
          }
        />
      </Dialog>
    </>
  )
}

export const HelpDialog = (props: Props) => (
  <Dialog.Lazy mounted={<BaseHelpDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)
