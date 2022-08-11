import gql from 'graphql-tag'

import ArticleNewCommentNotice from './ArticleNewCommentNotice'
import CircleBroadcastMentionedYouNotice from './CircleBroadcastMentionedYouNotice'
import CircleDiscussionMentionedYouNotice from './CircleDiscussionMentionedYouNotice'
import CircleNewBroadcastNotice from './CircleNewBroadcastNotice'
import CommentMentionedYouNotice from './CommentMentionedYouNotice'
import CommentPinnedNotice from './CommentPinnedNotice'
import SubscribedArticleNewCommentNotice from './SubscribedArticleNewCommentNotice'

import { CommentNotice as NoticeType } from './__generated__/CommentNotice'

const CommentNotice = ({ notice }: { notice: NoticeType }) => {
  switch (notice.commentNoticeType) {
    case 'CommentMentionedYou':
      return <CommentMentionedYouNotice notice={notice} />
    case 'CommentPinned':
      return <CommentPinnedNotice notice={notice} />
    case 'ArticleNewComment':
      return <ArticleNewCommentNotice notice={notice} />
    case 'SubscribedArticleNewComment':
      return <SubscribedArticleNewCommentNotice notice={notice} />
    case 'CircleNewBroadcast':
      return <CircleNewBroadcastNotice notice={notice} />
    case 'CircleBroadcastMentionedYou':
      return <CircleBroadcastMentionedYouNotice notice={notice} />
    case 'CircleDiscussionMentionedYou':
      return <CircleDiscussionMentionedYouNotice notice={notice} />
    default:
      return null
  }
}

CommentNotice.fragments = {
  notice: gql`
    fragment CommentNotice on CommentNotice {
      id
      unread
      __typename
      commentNoticeType: type
      ...CommentMentionedYouNotice
      ...CommentPinnedNotice
      ...ArticleNewCommentNotice
      ...SubscribedArticleNewCommentNotice
      ...CircleNewBroadcastNotice
      ...CircleBroadcastMentionedYouNotice
      ...CircleDiscussionMentionedYouNotice
    }
    ${CommentMentionedYouNotice.fragments.notice}
    ${CommentPinnedNotice.fragments.notice}
    ${ArticleNewCommentNotice.fragments.notice}
    ${SubscribedArticleNewCommentNotice.fragments.notice}
    ${CircleNewBroadcastNotice.fragments.notice}
    ${CircleBroadcastMentionedYouNotice.fragments.notice}
    ${CircleDiscussionMentionedYouNotice.fragments.notice}
  `,
}

export default CommentNotice
