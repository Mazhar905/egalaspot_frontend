import ProductRail from "@modules/home/components/featured-products/product-rail"
import { fileURLToPath } from "url"

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
  console.log(filteredCollections)

  return (
    <>
      {filteredCollections.map((collection) => (
        <ProductRail
          key={collection.id}
          collection={collection}
          region={region}
          limit={limit}
          itemsPerRow={itemsPerRow}
        />
      ))}
    </>
  )
}
