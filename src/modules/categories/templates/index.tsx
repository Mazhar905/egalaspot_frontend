import { notFound } from "next/navigation"
import { Suspense } from "react"

import { ProductCategoryWithChildren } from "types/global"
import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ArchiveHeader from "@modules/store/components/archive-header"
import { getCategoryByHandle } from "@lib/data"

export default async function CategoryTemplate({
  sortBy,
  page,
  countryCode,
  categoryName,
  limit,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  categoryName: string
  limit?: number
}) {
  const pageNumber = page ? parseInt(page) : 1
  const name: string[] = categoryName.split(" ")
  const { product_categories } = await getCategoryByHandle(name).then(
    (product_categories) => product_categories
  )
  const category = product_categories[0]
  // const category = categories[categories.length - 1]
  // const parents = categories.slice(0, categories.length - 1)
  if (sortBy && (!countryCode || !category)) notFound()

  return (
    <div
      className="flex flex-col small:items-start py-6 content-container"
      data-testid="category-container"
    >
      {sortBy && (
        <ArchiveHeader
          title={category.name}
          sortBy={sortBy || "created_at"}
          data-testid="sort-by-container"
        />
      )}
      {/* <div className="w-full">
        <div className="flex flex-row mb-8 text-2xl-semi gap-4">
          {parents &&
            parents.map((parent) => (
              <span key={parent.id} className="text-ui-fg-subtle">
                <LocalizedClientLink
                  className="mr-4 hover:text-black"
                  href={`/categories/${parent.handle}`}
                  data-testid="sort-by-link"
                >
                  {parent.name}
                </LocalizedClientLink>
                /
              </span>
            ))}
        </div> */}
      {/* {category.description && (
          <div className="mb-8 text-base-regular">
            <p>{category.description}</p>
          </div>
        )} */}
      {/* {category.category_children && (
          <div className="mb-8 text-base-large">
            <ul className="grid grid-cols-1 gap-2">
              {category.category_children?.map((c) => (
                <li key={c.id}>
                  <InteractiveLink href={`/categories/${c.handle}`}>
                    {c.name}
                  </InteractiveLink>
                </li>
              ))}
            </ul>
          </div>
        )} */}
      <Suspense fallback={<SkeletonProductGrid />}>
        <PaginatedProducts
          sortBy={sortBy}
          page={pageNumber}
          categoryId={category.id}
          countryCode={countryCode}
          limit={limit}
        />
      </Suspense>
    </div>
  )
}
