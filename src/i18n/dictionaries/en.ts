import type { ImageId } from "@/content/images";

export const en = {
  meta: {
    title: "Around the World — Norway Mountains",
    description:
      "Slow, small-group journeys through Norway’s mountains, fjords and Arctic north. Lofoten, Trolltunga, Geirangerfjord and Tromsø.",
  },
  a11y: {
    skip: "Skip to content",
    home: "Around the World — home",
    mainNav: "Main",
    mobileNav: "Mobile",
    footerNav: "Footer",
    menu: "Menu",
    close: "Close",
    language: "Language",
    carousel: "Featured Norwegian landscapes",
    chooseSlide: "Choose landscape",
    prev: "Previous landscape",
    next: "Next landscape",
    show: (caption: string) => `Show ${caption}`,
    live: (n: number, total: number, caption: string) => `Landscape ${n} of ${total}: ${caption}`,
    testimonials: "What travellers say",
  },
  brand: {
    name: "Around the World",
    lines: ["Around", "the world"],
  },
  nav: [
    { label: "Home", href: "#top" },
    { label: "About us", href: "#story" },
    { label: "Tours", href: "#tours" },
    { label: "Contacts", href: "#contacts" },
  ],
  signIn: { label: "Sign in", href: "#sign-in" },
  menuNote: "Norway · Mountains · Fjords · Arctic",
  hero: {
    kicker: "Amazing tour",
    description: "Travel leaves you speechless and then makes you a better storyteller.",
    cta: { label: "Learn about the mountains of Norway", href: "#story" },
    captions: {
      fjords: "Nærøyfjord, Vestland",
      lofoten: "Kvalvika beach, Lofoten",
      senja: "Segla, Senja",
    },
  },
  story: {
    label: "Our story",
    title: ["More Than", "Just a Destination"],
    body: [
      "For over a decade we have been walking the ridges, sailing the fjords and waiting out the weather in the far north — so that every journey we design feels unhurried, personal and deeply rooted in place.",
      "Small groups, local guides and routes that leave room for silence. Norway is not something you tick off. It is something that stays with you.",
    ],
    cta: { label: "Discover our story", href: "#destinations" },
    quote: ["Not just trips,", "but transformations."],
    caption: ["61°N", "Lovatnet · Loen"],
    stats: [
      { value: "10+", label: "Years of experience" },
      { value: "50+", label: "Unique destinations" },
      { value: "25K+", label: "Happy travelers" },
    ],
  },
  destinations: {
    label: "Top destinations",
    title: ["Breathtaking Places", "in Norway"],
    description:
      "From Arctic islands to the deepest fjords — four places we return to every season, each with its own light and its own silence.",
    link: { label: "All destinations", href: "#destinations" },
    items: {
      lofoten: {
        name: "Lofoten Islands",
        region: "Nordland",
        description: "Granite peaks rising straight out of a turquoise sea.",
      },
      trolltunga: {
        name: "Trolltunga",
        region: "Vestland",
        description: "A ledge of stone hanging 700 metres above the lake.",
      },
      geirangerfjord: {
        name: "Geirangerfjord",
        region: "Møre og Romsdal",
        description: "Waterfalls tumbling into a deep, emerald fjord.",
      },
      tromso: {
        name: "Tromsø",
        region: "Troms",
        description: "The Arctic capital beneath the northern lights.",
      },
    },
  },
  tours: {
    label: "Featured tours",
    title: ["Unforgettable", "Journeys"],
    link: { label: "All tours", href: "#tours" },
    badge: "Featured · 2026 season",
    viewTour: "View tour",
    featured: {
      title: "Fjords & Peaks",
      description:
        "A slow journey through the western fjords — ferry crossings at dawn, ridge walks above the clouds and evenings in a wooden lodge by the water.",
      meta: ["7 days", "Guided tour", "Small groups"],
      price: "from €2,890",
    },
    items: {
      northernLights: { title: "Northern Lights Expedition", duration: "5 days", price: "from €1,950" },
      lofotenPhoto: { title: "Lofoten Photo Tour", duration: "6 days", price: "from €2,340" },
      arcticWinter: { title: "Arctic Winter Adventure", duration: "8 days", price: "from €3,120" },
    },
  },
  testimonial: {
    quote: ["The mountains, the silence, the endless beauty —", "Norway changed the way I see the world."],
    name: "Emma Lindqvist",
    initials: "EL",
    trip: "Fjords & Peaks · 7 days",
  },
  finalCta: {
    label: "Your journey",
    title: ["Let’s Explore", "Norway Together"],
    lines: ["Extraordinary places.", "Meaningful journeys.", "Stories for a lifetime."],
    cta: { label: "Plan your trip", href: "#contacts" },
  },
  footer: {
    closing: ["Travel brings", "us closer"],
    legal: (year: number) => `© ${year} Around the World. Norway, slowly.`,
    credits: "Photo credits",
    creditsNote: "All photographs: Wikimedia Commons. Click a name to open the source page.",
    socials: { instagram: "Instagram", youtube: "YouTube", facebook: "Facebook" },
  },
  alt: {
    heroFjords: "Ferry wake on the still water of Nærøyfjord between steep green mountain walls",
    heroLofoten: "Kvalvika beach in Lofoten: a sandy bay with turquoise surf below dark, jagged peaks",
    heroSenja: "The sharp granite fin of Segla rising above the fjords of Senja",
    story: "View from Mt. Hoven down a green valley to the turquoise Lovatnet lake under a bright summer sky",
    testimonial: "",
    cta: "",
    destLofoten: "Red fishermen’s cabins of Reine beneath steep Lofoten peaks",
    destTrolltunga: "A hiker on the Trolltunga rock ledge high above lake Ringedalsvatnet",
    destGeiranger: "Geirangerfjord and the village of Geiranger seen from Flydalsjuvet",
    destTromso: "Green northern lights over snowy mountains near Tromsø",
    tourFjords: "Calm water of Nærøyfjord between tall mountain walls",
    tourNorthernLights: "A swirl of green aurora above birch trees on Ringvassøya",
    tourLofoten: "Kvalvika bay seen from the summit of Ryten in Lofoten",
    tourArctic: "Snow-covered Jiehkkevárri above Lyngenfjord in winter",
  } satisfies Record<ImageId, string>,
};

export type Dictionary = typeof en;
