# Layer Configuration Guide

This guide explains how to add, update, and register layers in the application. Every layer must be defined at `configs/layers/{layerName}/index.ts`, associated to a group defined in `configs/resources.js`, and registered in `configs/layers/layers-content-config.ts` so it appears in the UI.

## 1) Directory Structure

A typical layout for a single layer (example: `tree-cover`):

```
configs/
  layers/
    tree-cover/
      index.ts              # Layer config (default export)
    layers-content-config.ts # Registry that aggregates all layer configs
  resources.js               # Group definitions (e.g., GROUP_LC)
```

- `configs/resources.js`: declares layer groups (e.g., `GROUP_LC` for Land Cover).
- `configs/layers/layers-content-config.ts`: final registry that imports and exports all layer configs.

## 2) Data Schema (TypeScript)

Use the following interfaces as a reference for layer config shape:

```ts
export interface DataLayer {
  id: string;
  order: number;
  type: 'remoteDataLayer';
  uuid: string;
  groupId: string; // must match a group key in configs/resources.js
}

export interface LayerConfig {
  order: number;
  layerGroupId: string; // must match a group key in configs/resources.js
  dataLayer: DataLayer;
  layer: {
    metadata: {
      metadata: null | object;
      legendConfig: {
        name: Record<string, string>; // translations
        type: string;
        items: Array<{
          outlineColor: string;
          color: string;
          name: Record<string, string>; // translations
        }>;
      };
      interactionConfig: object;
    };
    id: string; // must match dataLayer.id
    type: string; // usually matches the layer folder name
    url: string; // tile or data endpoint
    technicalName: string; // internal/system-readable name
    opacity: number; // 0..1
    label: Record<string, string>; // translations
    sublabel: Record<string, string>; // translations
  };
  isMetadataError: boolean;
  isError: boolean;
}
```

## 3) Steps to Add a New Layer

1. Create the config file at `configs/layers/{layerName}/index.ts`.

   - Provide all required fields (`order`, `layerGroupId`, `dataLayer.groupId`, etc.).
   - Ensure `id` is globally unique and consistent across `dataLayer.id` and `layer.id`.
   - Set `dataLayer.type` to `'remoteDataLayer'` (unless otherwise specified by the platform).
   - Generate a new UUID (any UUID v4 generator is fine).
   - Add translations for `legendConfig.name`, `label`, and `sublabel`. If translations aren’t ready for all languages, use the English value across them.
   - Keep `layer.type` aligned with the layer folder name when possible (e.g., `type: 'tree-cover'`).

2. Add the layer to its group in `configs/resources.js` (must match `dataLayer.groupId` and `layerGroupId`). Example:

```js
GROUP_LC: {
  groupType: 'default',
  order: 3,
  label: { en: 'Land Cover' /* ...other translations... */ },
  layers: [
    {
      id: 'TREE_COVER',
      order: 4,
      type: 'remoteDataLayer',
      uuid: '2569adca-ef87-42c4-a153-57c5e8ba0ef7',
    },
    // other layers
  ],
}
```

3. Register the layer in `configs/layers/layers-content-config.ts`:

```ts
import newLayerName from './new-layer-path';

export const layersContentConfig = [
  // ...existing layers
  newLayerName,
] as IMBLayer[];
```

4. (Optional) Add metadata following `METADATA_CONFIGURATION.md` and ensure `metadata` fields are wired.

## 4) Ordering & Display Notes

- `order` controls stacking and listing order within a group and in the UI modal.
- `opacity` controls the layer’s transparency (0 = fully transparent, 1 = fully opaque).
- `label` and `sublabel` appear in the UI; always provide translations or fall back to English.
- `legendConfig.items` drives legend swatches; verify colors, outline, and labels match the data.

## 5) QA Checklist

- Unique `id` and `uuid` used; `dataLayer.id` === `layer.id`.
- `layerGroupId` and `dataLayer.groupId` match an existing group in `configs/resources.js`.
- Group updated in `configs/resources.js` (layer entry present under the correct group).
- Layer imported and appended in `configs/layers/layers-content-config.ts`.
- Translations added (fallback to English where translations aren’t available).
- `url` tested and accessible (tiles/data load in the network panel).
- Legend items render with correct colors and labels.
- Metadata linked if available (per `METADATA_CONFIGURATION.md`).

## 6) Local Testing

- Start the app locally and navigate to the UI where layers can be toggled.
- Toggle the new layer on/off and verify:
  - It appears under the expected group with correct `order`.
  - Legend renders with correct labels and colors.
  - Opacity behaves as configured.
  - Translations show as expected (or English fallback).
- Watch the console and terminal output for missing imports, typos in paths, or schema errors.

## 7) Common Pitfalls

- Mismatch between `dataLayer.id`, `layer.id`, and the layer entry in `resources.js`.
- Forgetting to add the layer to `configs/resources.js`.
- Forgetting to import the layer in `configs/layers/layers-content-config.ts`.
- Reusing a UUID from another layer.
- Missing translations causing unexpected UI fallbacks.
- Setting `groupId` or `layerGroupId` to a non-existent group key.

## 8) Version Control & PR Requirements

A PR that adds or updates a layer should include:

- New/updated config file under `configs/layers/{layerName}/index.ts`.
- `configs/resources.js` updated with the layer under the correct group.
- `configs/layers/layers-content-config.ts` updated to register the layer.
- Screenshots of the layer visible in the app (layer toggle, legend, and map view if applicable).
- Use the same checklist style as in `METADATA_CONFIGURATION.md`.

---

With these steps, your layer should be properly defined, grouped, registered, and visible in the application UI.
