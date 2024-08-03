import { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  getProductByHandle,
  getProductsList,
  getRegion,
  listRegions,
  retrievePricedProductById,
} from "@lib/data"
import { Region } from "@medusajs/medusa"
import ProductTemplate from "@modules/products/templates"

type Props = {
  params: { countryCode: string; handle: string }
}

export async function generateStaticParams() {
  const countryCodes = await listRegions().then((regions) =>
    regions?.map((r) => r.countries.map((c) => c.iso_2)).flat()
  )

  if (!countryCodes) {
    return null
  }

  const products = await Promise.all(
    countryCodes.map((countryCode) => {
      return getProductsList({ countryCode })
    })
  ).then((responses) =>
    responses.map(({ response }) => response.products).flat()
  )

  const staticParams = countryCodes
    ?.map((countryCode) =>
      products.map((product) => ({
        countryCode,
        handle: product.handle,
      }))
    )
    .flat()

  return staticParams
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = params

  const { product } = await getProductByHandle(handle).then(
    (product) => product
  )

  if (!product) {
    notFound()
  }

  return {
    title: `${product.title} | EgalaSpot`,
    description: `${product.title}`,
    openGraph: {
      title: `${product.title} | EgalaSpot`,
      description: `${product.title}`,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  }
}

const getPricedProductByHandle = async (handle: string, region: Region) => {
  const { product } = await getProductByHandle(handle).then(
    (product) => product
  )

  if (!product || !product.id) {
    return null
  }

  const pricedProduct = await retrievePricedProductById({
    id: product.id,
    regionId: region.id,
  })

  return pricedProduct
}

export default async function ProductPage({ params }: Props) {
  console.log("hwllo world")

  const region = await getRegion(params.countryCode)
  console.log(region)

  if (!region) {
  console.log("hwllo world")
  
    notFound()
  }
  const pricedProduct = await getPricedProductByHandle(params.handle, region)
  // console.log(pricedProduct)
  // console.log("length of the ")
  // console.log(typeof(pricedProduct))
  // console.log(pricedProduct?.length)
  // Get the length of the object
const objectLength = Object.keys(pricedProduct).length;

console.log(objectLength); // Output: 3
  if (!pricedProduct) {
    notFound()
  }

  return (
    <ProductTemplate product={pricedProduct} region={region} countryCode={params.countryCode}/>
    // <h1>Hellowd</h1>
  )
}
