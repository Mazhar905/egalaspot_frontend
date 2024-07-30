import Image from "next/image"
import Link from "next/link"
import InteractiveLink from "../interactive-link"
// import { useContext } from "react"
// import { CartContext } from "@/context/cart"
// import { WishlistContext } from "@/context/wishlist"

function ProductCard({ product, itemsPerRow }) {
  //   const { cartItems, addToCart, removeFromCart } = useContext(CartContext)
  //   const { wishlistItems, addToWishlist, removeFromWishlist, isInWishlist } =
  //     useContext(WishlistContext)

  //   const cartProduct = cartItems.find((item) => item._id === product._id)
  //   const isInWishlistProduct = isInWishlist(product._id)

  //   const handleAddToCart = () => {
  //     addToCart(product)
  //   }

  //   const handleToggleWishlist = () => {
  //     if (isInWishlistProduct) {
  //       removeFromWishlist(product)
  //     } else {
  //       addToWishlist(product)
  //     }
  //   }

  const rowClass = itemsPerRow ? "lg:w-1/4" : ""
  return (
    <>
      <div
        className={`w-1/2 md:w-1/3 ${rowClass} px-2 flex items-stretch justify-stretch`}
      >
        <div
          className={`mb-2 flex items-center flex-col bg-white hover:shadow-lg w-full border rounded-xl p-3 cursor-pointer`}
        >
          <Link
            href={`/product/${product._id}`}
            className="relative block w-full h-48"
          >
            <Image
              src={product.images[0]}
              alt={product.thumbnail}
              layout="fill"
              className="hover:scale-105 transition"
              objectFit="contain"
            />
          </Link>
          <div className="mt-4 w-full mb-2 flex-grow justify-between ">
            <Link
              href={`/product/${product._id}`}
              className="flex-1 text-lg font-semibold text-gray-900 mb-0"
            >
              {product.title}
            </Link>
          </div>
          <p className="w-full text-md text-gray-800 mt-0">
            ${product.price.toFixed(2)}
          </p>
          <div className="flex w-full items-center ms-2 my-3">
            {/* Rating stars */}
          </div>

          <InteractiveLink
            href=""
            className="p-3 bg-red-500 border flex-grow rounded-lg hover:bg-red-600 text-white font-normal text-sm w-full"
          >
            Quick View
          </InteractiveLink>
        </div>
      </div>
    </>
  )
}

export default ProductCard
