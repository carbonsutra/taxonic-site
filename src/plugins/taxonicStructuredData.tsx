import type { ZudokuPlugin } from "zudoku";
import { createElement } from "react";

const taxonicStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://usetaxonic.com/#organization",
      name: "Contactous Pte Ltd",
      url: "https://usetaxonic.com/",
      email: "support@contactous.com",
      brand: {
        "@type": "Brand",
        name: "Taxonic",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "support@contactous.com",
        contactType: "customer support",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://usetaxonic.com/#website",
      url: "https://usetaxonic.com/",
      name: "Taxonic",
      description:
        "Automated Cataloging Engine for Publishers, Libraries, and EdTech.",
      publisher: {
        "@id": "https://usetaxonic.com/#organization",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://usetaxonic.com/#webpage",
      url: "https://usetaxonic.com/",
      name: "Taxonic :: Automated Cataloging Engine for Publishers, Libraries, and EdTech.",
      isPartOf: {
        "@id": "https://usetaxonic.com/#website",
      },
      about: {
        "@id": "https://usetaxonic.com/#software",
      },
      description:
        "Taxonic converts unstructured text such as book titles, academic course names, syllabus excerpts, and digital learning assets into standardized subject codes across publishing and higher education taxonomies.",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://usetaxonic.com/#software",
      name: "Taxonic Classification Engine",
      alternateName: "Taxonic",
      applicationCategory: "BusinessApplication",
      applicationSubCategory:
        "Automated Bibliographic Classification & Metadata Standardization",
      operatingSystem: "Web, Google Sheets, REST API",
      url: "https://usetaxonic.com/",
      documentation: "https://usetaxonic.com/api",
      creator: {
        "@id": "https://usetaxonic.com/#organization",
      },
      description:
        "An automated semantic classification engine that maps unstructured titles, syllabi, and digital learning assets to global standards including Library of Congress Subject Headings (LCSH), THEMA (v1.7), and HECoS (v9.0) via Google Sheets and REST API.",
      featureList: [
        "Automated mapping to Library of Congress Subject Headings (LCSH) and LCC",
        "Automated mapping to Universal Decimal Classification (UDC)",
        "Automated mapping to Book Industry Standards and Communications (BISAC)",
        "Automated mapping to THEMA (v1.7) subject category scheme",
        "Automated mapping to Higher Education Classification of Subjects (HECoS v9.0)",
        "Bulk classification in Google Sheets via =TAXONIC() custom formula",
        "High-speed RESTful API with sub-50ms latency",
        "Structured JSON schema support for autonomous AI agent function calling",
      ],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description:
          "Free trial tier with 200 classification credits available via usetaxonic.com.",
        url: "https://usetaxonic.com/api-playground",
      },
    },
  ],
};

const taxonicStructuredDataPlugin: ZudokuPlugin = {
  getHead: () =>
    createElement(
      "script",
      {
        type: "application/ld+json",
      },
      JSON.stringify(taxonicStructuredData),
    ),
};

export default taxonicStructuredDataPlugin;
