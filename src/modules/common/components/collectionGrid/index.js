import ProductRail from "@modules/home/components/featured-products/product-rail"

export default async function CollectionGrid({
  title,
  itemsPerRow,
  limit,
  collections,
  region,
}) {
  // Filter collections based on the title
  const filteredCollections = collections.filter(
    (collection) => collection.title === title
  )

  // Optionally limit the number of items to `limit` if provided
  const limitedCollections = limit
    ? filteredCollections.slice(0, limit)
    : filteredCollections

  return (
    <>
      {limitedCollections.map((collection) => (
        <ProductRail
          key={collection.id}
          collection={collection}
          region={region}
          itemsPerRow={itemsPerRow}
        />
      ))}
    </>
  )
}
