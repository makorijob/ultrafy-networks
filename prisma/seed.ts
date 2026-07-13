import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.heroSlide.createMany({
    data: [
      {
        imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1600",
        title: "Fiber Internet Across Thika",
        subtitle: "Fast, reliable connectivity for homes and businesses",
        order: 1,
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1600",
        title: "Smart CCTV & Access Control",
        subtitle: "Keep what matters protected, day and night",
        order: 2,
      },
      {
        imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1600",
        title: "Solar & Power Solutions",
        subtitle: "Reliable energy to keep you always connected",
        order: 3,
      },
    ],
  });

  await prisma.package.createMany({
    data: [
      { name: "Starter", speed: "8 Mbps", price: 1500, freeMonth: true, featured: false, order: 1 },
      { name: "Popular", speed: "15 Mbps", price: 2000, freeMonth: false, featured: true, order: 2 },
      { name: "Pro", speed: "30 Mbps", price: 3000, freeMonth: true, featured: false, order: 3 },
    ],
  });

  await prisma.offering.createMany({
    data: [
      {
        title: "Fiber Internet",
        description: "High-speed fiber connections for homes and offices across Thika.",
        imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200",
        order: 1,
      },
      {
        title: "Wireless Internet & Hotspots",
        description: "Flexible wireless connectivity and shared hotspot solutions.",
        imageUrl: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=1200",
        order: 2,
      },
      {
        title: "CCTV Installation",
        description: "Professional CCTV setup and monitoring for homes and businesses.",
        imageUrl: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1200",
        order: 3,
      },
      {
        title: "Access Points & Control",
        description: "Secure access point installation and management systems.",
        imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1200",
        order: 4,
      },
      {
        title: "Solar Panel Installation",
        description: "Dependable solar power systems for homes and businesses.",
        imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200",
        order: 5,
      },
      {
        title: "Electric Fence Installation",
        description: "Secure perimeter electric fencing for your property.",
        imageUrl: "https://images.unsplash.com/photo-1553708881-112abaf9ea3c?q=80&w=1200",
        order: 6,
      },
    ],
  });

  await prisma.testimonial.createMany({
    data: [
      { name: "Grace W.", role: "Thika Resident", message: "Ultrafy gave us fast, stable fiber internet after months of poor service from other providers.", rating: 5 },
      { name: "Samuel K.", role: "Business Owner", message: "Their CCTV installation team was professional and the support since has been excellent.", rating: 5 },
    ],
  });

  await prisma.job.createMany({
    data: [
      { title: "Field Installation Technician", location: "Thika", description: "We're looking for a technician experienced in fiber and wireless installations.", isActive: true },
    ],
  });

  await prisma.investment.createMany({
    data: [
      { title: "Network Expansion Partnership", description: "Support our expansion of fiber and wireless coverage across Thika and surrounding areas.", isActive: true },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
