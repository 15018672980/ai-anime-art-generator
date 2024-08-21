import { SiteConfig } from "@/types/siteConfig";
import { BsGithub, BsTwitterX } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

const OPEN_SOURCE_URL = "https://github.com/enterwiz/aianimeartgenerator";

const baseSiteConfig = {
  name: "Baby Photoshoot | Create baby photoshoot with the power of AI.",
  description:
    "Create studio-quality baby photoshoots effortlessly with our advanced AI generator.",
  url: "https://babyphotoshoot.com",
  ogImage: "",
  metadataBase: "/",
  keywords: [
    "Baby photoshoot"
  ],
  authors: [
    {
      name: "hanterchen",
      url: "",
      twitter: "",
    },
  ],
  creator: "@hanter",
  openSourceURL: OPEN_SOURCE_URL,
  themeColors: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  nextThemeColor: "light", // next-theme option: system | dark | light
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
  headerLinks: [
    // 注释掉链接，后面有了再加上
    // { name: "repo", href: OPEN_SOURCE_URL, icon: BsGithub },
    // {
    //   name: "twitter",
    //   href: "https://twitter.com/enterwiz",
    //   icon: BsTwitterX,
    // },
  ],
  footerLinks: [
    { name: "email", href: "mailto:enterwizdev@outlook.com", icon: MdEmail },
    {
      name: "twitter",
      href: "https://twitter.com/enterwiz",
      icon: BsTwitterX,
    },
    { name: "github", href: "https://github.com/enterwiz/", icon: BsGithub },
  ],
  footerProducts: [],
};

export const siteConfig: SiteConfig = {
  ...baseSiteConfig,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseSiteConfig.url,
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    siteName: baseSiteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    images: [`${baseSiteConfig.url}/og.png`],
    creator: baseSiteConfig.creator,
  },
};

