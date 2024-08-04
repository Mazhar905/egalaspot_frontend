import { Text } from "@medusajs/ui"

import { ProductPreviewType } from "types/global"

import { retrievePricedProductById } from "@lib/data"
import { getProductPrice } from "@lib/util/get-product-price"
import { Region } from "@medusajs/medusa"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import InteractiveLink from "@modules/common/components/interactive-link"
import Link from "next/link"

export default async function ProductPreview({
  productPreview,
  isFeatured,
  region,
  itemsPerRow,
}: {
  productPreview: ProductPreviewType
  isFeatured?: boolean
  region: Region
  itemsPerRow?: number
}) {
  const pricedProduct = await retrievePricedProductById({
    id: productPreview.id,
    regionId: region.id,
  }).then((product) => product)

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
    region,
  })
  // const rowClass = itemsPerRow ? `lg:w-[${}]` : ""

  return (
    // <div className="flex-grow flex-shrink-0 basis-[calc(50%-1.5rem)] md:basis-[calc(33%-1.5rem)] lg:basis-[calc(25%-1.5rem)] max-w-[calc(25%-1.5rem) border justify-between bg-gray-200">
    //   <div className="flex flex-col justify-between h-full">
    <div className="w-72 bg-white shadow-md border rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <Thumbnail
        thumbnail={productPreview.thumbnail}
        size="square"
        isFeatured={isFeatured}
        link={`/products/${productPreview.handle}`}
      />
      <div className="px-4 py-3 w-72">
        <span className="text-gray-400 mr-3 capitalize text-xs">brand</span>

        <Link href={`/products/${productPreview.handle}`}>
          <Text
            className="text-sm font-bold text-black truncate block capitalize"
            data-testid="product-title"
          >
            {productPreview.title}
          </Text>
        </Link>
        <div className="flex justify-start gap-x-2">
          {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
        </div>
      </div>

      <div className="px-2 pb-3 mt-2">
        <InteractiveLink href={`/products/${productPreview.handle}`}>
          Quick View
        </InteractiveLink>
      </div>
    </div>
  )
}
