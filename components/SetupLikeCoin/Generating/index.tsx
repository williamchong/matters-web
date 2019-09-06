import gql from 'graphql-tag'
import _get from 'lodash/get'
import { useEffect } from 'react'

import { Mutation } from '~/components/GQL'
import { Translate } from '~/components/Language'
import { Modal } from '~/components/Modal'
import { Spinner } from '~/components/Spinner'

import { TEXT } from '~/common/enums'

import styles from './styles.css'

interface Props {
  prevStep: () => void
  nextStep: () => void
  scrollLock?: boolean
}

const GENERATE_LIKER_ID = gql`
  mutation GenerateLikerId {
    generateLikerId {
      id
      likerId
    }
  }
`

const Generating: React.FC<Props> = ({ prevStep, nextStep, scrollLock }) => {
  return (
    <Mutation mutation={GENERATE_LIKER_ID}>
      {(generate, { data, error }) => {
        useEffect(() => {
          generate()
        }, [])

        const likerId = _get(data, 'likerId')

        if (likerId) {
          nextStep()
          return null
        }

        return (
          <>
            <Modal.Content scrollLock={scrollLock}>
              <section className="container">
                {!error && (
                  <>
                    <Spinner />
                    <p>
                      <Translate
                        zh_hant="正在生成 Liker ID"
                        zh_hans="正在生成 Liker ID"
                      />
                    </p>
                  </>
                )}
                {error && (
                  <p>
                    <Translate
                      zh_hant="哎呀，設置失敗了。"
                      zh_hans="哎呀，设置失败了。"
                    />
                  </p>
                )}
              </section>
            </Modal.Content>

            <footer>
              <Modal.FooterButton
                onClick={prevStep}
                width="full"
                disabled={!error}
              >
                <Translate
                  zh_hant={TEXT.zh_hant[error ? 'retry' : 'continue']}
                  zh_hans={TEXT.zh_hans[error ? 'retry' : 'continue']}
                />
              </Modal.FooterButton>
            </footer>

            <style jsx>{styles}</style>
          </>
        )
      }}
    </Mutation>
  )
}

export default Generating
