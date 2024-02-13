import { Diphylleia, Quicksand } from "next/font/google";

const titleFont = Diphylleia({
  weight: "400",
  subsets: ["latin"],
  adjustFontFallback: false,
});

const bodyFont = Quicksand({
    weight: "400",
    subsets: ["latin"],
    adjustFontFallback: false,
});

export const siteConfig = {
  name: "DSync",
  description: "Seamless syncing, effortless storage.",
  headingFont: titleFont,
  bodyFont: bodyFont,
  url: "/",
}