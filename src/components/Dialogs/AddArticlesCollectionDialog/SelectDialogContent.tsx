import { FormikProvider } from 'formik'

import { Form } from '~/components'
import {
  CollectionDetailFragment,
  UserArticlesUserFragment,
} from '~/gql/graphql'

import styles from './styles.module.css'

interface SelectDialogContentProps {
  formik: any
  user: UserArticlesUserFragment
  collection: CollectionDetailFragment
  checkingIds: string[]
  formId: string
}

const SelectDialogContent: React.FC<SelectDialogContentProps> = ({
  formik,
  user,
  collection,
  checkingIds,
  formId,
}) => {
  const articles = user.articles

  const hasAddedArticlesId =
    collection.articles.edges?.map(({ node }) => node.id) || []

  const hasCheckedEdges = articles?.edges?.filter(
    ({ node }) => hasAddedArticlesId.indexOf(node.id) !== -1
  )
  const hasChecked = hasCheckedEdges?.map(({ node }) => node.id) || []

  return (
    <section className={styles.formContainer}>
      <FormikProvider value={formik}>
        <Form
          id={formId}
          onSubmit={formik.handleSubmit}
          className={styles.listForm}
        >
          {articles?.edges?.map(
            ({ node }) =>
              node.state === 'active' && (
                <section key={node.id} className={styles.item}>
                  <Form.SquareCheckBox
                    key={node.id}
                    hasTooltip={true}
                    checked={
                      hasChecked.includes(node.id) ||
                      checkingIds.includes(node.id)
                    }
                    hint={node.title}
                    disabled={hasChecked.includes(node.id)}
                    {...formik.getFieldProps('checked')}
                    value={node.id}
                  />
                  {checkingIds.includes(node.id) && (
                    <div className={styles.index}>
                      {checkingIds.indexOf(node.id) + 1}
                    </div>
                  )}
                </section>
              )
          )}
        </Form>
      </FormikProvider>
    </section>
  )
}

export default SelectDialogContent
