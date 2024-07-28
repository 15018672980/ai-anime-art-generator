"use client";
import ImageGallery from "@/components/ImageGallery";
const images = [
  {
    src: "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/-Oo9VSj35eqSPeAV5GnyX.png",
    alt: "Girl in Sea",
    href: "#",
    tags: ["Girl", "Sea"],
  },
  {
    src: "https://pub-e3ff540d6a85456b85074558bbbcf163.r2.dev/YLRdeIBGH5nqPUBy7O6I3.png",
    alt: "Magic",
    href: "#",
    tags: ["Girl", "Magic"],
   },
  // {
  //   src: "https://i.imgur.com/aQI6ZbM.png",
  //   alt: "Girl in Desert",
  //   href: "#",
  //   tags: ["Girl", "Desert"],
  // },
  // {
  //   src: "https://i.imgur.com/QdQYHLD.png",
  //   alt: "Girl Surfing",
  //   href: "#",
  //   tags: ["Surfing", "Sea"],
  // },
  // {
  //   src: "https://i.imgur.com/EfVQHob.png",
  //   alt: "Castle",
  //   href: "#",
  //   tags: ["Girl", "Castle"],
  // },
  // {
  //   src: "https://i.imgur.com/aPCFxWq.png",
  //   alt: "Court",
  //   href: "#",
  //   tags: ["Girl", "Court"],
  // },
];

export default function ImageCarousel() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <ImageGallery images={images} />
      </div>
    </>
  );
}

