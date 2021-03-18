import { CircleDigest, TextIcon, Translate, withIcon } from '~/components'

import { toAmountString } from '~/common/utils'

import { ReactComponent as IconCircleFeatureConnection } from '@/public/static/icons/circle-feature-connection.svg'
import { ReactComponent as IconCircleFeatureDiscussion } from '@/public/static/icons/circle-feature-discussion.svg'
import { ReactComponent as IconCircleFeatureReading } from '@/public/static/icons/circle-feature-reading.svg'

import ConfirmTable from '../ConfirmTable'
import styles from './styles.css'

import { DigestRichCirclePublic } from '~/components/CircleDigest/Rich/__generated__/DigestRichCirclePublic'

type HeadProps = {
  circle: DigestRichCirclePublic
}

const Head: React.FC<HeadProps> = ({ circle }) => {
  const price = circle.prices && circle.prices[0]

  if (!price) {
    return null
  }

  return (
    <section className="head">
      <section className="product">
        <CircleDigest.Rich
          circle={circle}
          borderRadius="xtight"
          borderColor="line-grey-light"
          hasFooter={false}
          hasDescription
          hasOwner
          disabled
        />
      </section>

      <ul className="features">
        <li>
          <TextIcon
            icon={withIcon(IconCircleFeatureReading)({ size: 'md-s' })}
            color="gold"
            size="md-s"
          >
            <Translate zh_hant="無限閱讀" zh_hans="无限阅读" />
          </TextIcon>
        </li>
        <li>
          <TextIcon
            icon={withIcon(IconCircleFeatureDiscussion)({ size: 'md-s' })}
            color="gold"
            size="md-s"
          >
            <Translate zh_hant="眾聊互動" zh_hans="众聊互动" />
          </TextIcon>
        </li>
        <li>
          <TextIcon
            icon={withIcon(IconCircleFeatureConnection)({ size: 'md-s' })}
            color="gold"
            size="md-s"
          >
            <Translate zh_hant="解鎖社群" zh_hans="解锁社群" />
          </TextIcon>
        </li>
      </ul>

      <ConfirmTable>
        <ConfirmTable.Row type="balance">
          <ConfirmTable.Col>
            <Translate zh_hant="每月費用" zh_hans="每月费用" />
          </ConfirmTable.Col>

          <ConfirmTable.Col>
            {price.currency} {toAmountString(price.amount)}
          </ConfirmTable.Col>
        </ConfirmTable.Row>
      </ConfirmTable>

      <style jsx>{styles}</style>
    </section>
  )
}

export default Head
