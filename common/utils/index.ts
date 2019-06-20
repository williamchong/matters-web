export * from './route'
export * from './analytics'
export * from './translate'
export * from './datetime'
export * from './connections'
export * from './validator'
export * from './pad'
export * from './dom'
export * from './comment'
export * from './number'
export * from './language'
export * from './text'
export * from './cache'
export * from './random'
export * from './audioPlayer'
export * from './url'
export * from './browser'
export * from './response'

export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}
