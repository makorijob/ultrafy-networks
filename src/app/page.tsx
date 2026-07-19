import { prisma } from "@/lib/prisma";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Offerings from "@/components/site/Offerings";
import Packages from "@/components/site/Packages";
import Careers from "@/components/site/Careers";
import Testimonials from "@/components/site/Testimonials";
import Invest from "@/components/site/Invest";
import ContactSection from "@/components/site/ContactSection";
import Footer from "@/components/site/Footer";

export const dynamic = "force-dynamic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ultrafynetworks.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "InternetServiceProvider",
  name: "Ultrafy Networks",
  url: siteUrl,
  telephone: "+254703199691",
  email: "info.ultrafynetworks@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Thika",
    addressCountry: "KE",
  },
  areaServed: "Thika, Kenya",
  priceRange: "KES 1,500 - KES 3,000",
  description:
    "Fiber and wireless internet, hotspots, CCTV installation, access control, solar power and electric fencing in Thika, Kenya.",
};

export default async function HomePage() {
  const [slides, offerings, packages, jobs, testimonials, investments] = await Promise.all([
    prisma.heroSlide.findMany({ orderBy: { order: "asc" } }),
    prisma.offering.findMany({ orderBy: { order: "asc" } }),
    prisma.package.findMany({ orderBy: { order: "asc" } }),
    prisma.job.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.testimonial.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.investment.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main>
        <Hero slides={slides} />
        <Offerings offerings={offerings} />
        <Packages packages={packages} />
        <Careers jobs={jobs} />
        <Testimonials testimonials={testimonials} />
        <Invest investments={investments} />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
