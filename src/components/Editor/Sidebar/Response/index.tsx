import { IconComment16 } from '~/components'

import { SetResponseProps } from '../..'
import ToggleResponse, { ToggleResponseProps } from '../../ToggleResponse'
import Box from '../Box'
import styles from './styles.css'

export type SidebarManagementProps = ToggleResponseProps & SetResponseProps

const SidebarArticleResponse: React.FC<SidebarManagementProps> = (props) => {
  return (
    <Box
      icon={<IconComment16 size="md" />}
      title="articleResponse"
      footerSpace={false}
    >
      <section className="container">
        <ToggleResponse inSidebar {...props} />
        <style jsx>{styles}</style>
      </section>
    </Box>
  )
}

export default SidebarArticleResponse
