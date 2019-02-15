import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import { ArticleDigest, Placeholder, Title } from '~/components'

import styles from './styles.css'

const HOME_FEED = gql`
  query HomeFeed {
    viewer {
      id
      recommendation {
        hottest(input: { first: 10 }) {
          edges {
            node {
              ...FeedDigestArticle
            }
          }
        }
      }
    }
  }
  ${ArticleDigest.Feed.fragments.article}
`

export default () => (
  <>
    <Query query={HOME_FEED}>
      {({ data, loading, error }) => {
        if (loading) {
          return <Placeholder.ArticleDigestList />
        }

        if (error) {
          return <span>{JSON.stringify(error)}</span> // TODO
        }

        return (
          <>
            <header>
              <Title type="page">热门文章</Title>
            </header>

            <hr />

            <ul>
              {data.viewer.recommendation.hottest.edges.map(({ node }) => (
                <li>
                  <ArticleDigest.Feed article={node} />
                </li>
              ))}
            </ul>
          </>
        )
      }}
    </Query>
    <style jsx>{styles}</style>
  </>
)
