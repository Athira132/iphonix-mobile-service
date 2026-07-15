import ServicePageClient from "./ServicePageClient";

// Static Params compilation definition for pre-rendering
export function generateStaticParams() {
  return [
    { slug: "screen-replacement" },
    { slug: "battery-replacement" },
    { slug: "charging-port-repair" },
    { slug: "water-damage-repair" },
    { slug: "speaker-microphone-repair" },
    { slug: "camera-repair" },
    { slug: "software-solutions" },
    { slug: "iphone-repair" },
    { slug: "android-repair" },
    { slug: "accessories" }
  ];
}

// Server Component page
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <ServicePageClient slug={resolvedParams.slug} />;
}
