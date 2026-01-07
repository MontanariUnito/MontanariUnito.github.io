import path from "path";
import { writeFileSync } from "fs";
import { Feed } from "feed";
import {
  defineConfig,
  SiteConfig,
  UserConfig,
  createContentLoader,
} from "vitepress";
import { withSidebar } from "vitepress-sidebar";

const hostname: string = "https://MontanariUnito.github.io";

const vitePressOptions: UserConfig = {
  title: "Montanari Unito",
  description: "A VitePress Site",
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "News", link: "/news" },
      { text: "Giornalino", link: "/giornalino" },
      { text: "Podcast", link: "/podcast" },
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/MontanariUnito/MontanariUnito.github.io",
      },
    ],

    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "Cerca",
                buttonAriaLabel: "Cerca",
              },
              modal: {
                displayDetails: "Mostra dettagli",
                resetButtonTitle: "Resetta",
                backButtonTitle: "Indietro",
                noResultsText: "Nessun risultato per",
                footer: {
                  selectText: "per selezionare",
                  selectKeyAriaLabel: "invio",
                  navigateText: "per navigare",
                  navigateUpKeyAriaLabel: "su",
                  navigateDownKeyAriaLabel: "giù",
                  closeText: "per chiudere",
                  closeKeyAriaLabel: "esc",
                },
              },
            },
          },
        },
      },
    },

    lastUpdated: { text: "Ultimo aggiornamento" },

    outline: {
      label: "In questa pagina",
    },

    docFooter: {
      prev: "Pagina precedente",
      next: "Pagina successiva",
    },

    darkModeSwitchLabel: "Tema",
    darkModeSwitchTitle: "Cambia in tema scuro",
    lightModeSwitchTitle: "Cambia in tema chiaro",
    returnToTopLabel: "Torna all'inizio",
    skipToContent: "Vai al contenuto",
  },

  buildEnd: async (config: SiteConfig) => {
    for (const section of [
      {
        title: "Montanari News",
        description: "...",
        path: "news",
      },
      {
        title: "Giornalino Montanari",
        description: "...",
        path: "giornalino",
      },
      {
        title: "Montanari Podcast",
        description: "...",
        path: "podcast",
      },
    ]) {
      const feed = new Feed({
        title: section.title,
        description: section.description,
        id: hostname,
        link: hostname,
        language: "en",
        image: "/logo.jpeg",
        favicon: `/favicon.ico`,
        copyright: "",
      });

      let posts = await createContentLoader(`${section.path}/*.md`, {
        excerpt: true,
        render: true,
      }).load();

      posts = posts.filter((post) => post.url.endsWith("html"));

      posts.sort(
        (a, b) =>
          +new Date(b.frontmatter.date as string) -
          +new Date(a.frontmatter.date as string),
      );

      for (const { url, excerpt, frontmatter, html } of posts) {
        feed.addItem({
          title: frontmatter.title,
          id: `${hostname}${url}`,
          link: `${hostname}${url}`,
          description: excerpt,
          content: html,
          author: [
            {
              name: "Malasaur",
              email: "malasaur@tuta.io",
              link: "https://codeberg.org/Malasaur",
            },
          ],
          date: frontmatter.date,
        });
      }

      writeFileSync(
        path.join(config.outDir, section.path, "rss.xml"),
        feed.rss2(),
      );
    }
  },
};

const vitePressSidebarOptions = [
  {
    documentRootPath: "site",
    scanStartPath: "giornalino",
    resolvePath: "/giornalino/",
    useTitleFromFrontmatter: true,
    useTitleFromFileHeading: true,
    collapsed: true,
    useFolderTitleFromIndexFile: true,
    useFolderLinkFromIndexFile: true,
    sortMenusByFrontmatterOrder: true,
  },
  {
    documentRootPath: "site",
    scanStartPath: "news",
    resolvePath: "/news/",
    useTitleFromFrontmatter: true,
    useTitleFromFileHeading: true,
    collapsed: true,
    useFolderTitleFromIndexFile: true,
    useFolderLinkFromIndexFile: true,
    sortMenusByFrontmatterOrder: true,
  },
  {
    documentRootPath: "site",
    scanStartPath: "podcast",
    resolvePath: "/podcast/",
    useTitleFromFrontmatter: true,
    useTitleFromFileHeading: true,
    collapsed: true,
    useFolderTitleFromIndexFile: true,
    useFolderLinkFromIndexFile: true,
    sortMenusByFrontmatterOrder: true,
  },
];

export default defineConfig(
  withSidebar(vitePressOptions, vitePressSidebarOptions),
);
