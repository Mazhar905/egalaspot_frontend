import { Suspense } from "react"
import { getCategoriesList, getCollectionsList } from "@lib/data"
import { clx } from "@medusajs/ui"

import { listRegions } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Image from "next/image"
import logo from "../../../../../public/logo.png" // Note the path should be from the public directory root
import { IoCartOutline } from "react-icons/io5"
import TopBar from "./TopBar"
import { IoMdPerson } from "react-icons/io"
// import { SearchBox } from "react-instantsearch-hooks-web/dist/es/ui/SearchBox"
import SearchModal from "@modules/search/templates/search-modal"
export default async function Nav() {
  const regions = await listRegions().then((regions) => regions)
  const { collections } = await getCollectionsList(0, 6)
  const { product_categories } = await getCategoriesList(0, 100)
  return (
    <>
      <TopBar />
      <div className="sticky top-0 inset-x-0 z-50 items-center">
        <header className="flex flex-col items-center mx-auto duration-200 border-b bg-white ">
          <nav className="content-container w-full txt-xsmall-plus text-ui-fg-subtle  flex items-center justify-between h-[100px] text-small-regular">
            <div className="flex items-center h-full">
              <LocalizedClientLink
                href="/"
                className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
                data-testid="nav-store-link"
              >
                {/* <Image
                  src={logo}
                  alt="logo"
                  className="md:w-[170px] w-36"
                  width={170}
                  height={80}
                /> */}
                <h1>EgalaSpot</h1>
              </LocalizedClientLink>
            </div>
            <div className="flex items-center h-full mx-auto w-[60%] justify-center">
              {/* <SearchModal /> */}
            </div>
            <div className="flex items-center gap-x-4 h-full px-5 w-[20%] justify-end">
              <div className="hidden small:flex flex-col items-center justify-center gap-x-6 h-full">
                <LocalizedClientLink
                  className="hover:text-ui-fg-base"
                  href="/account"
                  data-testid="nav-account-link"
                >
                  <IoMdPerson size={24} />
                </LocalizedClientLink>
                <LocalizedClientLink
                  className="hover:text-ui-fg-base"
                  href="/account"
                  data-testid="nav-account-link"
                >
                  <p>Account</p>
                </LocalizedClientLink>
              </div>
              <div className="flex flex-col items-center gap-x-6 h-full">
                <Suspense
                  fallback={
                    <LocalizedClientLink
                      className="hover:text-ui-fg-base flex gap-2"
                      href="/cart"
                      data-testid="nav-cart-link"
                    >
                      <IoCartOutline size={24} />
                      Cart (0)
                    </LocalizedClientLink>
                  }
                >
                  <CartButton />
                </Suspense>
              </div>
              <div className="flex-1 md:hidden basis-0 h-full flex items-center">
                <div className="h-full">
                  <SideMenu regions={regions} />
                </div>
              </div>
            </div>
          </nav>
          <div className="hidden md:flex justify-center items-center h-[40px] w-full">
            <CategoryMenu product_categories={product_categories} />;
          </div>
        </header>
      </div>
    </>
  )
}

const CategoryMenu = ({ product_categories }) => {
  const parentCategories = product_categories.filter(
    (category) => category.parent_category_id === null
  )
  return (
    parentCategories &&
    parentCategories.length > 0 && (
      <div className="flex flex-col gap-y-2">
        <ul
          className={clx("flex flex-col md:flex-row gap-6 text-md font-light capitalize", {
            "grid-cols-2": (product_categories?.length || 0) > 3,
          })}
        >
          {parentCategories.map((category) => (
            <li key={category.id} className="relative group">
              <LocalizedClientLink
                className="hover:text-ui-fg-base"
                href={`/categories/${category.handle}`}
              >
                {category.name}
              </LocalizedClientLink>
              {category.category_children.length > 0 && (
                <ul className="absolute left-0 top-full mt-1 hidden group-hover:block bg-white border border-gray-200 shadow-lg rounded-md z-10">
                  {category.category_children.map((child) => (
                    <li key={child.id} className="px-4 py-2 hover:bg-gray-100">
                      <LocalizedClientLink
                        className="block w-full text-left"
                        href={`/categories/${child.handle}`}
                      >
                        {child.name}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    )
  )
}
