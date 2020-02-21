import { useState } from 'react'

import { Dialog, PageHeader, SignUpComplete, Translate } from '~/components'

import { ANALYTICS_EVENTS, TEXT } from '~/common/enums'
import { analytics } from '~/common/utils'

import Binding from './Binding'
import Generating from './Generating'
import Select from './Select'

type Step = 'select' | 'binding' | 'generating' | 'complete'

interface Props {
  purpose: 'dialog' | 'page'
  submitCallback?: () => void
  closeDialog?: () => void
}

export const SetupLikeCoin: React.FC<Props> = ({
  purpose,
  submitCallback,
  closeDialog
}) => {
  const isInDialog = purpose === 'dialog'
  const isInPage = purpose === 'page'

  const [step, setStepState] = useState<Step>('select')
  const setStep = (newStep: Step) => {
    setStepState(newStep)
    analytics.trackEvent(ANALYTICS_EVENTS.LIKECOIN_STEP_CHANGE, {
      from: step,
      to: newStep
    })
  }

  const [bindingWindowRef, setBindingWindowRef] = useState<Window | undefined>(
    undefined
  )
  const backToSelect = () => setStep('select')
  const complete = () => {
    if (submitCallback) {
      submitCallback()
    } else {
      setStep('complete')
    }
  }

  return (
    <>
      {isInPage && (
        <PageHeader
          title={
            <Translate
              zh_hant={TEXT.zh_hant.setupLikeCoin}
              zh_hans={TEXT.zh_hans.setupLikeCoin}
            />
          }
          hasNoBorder
        />
      )}

      {isInDialog && closeDialog && (
        <Dialog.Header
          title={
            <Translate
              zh_hant={TEXT.zh_hant.setupLikeCoin}
              zh_hans={TEXT.zh_hans.setupLikeCoin}
            />
          }
          close={closeDialog}
        />
      )}

      {step === 'select' && (
        <Select
          startGenerate={() => setStep('generating')}
          startBind={(windowRef?: Window) => {
            setStep('binding')
            if (windowRef) {
              setBindingWindowRef(windowRef)
            }
          }}
        />
      )}

      {step === 'generating' && (
        <Generating prevStep={backToSelect} nextStep={complete} />
      )}

      {step === 'binding' && (
        <Binding
          prevStep={backToSelect}
          nextStep={complete}
          windowRef={bindingWindowRef}
        />
      )}

      {step === 'complete' && <SignUpComplete />}
    </>
  )
}
