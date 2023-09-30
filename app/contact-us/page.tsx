import ContactCard from "@/components/property/contact/contactCard";
import Image from "next/image";

const page = async () => {

  return (
    <main className="relative h-[calc(100vh)] overflow-y-auto">
      <Image
        className="absolute opacity-90 object-cover w-full"
        src="/satellite-map-bg.png"
        alt="satellite_map_bg"
        sizes="(max-width: 1200px)  100vw"
        objectFit=""
        priority={true}
        fill={true}
      />
      <section className="absolute z-10 w-full h-full flex items-center backdrop-blur-sm bg-white/60 mt-36 md:mt-0">
        <div className=" md:w-1/4 mx-auto md:py-10 ">
          <ContactCard />
        </div>
      </section>
    </main>
  )
};

export default page;
