import { useContext } from 'react'

import { TEST_ID } from '~/common/enums'
import { translate } from '~/common/utils'
import { IconSpinner16, LanguageContext } from '~/components'

import styles from './styles.css'

export const Spinner = () => {
  const { lang } = useContext(LanguageContext)

  return (
    <div
      className="spinner"
      data-test-id={TEST_ID.SPINNER}
      aria-label={translate({
        zh_hant: '載入中…',
        zh_hans: '加载中…',
        en: 'Loading...',
        lang,
      })}
    >
      <IconSpinner16 color="grey-light" size="lg" />

      <style jsx>{styles}</style>
    </div>
  )
}
