import { cache } from "react"

import {
  getCategoriesList,
  getCollectionsList,
  getProductsList,
  getRegion,
} from "@lib/data"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "../../../modules/home/components/hero"
import InteractiveLink from "@modules/common/components/interactive-link"
import CollectionGrid from "@modules/common/components/collectionGrid"
import CategoryBox from "@modules/home/components/categoryBox"
import ProductGrid from "@modules/common/components/productGrid"

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

  const images = [
    "/bg-img/curly_hair_girl-1_mobile.jpg",
    "/bg-img/banner_minipage3.jpg",
    "/bg-img/banner_minipage1-tablet.jpg",
    "/bg-img/banner_minipage1-tablet.jpg",
    "/bg-img/banner_minipage1-tablet.jpg",
    "/bg-img/banner_minipage1-tablet.jpg",
    "/bg-img/banner_minipage1-tablet.jpg",
    "/bg-img/banner_minipage1-tablet.jpg",
  ]
  const categories = product_categories.map((category) => ({
    id: category.id,
    name: category.name,
    link: category.handle,
    image: images[Math.floor(Math.random() * images.length)],
  }))
  return (
    <>
      <Hero />
      {/* <CollectionGrid
        itemsPerRow={4}
        limit={8}
        title="Latest Products"
        collections={collections}
        region={region}
      /> */}
      <div className="container mx-auto px-4 py-8">
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
      <CollectionGrid
        itemsPerRow={4}
        limit={8}
        title="Best Seller"
        collections={collections}
        region={region}
      />
      <CollectionGrid
        itemsPerRow={4}
        limit={8}
        title="Weekly Deals"
        collections={collections}
        region={region}
      />
    </>
  )
}
