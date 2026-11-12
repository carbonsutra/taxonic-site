import type { ZudokuConfig } from "zudoku";
import ApiPlayground from "./src/components/ApiPlayground";
import googleAnalyticsPlugin from "./src/plugins/googleAnalytics";
import Onboarding from "./src/components/Onboarding";
import Footer from "./src/components/Footer";

const config: ZudokuConfig = {
  plugins: [googleAnalyticsPlugin],

  header: {
    themeSwitcher: {
      enabled: false,
    },
  },
  mdx: {
    components: {
      ApiPlayground,
      Onboarding,
      Footer,
    },
  },
  metadata: {
    title:
      "Taxonic ::  Automated Cataloging Engine for Publishers, Libraries, and EdTech.",
    description:
      "High-throughput classification engine for publishers, libraries, and EdTech. Standardize unstructured content to THEMA, HECoS, and LCSH.",
    favicon: "images/taxonic-favicon.ico",
    applicationName: "Classification Engine for Books & Educational Assets",
    keywords: [
      "Automated bibliographic classification",
      "THEMA subject code generator",
      "LCSH auto-cataloging software",
      "HECoS subject mapping API",
      "Book metadata enrichment tool",
      "AI library cataloging engine",
      "Google Sheets classification formula",
      "Bulk ONIX metadata standardization",
      "Academic syllabus classification API",
      "Semantic metadata tagging engine",
      "Publisher backlist categorization tool",
      "Automated subject indexing",
      "DDC number building automation",
      "Dewey",
      "Library of Congress",
      "Metadata enrichment for EdTech",
    ],
    creator: "Manish Sharma",
  },
  canonicalUrlOrigin: "https://usetaxonic.com",

  sitemap: {
    siteUrl: "https://usetaxonic.com",
  },
  site: {
    logo: {
      src: {
        light: "/images/taxonic-logo.jpeg",
        dark: "/images/taxonic-logo.jpeg",
      },
      alt: "Taxonic Classification Engine",
      width: "120px",
    },
    showPoweredBy: false,
  },

  docs: {
    defaultOptions: {
      toc: false,
      fullWidth: true,
      copyPage: false,
    },
  },

  navigation: [
    {
      type: "doc",
      path: "/",
      file: "home",
      display: "hide",
    },

    /***
    {
   
      type: "category",
      label: "Documentation",
      link: "/audience-and-intent",
      collapsible: false,
      items: [
        {
          type: "doc",
          path: "/audience-and-intent",
          file: "pages/audience-and-intent",
          label: "Audience",
        },
        {
          type: "doc",
          path: "/standards",
          file: "pages/standards",
          label: "Standards",
        },
        {
          type: "doc",
          path: "/spreadsheets",
          file: "pages/spreadsheets",
          label: "Spreadsheets",
        },
        {
          type: "doc",
          path: "/custom-classifications",
          file: "pages/custom-classifications",
          label: "Custom Classifications",
        },
        {
          type: "doc",
          path: "pricing",
          file: "pages/pricing",
          label: "Pricing",
        },
      ],
    },
    ***/
    {
      type: "doc",
      path: "/demo",
      file: "pages/demo",
      label: "Demo",
    },

    {
      type: "link",
      label: "Trial",
      to: "/api-playground",
    },

    {
      type: "link",
      label: "Reference",
      to: "/api",
    },

    {
      type: "doc",
      path: "/faq",
      file: "pages/faq",
      label: "FAQ",
    },
  ],

  apis: [
    {
      type: "file",
      input: "./apis/taxonic.yaml",
      path: "/api",
    },
  ],
};

export default config;
