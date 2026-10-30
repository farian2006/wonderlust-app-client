import Banner from "@/components/Banner";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <div className="min-h-screen bg-muted px-4 py-5 md:px-8 lg:px-12">
      <div className="mx-auto w-full max-w-7xl">
        <Banner />
        <WhyChooseUs />
      </div>
    </div>
  );
}
