import type { ZudokuConfig } from "zudoku";
import LandingPage from "./src/components/LandingPage";
import ApiPlayground from "./src/components/ApiPlayground";
import googleAnalyticsPlugin from "./src/plugins/googleAnalytics";
import Onboarding from "./src/components/Onboarding";
import Footer from "./src/components/Footer";

const config: ZudokuConfig = {
  // plugins: [googleAnalyticsPlugin],

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
    title: "Carbon Emission Estimation API and Calculators for Organizations",
    description:
      "Carbon footprint estimation for business travel, global hotel stays, vehicles usage, freight, eCommerce, shipments, fuel and electricity with supplementary APIs on airports and clustering results.",
    favicon: "images/taxonic-favicon.ico",
    applicationName: "CarbonSutra Carbon Emission Estimation API",
    keywords: [
      "api",
      "climate",
      "carbon",
      "emission",
      "footprint",
      "estimation",
      "accounting",
      "SEFR",
      "travel",
      "hotel",
      "electricity",
      "vehicles",
      "ecommerce",
      "fuel",
      "freight",
      "shipment",
      "airports",
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
      type: "custom-page",
      path: "/",
      element: <LandingPage />,
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
      type: "link",
      label: "Reference",
      to: "/api",
    },

    {
      type: "link",
      label: "Trial",
      to: "/api-playground",
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
