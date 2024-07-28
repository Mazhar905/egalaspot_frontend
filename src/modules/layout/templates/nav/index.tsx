import { Suspense } from "react"
import { getCategoriesList, getCollectionsList } from "@lib/data"
import { Text, clx } from "@medusajs/ui"

import { listRegions } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import Image from "next/image"
import logo from "../../../../../public/logo.png" // Note the path should be from the public directory root
import { IoCartOutline } from "react-icons/io5"
import TopBar from "./TopBar"
import { SearchBox } from "react-instantsearch-hooks-web/dist/es/ui/SearchBox"
import SearchModal from "@modules/search/templates/search-modal"
export default async function Nav() {
  const regions = await listRegions().then((regions) => regions)
  const { collections } = await getCollectionsList(0, 6)
  const { product_categories } = await getCategoriesList(0, 6)
  return (
    <>
      <TopBar />
      <div className="sticky top-0 inset-x-0 z-50 items-center">
        <header className="flex flex-col items-center mx-auto duration-200 border-b bg-white ">
          <nav className="content-container w-full txt-xsmall-plus text-ui-fg-subtle border-b flex items-center justify-between h-[100px] text-small-regular">
            {/* <div className="flex-1 basis-0 h-full flex items-center">
              <div className="h-full">
                <SideMenu regions={regions} />
              </div>
            </div> */}

            <div className="flex items-center h-full">
              <LocalizedClientLink
                href="/"
                className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
                data-testid="nav-store-link"
              >
                <Image src={logo} alt="logo" className="md:w-[170px] w-36" />
              </LocalizedClientLink>
            </div>
            <div className="flex items-center h-full mx-auto w-[60%] justify-center">
                <SearchModal />
            </div>
            <div className="flex items-center gap-x-4 h-full px-5 w-[20%] justify-end">
              <div className="hidden small:flex items-center gap-x-6 h-full">
              

                <LocalizedClientLink
                  className="hover:text-ui-fg-base"
                  href="/account"
                  data-testid="nav-account-link"
                >
                  Account
                </LocalizedClientLink>
              </div>
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="hover:text-ui-fg-base flex gap-2"
                    href="/cart"
                    data-testid="nav-cart-link"
                  >
                    {/* <IoCartOutline size={24} /> */}
                    Cart (0)
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
            </div>
          </nav>
          <div className="flex justify-center items-center h-[50px] w-full">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
              data-testid="nav-store-link"
            >
              {collections && collections.length > 0 && (
                <div className="flex flex-col gap-y-2">
                  <ul
                    className={clx("flex gap-6 text-sm font-bold", {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    })}
                  >
                    {collections?.slice(0, 6).map((c) => (
                      <li key={c.id}>
                        <LocalizedClientLink
                          className="hover:text-ui-fg-base"
                          href={`/collections/${c.handle}`}
                        >
                          {c.title}
                        </LocalizedClientLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </LocalizedClientLink>
          </div>
        </header>
      </div>
    </>
  )
}
