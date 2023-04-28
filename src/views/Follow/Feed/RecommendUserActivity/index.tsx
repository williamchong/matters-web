import { analytics } from '~/common/utils'
import { Slides } from '~/components'
import { RecommendUserActivityFragment } from '~/gql/graphql'

import FollowingRecommendHead from '../FollowingRecommendHead'
import FollowingRecommendUser from '../FollowingRecommendUser'
import { fragments } from './gql'
import styles from './styles.css'

interface Props {
  users: RecommendUserActivityFragment['recommendUsers'] | null
}

const RecommendUserActivity = ({ users }: Props) => {
  if (!users || users.length <= 0) {
    return null
  }

  return (
    <section className="container">
      <Slides header={<FollowingRecommendHead type="user" />}>
        {users.map((user, index) => (
          <Slides.Item
            size="md"
            key={index}
            onClick={() => {
              analytics.trackEvent('click_feed', {
                type: 'following',
                contentType: 'UserRecommendationActivity',
                location: `${location}.${index}`,
                id: user.id,
              })
            }}
          >
            <section className="item">
              <FollowingRecommendUser user={user} />
            </section>
          </Slides.Item>
        ))}
      </Slides>
      <style jsx>{styles}</style>
    </section>
  )
}

RecommendUserActivity.fragments = fragments

export default RecommendUserActivity
