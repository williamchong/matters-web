import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { TEST_ID } from '~/common/enums'
import { toPath } from '~/common/utils'
import { LinkWrapper, ViewerContext } from '~/components'
import { CircleNewBroadcastCommentsFragment } from '~/gql/graphql'

import NoticeActorAvatar from '../NoticeActorAvatar'
import NoticeCircleCard from '../NoticeCircleCard'
import NoticeCircleName from '../NoticeCircleName'
import NoticeContentDigest from '../NoticeContentDigest'
import NoticeDate from '../NoticeDate'
import NoticeDigest from '../NoticeDigest'
import NoticeHeadActors from '../NoticeHeadActors'

type CircleNewBroadcastCommentsType = {
  notice: CircleNewBroadcastCommentsFragment
}

const CircleNewBroadcastComments = ({
  notice,
}: CircleNewBroadcastCommentsType) => {
  const viewer = useContext(ViewerContext)
  const { comments, replies, mentions } = notice

  if (!notice.actors) {
    return null
  }

  const isCircleOwner = notice.circle.owner.id === viewer.id
  const replyCount = replies?.length
  const mentionCount = mentions?.length

  if (!replyCount && !mentionCount) {
    return null
  }

  const actorsCount = notice.actors.length
  const isMultiActors = actorsCount > 1

  const latestComment = [
    ...(comments || []),
    ...(replies || []),
    ...(mentions || []),
  ].filter(Boolean)[0]
  const circleCommentPath = toPath({
    page: 'commentDetail',
    comment: latestComment,
    circle: notice.circle,
  })

  if (isCircleOwner) {
    return (
      <NoticeDigest
        notice={notice}
        action={
          <>
            {replyCount && !mentionCount && (
              <FormattedMessage
                defaultMessage="commented in your circle broadcast"
                description="src/components/Notice/CircleNotice/CircleNewBroadcastComments.tsx"
              />
            )}
            {replyCount && mentionCount && (
              <FormattedMessage
                defaultMessage="mentioned you in your circle broadcast comment"
                description="src/components/Notice/CircleNotice/CircleNewBroadcastComments.tsx"
              />
            )}
          </>
        }
        content={
          !isMultiActors ? (
            <LinkWrapper {...circleCommentPath}>
              <NoticeContentDigest content={latestComment.content || ''} />
            </LinkWrapper>
          ) : undefined
        }
        testId={TEST_ID.NOTICE_CIRCLE_NEW_BROADCAST_COMMENTS}
      />
    )
  }

  return (
    <NoticeDigest
      notice={notice}
      action={
        <>
          {replyCount && !mentionCount && (
            <FormattedMessage
              defaultMessage="commented broadcast in {circleName}"
              description="src/components/Notice/CircleNotice/CircleNewBroadcastComments.tsx"
              values={{
                circleName: (
                  <NoticeCircleName
                    circle={notice.circle}
                    path={circleCommentPath}
                  />
                ),
              }}
            />
          )}
          {replyCount && mentionCount && (
            <FormattedMessage
              defaultMessage="mentioned you in broadcast comment in {circleName}"
              description="src/components/Notice/CircleNotice/CircleNewBroadcastComments.tsx"
              values={{
                circleName: (
                  <NoticeCircleName
                    circle={notice.circle}
                    path={circleCommentPath}
                  />
                ),
              }}
            />
          )}
        </>
      }
      content={
        !isMultiActors ? (
          <LinkWrapper {...circleCommentPath}>
            <NoticeContentDigest content={latestComment.content || ''} />
          </LinkWrapper>
        ) : undefined
      }
      testId={TEST_ID.NOTICE_CIRCLE_NEW_BROADCAST_COMMENTS}
    />
  )
}

CircleNewBroadcastComments.fragments = {
  notice: gql`
    fragment CircleNewBroadcastComments on CircleNotice {
      id
      ...NoticeDate
      actors {
        ...NoticeActorAvatarUser
        ...NoticeHeadActorsUser
      }
      circle: target {
        ...NoticeCircleCard
      }
      comments {
        id
        type
        content
        parentComment {
          id
        }
      }
      replies {
        id
        type
        content
        parentComment {
          id
        }
        author {
          id
        }
      }
      mentions {
        id
        type
        content
        parentComment {
          id
        }
      }
    }
    ${NoticeActorAvatar.fragments.user}
    ${NoticeHeadActors.fragments.user}
    ${NoticeCircleCard.fragments.circle}
    ${NoticeDate.fragments.notice}
  `,
}

export default CircleNewBroadcastComments
