# Layer Metadata Configuration Guide

This guide documents how to add, update, and delete layer metadata files used by the app. Each layer’s metadata is defined per language at configs/metadata/{layerName}/{lang}/index.ts. The layer details modal is built directly from these files; the content array is rendered in order (top-to-bottom), so insertion position determines display order.

## Directory Structure

Example for the tree-cover layer (all languages must exist and stay in sync):

```text
configs/
  metadata/
    tree-cover/
      az/
        index.ts
      en/
        index.ts
      es/
        index.ts
      fr/
        index.ts
      hy/
        index.ts
      id/
        index.ts
      ka/
        index.ts
      nl/
        index.ts
      pt/
        index.ts
      zh/
        index.ts
```

Keep languages in sync: for every change to a layer’s metadata, update all language files to have the same set of labels and the same order. Translations can be filled with English temporarily, but must be tracked and translated.

## Data Schema (TypeScript)

Use the following interfaces as the canonical schema. Optional fields are marked with ?, and empty strings are allowed (but discouraged—prefer to omit optional fields if not applicable).

```ts
export interface MetadataEntry {
  label: string;
  value: string;
}
export interface MetadataBlock {
  label: string;
  value: string;
}
export interface LayerMetadata {
  title: string;
  subtitle?: string;
  download_data?: string;
  learn_more?: string;
  content: MetadataEntry[];
  overview?: MetadataBlock;
  citation?: MetadataBlock;
}
```

Notes

- content renders in array order.
- Prefer https links and verify they resolve.
- Use \n\n for paragraph breaks in long values.

## Supported Languages

az, en, es, fr, hy, id, ka, nl, pt, zh

PRs must update all languages, even if using a temporary English fallback value. Clearly mark temporary fallbacks with a TODO and follow up with translations.

## Add / Update / Delete Operations

### Add a new key/value item to the modal

Insertion order matters—items render top-to-bottom.

```ts
content: [
  { label: 'Function', value: 'Identifies areas of tree cover' },
  { label: 'Resolution', value: '30 × 30 meters' },
  { label: 'New Label', value: 'New Value' }, // <-- newly inserted
  // ...existing entries continue
];
```

Perform the same insertion across all languages in the same position.

### Update an existing item

Find by label and edit value. Keep labels consistent across languages (translated appropriately, same set/order).

```ts
// Before
{ label: 'License', value: 'CC BY 3.0' }

// After
{ label: 'License', value: 'CC BY 4.0' }
```

### Delete an item

Remove the object from content. Delete the same item across all languages to maintain parity.

```ts
// Remove the entire object matching the label you want to delete
// e.g., remove { label: 'Frequency', value: '...' }
```

### Update overview / citation blocks (multiline and escaping)

Use paragraph breaks (\n\n) and escape quotes where needed.

```ts
overview: {
  label: 'Overview',
  value:
    'This dataset is a collaboration between organizations.\n\n' +
    'It provides global coverage for 2000 & 2010 and is updated periodically.'
},

citation: {
  label: 'Citation',
  value:
    'Use the following credit: "Hansen, M. C., et al. (2013) …" ' +
    'Data available at: https://glad.umd.edu/dataset/global-2010-tree-cover-30-m.'
}
```

Safe links

- Prefer https URLs.
- Verify that URLs resolve and are not behind authentication unless intended.
- Avoid adding tracking parameters unless required.

## Creating a New Layer’s Metadata

Steps

1. Create configs/metadata/{layerName}/{lang}/index.ts for each supported language.
2. Start from the English version; duplicate to other languages.
3. Translate title, subtitle, and values appropriately.
4. Ensure the same set and order of labels across all languages.

Minimal starter template

```ts
// configs/metadata/{layerName}/en/index.ts
// If you have a shared types location, import types; otherwise rely on structural typing.
// import type { LayerMetadata } from 'path/to/types';

const metadata /* : LayerMetadata */ = {
  title: '{Human Title}',
  subtitle: '',
  download_data: '',
  learn_more: '',
  content: [
    { label: 'Function', value: '' },
    { label: 'Resolution', value: '' },
    { label: 'Geographic coverage', value: '' },
    { label: 'Source', value: '' },
    { label: 'Frequency', value: '' },
    { label: 'Date of content', value: '' },
    { label: 'Cautions', value: '' },
    { label: 'License', value: '' },
  ],
  overview: { label: 'Overview', value: '' },
  citation: { label: 'Citation', value: '' },
};

export default metadata;
```

Brief Spanish example (showing translation differences)

```ts
// configs/metadata/tree-cover/es/index.ts
const metadata = {
  title: 'Cobertura arbórea',
  subtitle: '2000/2010, Hansen/UMD/Google/USGS/NASA',
  content: [
    { label: 'Función', value: 'Identifica áreas de cobertura arbórea' },
    { label: 'Resolución', value: '30 × 30 metros' },
    // … keep the same set and order as English
  ],
  overview: { label: 'Descripción general', value: '' },
  citation: { label: 'Cita', value: '' },
};
export default metadata;
```

## Ordering & UX Notes

- The order of entries in content defines the display order in the modal.
- Recommended grouping/order: Function → Resolution → Geographic coverage → Source → Frequency → Date of content → Cautions → License.
- Keep labels concise; use overview for long narrative text.

## Validation & QA Checklist

- [ ] All 10 language files exist for the layer and the project builds successfully.
- [ ] No missing required fields (title, content).
- [ ] Labels are consistent across languages (same set and order; translated appropriately).
- [ ] Links are valid and use https where possible.
- [ ] Long text uses line breaks (\n\n) rather than irregular spacing.

## Local Testing

- Start the local dev server and open the app:
  - Install dependencies: npm install
  - Run: npm start
  - Open the URL printed by the dev server (default http://localhost:8080)
- In the UI, navigate to the layer, open its information/metadata modal (e.g., via the layer’s info icon or legend/info panel) and verify:
  - Order of content matches your file order.
  - Translations render correctly when switching languages.
  - Links open and resolve over https.

No feature flags are typically required to view metadata; ensure the layer is enabled/visible in configuration if needed.

## Common Pitfalls

- Forgetting to update all languages, causing parity drift.
- Changing a label in one language only (e.g., singular vs plural), resulting in inconsistent sets.
- Adding/removing an item in one language but not the others.
- Pasting URLs without protocol or with tracking parameters that violate guidelines.
- Using irregular whitespace instead of \n\n for paragraph breaks.

## Appendix: Full Example (commented)

```ts
// configs/metadata/tree-cover/en/index.ts
// Example with multiline overview/citation and escaped quotes.

const metadata /* : LayerMetadata */ = {
  title: 'Tree cover',
  subtitle: '2000/2010, Hansen/UMD/Google/USGS/NASA',
  download_data: 'https://glad.umd.edu/dataset/global-2010-tree-cover-30-m',
  learn_more: 'https://science.sciencemag.org/content/342/6160/850',
  content: [
    { label: 'Function', value: 'Identifies areas of tree cover' },
    { label: 'Resolution', value: '30 × 30 meters' },
    { label: 'Geographic coverage', value: 'Global land (excluding Antarctica and Arctic islands)' },
    {
      label: 'Source',
      value:
        'Hansen, M. C., et al. (2013). Data available from: ' +
        'https://glad.umd.edu/dataset/global-2010-tree-cover-30-m.',
    },
    { label: 'Frequency', value: '' },
    { label: 'Date of content', value: '2000 & 2010' },
    {
      label: 'Cautions',
      value:
        'For the purpose of this study, “tree cover” is defined consistently across biomes.\n\n' +
        'Users should consider local context and limitations of the sensor.',
    },
    { label: 'License', value: 'CC BY 4.0' },
  ],
  overview: {
    label: 'Overview',
    value:
      'This data set, a collaboration between multiple institutions, provides a global map of tree cover.\n\n' +
      'Values are derived from satellite observations and processed using a consistent methodology.',
  },
  citation: {
    label: 'Citation',
    value:
      'Use the following credit when these data are displayed: "Hansen, M. C., et al. (2013)."\n\n' +
      'Include a link to the data source where possible.',
  },
};

export default metadata;
```
