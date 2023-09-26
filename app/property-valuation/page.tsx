import Valuation from "@/components/property/valuation";

const Page = () => {
    return (
        <main className="bg-[url('/property-valuation-bg.jpg')] h-[calc(100vh)] w-full bg-cover bg-no-repeat from-neutral-700">
            <div
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                }}
                className="h-screen"
            >
                <div className="flex flex-col">
                    <div className="w-full py-8 px-6 text-white space-y-2">
                        <h1 className=" text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-emerald-600">Expert Property Valuation Service</h1>
                        <p className="text-xs">Trust in our expertise to accurately assess and reveal the true value of your assets, empowering you to make informed decisions with confidence</p>
                    </div>
                    <Valuation />
                </div>

            </div>
        </main>
    );
}

export default Page;