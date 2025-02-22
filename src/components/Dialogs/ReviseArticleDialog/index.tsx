import { Dialog, Translate, useDialogSwitch } from '~/components'

import styles from './styles.module.css'

interface Props {
  children?: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
  revisionCountLeft: number
}

export const ReviseArticleDialog = ({ children, revisionCountLeft }: Props) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children && children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <Translate zh_hant="修訂須知" zh_hans="修订须知" en="Notice" />
          }
        />

        <Dialog.Message align="left" smUpAlign="left">
          <p>
            <Translate
              zh_hant="修訂作品正文目前支持增加、刪除或替換中英文字符，"
              zh_hans="修订作品正文目前支持增加、删除或替换中英文字符，"
              en="We support adding, deleting or replacing Chinese and English characters "
            />
            <b>
              <Translate
                zh_hant="單次修訂上限為"
                zh_hans="单次修订上限为"
                en="with a maximum of"
              />
              <span className={styles.count}> 50 </span>
              <Translate
                zh_hant="個編輯距離。"
                zh_hans="個編輯距離。"
                en="editing spaces for a single revision."
              />
            </b>
          </p>
          <p>
            <Translate
              zh_hant="修訂後的作品即再版發佈至分佈式網絡。修訂前請自行保留上一版本備份"
              zh_hans="修訂後的作品即再版發佈至分佈式網絡。修訂前請自行保留上一版本備份"
              en="The revised work will be republished to decentralized network. Please backup of the previous edition before revision."
            />{' '}
            📃
          </p>
          <p>
            <b>
              <Translate zh_hant="你還可以修訂" zh_hans="你还可以修订" en="" />
              <span className={styles.count}> {revisionCountLeft} </span>
              <Translate
                zh_hant="版"
                zh_hans="版"
                en="modifications available"
              />
            </b>
          </p>
        </Dialog.Message>

        <Dialog.Footer
          btns={
            <Dialog.RoundedButton
              text={
                <Translate zh_hant="開始修訂" zh_hans="开始修订" en="Edit" />
              }
              onClick={closeDialog}
            />
          }
          smUpBtns={
            <Dialog.TextButton
              text={
                <Translate zh_hant="開始修訂" zh_hans="开始修订" en="Edit" />
              }
              onClick={closeDialog}
            />
          }
        />
      </Dialog>
    </>
  )
}
