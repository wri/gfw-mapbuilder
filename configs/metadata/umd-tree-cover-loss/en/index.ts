export const en = {
  title: 'Tree cover loss',
  subtitle: '(annual, 30m, global, Hansen/UMD/Google/USGS/NASA)',
  download_data: 'https://storage.googleapis.com/earthenginepartners-hansen/GFC-2023-v1.11/download.html',
  lean_more: 'http://science.sciencemag.org/content/342/6160/850',
  content: [
    {
      label: 'Function',
      value: '<p>Identifies areas of gross tree cover loss</p>',
    },

    {
      label: 'Resolution',
      value: '<p>30 × 30 meters</p>',
    },
    {
      label: 'Tags',
      value: 'Forest Change',
    },

    {
      label: 'Geographic coverage',
      value: '<p>Global land area (excluding Antarctica and other Arctic islands).</p>',
    },
    {
      label: 'Source',
      value:
        '<p>Hansen, M. C., P. V. Potapov, R. Moore, M. Hancher, S. A. Turubanova, A. Tyukavina, D. Thau, S. V. Stehman, S. J. Goetz, T. R. Loveland, A. Kommareddy, A. Egorov, L. Chini, C. O. Justice, and J. R. G. Townshend. 2013. “High-Resolution Global Maps of 21st-Century Forest Cover Change.” <em>Science</em> 342 (15 November): 850–53. Data available from: <a href="http://earthenginepartners.appspot.com/science-2013-global-forest">earthenginepartners.appspot.com/science-2013-global-forest</a>.</p>',
    },
    {
      label: 'Frequency',
      value: '<p>Annual</p>',
    },

    {
      label: 'Date of content',
      value: '<p>2001-2023</p>',
    },
    {
      label: 'Cautions',
      value: `<p>"In this data set, “tree cover” is defined as all vegetation greater than 5 meters in height, and may take the form of natural forests or plantations across a range of canopy densities. “Loss” indicates the removal or mortality of tree cover and can be due to a variety of factors, including mechanical harvesting, fire, disease, or storm damage. As such, “loss” does not equate to deforestation. </p><p>Due to variation in research methodology and date of content, tree cover, loss, and gain data sets cannot be compared accurately against each other. Accordingly, “net” loss cannot be calculated by subtracting figures for tree cover gain from tree cover loss, and current (post-2000) tree cover cannot be determined by subtracting figures for annual tree cover loss from year 2000 tree cover. </p><p>The 2011-2022 data was produced using <a href="https://storage.googleapis.com/earthenginepartners-hansen/GFC-2022-v1.10/download.html">updated methodology</a>. Comparisons between the original 2001-2010 data and the 2011-2022 update should be performed with caution.</p><p>The authors evaluated the overall prevalence of false positives (commission errors) in this data at 13%, and the prevalence of false negatives (omission errors) at 12%, though the accuracy varies by biome and thus may be higher or lower in any particular location. The model often misses disturbances in smallholder landscapes, resulting in lower accuracy of the data in sub-Saharan Africa, where this type of disturbance is more common. The authors are 75 percent confident that the loss occurred within the stated year, and 97 percent confident that it occurred within a year before or after. Users of the data can smooth out such uncertainty by examining the average over multiple years. Read our <a href="http://blog.globalforestwatch.org/data/how-accurate-is-accurate-enough-examining-the-glad-global-tree-cover-change-data-part-1.html">blog series</a> on the accuracy of this data for more information."</p>`,
    },
    {
      label: 'License',
      value: '<p><a href="http://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a></p>',
    },
  ],
  overview: {
    label: 'Overview',
    value:
      '<p>In this data set, “tree cover” is defined as all vegetation greater than 5 meters in height, and may take the form of natural forests or plantations across a range of canopy densities. “Loss” indicates the removal or mortality of tree cover and can be due to a variety of factors, including mechanical harvesting, fire, disease, or storm damage. As such, “loss” does not equate to deforestation.</p><p>Due to variation in research methodology and date of content, tree cover, loss, and gain data sets cannot be compared accurately against each other. Accordingly, “net” loss cannot be calculated by subtracting figures for tree cover gain from tree cover loss, and current (post-2000) tree cover cannot be determined by subtracting figures for annual tree cover loss from year 2000 tree cover.</p><p>The 2011-2023 data was produced using an <a href="https://storage.googleapis.com/earthenginepartners-hansen/GFC-2022-v1.10/download.html">updated methodology</a>. Comparisons between the original 2001-2010 data and the 2011-2023 update should be performed with caution.</p><p>In the original publication, the authors evaluated the overall prevalence of false positives (commission errors) in this data at 13%, and the prevalence of false negatives (omission errors) at 12%, though the accuracy varies by biome and thus may be higher or lower in any particular location. The model often misses disturbances in smallholder landscapes, resulting in lower accuracy of the data in sub-Saharan Africa, where this type of disturbance is more common. The authors are 75 percent confident that the loss occurred within the stated year, and 97 percent confident that it occurred within a year before or after. Users of the data can smooth out such uncertainty by examining the average over multiple years. Read our <a href="https://www.globalforestwatch.org/blog/data/how-accurate-is-accurate-enough-examining-the-glad-global-tree-cover-change-data-part-1.html">blog series</a> on the accuracy of this data for more information.</p>',
  },
  citation: {
    label: 'Citation',
    value: `<p>"Use the following credit when these data are displayed:<br>Source: Hansen/UMD/Google/USGS/NASA, accessed through Global Forest Watch</p><p>Use the following credit when these data are cited:<br>Hansen, M. C., P. V. Potapov, R. Moore, M. Hancher, S. A. Turubanova, A. Tyukavina, D. Thau, S. V. Stehman, S. J. Goetz, T. R. Loveland, A. Kommareddy, A. Egorov, L. Chini, C. O. Justice, and J. R. G. Townshend. 2013. “High-Resolution Global Maps of 21st-Century Forest Cover Change.” <em>Science</em> 342 (15 November): 850–53. Data available on-line from:http://earthenginepartners.appspot.com/science-2013-global-forest. Accessed through Global Forest Watch on [date]. www.globalforestwatch.org <br>"</p>`,
  },
};
