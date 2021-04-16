import { CircleDigest, Switch, Translate } from '~/components'

import styles from './styles.css'

import { ArticleAccessType } from '@/__generated__/globalTypes'
import { DigestRichCirclePublic } from '~/components/CircleDigest/Rich/__generated__/DigestRichCirclePublic'

export type ToggleAccessProps = {
  circle?: DigestRichCirclePublic | null
  accessType?: ArticleAccessType | null

  editAccess: (addToCircle: boolean, paywalled: boolean) => any
  saving: boolean

  canToggleCircle: boolean
  canTogglePaywall: boolean
}

const ToggleAccess: React.FC<ToggleAccessProps> = ({
  circle,
  accessType,

  editAccess,
  saving,

  canToggleCircle,
  canTogglePaywall,
}) => {
  const paywalled = accessType !== 'public'

  return (
    <section className="container">
      <section className="switch">
        <header>
          <h4>
            <Translate
              zh_hant="加入圍爐"
              zh_hans="加入围炉"
              en="Add to Circle"
            />
          </h4>

          <Switch
            checked={!!circle}
            onChange={() => editAccess && editAccess(!circle, false)}
            disabled={!canToggleCircle}
          />
        </header>
      </section>

      {circle && (
        <section className="widget">
          <section className="circle">
            <CircleDigest.Rich
              circle={circle}
              bgColor="none"
              avatarSize="xl"
              textSize="md-s"
              hasOwner={false}
              hasDescription={false}
              disabled
            />
          </section>

          <section className="switch">
            <header>
              <h4>
                <Translate zh_hant="上鎖" zh_hans="上锁" en="Paywalled" />
              </h4>

              <Switch
                checked={paywalled}
                onChange={() => editAccess && editAccess(true, !paywalled)}
                disabled={!canTogglePaywall}
              />
            </header>

            <p className="description">
              <Translate
                zh_hant="前 24 小時限免，上鎖後無法轉公開"
                zh_hans="前 24 小时限免，上锁后无法转公开"
                en="Limited free for 24 hours, can't be undone"
              />
            </p>
          </section>
        </section>
      )}

      <style jsx>{styles}</style>
    </section>
  )
}

export default ToggleAccess
