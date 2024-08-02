import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1

  return (
    <div
      className="flex flex-col small:items-start py-6 content-container"
      data-testid="category-container"
    >
      <div className="flex items-center justify-between w-full py-10 px-2">
        {/* <div className="mb-8 text-2xl-semi"> */}
          <h1 className="text-2xl-semi" data-testid="store-page-title">All products</h1>
        {/* </div> */}
        <RefinementList sortBy={sortBy || "created_at"} />
      </div>
      <div className="w-full">
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sortBy || "created_at"}
            page={pageNumber}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
