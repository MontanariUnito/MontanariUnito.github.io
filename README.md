# MontanariUnito

Sito scolastico realizzato con **VitePress**.

## Setup

### Prerequisiti

- Account GitHub
- Git installato
- Node.js installato
- VS Code

### 1) Clonare la repository

Puoi clonare da terminale:

```bash
git clone https://github.com/MontanariUnito/MontanariUnito.github.io.git
cd MontanariUnito.github.io
```

Oppure da VS Code (Source Control -> Clone Repository), se preferisci lavorare da interfaccia grafica.

### 2) Installare dipendenze

```bash
npm ci
```

### 3) Avviare il sito in locale

```bash
npm run site:dev
```

Apri poi `http://localhost:5173` nel browser.

Per fermare il server: `Ctrl + C`.

## Struttura del progetto

Se devi solo scrivere contenuti, quasi tutto quello che ti serve è in `site/`:

```text
site/
  index.md
  news/
  giornalino/
  podcast/
  public/
  .vitepress/
```

- `site/news`, `site/giornalino`, `site/podcast`: pagine delle 3 sezioni.
- `site/public`: file statici (immagini, audio, ecc.).
- `site/.vitepress`: configurazione e tema VitePress.

Nota: se lavori solo sugli articoli, in genere **non serve** modificare `site/.vitepress`.

## Come funziona il routing

VitePress usa il file-based routing:

- `site/ciao.md` -> `/ciao`
- `site/cartella/file.md` -> `/cartella/file`
- `site/index.md` -> `/`
- `site/news/index.md` -> `/news/`

## Lavorare con Markdown

Ogni pagina è un file `.md`.

Riferimenti utili:

- Sintassi base: https://markdowncheatsheet.com/reference/basic-syntax
- Sintassi estesa: https://markdowncheatsheet.com/reference/extended-syntax
- Markdown in VitePress: https://vitepress.dev/guide/markdown

### Frontmatter

All'inizio dei file puoi trovare un blocco YAML tra `---` e `---`:

```md
---
layout: home
hero:
  name: "Titolo"
---
```

Per le home esistenti (`index.md` principali), non modificarlo se non sai esattamente cosa stai cambiando.

## Immagini e file multimediali

`site/public` è servita alla radice del sito.

Esempio:

- file reale: `site/public/assets/logo.jpeg`
- URL da usare nei Markdown/componenti: `/assets/logo.jpeg`

Organizzazione consigliata:

- `site/public/assets` -> risorse comuni
- `site/public/news` -> immagini dei post News
- `site/public/giornalino` -> immagini del Giornalino
- `site/public/podcast` -> file audio podcast

Convenzioni nome file:

- usa minuscole
- evita spazi e caratteri speciali
- preferisci trattini: `foto-classe-3a.jpg`

## Creare un post News/Giornalino

1. Crea un file Markdown in:
   - `site/news/` oppure
   - `site/giornalino/`
2. Usa un nome coerente, per esempio `YYYY-MM-DD.md`.
3. Aggiungi frontmatter e contenuto.

Template consigliato:

```md
# Scoop incredibile

[[toc]]

<Image src="/giornalino/2026-01-13/programmer-having-a-wash.png" alt="Programmatore sotto la doccia" />

> Giornalisti scoprono un progammatore a farsi una doccia.
```

Puoi usare anche immagini Markdown standard:

```md
![Descrizione](/news/2026-01-13/foto-evento.jpg)
```

`<Image>` permette di essere aperto a schermo intero se cliccato.

## Creare un post Podcast

1. Carica l'audio in `site/public/podcast/` (es. `2026-01-13.mp3`).
2. Crea il file articolo in `site/podcast/` (es. `2026-01-13.md`).
3. Inserisci il player nel Markdown con il componente `Player`.

Template consigliato:

```md
# Catturato suono di una lepre volante

<Player src="/podcast/2026-01-13.mp3" />

Benvenuti al podcast di oggi.
```

## Componenti personalizzati

### `Player`

Uso base:

```md
<Player src="/podcast/nome-file.mp3" />
```

### `Image`

Uso base:

```md
<Image src="/news/foto.jpg" alt="Descrizione foto" />
```

- mostra un'immagine inline cliccabile
- al click apre un overlay fullscreen
- chiusura con click sullo sfondo, bottone `X` o tasto `Esc`

## Controllo locale prima del push

Per verificare build produzione:

```bash
npm run site:build
npm run site:preview
```

## Pubblicazione

### Flusso tipico (VS Code)

1. Apri Source Control (`Ctrl+Shift+G`).
2. Metti in stage i file modificati (`+`).
3. Scrivi un messaggio commit chiaro (es. `Aggiunge podcast 2026-01-13`).
4. Esegui `Commit`.
5. Esegui `Push`.

### Flusso da terminale

```bash
git add .
git commit -m "Aggiunge podcast 2026-01-13"
git push origin master
```

Il deploy su GitHub Pages parte automaticamente dopo il push su `master`.

## Troubleshooting

- Se `npm ci` fallisce: controlla versione Node e riprova.
- Se `localhost:5173` non risponde: verifica che `npm run site:dev` sia ancora attivo nel terminale.
- Se il deploy GitHub Actions fallisce con errore sul comando `docs:build`: aggiornare il workflow su `npm run site:build`.
