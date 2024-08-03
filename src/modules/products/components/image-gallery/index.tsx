"use client"
import { useState } from 'react';
import { Image as MedusaImage } from "@medusajs/medusa";
import { Container } from "@medusajs/ui";
import Image from "next/image";

type ImageGalleryProps = {
  images: MedusaImage[];
};

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [mainImage, setMainImage] = useState<MedusaImage>(images[0]);
  console.log(images)

  return (
    <div className="flex flex-col items-center relative">
      <Container
        className="relative aspect-[29/34] w-full max-w-xl overflow-hidden bg-ui-bg-subtle mb-4"
        id={mainImage.id}
      >
        <img src={mainImage.url} alt="Main Product Image" height={500}/>
        {/* <Image
          src={mainImage.url}
          priority
          className="absolute inset-0 rounded-rounded"
          alt={`Main product image`}
          fill
          style={{
            objectFit: "cover",
          }}
        /> */}
      </Container>
      <div className="flex flex-wrap justify-start gap-4">
        {images.map((image, index) => (
          <Container
            key={image.id}
            className="relative aspect-[29/34] w-24 h-24 overflow-hidden bg-ui-bg-subtle cursor-pointer"
            id={image.id}
            onClick={() => setMainImage(image)}
          >
            <img src={image.url} alt={`Product image ${index + 1}`} />
            {/* <Image
              src={image.url}
              priority={index <= 2 ? true : false}
              className="absolute inset-0 rounded-rounded"
              alt={`Product image ${index + 1}`}
              fill
              style={{
                objectFit: "cover",
              }}
            /> */}
          </Container>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
