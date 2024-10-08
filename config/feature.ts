import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

import {
  AiOutlineClockCircle,
  AiOutlineEdit,
  AiOutlineShareAlt,
  AiOutlineStar,
  AiOutlineTag,
  AiOutlineUser,
} from "react-icons/ai";

export const FEATURES_EN = [
  {
    title: "AI-Powered Baby Photoshoot",
    content:
      "Generate high-quality baby photos using advanced AI algorithms.",
    icon: AiOutlineTag,
  },
  {
    title: "Affordable Pricing",
    content:
      "Leveraging AI technology to offer more economical photography services compared to traditional studios.",
    icon: AiOutlineEdit,
  },
  {
    title: "User-Friendly Interface",
    content:
      "Easy-to-use platform suitable for both beginners and professionals.",
    icon: AiOutlineUser,
  },
  {
    title: "Fast Generation",
    content: "Produce artwork in seconds, saving you time and effort.",
    icon: AiOutlineClockCircle,
  },
  {
    title: "Community Sharing",
    content:
      "Share your creations with a vibrant community of anime art enthusiasts.",
    icon: AiOutlineShareAlt,
  },
  {
    title: "Free Trial",
    content:
      "Experience our services at no cost with a free trial.",
    icon: AiOutlineStar,
  },
];

export const FEATURES_ZH = [];
export const FEATURES_JA = [];
export const FEATURES_AR = [];
export const FEATURES_ES = [];
export const FEATURES_RU = [];
export const FEATURES_HI = [];

interface FeaturesCollection {
  [key: `FEATURES_${string}`]: {
    title: string;
    content: string;
    icon: IconType | LucideIcon;
  }[];
}

export const ALL_FEATURES: FeaturesCollection = {
  FEATURES_EN,
  FEATURES_ZH,
  FEATURES_JA,
  FEATURES_AR,
  FEATURES_ES,
  FEATURES_RU,
  FEATURES_HI,
};

