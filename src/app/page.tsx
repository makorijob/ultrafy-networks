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
