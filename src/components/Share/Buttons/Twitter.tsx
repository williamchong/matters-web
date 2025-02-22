import { ReactComponent as IconShareTwitter } from '@/public/static/icons/16px/share-twitter.svg'
import { ReactComponent as IconShareTwitterCircle } from '@/public/static/icons/40px/share-twitter-circle.svg'
import { analytics, stripNonEnglishUrl } from '~/common/utils'
import { TextIcon, withIcon } from '~/components'

const Twitter = ({
  title,
  link,
  circle,
  tags,
}: {
  title: string
  link: string
  circle?: boolean
  tags?: string[]
}) => (
  <button
    type="button"
    onClick={() => {
      let text = title
      if (Array.isArray(tags) && tags.length > 0) {
        text += ` ${tags
          .join(' ')
          .trim()
          .split(/\s+/)
          .filter(Boolean)
          .slice(0, 8) // at most 8 keywords be used as hashtags
          .map((w) => `#${w.trim()}`)
          .join(' ')}`
      }
      text += ' via @matterslab'

      // only this way (to omit `via`,`hashtags`) can leave url link at the end, then hidden by default
      // u.searchParams.set('url', stripNonEnglishUrl(link))

      const shareUrl = `https://twitter.com/intent/tweet?${new URLSearchParams({
        text,
        // u.searchParams.set('hashtags', tags.map((w) => w.trim()).join(','))
        // u.searchParams.set('via', 'matterslab')
        related: 'matterslab:MattersNews 中文,Mattersw3b:Matters Lab',
        url: stripNonEnglishUrl(link),
      }).toString()}`

      analytics.trackEvent('share', {
        type: 'twitter',
      })

      return window.open(shareUrl, 'Share to Twitter')
    }}
  >
    {circle && withIcon(IconShareTwitterCircle)({ size: 'xlM' })}

    {!circle && (
      <TextIcon icon={withIcon(IconShareTwitter)({})} spacing="base">
        Twitter
      </TextIcon>
    )}
  </button>
)

export default Twitter
