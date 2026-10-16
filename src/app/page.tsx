import { CollectionRow } from "@/components/home/collection-row";
import { EditorialSplit } from "@/components/home/editorial-split";
import { Hero } from "@/components/home/hero";
import { NewArrivals } from "@/components/home/new-arrivals";
import { Services } from "@/components/home/services";
import { editorials } from "@/lib/catalog";

export default function Home() {
  const [tailoring, campaign] = editorials;

  return (
    <>
      <Hero />
      <CollectionRow />
      <EditorialSplit {...tailoring} href={`/collections/${tailoring.slug}`} />
      <NewArrivals />
      <EditorialSplit {...campaign} href={`/collections/${campaign.slug}`} reverse />
      <Services />
    </>
  );
}
