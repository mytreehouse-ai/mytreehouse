import ContactCard from "@/components/property/contact/ContactCard";
import Image from "next/image";

const page = async () => {
  return (
    <main className="relative h-[calc(100vh)] overflow-y-auto">
      <Image
        className="absolute w-full object-cover opacity-90"
        src="/satellite-map-bg.png"
        alt="satellite_map_bg"
        sizes="(max-width: 1200px)  100vw"
        objectFit=""
        priority={true}
        fill={true}
      />
      <section className="absolute z-10 mt-36 flex h-full w-full items-center bg-white/60 backdrop-blur-sm md:mt-0">
        <div className="mx-auto md:w-1/4 md:py-10">
          <ContactCard />
        </div>
      </section>
    </main>
  );
};

export default page;
