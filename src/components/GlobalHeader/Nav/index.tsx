import _get from 'lodash/get'
import { useEffect } from 'react'
import { useQuery } from 'react-apollo'

import { UnreadFolloweeArticles } from '~/components/GQL/queries/__generated__/UnreadFolloweeArticles'
import UNREAD_FOLLOWEE_ARTICLES from '~/components/GQL/queries/unreadFolloweeArticles'

import { POLL_INTERVAL } from '~/common/enums'

import DesktopNav from './DesktopNav'
import MobileNav from './MobileNav'
import styles from './styles.css'

const Nav = () => {
  const { data, startPolling } = useQuery<UnreadFolloweeArticles>(
    UNREAD_FOLLOWEE_ARTICLES,
    {
      errorPolicy: 'none',
      fetchPolicy: 'network-only',
      skip: !process.browser
    }
  )
  const unread = !!_get(data, 'viewer.status.unreadFolloweeArticles')

  // FIXME: https://github.com/apollographql/apollo-client/issues/3775
  useEffect(() => {
    startPolling(POLL_INTERVAL)
  }, [])

  return (
    <nav>
      <section className="u-sm-up-hide">
        <MobileNav unread={unread} />
      </section>

      <section className="u-sm-down-hide">
        <DesktopNav unread={unread} />
      </section>

      <style jsx>{styles}</style>
    </nav>
  )
}

export default Nav
