import { Text, clx } from "@medusajs/ui"
import logo from "../../../../../public/logo.png" // Note the path should be from the public directory root
import Image from "next/image"
import { getCategoriesList, getCollectionsList } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"
import SubscribeForm from "@modules/layout/templates/footer/SubscribeForm"
// import SocialLinks from "@modules/layout/templates/footer/SocialLinks"
import paymentImage from "../../../../../public/payment_carts.png"
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa"
import { BsTwitterX } from "react-icons/bs"
export default async function Footer() {
  const { collections } = await getCollectionsList(0, 6)
  const { product_categories } = await getCategoriesList(0, 6)

  return (
    <footer className="border-t border-ui-border-base w-full pt-10">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col gap-x-6 xsmall:flex-row items-start justify-between">
          <div className="flex flex-col w-full md:w-1/3 lg:w-1/3 gap-y-2">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase"
            >
              <Image src={logo} alt="logo" className="md:w-[170px] w-36" />
            </LocalizedClientLink>
            <Text>
              Founded in 2021, we’re an online retailer for blank apparel from
              best-selling brands. We deliver more than just high-quality goods
              at a fantastic value. We’re here to bring you a better customer
              experience.
            </Text>
          </div>{" "}
          <div className="text-small-regular gap-5 md:gap-x-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 pb-5 w-full md:w-1/3 lg:w-1/3 px-5">
            {product_categories && product_categories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base">
                  Categories
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {product_categories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li
                        className="flex flex-col gap-2 text-ui-fg-subtle txt-small"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-ui-fg-base",
                            children && "txt-small-plus"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-ui-fg-base"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base">
                  Collections
                </span>
                <ul
                  className={clx(
                    "flex flex-col gap-2 text-ui-fg-subtle txt-small",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    }
                  )}
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
          </div>
          <div className="flex flex-col gap-y-2 w-full md:w-1/3 lg:w-1/3">
            <span className="txt-small-plus txt-ui-fg-base">
              Subscribe Our Newsletter
            </span>
            <SubscribeForm />
          </div>
        </div>
        <div className="flex items-center justify-center py-5 gap-x-5">
          <FaFacebook size={24} />
          <FaInstagram size={24} />
          <FaPinterest size={24} />
          <FaLinkedin size={24} />
          <FaYoutube size={24} />
          <BsTwitterX size={24} />
        </div>
        <div className="flex w-full py-6 justify-between text-black-500 border-t items-center">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} EgalaSpot. All rights reserved.
          </Text>
          <Image src={paymentImage} alt="payments method" />
          <MedusaCTA />
        </div>
      </div>
    </footer>
  )
}
