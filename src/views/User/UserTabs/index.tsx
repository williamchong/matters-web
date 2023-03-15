import { FormattedMessage } from 'react-intl'

import { toPath } from '~/common/utils'
import { Tabs, usePublicQuery, useRoute } from '~/components'
import { UserTabsPublicQuery } from '~/gql/graphql'

import { USER_TAGS_PUBLIC } from '../Tags/gql'

const UserTabs = () => {
  const { isInPath, getQuery } = useRoute()
  const userName = getQuery('name')

  const { data } = usePublicQuery<UserTabsPublicQuery>(USER_TAGS_PUBLIC, {
    variables: { userName },
  })

  const hasSubscriptions = (data?.user?.subscribedCircles.totalCount || 0) > 0

  const userSubscriptonsPath = toPath({
    page: 'userSubscriptons',
    userName,
  })
  const userArticlesPath = toPath({
    page: 'userProfile',
    userName,
  })
  const userCommentsPath = toPath({
    page: 'userComments',
    userName,
  })
  const userTagsPath = toPath({
    page: 'userTags',
    userName,
  })

  return (
    <Tabs sticky>
      {hasSubscriptions && (
        <Tabs.Tab
          {...userSubscriptonsPath}
          selected={isInPath('USER_SUBSCRIPTIONS')}
        >
          <FormattedMessage defaultMessage="Subscriptions" description="" />
        </Tabs.Tab>
      )}

      <Tabs.Tab {...userArticlesPath} selected={isInPath('USER_ARTICLES')}>
        <FormattedMessage defaultMessage="Articles" description="" />
      </Tabs.Tab>

      <Tabs.Tab {...userCommentsPath} selected={isInPath('USER_COMMENTS')}>
        <FormattedMessage defaultMessage="Responses" description="" />
      </Tabs.Tab>

      <Tabs.Tab {...userTagsPath} selected={isInPath('USER_TAGS')}>
        <FormattedMessage defaultMessage="Tags" description="" />
      </Tabs.Tab>
    </Tabs>
  )
}

export default UserTabs
