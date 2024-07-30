import Link from "next/link";

const CategoryBox = ({ name, image, link }) => {
  return (
    <Link href={link} className="block">
      <div
        className="relative flex items-center justify-center border-2 border-gray-300 p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105hover:shadow-xl h-[300px]"
        style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="bg-black bg-opacity-50 text-white text-xl font-bold px-4 py-2 rounded">
          {name}
        </div>
      </div>
    </Link>
  );
};

export default CategoryBox;
