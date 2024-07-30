import { ArrowUpRightMini } from "@medusajs/icons"
import { Text } from "@medusajs/ui"
import LocalizedClientLink from "../localized-client-link"

type InteractiveLinkProps = {
  href: string
  children?: React.ReactNode
  onClick?: () => void
}

const InteractiveLink = ({
  href,
  children,
  onClick,
  ...props
}: InteractiveLinkProps) => {
  return (
    <LocalizedClientLink
      className="flex justify-center items-center border py-3 px-8 text-white bg-red-500 hover:bg-transparent hover:text-black hover:border hover:border-black group font-light text-center tracing-widest"
      href={href}
      onClick={onClick}
      {...props}
    >
      {children}
    </LocalizedClientLink>
  )
}

export default InteractiveLink
