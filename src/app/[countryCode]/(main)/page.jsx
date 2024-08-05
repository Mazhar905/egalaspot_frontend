import { cache } from "react"

import {
  getCategoriesList,
  getCollectionsList,
  getProductsList,
  getRegion,
} from "@lib/data"
import Image from "next/image"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "../../../modules/home/components/hero"
import InteractiveLink from "@modules/common/components/interactive-link"
import CollectionGrid from "@modules/common/components/collectionGrid"
import CategoryBox from "@modules/home/components/categoryBox"
import ProductGrid from "@modules/common/components/productGrid"
import category1 from "../../../../public/bg-img/banner_minipage1.jpg"
import category2 from "../../../../public/bg-img/banner_minipage2.jpg"
import category3 from "../../../../public/bg-img/banner_minipage3.jpg"
import category4 from "../../../../public/bg-img/banner_minipage1.jpg"
import category5 from "../../../../public/bg-img/banner_minipage2.jpg"
import category6 from "../../../../public/bg-img/banner_minipage3.jpg"
import category7 from "../../../../public/bg-img/banner_minipage1.jpg"
import category8 from "../../../../public/bg-img/banner_minipage2.jpg"
import bellaImage from "../../../../public/bella-canvas-wholesale-clothing.webp"
import nextLevelImage from "../../../../public/next-level-apparel-wholesale.webp"
import threadImage from "../../../../public/threadfast-apparel-wholesale.webp"
import americanImage from "../../../../public/american-apparel-wholesale.jpg"
import glidanlImage from "../../../../public/wholesale-clothing-gildan.png"
import hanesImage from "../../../../public/wholesale-hanes-clothing.jpg"
import CategoryTemplate from "@modules/categories/templates"

export const metadata = {
  title: "EgalaSpot",
  description: "EgalaSpot Ecommerce Store.",
}

const getCollectionsWithProducts = cache(async (countryCode) => {
  const { collections } = await getCollectionsList(0, 3)

  if (!collections) {
    return null
  }

  const collectionIds = collections.map((collection) => collection.id)

  await Promise.all(
    collectionIds.map((id) =>
      getProductsList({
        queryParams: { collection_id: [id] },
        countryCode,
      })
    )
  ).then((responses) =>
    responses.forEach(({ response, queryParams }) => {
      let collection

      if (collections) {
        collection = collections.find(
          (collection) => collection.id === queryParams?.collection_id?.[0]
        )
      }

      if (!collection) {
        return
      }

      collection.products = response.products
    })
  )

  return collections
})

export default async function Home({ params: { countryCode } }) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)
  const { product_categories, count } = await getCategoriesList(0, 8)
  if (!collections || !region) {
    return null
  }
  const brands = [
    { id: 1, name: "bella + canvas", image: bellaImage },
    { id: 1, name: "next level appael", image: nextLevelImage },
    { id: 1, name: "hanes", image: hanesImage },
    { id: 1, name: "glidan", image: glidanlImage },
    { id: 1, name: "threadfast apparel", image: threadImage },
    { id: 1, name: "american apparel", image: americanImage },
  ]

  const images = [
    category1,
    category2,
    category3,
    category4,
    category5,
    category6,
    category7,
    category8,
  ]

  const categories = product_categories.map((category, index) => ({
    id: category.id,
    name: category.name,
    link: category.handle,
    image: images[index],
  }))

  return (
    <>
      <Hero />
      <CategoryGrid title="Latest Products" limit={8} region={region} />
      <div className="py-8 bg-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-light tracking-wider hover:underline mb-8">
            Top Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.slice(0, 8).map((category) => (
              <CategoryBox
                key={category.name}
                image={category.image}
                name={category.name}
                link={`/categories/${category.link}`}
              />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <InteractiveLink href="/category">
              View All Categories
            </InteractiveLink>
          </div>
        </div>
      </div>
      <CategoryGrid title="Best Sellers" limit={8} region={region} />
      <CategoryGrid title="Weekly Deals" limit={8} region={region} />
      <div className="mx-auto px-4 py-8 bg-gray-200">
        <div className="container">
          <h2 className="text-center text-3xl font-light tracking-wider hover:underline mb-8">
            Shop Our Top Brands
          </h2>
          <div className="flex justify-center flex-wrap items-center gap-x-5 gap-y-5">
            {brands.map((brand) => (
              <InteractiveLink
                key={brand.name}
                href={`/brand/${brand.link}`}
                className="text-lg font-bold text-gray-900 hover:text-gray-700 mx-auto gap-y-3"
              >
                <Image
                  src={brand.image}
                  alt={brand.name}
                  className="rounded-full max-w-[150px] min-w-[150px] mx-auto mb-2"
                  width={150}
                  height={150}
                />
                <h2 className="text-center text-xl font-light tracking-wider hover:underline uppercase">
                  {brand.name}
                </h2>
              </InteractiveLink>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function CategoryGrid({title, region, limit}) {
  const handle = title.toLowerCase().replace(" ", "-")
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-light tracking-wider hover:underline mb-8">
          {title}
        </h2>
        <CategoryTemplate
          sortBy={""}
          page={""}
          limit={limit}
          countryCode={region}
          categoryName={handle}
        />
      </div>
    </div>
  )
}
