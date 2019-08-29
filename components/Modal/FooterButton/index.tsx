import classNames from 'classnames'
import Link from 'next/link'

import styles from './styles.css'

interface BaseButtonProps {
  width?: 'half' | 'full'
  bgColor?: 'white' | 'green'

  [key: string]: any
}

type LinkButtonProps = {
  is: 'link'
  href: string
  as: string
} & BaseButtonProps

type NativeButtonProps = {
  is?: 'button'
  htmlType?: 'button' | 'submit'
} & BaseButtonProps

type ButtonProps = LinkButtonProps | NativeButtonProps

const FooterButton: React.FC<ButtonProps> = ({
  width = 'half',
  bgColor = 'green',

  is = 'button',
  href,
  as,
  htmlType = 'button',

  children,
  className,
  ...restProps
}) => {
  const buttonClasses = classNames({
    btn: true,
    [`bg-${bgColor}`]: !!bgColor,
    [`width-${width}`]: !!width,
    [className]: !!className
  })

  // link
  if (is === 'link') {
    return (
      <>
        <Link href={href} as={as}>
          <a className={buttonClasses} {...restProps}>
            {children}
          </a>
        </Link>
        <style jsx>{styles}</style>
      </>
    )
  }

  // button
  return (
    <>
      <button type={htmlType} className={buttonClasses} {...restProps}>
        {children}
      </button>
      <style jsx>{styles}</style>
    </>
  )
}

export default FooterButton
