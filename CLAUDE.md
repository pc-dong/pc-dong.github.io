# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal blog built with [VuePress 2](https://v2.vuepress.vuejs.org/) using the [vuepress-theme-hope](https://theme-hope.vuejs.press/) theme. The blog is bilingual (English/Chinese) and is automatically deployed to GitHub Pages via GitHub Actions.

## Development Commands

```bash
# Install dependencies
npm ci

# Start development server with cache cleared
npm run docs:clean-dev

# Start development server (preserves cache)
npm run docs:dev

# Build for production
npm run docs:build
```

The development server runs on `http://localhost:8080/` by default.

## Project Structure

```
src/
├── .vuepress/
│   ├── config.ts          # VuePress base configuration
│   ├── theme.ts           # Theme configuration ( Hope theme )
│   ├── navbar/            # Navigation bar configuration
│   │   ├── index.ts       # Exports both locales
│   │   ├── en.ts          # English navigation
│   │   └── zh.ts          # Chinese navigation
│   ├── sidebar/           # Sidebar configuration
│   │   ├── index.ts       # Exports both locales
│   │   ├── en.ts          # English sidebar
│   │   └── zh.ts          # Chinese sidebar
│   ├── styles/            # Custom styles
│   │   ├── index.scss     # Main styles
│   │   ├── palette.scss   # Theme color/style overrides
│   │   └── config.scss    # Style configuration
│   └── public/            # Static assets ( favicon, logo, images )
├── posts/                 # Blog posts organized by category
│   ├── ddd/               # Domain-Driven Design posts
│   ├── rsocket/           # RSocket protocol posts
│   └── reactor/           # Reactive Programming posts
├── README.md              # Homepage (English)
├── intro.md               # About/intro page
└── zh/                    # Chinese content (mirrors structure)
```

## Adding New Blog Posts

1. Create a new markdown file in `src/posts/<category>/` directory
2. Add frontmatter with the following fields:

```yaml
---
icon: edit           # Icon identifier from theme
date: YYYY-MM-DD     # Publication date
category:
  - CategoryName     # Category for grouping
tag:
  - tag1            # Tags for search/filtering
  - tag2
---
```

3. Update the sidebar configuration in `src/.vuepress/sidebar/en.ts` (and `zh.ts` for Chinese) to include the new post:

```typescript
{
  text: "Category Name",
  icon: "edit",
  prefix: "category-name/",
  collapsible: true,
  children: "structure",  // Auto-discovers all .md files in the directory
}
```

The `"structure"` value automatically reads all markdown files in the directory and generates the sidebar structure.

4. Optionally add the category to the navbar in `src/.vuepress/navbar/en.ts`:

```typescript
{
  text: "Articles",
  icon: "edit",
  prefix: "/posts/",
  children: [
    {
      text: "Category Name",
      icon: "edit",
      prefix: "category-name/",
      children: [
        { text: "Post Title", icon: "edit", link: "post-file-name" },
      ],
    },
  ],
}
```

## Writing Style

When creating new blog posts, follow the writing style guidelines documented in `WRITESTYLE.md`. This includes:

- **Article structure**: Series numbering, background introduction with quotes, progressive content organization
- **Code style**: Language annotations, Lombok annotations, try-with-resources, complete test cases
- **Visual elements**: Mermaid diagrams for flowcharts/sequence diagrams, images in `./images/` subdirectory
- **Text formatting**: Bold for emphasis, inline code for class/method names, blockquotes for important notes
- **External references**: Proper link formatting for concepts, articles, and GitHub repositories

## Images and Assets

- Store images in `src/posts/<category>/images/` alongside the markdown files
- Reference images relative to the markdown file: `![alt text](./images/filename.png)`
- Global static assets ( logos, favicon ) go in `src/.vuepress/public/`

## Localization

The blog supports two locales:
- `/` - English ( default )
- `/zh/` - Chinese

Each locale has its own navbar and sidebar configuration. When adding content for both languages:
1. English posts go in `src/posts/`
2. Chinese posts go in `src/zh/posts/`
3. Update both `en.ts` and `zh.ts` configurations accordingly

## Deployment

The blog is automatically deployed via GitHub Actions when pushing to the `main` branch:
- Build runs on Node.js 18
- Output is deployed to the `gh-pages` branch
- GitHub Pages serves from the `gh-pages` branch

## Theme Features ( vuepress-theme-hope )

The theme includes many features enabled in `theme.ts`:
- **Blog plugin**: Auto-extracts article excerpts
- **Markdown enhancements**: Charts, flowcharts, mermaid diagrams, math ( KaTeX ), code tabs, demos
- **PWA**: Offline support with app manifest
- **Comment support**: Giscus integration ( currently using theme demo config, should be updated for production )
- **Encryption**: Password protection for specific pages ( configured in `encrypt` option )

## Build Artifacts

The following directories are ignored by Git:
- `node_modules/` - Dependencies
- `src/.vuepress/.cache/` - Build cache
- `src/.vuepress/.temp/` - Temporary build files
- `src/.vuepress/dist/` - Production build output
