import isEmail from 'validator/lib/isEmail'

import { PAYMENT_PASSSWORD_LENGTH } from '../enums'

/**
 * Validate email address.
 */
export interface ValidEmailOptions {
  allowPlusSign: boolean
}

const EMAIL_DOMAIN_WHITELIST = ['matters.town', 'matters.news', 'like.co']

export const isValidEmail = (str: string, options: ValidEmailOptions) => {
  const { allowPlusSign } = options
  const isInWhitelist = EMAIL_DOMAIN_WHITELIST.indexOf(str.split('@')[1]) >= 0

  // check "+" sign
  if (!allowPlusSign && !isInWhitelist && str.indexOf('+') >= 0) {
    return false
  }

  return isEmail(str, {
    allow_utf8_local_part: false,
  })
}

/**
 * Validate user raw pass word. It only accepts any ASCII character.
 */
export const isValidPassword = (password: string): boolean => {
  if (!password || password.length < 8) {
    return false
  }
  return /^[\x00-\x7F]*$/.test(password)
}

/**
 * Validate payment pass word. It only accepts digital.
 */
export const isValidPaymentPassword = (password: string): boolean => {
  if (!password || password.length !== PAYMENT_PASSSWORD_LENGTH) {
    return false
  }

  return /^[\d]*$/.test(password)
}

/**
 * Validate payment pointer.
 */
export const isValidPaymentPointer = (paymentPointer: string): boolean =>
  paymentPointer.startsWith('$')
