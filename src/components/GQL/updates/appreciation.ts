import { DataProxy } from 'apollo-cache'
import _cloneDeep from 'lodash/cloneDeep'
import _some from 'lodash/some'

import { ERROR_CODES } from '~/common/enums'
import {
  ArticleDetailPublicByNodeId,
  ArticleDetailPublicByNodeId_article_Article,
} from '~/views/ArticleDetail/__generated__/ArticleDetailPublicByNodeId'
import { ARTICLE_DETAIL_PUBLIC_BY_NODE_ID } from '~/views/ArticleDetail/gql'

const update = ({
  cache,
  left,
  id,
  total,
  viewer,
  canSuperLike,
}: {
  cache: DataProxy
  left: number
  id: string
  total: number
  viewer: any
  canSuperLike?: boolean
}) => {
  try {
    if (!id) {
      return
    }

    // read from local cache
    const cacheData = _cloneDeep(
      cache.readQuery<ArticleDetailPublicByNodeId>({
        query: ARTICLE_DETAIL_PUBLIC_BY_NODE_ID,
        variables: { id },
      })
    )

    if (!cacheData?.article) {
      return
    }

    // update counts
    const article =
      cacheData.article as ArticleDetailPublicByNodeId_article_Article
    article.appreciateLeft = left
    article.appreciationsReceivedTotal = total
    article.hasAppreciate = true

    // update SuperLike
    if (typeof canSuperLike === 'boolean') {
      article.canSuperLike = canSuperLike
    }

    // inject viewer into appreciators
    const appreciators = article?.received?.edges || []
    const appreciatorsCount = article?.received?.totalCount || 0
    const hasApprecaitor = _some(appreciators, {
      node: { sender: { id: viewer.id } },
    })
    if (!hasApprecaitor) {
      article.received.totalCount = appreciatorsCount + 1

      appreciators.push({
        cursor: window.btoa(`arrayconnection:${appreciators.length}`) || '',
        node: {
          sender: {
            avatar: viewer.avatar,
            id: viewer.id,
            liker: {
              civicLiker: viewer.liker.civicLiker,
              __typename: 'Liker',
            },
            info: {
              badges: viewer.info.badges,
              __typename: 'UserInfo',
            },
            __typename: 'User',
          },
          __typename: 'Appreciation',
        },
        __typename: 'AppreciationEdge',
      })

      article.received.edges = appreciators
    }

    // write to local cache
    cache.writeQuery({
      query: ARTICLE_DETAIL_PUBLIC_BY_NODE_ID,
      data: cacheData,
      variables: { id },
    })
  } catch (e) {
    if ((e as any).message.startsWith("Can't find field")) {
      console.warn(ERROR_CODES.QUERY_FIELD_NOT_FOUND)
    } else {
      console.error(e)
    }
  }
}

export default update
