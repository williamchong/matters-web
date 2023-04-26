import { useQuery } from '@apollo/react-hooks'
import _chunk from 'lodash/chunk'
import _random from 'lodash/random'
import { useContext, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

import { PATHS } from '~/common/enums'
import { analytics } from '~/common/utils'
import {
  QueryError,
  ShuffleButton,
  Slides,
  Spinner,
  usePublicQuery,
  UserDigest,
  ViewerContext,
  ViewMoreCard,
} from '~/components'
import FETCH_RECORD from '~/components/GQL/queries/lastFetchRandom'
import { FeedAuthorsQuery, LastFetchRandomQuery } from '~/gql/graphql'

import SectionHeader from '../../SectionHeader'
import { FEED_AUTHORS } from './gql'
import styles from './styles.css'

const Authors = () => {
  const viewer = useContext(ViewerContext)

  const { data: lastFetchRandom, client } = useQuery<LastFetchRandomQuery>(
    FETCH_RECORD,
    { variables: { id: 'local' } }
  )
  const lastRandom = lastFetchRandom?.lastFetchRandom.feedAuthors

  /**
   * Data Fetching
   */
  const perPage = 9
  const randomMaxSize = 50
  const { data, loading, error, refetch } = usePublicQuery<FeedAuthorsQuery>(
    FEED_AUTHORS,
    {
      notifyOnNetworkStatusChange: true,
      variables: { random: lastRandom || 0, first: perPage },
    },
    { publicQuery: !viewer.isAuthed }
  )

  const edges = data?.viewer?.recommendation.authors.edges

  const shuffle = () => {
    const size = Math.round(
      (data?.viewer?.recommendation.authors.totalCount || randomMaxSize) /
        perPage
    )
    const random = Math.floor(Math.min(randomMaxSize, size) * Math.random()) // in range [0..50) not including 50
    refetch({ random })

    client.writeData({
      id: 'LastFetchRandom:local',
      data: { feedAuthors: random },
    })
  }

  useEffect(() => {
    if (viewer.isAuthed && lastRandom === null) {
      shuffle()
    }
  }, [viewer.isAuthed])

  /**
   * Render
   */
  if (error) {
    return <QueryError error={error} />
  }

  if (!edges || edges.length <= 0) {
    return null
  }

  const SlidesHeader = (
    <SectionHeader
      type="authors"
      rightButton={<ShuffleButton onClick={shuffle} />}
      viewAll={false}
    />
  )

  return (
    <section className="authors">
      <Slides header={SlidesHeader}>
        {loading && (
          <Slides.Item size="md">
            <Spinner />
          </Slides.Item>
        )}

        {!loading &&
          _chunk(edges, 3).map((chunks, edgeIndex) => (
            <Slides.Item size="md" key={edgeIndex}>
              <section>
                {chunks.map(({ node, cursor }, nodeIndex) => (
                  <UserDigest.Rich
                    key={cursor}
                    user={node}
                    spacing={['tight', 0]}
                    bgColor="none"
                    onClick={() =>
                      analytics.trackEvent('click_feed', {
                        type: 'authors',
                        contentType: 'user',
                        location: (edgeIndex + 1) * (nodeIndex + 1) - 1,
                        id: node.id,
                      })
                    }
                  />
                ))}
              </section>
            </Slides.Item>
          ))}
      </Slides>

      <section className="backToAll">
        <ViewMoreCard
          spacing={['tight', 'tight']}
          href={PATHS.AUTHORS}
          iconProps={{ size: 'sm' }}
          textIconProps={{ size: 'sm', weight: 'md', spacing: 'xxtight' }}
          textAlign="center"
        >
          <FormattedMessage defaultMessage="View All" description="" />
        </ViewMoreCard>
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

export default Authors
