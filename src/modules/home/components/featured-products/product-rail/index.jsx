/* eslint-disable react/jsx-key */
import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default function ProductRail({ collection, region, itemsPerRow, limit }) {
  const { products } = collection
  if (!products) {
    return null
  }
  // Optionally limit the number of items to `limit` if provided
  const limitedProducts = limit
    ? products.slice(0, limit)
    : products
  return (
    <div className="content-container py-8 small:py-8">
      <div className="flex justify-center mb-8 text-center">
        <h2 className="text-center text-3xl font-light tracking-wider hover:underline">
          {collection.title}
        </h2>
      </div>
      <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-4 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">

        {limitedProducts.map((product) => (
            <ProductPreview
              key={product.id}
              productPreview={product}
              region={region}
              itemsPerRow={itemsPerRow}
            />
        ))}
      </div>
      <div className="flex justify-center mt-12">
        <InteractiveLink href={`/collections/${collection.handle}`}>
          View all
        </InteractiveLink>
      </div>
    </div>
  )
}
