Layer configuration is now located at`configs/layers/*`

To Update layer config:

- For consistency folder name is the same as layer name.
- To update layer configuration navigate to the `configs/layers/` and open the index.ts file
- If I were to update ** Glad Alerts ** layer label for example, navigate to `configs/layers/glad-alerts/index.ts`

To Add a new layer config:

- Create a folder inside layers folder, make sure folder name matches the layer name for consistency.
- Once folder created, create an `index.ts` file and add your new layer configuration.
- If you are not sure about the expected schema, you can also reference any of the other layers OR
  there is also a a schema example of what is expected in `configs/layers/types/index.ts` that you can also reference.

- Once new config layer is created, you need to import your new layer configuration to `configs/layers/layers-content-config.ts`.
- import your new layer configuration from here, for example:
  `import newLayerConfig from './new-layer-config'`
- Lastly, add your imported layer configuration to `layersContentConfig` list

// notes
Questions:

-

Using default utility print service for non profits organizations:
With the default utility service we have access to the properties below:

```
title ,author ,copyright,scaleEnabled,dpi

```

You cannot add your own logos to the default utility service.

Things to keep in mind for free utility print service:

- usage
  - I don't think we expect high usage of the print functionality on Mapbuilder but esri may limit free utilities services.
- We don't curently have any secured/private layers but it is also recommented to have a custom print service if we ever had those.

Custom print service

- we would not have any of this limiations but it will required a new hosted print service

Custom pdf report

- This functionality will be handled by the front end, we can use a popular pdf library like pdfmake.
- This approach will be custom and can include pretty much anything in the report if needed.
- All the updates will be handle on the front end, so no need to mantain an extra custom print service
- Only limitation I've found is that print report will not have the scale bar.

My recommedation would be the custom pdf report.

- highly customazible
- Code/updates will be handle on the front end
- easier to extent if needed
- effort to implement will be larger

=====

Notes on Print Functionality Options for MapBuilder
Esri Default Utility Print Service
Logo Limitation: You cannot add custom logos when using Esri’s default utility print service.

Usage Considerations:

We do not anticipate heavy usage of the print functionality in MapBuilder.

However, it's worth noting that Esri may enforce usage limits on their free utility services.

Security Considerations:

Currently, we do not have any secured or private layers.

If secured content is introduced in the future, a custom print service is generally recommended.

Option 1: Hosted Custom Print Service
Eliminates the limitations of the default utility service.

Enables full control over print configurations (e.g., logos, secured content support).

Requires setting up and maintaining a new hosted print service.

Option 2: Frontend-Based Custom PDF Report
Entirely managed on the frontend using a popular PDF generation library such as pdfmake.

Offers maximum flexibility — reports can be fully customized to include maps, charts, tables, and more.

No backend service required — reduces maintenance overhead.

Limitation: Unable to display a scale bar in the printed report (based on current findings).

Recommendation
Frontend-based custom PDF report approach. It offers:

Full customization of layout and content
All logic and updates are handled in the frontend, avoiding the need for an additional service.
Easier and faster to iterate and deploy
Easier to extend in the future as requirements evolve.
Lower maintenance and operational complexity
Better integration with our application’s UI/UX

It may require more effort to implement initially, the long-term flexibility, independence, and maintainability make this the most future-proof solution.

# Notes: update layes refactoring

- things to consider when refactoring
  - edge cases
  - make sure input data is valid refactors,
  - must be numbers
