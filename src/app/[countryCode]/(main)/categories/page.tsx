import { useProductCategories } from "medusa-react"
import Link from "next/link"

function Categories() {
  const { product_categories, isLoading } = useProductCategories()

  return (
    <div>
      {isLoading && <span>Loading...</span>}
      {product_categories && !product_categories.length && (
        <span>No Categories</span>
      )}
      {product_categories && product_categories.length > 0 && (
        <ul>
          {product_categories.map((category) => (
            <li key={category.id}>
              <Link href={`/categories/category.handle`} >{category.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Categories
