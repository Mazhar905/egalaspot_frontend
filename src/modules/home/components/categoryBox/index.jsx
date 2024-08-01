/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image"
import Link from "next/link"

const CategoryBox = ({ name, image, link }) => {
  return (
    <Link href={link} className="block">
      <div className="relative flex items-center justify-center border border-gray-300 p-8 shadow-lg transition-transform transform hover:scale-105hover:shadow-xl h-[300px]">
        <Image src={image} fill alt={name} />
        <div className="bg-black bg-opacity-50 text-white text-xl font-bold px-4 py-2 z-50">
          {name}
        </div>
      </div>
    </Link>
  )
}

export default CategoryBox
