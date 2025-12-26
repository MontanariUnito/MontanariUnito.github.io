import { defineConfig, UserConfig } from "vitepress";
import { withSidebar } from "vitepress-sidebar";

const vitePressOptions: UserConfig = {
  title: "Montanari Unito",
  description: "A VitePress Site",
  lastUpdated: true,
  themeConfig: {
    nav: [{ text: "Home", link: "/" }],

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
};

const vitePressSidebarOptions = [
  {
    documentRootPath: "site",
    //scanStartPath: "server",
    //resolvePath: "/server/",
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
