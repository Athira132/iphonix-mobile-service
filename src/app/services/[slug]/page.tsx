import ServicePageClient from "./ServicePageClient";

// Static Params compilation definition for pre-rendering
export function generateStaticParams() {
  return [
    { slug: "iphone-repair" },
    { slug: "android-repair" },
    { slug: "display-replacement" },
    { slug: "battery-replacement" },
    { slug: "camera-repair" },
    { slug: "charging-port-repair" },
    { slug: "water-damage-repair" },
    { slug: "motherboard-repair" },
    { slug: "software-solutions" },
    { slug: "mobile-accessories" },
    { slug: "doorstep-mobile-repair" },
    { slug: "back-glass-replacement" },
    { slug: "speaker-repair" },
    { slug: "mic-repair" },
    { slug: "face-id-repair" }
  ];
}

// Server Component page
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <ServicePageClient slug={resolvedParams.slug} />;
}
