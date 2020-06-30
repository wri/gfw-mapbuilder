type Sector = { sector: string; subsectors: { label: string; id: string }[] };
export const sectors: Sector[] = [
  {
    sector: 'Government',
    subsectors: [
      {
        label: 'Forest Management/Park Management',
        id: 'Forest_Management_Park_Management'
      },
      {
        label: 'Law Enforcement',
        id: 'Law_Enforcement'
      },
      {
        label: 'Legislature/Parliament',
        id: 'Legislature_Parliament'
      },
      {
        label: 'Ministry/National Agency',
        id: 'Ministry_National_Agency'
      },
      {
        label: 'Subnational Agency',
        id: 'Subnational_Agency'
      },
      {
        label: 'Other',
        id: 'Other: '
      }
    ]
  },
  {
    sector: 'Donor Institution / Agency',
    subsectors: [
      { label: 'Director/Executive', id: 'Director_Executive' },
      { label: 'Project/Program Manager', id: 'Project_Program_Manager' },
      { label: 'Researcher', id: 'Researcher' },
      { label: 'Monitoring/Evaluation', id: 'Monitoring_Evaluation' },
      { label: 'Field/Country Staff', id: 'Field_Country_Staff' },
      {
        label: 'Other',
        id: 'Other: '
      }
    ]
  },
  {
    sector: 'Local NGO (national or subnational)',
    subsectors: [
      { label: 'Director/Executive', id: 'Director_Executive' },
      { label: 'Project/Program Manager', id: 'Project_Program_Manager' },
      {
        label: 'Monitoring/Evaluation Specialist',
        id: 'Monitoring_Evaluation'
      },
      { label: 'GIS/Technical Specialist', id: 'GIS_Technical_Specialist' },
      { label: 'Researcher', id: 'Researcher' },
      { label: 'Field Staff', id: 'Field_Staff' },
      { label: 'Communications Specialist', id: 'Communications_Specialist' },
      { label: 'Park/Forest Ranger', id: 'Park_Forest_Ranger' },
      {
        label: 'Other',
        id: 'Other: '
      }
    ]
  },
  {
    sector: 'International NGO',
    subsectors: [
      { label: 'Director/Executive', id: 'Director_Executive' },
      { label: 'Project/Program Manager', id: 'Project_Program_Manager' },
      {
        label: 'Monitoring/Evaluation Specialist',
        id: 'Monitoring_Evaluation'
      },
      { label: 'GIS/Technical Specialist', id: 'GIS_Technical_Specialist' },
      { label: 'Field/Country Staff', id: 'Field_Country_Staff' },
      { label: 'Communications Specialist', id: 'Communications_Specialist' },
      { label: 'Researcher', id: 'Researcher' },
      {
        label: 'Other',
        id: 'Other: '
      }
    ]
  },
  {
    sector: 'UN or International Organization',
    subsectors: [
      { label: 'Director/Executive', id: 'Director_Executive' },
      { label: 'Project/Program Manager', id: 'Project_Program_Manager' },
      { label: 'Researcher', id: 'Researcher' },
      { label: 'Field/Country Staff', id: 'Field_Country_Staff' },
      {
        label: 'Monitoring/Evaluation Specialit',
        id: 'Monitoring_Evaluation'
      },
      { label: 'GIS/Technical Specialist', id: 'GIS_Technical_Specialist' },
      { label: 'Communications Specialist', id: 'Communications_Specialist' },
      {
        label: 'Other',
        id: 'Other: '
      }
    ]
  },
  {
    sector: 'Academic / Research Organization',
    subsectors: [
      {
        label: 'Faculty (Primary/Secondary)',
        id: 'Faculty_(Primary_Secondary)'
      },
      { label: 'Faculty (University)', id: 'Faculty_(University)' },
      {
        label: 'Student (Primary/Secondary)',
        id: 'Student_(Primary_Secondary)'
      },
      {
        label: 'Student (University/Graduate)',
        id: 'Student_(University_Graduate)'
      },
      {
        label: 'Researcher (Post-Doc, Fellow, etc.)',
        id: 'Researcher_(Post-Doc,_Fellow,_etc.)'
      },
      {
        label: 'Other',
        id: 'Other: '
      }
    ]
  },
  {
    sector: 'Journalist / Media Organization',
    subsectors: [
      { label: 'Reporter', id: 'Reporter' },
      { label: 'Editor', id: 'Editor' },
      {
        label: 'Other',
        id: 'Other: '
      }
    ]
  },
  {
    sector: 'Indigenous or Community-Based Organization',
    subsectors: [
      { label: 'Community Leader', id: 'Community_Leader' },
      { label: 'Forest Manager/Monitor', id: 'Forest_Manager_Monitor' },
      { label: 'GIS/Technical Specialist', id: 'GIS_Technical_Specialist' },
      { label: 'Communications Specialist', id: 'Communications_Specialist' },
      {
        label: 'Other',
        id: 'Other: '
      }
    ]
  },
  {
    sector: 'Private sector',
    subsectors: [
      { label: 'Supply Chain Manager', id: 'Supply_Chain_Manager' },
      { label: 'Supply Chain Analyst', id: 'Supply_Chain_Analyst' },
      { label: 'Procurement Staff', id: 'Procurement_Staff' },
      { label: 'Retailer/Trader', id: 'Retailer_Trader' },
      { label: 'Land or Concession Owner', id: 'Land_or_Concession_Owner' },
      {
        label: 'Other',
        id: 'Other: '
      }
    ]
  },
  {
    sector: 'Individual / No Affiliation',
    subsectors: [
      {
        label: 'Other',
        id: 'Other: '
      }
    ]
  },
  {
    sector: 'Other:',
    subsectors: [
      {
        label: 'Other',
        id: 'Other: '
      }
    ]
  }
];

type Usage = { label: string; id: string };
type Topic = { label: string; id: string };
export const usage: Topic[] = [
  {
    label: 'Advocacy/campaigning',
    id: 'Advocacy/campaigning'
  },
  {
    label: 'Data or visuals for blogs or media stories',
    id: 'Data or visuals for blogs or media stories'
  },
  {
    label: 'Data or visuals for presentations and reports',
    id: 'Data or visuals for presentations and reports'
  },
  {
    label: 'Educational support materials',
    id: 'Educational support materials'
  },
  {
    label: 'General research',
    id: 'General research'
  },
  {
    label: 'Identify illegal activity',
    id: 'Identify illegal activity'
  },
  {
    label: 'Inform grant funding decisions/results-based payments',
    id: 'Inform grant funding decisions/results-based payments'
  },
  {
    label: 'Inform purchasing/procurement/investment decisions',
    id: 'Inform purchasing/procurement/investment decisions'
  },
  {
    label: 'Land use planning/land use allocation',
    id: 'Land use planning/land use allocation'
  },
  {
    label: 'Learn about forests/my country',
    id: 'Learn about forests/my country'
  },
  {
    label: 'Monitor or manage an area',
    id: 'Monitor or manage an area'
  },
  {
    label: 'Monitor results/impacts',
    id: 'Monitor results/impacts'
  },
  {
    label: 'Not sure; new to GFW',
    id: 'Not sure; new to GFW'
  },
  {
    label: 'Plan field work (patrols/investigations)',
    id: 'Plan field work (patrols/investigations)'
  },
  {
    label: 'Other',
    id: 'Other'
  }
];

export const topics: Topic[] = [
  {
    label: 'Agricultural supply chains',
    id: 'Agricultural_supply_chains'
  },
  {
    label: 'Biodiversity',
    id: 'Biodiversity'
  },
  {
    label: 'Climate/Carbon',
    id: 'Climate_Carbon'
  },
  {
    label: 'Deforestation/Forest Degradation',
    id: 'Deforestation_Forest_Degradation'
  },
  {
    label: 'Fires',
    id: 'Fires'
  },
  {
    label: 'Innovations in forest monitoring',
    id: 'Innovations_in_forest_monitoring'
  },
  {
    id: 'My_region_or_country',
    label: 'My region or country'
  },
  {
    id: 'Reforestation_Landscape_restoration',
    label: 'Reforestation/Landscape restoration'
  },
  {
    id: 'Small_Grants_Fund_and_Tech_Fellowship',
    label: 'Small Grants Fund and Tech Fellowship'
  },
  {
    label: 'Watersheds',
    id: 'Watersheds_'
  }
];
