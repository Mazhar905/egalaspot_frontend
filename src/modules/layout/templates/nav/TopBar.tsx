// import { usePathname } from "next/navigation"
import Link from "next/link"
import { FaFacebookF, FaInstagram } from "react-icons/fa"

// Define the main component for the top navigation
const Topbar = () => {
  //   const pathname = usePathname()

  return (
    <div className="bg-gray-900 text-gray-100 hidden lg:block">
      <div className="flex lg:px-10 mx-auto justify-between items-center py-2">
        <ul className="flex items-center space-x-4">
          <li className="inline-flex items-center">
            <Link className="text-xs" href="https://www.facebook.com">
              <FaFacebookF size={14} />
            </Link>
          </li>
          <li className="inline-flex items-center">
            <Link
              className="text-xs"
              href="https://www.instagram.com"
              aria-label="Haru Fashion Instagram Account"
            >
              <FaInstagram size={16} />
            </Link>
          </li>
        </ul>
        <ul className="flex items-center space-x-4">
          <li className="inline-flex items-center">
            <Link href="/about" className="text-xs">
              About us
            </Link>
          </li>
          <li className="inline-flex items-center">
            <Link href="/policy" className="text-xs">
              Our Policy
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Topbar
