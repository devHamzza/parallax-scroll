import CustomSection from "@/components/CustomSection";
import FlexCards from "@/components/FlexCards";
import Header from "@/components/Header";
import { LastSection } from "@/components/LastSection";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Header />
      <CustomSection />
      <FlexCards />
      <LastSection/>
    </div>
  );
}
