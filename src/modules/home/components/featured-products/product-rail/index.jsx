/* eslint-disable react/jsx-key */
import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default function ProductRail({ collection, region, itemsPerRow }) {
  const { products } = collection
  if (!products) {
    return null
  }

  return (
    <div className="content-container py-12 small:py-24">
      <div className="flex justify-center mb-8 text-center">
        <h2 className="text-center text-3xl font-light tracking-wider hover:underline">
          {collection.title}
        </h2>
      </div>
      <div className="flex flex-wrap justify-between gap-y-4 gap-x-4 small:gap-y-6">
        {products.map((product) => (
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
