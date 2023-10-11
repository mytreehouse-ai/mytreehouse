'use client'

import React from 'react'
import Image from 'next/image'

interface PropertyImagesPlaceholderProps {
    images?: string[]
}

const PropertyImagesPlaceholder = ({images}:PropertyImagesPlaceholderProps) => {

  return (
         <div className="flex flex-col lg:flex-row gap-x-2 gap-y-2">
        <div className="relative h-96 w-full">
          <Image
            className="rounded-md object-cover"
            src={images ? images[0] : ''}
            alt="home_page_main_banner"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            priority={true}
          />
        </div>
        <div className="w-full lg:w-1/2 ">
        {images && images?.length >= 3 && (
          <div className="relative grid grid-cols-2 gap-2 h-64 lg:h-full " >
            {images?.slice(1, 4).map((image) => (
              <div key={image} className="relative w-full h-full overflow-clip rounded-md last:col-span-2">
              <Image
                src={image}
                className="h-[250px] rounded-md object-cover hover:cursor-pointer hover:scale-110 transition ease-in-out "
                alt="home_page_main_banner"
                fill
                sizes="(max-width: 768px) 100vw, 350px"
                priority={true}
              />
            </div>
            ))}
          </div>
        )}
        </div>
      </div>
  )
}

export default PropertyImagesPlaceholder