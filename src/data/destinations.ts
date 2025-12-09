import betlaImage from "@/assets/betla-park.jpg";
import deogarImage from "@/assets/deoghar-temple.jpg";
import netarhatImage from "@/assets/netarhat-sunset.jpg";
import rajrappaImage from "@/assets/rajrappa-temple.jpg";

export interface Destination {
  id: string;
  name: string;
  image: string;
  category: string;
  rating: number;
  description: string;
  fullDescription: string;
  location: string;
  bestTimeToVisit: string;
  highlights: string[];
  videos: {
    title: string;
    videoId: string;
    thumbnail?: string;
  }[];
  recommendedVideos: {
    title: string;
    videoId: string;
    destination: string;
  }[];
}

export const destinations: Destination[] = [
  {
    id: "betla-national-park",
    name: "Betla National Park",
    image: betlaImage,
    category: "Wildlife",
    rating: 4.8,
    description: "Experience diverse wildlife including elephants, tigers, and rare birds in pristine forest habitat",
    fullDescription: "Betla National Park is one of the first national parks in India to become a tiger reserve under Project Tiger. Spread across 1135 sq km, it is home to a rich variety of flora and fauna including elephants, tigers, leopards, sambars, and over 150 species of birds. The park features beautiful waterfalls, hot springs, and ancient tribal forts.",
    location: "Latehar District, Jharkhand",
    bestTimeToVisit: "November to March",
    highlights: [
      "Tiger Safari and Wildlife Spotting",
      "Elephant Rides through the Forest",
      "Ancient Palamu Fort",
      "Hot Springs at Betla",
      "Bird Watching (150+ species)"
    ],
    videos: [
      { title: "Betla National Park Safari Experience", videoId: "9bZkp7q19f0" },
      { title: "Wildlife of Betla - Documentary", videoId: "kJQP7kiw5Fk" },
      { title: "Exploring Palamu Tiger Reserve", videoId: "JGwWNGJdvx8" }
    ],
    recommendedVideos: [
      { title: "Deoghar Temple Visit Guide", videoId: "RgKAFK5djSk", destination: "Baidyanath Temple" },
      { title: "Netarhat Sunrise Views", videoId: "CevxZvSJLk8", destination: "Netarhat" }
    ]
  },
  {
    id: "baidyanath-temple-deoghar",
    name: "Baidyanath Temple, Deoghar",
    image: deogarImage,
    category: "Spiritual",
    rating: 4.9,
    description: "Ancient Jyotirlinga temple with rich spiritual heritage and stunning architecture",
    fullDescription: "Baidyanath Dham is one of the twelve Jyotirlingas, the most sacred abodes of Lord Shiva. This ancient temple complex houses 21 other temples and attracts millions of devotees annually, especially during Shravan month. The temple's architecture reflects centuries of devotion and artistry, making it a significant pilgrimage and cultural heritage site.",
    location: "Deoghar, Jharkhand",
    bestTimeToVisit: "July to August (Shravan) and October to March",
    highlights: [
      "Main Jyotirlinga Temple",
      "Complex of 21 Temples",
      "Shravan Mela Festival",
      "Nandan Pahar View Point",
      "Trikut Parvat Nearby"
    ],
    videos: [
      { title: "Baidyanath Dham Complete Tour", videoId: "60ItHLz5WEA" },
      { title: "Shravan Mela at Deoghar", videoId: "fRh_vgS2dFE" },
      { title: "History of Baidyanath Temple", videoId: "papuvlVeZg8" }
    ],
    recommendedVideos: [
      { title: "Rajrappa Temple Darshan", videoId: "kXYiU_JCYtU", destination: "Rajrappa Mandir" },
      { title: "Parasnath Hill Trek", videoId: "QFs3PIZb3js", destination: "Parasnath" }
    ]
  },
  {
    id: "netarhat",
    name: "Netarhat",
    image: netarhatImage,
    category: "Hill Station",
    rating: 4.7,
    description: "Watch breathtaking sunsets from the 'Queen of Chotanagpur' with panoramic valley views",
    fullDescription: "Known as the 'Queen of Chotanagpur', Netarhat is a pristine hill station at an altitude of 3700 feet. Famous for its spectacular sunrises and sunsets, the town offers stunning views of the Chotanagpur plateau. The Netarhat Residential School, established in 1954, adds to its charm. The surrounding forests are home to diverse wildlife and offer excellent trekking opportunities.",
    location: "Latehar District, Jharkhand",
    bestTimeToVisit: "October to March",
    highlights: [
      "Magnolia Point Sunset",
      "Upper Ghagri Falls",
      "Lower Ghagri Falls",
      "Netarhat Residential School",
      "Pine and Sal Forests"
    ],
    videos: [
      { title: "Netarhat Sunset Point Experience", videoId: "3JZ_D3ELwOQ" },
      { title: "Complete Netarhat Travel Guide", videoId: "PT2_F-1esPk" },
      { title: "Trekking in Netarhat Hills", videoId: "09R8_2nJtjg" }
    ],
    recommendedVideos: [
      { title: "Hundru Falls Adventure", videoId: "hT_nvWreIhg", destination: "Hundru Falls" },
      { title: "Betla Wildlife Safari", videoId: "DyDfgMOUjCI", destination: "Betla National Park" }
    ]
  },
  {
    id: "rajrappa-mandir-ramgarh",
    name: "Rajrappa Mandir, Ramgarh",
    image: rajrappaImage,
    category: "Spiritual",
    rating: 4.8,
    description: "Sacred temple of Goddess Chinnamasta at the confluence of Damodar and Bhairavi rivers in Ramgarh",
    fullDescription: "Rajrappa Temple is dedicated to Goddess Chinnamasta, one of the ten Mahavidyas. Located at the sacred confluence of rivers Damodar and Bhairavi, this temple is a significant Shakti Peeth. The stunning natural beauty of the waterfall and the spiritual atmosphere make it a unique destination combining pilgrimage with natural splendor.",
    location: "Ramgarh District, Jharkhand",
    bestTimeToVisit: "October to March and during Durga Puja",
    highlights: [
      "Chinnamasta Temple",
      "Damodar-Bhairavi Confluence",
      "Rajrappa Waterfall",
      "Scenic River Views",
      "Durga Puja Celebrations"
    ],
    videos: [
      { title: "Rajrappa Temple Complete Darshan", videoId: "2Vv-BfVoq4g" },
      { title: "Rajrappa Falls and Temple Tour", videoId: "pRpeEdMmmQ0" },
      { title: "Spiritual Journey to Rajrappa", videoId: "JRfuAukYTKg" }
    ],
    recommendedVideos: [
      { title: "Deoghar Baidyanath Dham", videoId: "Zi_XLOBDo_Y", destination: "Baidyanath Temple" },
      { title: "Patratu Valley Drive", videoId: "fJ9rUzIMcZQ", destination: "Patratu Valley" }
    ]
  }
];

export const getDestinationById = (id: string): Destination | undefined => {
  return destinations.find(d => d.id === id);
};
