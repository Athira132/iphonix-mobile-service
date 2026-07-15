import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "iPhonix | Premium Mobile & Apple Service Centre Trivandrum",
  description: "iPhonix Apple Research and Professional Services Mobile & Service Centre in Karamana, Thiruvananthapuram, Kerala. Premium, fast, and trusted repair services for iPhone, MacBook, iPad, Apple Watch, and premium Android devices using high-quality genuine parts with warranty.",
  keywords: "iphone repair trivandrum, apple service center kerala, macbook repair karamana, ipad repair trivandrum, apple watch repair kerala, mobile repair shop karamana, premium phone repair trivandrum, iphonix mobile service, broken screen replacement karamana",
  authors: [{ name: "iPhonix Mobile Service" }],
  metadataBase: new URL("https://iphonix.in"), // Mock base URL for canonical tags
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "iPhonix | Premium Mobile & Apple Service Centre",
    description: "Expert repairs for iPhone, iPad, MacBook, Apple Watch, and premium smartphones in Karamana, Thiruvananthapuram, Kerala. Fast turnaround, genuine parts, and warranty support.",
    url: "https://iphonix.in",
    siteName: "iPhonix Mobile Service",
    images: [
      {
        url: "/company_name.png",
        width: 1080,
        height: 1043,
        alt: "iPhonix Mobile Service Centre - Apple Research and Professional Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iPhonix | Premium Mobile & Apple Service Centre",
    description: "Professional Apple and smartphone repairs in Karamana, Thiruvananthapuram, Kerala. Same-day service, genuine parts, and warranty.",
    images: ["/company_name.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Define Schema.org JSON-LD structured data
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "iPhonix Mobile Service",
    "image": "https://iphonix.in/logo.png",
    "@id": "https://iphonix.in/#localbusiness",
    "url": "https://iphonix.in",
    "telephone": "+917306243424",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Near Karamana Airtel Office, Karamana",
      "addressLocality": "Thiruvananthapuram",
      "addressRegion": "Kerala",
      "postalCode": "695002",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 8.4815,
      "longitude": 76.9666
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "10:00",
      "closes": "22:00"
    },
    "sameAs": [
      "https://www.instagram.com/iphonix_mobile_service"
    ]
  };

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Mobile Device Repair",
    "provider": {
      "@type": "LocalBusiness",
      "name": "iPhonix Mobile Service"
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Thiruvananthapuram"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Repair Services Catalog",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "iPhone Screen Replacement"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Battery Replacement"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Motherboard Chip-Level Repair"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "MacBook & iPad Repair"
          }
        }
      ]
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long does a repair take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most common repairs, such as screen replacements and battery swaps, are completed on the same day within 1 to 2 hours. Complex motherboard repairs or extensive water damage diagnostics may take 24 to 48 hours."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide a warranty?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer up to 90 days of comprehensive warranty on all screen and part replacements, ensuring peace of mind and quality assurance."
        }
      },
      {
        "@type": "Question",
        "name": "Do you use genuine parts?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We use premium OEM-grade and original replacement parts of the highest quality available in the market. Each part is extensively tested for performance and reliability before installation."
        }
      }
    ]
  };

  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${poppins.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="antialiased min-h-screen text-text-charcoal bg-bg-light selection:bg-accent-green/20 selection:text-accent-green flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
