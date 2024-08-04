/* eslint-disable @next/next/no-img-element */
import { Image as MedusaImage } from "@medusajs/medusa";
import { Container, clx } from "@medusajs/ui";
import Image from "next/image";
import React from "react";

import PlaceholderImage from "@modules/common/icons/placeholder-image";
import Link from "next/link";

type ThumbnailProps = {
  thumbnail?: string | null;
  images?: MedusaImage[] | null;
  link?: string; // Updated to string
  size?: "small" | "medium" | "large" | "full" | "square";
  isFeatured?: boolean;
  className?: string;
  "data-testid"?: string;
};

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  images,
  link = "#", // Provide a default link if it's undefined
  size = "small",
  isFeatured,
  className,
  "data-testid": dataTestid,
}) => {
  const initialImage = thumbnail || images?.[0]?.url;

  return (
    <div
      className={clx(
        "relative w-full overflow-hidden bg-ui-bg-subtle transition-shadow ease-in-out duration-150 ",
        className,
        {
          "aspect-[3/2": !isFeatured && size !== "square",
          // "w-[180px]": size === "small",
          // "w-[290px]": size === "medium",
          // "w-[440px]": size === "large",
          // "w-full": size === "full",
        }
      )}
      data-testid={dataTestid}
    >
      <Link href={link}>
        <ImageOrPlaceholder image={initialImage} size={size} />
      </Link>
    </div>
  );
};

const ImageOrPlaceholder = ({
  image,
  size,
}: Pick<ThumbnailProps, "size"> & { image?: string }) => {
  return image ? (
    <>
      <img src={image} alt="Thumbnail" className="h-80 w-72 object-cover rounded-t-xl"  />

      {/* <Image
        src={image}
        alt="Thumbnail"
        className="absolute inset-0 object-cover object-center"
        draggable={false}
        quality={50}
        sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
        fill
      /> */}
    </>
  ) : (
    <div className="w-full h-full absolute inset-0 flex items-center justify-center">
      <PlaceholderImage size={size === "small" ? 16 : 24} />
    </div>
  );
};

export default Thumbnail;
