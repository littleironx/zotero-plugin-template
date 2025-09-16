# Row Height Doubler

Double the visual height of items displayed in the Zotero library without touching
business logic. The add-on injects a scoped stylesheet into the main Zotero
window so that every row in the virtualized item table renders at roughly twice
the default height while keeping icons, checkboxes, and selection states aligned.

## Development Setup

1. Install the recommended Node.js LTS release and run `npm install` in the
   repository root to fetch dependencies.
2. Duplicate `.env.example` to `.env` (the file stays local and is ignored by
   git). Edit the copy so that:
   - `ZOTERO_APP` points to your Zotero executable. On macOS this is typically
     either `/Applications/Zotero.app/Contents/MacOS/zotero` or
     `/Applications/Zotero Beta.app/Contents/MacOS/zotero`.
   - `ZOTERO_PROFILE_DIR` points to a dedicated development profile directory,
     e.g. `~/Library/Application Support/Zotero/Profiles/rowheight-dev`.

Creating a separate profile keeps production data untouched while you iterate.
If the folder does not exist yet, start Zotero once with
`/Applications/Zotero.app/Contents/MacOS/zotero -p` and create a new profile,
then reference its path in `.env`.

## Running the Plugin in Development

Use the template's hot-reload workflow:

```bash
npm start
```

The command bundles the add-on, launches Zotero with the paths from `.env`, and
watches the `src` and `addon` folders. Editing the stylesheet or TypeScript
modules triggers an automatic rebuild and live reload inside Zotero.

With the add-on enabled you should see the main items list render each entry at
about twice the stock row height. Disable or remove the add-on to revert to the
original spacing immediately.

## Building for Distribution

Create a production bundle at any time with:

```bash
npm run build
```

The compiled extension and accompanying assets will be written to the `build/`
directory.

## License

AGPL-3.0-or-later. See [LICENSE](LICENSE) for details.
