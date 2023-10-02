import BgImage from "@/components/contact-us/bgimage";
import ContactCard from "@/components/property/contact/contactcard";

const page = async () => {
  return (
    <main className="relative mt-14 flex h-full flex-col py-20 md:flex-row md:items-center md:justify-center md:px-14 lg:px-48 xl:px-72">
      <BgImage />
      <div className="z-10 w-full space-y-2 px-6 py-8 text-white md:mb-40">
        <h1 className="bg-gradient-to-r from-emerald-300 to-emerald-600 bg-clip-text text-2xl font-bold text-transparent md:text-4xl">
          We&apos;d love to <br />
          hear from you
        </h1>
        <p className="text-xs md:text-xl lg:text-base">
          Get in touch with our Licensed Appraisers whenever you need them. The
          form on the right is your gateway to an in-depth property value
          discussion.
        </p>
      </div>
      <div className="w-full md:mb-0 md:px-6">
        <ContactCard />
      </div>
    </main>
  );
};

export default page;
