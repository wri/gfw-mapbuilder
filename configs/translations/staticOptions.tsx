type SectorsObject = {
  [key: string]: { sector: Sector; subsectors: Subsectors }[];
};
type Subsectors = { label: string; id: string }[];
type Sector = { label: string; value: string };
export const sectors: SectorsObject = {
  en: [
    {
      sector: { label: 'Government', value: 'Government' },
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
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Donor Institution / Agency',
        value: 'Donor Institution / Agency'
      },
      subsectors: [
        { label: 'Director/Executive', id: 'Director_Executive' },
        { label: 'Project/Program Manager', id: 'Project_Program_Manager' },
        { label: 'Researcher', id: 'Researcher' },
        { label: 'Monitoring/Evaluation', id: 'Monitoring_Evaluation' },
        { label: 'Field/Country Staff', id: 'Field_Country_Staff' },
        {
          label: 'Other',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Local NGO (national or subnational)',
        value: 'Local NGO (national or subnational)'
      },
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
          id: 'Other:'
        }
      ]
    },
    {
      sector: { label: 'International NGO', value: 'International NGO' },
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
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'UN or International Organization',
        value: 'UN or International Organization'
      },
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
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Academic / Research Organization',
        value: 'Academic / Research Organization'
      },
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
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Journalist / Media Organization',
        value: 'Journalist / Media Organization'
      },
      subsectors: [
        { label: 'Reporter', id: 'Reporter' },
        { label: 'Editor', id: 'Editor' },
        {
          label: 'Other',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Indigenous or Community-Based Organization',
        value: 'Indigenous or Community-Based Organization'
      },
      subsectors: [
        { label: 'Community Leader', id: 'Community_Leader' },
        { label: 'Forest Manager/Monitor', id: 'Forest_Manager_Monitor' },
        { label: 'GIS/Technical Specialist', id: 'GIS_Technical_Specialist' },
        { label: 'Communications Specialist', id: 'Communications_Specialist' },
        {
          label: 'Other',
          id: 'Other:'
        }
      ]
    },
    {
      sector: { label: 'Private sector', value: 'Private sector' },
      subsectors: [
        { label: 'Supply Chain Manager', id: 'Supply_Chain_Manager' },
        { label: 'Supply Chain Analyst', id: 'Supply_Chain_Analyst' },
        { label: 'Procurement Staff', id: 'Procurement_Staff' },
        { label: 'Retailer/Trader', id: 'Retailer_Trader' },
        { label: 'Land or Concession Owner', id: 'Land_or_Concession_Owner' },
        {
          label: 'Other',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Individual / No Affiliation',
        value: 'Individual / No Affiliation'
      },
      subsectors: [
        {
          label: 'Other',
          id: 'Other:'
        }
      ]
    },
    {
      sector: { label: 'Other:', value: 'Other:' },
      subsectors: [
        {
          label: 'Other',
          id: 'Other:'
        }
      ]
    }
  ],
  az: [
    {
      sector: { label: 'Government', value: 'Government' },
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
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Donor Institution / Agency',
        value: 'Donor Institution / Agency'
      },
      subsectors: [
        { label: 'Director/Executive', id: 'Director_Executive' },
        { label: 'Project/Program Manager', id: 'Project_Program_Manager' },
        { label: 'Researcher', id: 'Researcher' },
        { label: 'Monitoring/Evaluation', id: 'Monitoring_Evaluation' },
        { label: 'Field/Country Staff', id: 'Field_Country_Staff' },
        {
          label: 'Other',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Local NGO (national or subnational)',
        value: 'Local NGO (national or subnational)'
      },
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
          id: 'Other:'
        }
      ]
    },
    {
      sector: { label: 'International NGO', value: 'International NGO' },
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
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'UN or International Organization',
        value: 'UN or International Organization'
      },
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
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Academic / Research Organization',
        value: 'Academic / Research Organization'
      },
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
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Journalist / Media Organization',
        value: 'Journalist / Media Organization'
      },
      subsectors: [
        { label: 'Reporter', id: 'Reporter' },
        { label: 'Editor', id: 'Editor' },
        {
          label: 'Other',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Indigenous or Community-Based Organization',
        value: 'Indigenous or Community-Based Organization'
      },
      subsectors: [
        { label: 'Community Leader', id: 'Community_Leader' },
        { label: 'Forest Manager/Monitor', id: 'Forest_Manager_Monitor' },
        { label: 'GIS/Technical Specialist', id: 'GIS_Technical_Specialist' },
        { label: 'Communications Specialist', id: 'Communications_Specialist' },
        {
          label: 'Other',
          id: 'Other:'
        }
      ]
    },
    {
      sector: { label: 'Private sector', value: 'Private sector' },
      subsectors: [
        { label: 'Supply Chain Manager', id: 'Supply_Chain_Manager' },
        { label: 'Supply Chain Analyst', id: 'Supply_Chain_Analyst' },
        { label: 'Procurement Staff', id: 'Procurement_Staff' },
        { label: 'Retailer/Trader', id: 'Retailer_Trader' },
        { label: 'Land or Concession Owner', id: 'Land_or_Concession_Owner' },
        {
          label: 'Other',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Individual / No Affiliation',
        value: 'Individual / No Affiliation'
      },
      subsectors: [
        {
          label: 'Other',
          id: 'Other:'
        }
      ]
    },
    {
      sector: { label: 'Other:', value: 'Other:' },
      subsectors: [
        {
          label: 'Other',
          id: 'Other:'
        }
      ]
    }
  ],
  nl: [
    // * NOTE: translation was not provided
    {
      sector: { label: 'Government', value: 'Government' },
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
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Donor Institution / Agency',
        value: 'Donor Institution / Agency'
      },
      subsectors: [
        { label: 'Director/Executive', id: 'Director_Executive' },
        { label: 'Project/Program Manager', id: 'Project_Program_Manager' },
        { label: 'Researcher', id: 'Researcher' },
        { label: 'Monitoring/Evaluation', id: 'Monitoring_Evaluation' },
        { label: 'Field/Country Staff', id: 'Field_Country_Staff' },
        {
          label: 'Other',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Local NGO (national or subnational)',
        value: 'Local NGO (national or subnational)'
      },
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
          id: 'Other:'
        }
      ]
    },
    {
      sector: { label: 'International NGO', value: 'International NGO' },
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
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'UN or International Organization',
        value: 'UN or International Organization'
      },
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
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Academic / Research Organization',
        value: 'Academic / Research Organization'
      },
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
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Journalist / Media Organization',
        value: 'Journalist / Media Organization'
      },
      subsectors: [
        { label: 'Reporter', id: 'Reporter' },
        { label: 'Editor', id: 'Editor' },
        {
          label: 'Other',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Indigenous or Community-Based Organization',
        value: 'Indigenous or Community-Based Organization'
      },
      subsectors: [
        { label: 'Community Leader', id: 'Community_Leader' },
        { label: 'Forest Manager/Monitor', id: 'Forest_Manager_Monitor' },
        { label: 'GIS/Technical Specialist', id: 'GIS_Technical_Specialist' },
        { label: 'Communications Specialist', id: 'Communications_Specialist' },
        {
          label: 'Other',
          id: 'Other:'
        }
      ]
    },
    {
      sector: { label: 'Private sector', value: 'Private sector' },
      subsectors: [
        { label: 'Supply Chain Manager', id: 'Supply_Chain_Manager' },
        { label: 'Supply Chain Analyst', id: 'Supply_Chain_Analyst' },
        { label: 'Procurement Staff', id: 'Procurement_Staff' },
        { label: 'Retailer/Trader', id: 'Retailer_Trader' },
        { label: 'Land or Concession Owner', id: 'Land_or_Concession_Owner' },
        {
          label: 'Other',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Individual / No Affiliation',
        value: 'Individual / No Affiliation'
      },
      subsectors: [
        {
          label: 'Other',
          id: 'Other:'
        }
      ]
    },
    {
      sector: { label: 'Other:', value: 'Other:' },
      subsectors: [
        {
          label: 'Other',
          id: 'Other:'
        }
      ]
    }
  ],
  hy: [
    // * NOTE: translation was not provided
    {
      sector: { label: 'Government', value: 'Government' },
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
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Donor Institution / Agency',
        value: 'Donor Institution / Agency'
      },
      subsectors: [
        { label: 'Director/Executive', id: 'Director_Executive' },
        { label: 'Project/Program Manager', id: 'Project_Program_Manager' },
        { label: 'Researcher', id: 'Researcher' },
        { label: 'Monitoring/Evaluation', id: 'Monitoring_Evaluation' },
        { label: 'Field/Country Staff', id: 'Field_Country_Staff' },
        {
          label: 'Other',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Local NGO (national or subnational)',
        value: 'Local NGO (national or subnational)'
      },
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
          id: 'Other:'
        }
      ]
    },
    {
      sector: { label: 'International NGO', value: 'International NGO' },
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
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'UN or International Organization',
        value: 'UN or International Organization'
      },
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
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Academic / Research Organization',
        value: 'Academic / Research Organization'
      },
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
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Journalist / Media Organization',
        value: 'Journalist / Media Organization'
      },
      subsectors: [
        { label: 'Reporter', id: 'Reporter' },
        { label: 'Editor', id: 'Editor' },
        {
          label: 'Other',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Indigenous or Community-Based Organization',
        value: 'Indigenous or Community-Based Organization'
      },
      subsectors: [
        { label: 'Community Leader', id: 'Community_Leader' },
        { label: 'Forest Manager/Monitor', id: 'Forest_Manager_Monitor' },
        { label: 'GIS/Technical Specialist', id: 'GIS_Technical_Specialist' },
        { label: 'Communications Specialist', id: 'Communications_Specialist' },
        {
          label: 'Other',
          id: 'Other:'
        }
      ]
    },
    {
      sector: { label: 'Private sector', value: 'Private sector' },
      subsectors: [
        { label: 'Supply Chain Manager', id: 'Supply_Chain_Manager' },
        { label: 'Supply Chain Analyst', id: 'Supply_Chain_Analyst' },
        { label: 'Procurement Staff', id: 'Procurement_Staff' },
        { label: 'Retailer/Trader', id: 'Retailer_Trader' },
        { label: 'Land or Concession Owner', id: 'Land_or_Concession_Owner' },
        {
          label: 'Other',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Individual / No Affiliation',
        value: 'Individual / No Affiliation'
      },
      subsectors: [
        {
          label: 'Other',
          id: 'Other:'
        }
      ]
    },
    {
      sector: { label: 'Other:', value: 'Other:' },
      subsectors: [
        {
          label: 'Other',
          id: 'Other:'
        }
      ]
    }
  ],
  fr: [
    {
      sector: { label: 'Gouvernement', value: 'Government' },
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
          label: 'Autre :',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Institution / agence donatrice',
        value: 'Donor Institution / Agency'
      },
      subsectors: [
        { label: 'Director/Executive', id: 'Director_Executive' },
        { label: 'Project/Program Manager', id: 'Project_Program_Manager' },
        { label: 'Researcher', id: 'Researcher' },
        { label: 'Monitoring/Evaluation', id: 'Monitoring_Evaluation' },
        { label: 'Field/Country Staff', id: 'Field_Country_Staff' },
        {
          label: 'Autre :',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'ONG locale (nationale ou infranationale)',
        value: 'Local NGO (national or subnational)'
      },
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
          label: 'Autre :',
          id: 'Other:'
        }
      ]
    },
    {
      sector: { label: 'ONG internationale', value: 'International NGO' },
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
          label: 'Autre :',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'ONU ou organisation internationale',
        value: 'UN or International Organization'
      },
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
          label: 'Autre :',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Organisation académique / de recherche',
        value: 'Academic / Research Organization'
      },
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
          label: 'Autre :',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Organisation journalistique / médiatique',
        value: 'Journalist / Media Organization'
      },
      subsectors: [
        { label: 'Reporter', id: 'Reporter' },
        { label: 'Editor', id: 'Editor' },
        {
          label: 'Autre :',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Organisation autochtone ou communautaire',
        value: 'Indigenous or Community-Based Organization'
      },
      subsectors: [
        { label: 'Community Leader', id: 'Community_Leader' },
        { label: 'Forest Manager/Monitor', id: 'Forest_Manager_Monitor' },
        { label: 'GIS/Technical Specialist', id: 'GIS_Technical_Specialist' },
        { label: 'Communications Specialist', id: 'Communications_Specialist' },
        {
          label: 'Autre :',
          id: 'Other:'
        }
      ]
    },
    {
      sector: { label: 'Secteur privé', value: 'Private sector' },
      subsectors: [
        { label: 'Supply Chain Manager', id: 'Supply_Chain_Manager' },
        { label: 'Supply Chain Analyst', id: 'Supply_Chain_Analyst' },
        { label: 'Procurement Staff', id: 'Procurement_Staff' },
        { label: 'Retailer/Trader', id: 'Retailer_Trader' },
        { label: 'Land or Concession Owner', id: 'Land_or_Concession_Owner' },
        {
          label: 'Autre :',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Affiliation individuelle / Aucune affiliation',
        value: 'Individual / No Affiliation'
      },
      subsectors: [
        {
          label: 'Autre :',
          id: 'Other:'
        }
      ]
    },
    {
      sector: { label: 'Autre :', value: 'Other:' },
      subsectors: [
        {
          label: 'Autre :',
          id: 'Other:'
        }
      ]
    }
  ],
  es: [
    {
      sector: { label: 'Gobierno', value: 'Government' },
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
          label: 'Otros:',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Agencia / Organismo de ayuda o asistencia financiera',
        value: 'Donor Institution / Agency'
      },
      subsectors: [
        { label: 'Director/Executive', id: 'Director_Executive' },
        { label: 'Project/Program Manager', id: 'Project_Program_Manager' },
        { label: 'Researcher', id: 'Researcher' },
        { label: 'Monitoring/Evaluation', id: 'Monitoring_Evaluation' },
        { label: 'Field/Country Staff', id: 'Field_Country_Staff' },
        {
          label: 'Otros:',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'ONG local (nacional o subnacional)',
        value: 'Local NGO (national or subnational)'
      },
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
          label: 'Otros:',
          id: 'Other:'
        }
      ]
    },
    {
      sector: { label: 'ONG internacional', value: 'International NGO' },
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
          label: 'Otros:',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'ONU u otra organización internacional',
        value: 'UN or International Organization'
      },
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
          label: 'Otros:',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Organización académica / de investigación',
        value: 'Academic / Research Organization'
      },
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
          label: 'Otros:',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Organización de periodistas / medios de comunicación',
        value: 'Journalist / Media Organization'
      },
      subsectors: [
        { label: 'Reporter', id: 'Reporter' },
        { label: 'Editor', id: 'Editor' },
        {
          label: 'Otros:',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Organización indígena o comunitaria',
        value: 'Indigenous or Community-Based Organization'
      },
      subsectors: [
        { label: 'Community Leader', id: 'Community_Leader' },
        { label: 'Forest Manager/Monitor', id: 'Forest_Manager_Monitor' },
        { label: 'GIS/Technical Specialist', id: 'GIS_Technical_Specialist' },
        { label: 'Communications Specialist', id: 'Communications_Specialist' },
        {
          label: 'Otros:',
          id: 'Other:'
        }
      ]
    },
    {
      sector: { label: 'Sector privado', value: 'Private sector' },
      subsectors: [
        { label: 'Supply Chain Manager', id: 'Supply_Chain_Manager' },
        { label: 'Supply Chain Analyst', id: 'Supply_Chain_Analyst' },
        { label: 'Procurement Staff', id: 'Procurement_Staff' },
        { label: 'Retailer/Trader', id: 'Retailer_Trader' },
        { label: 'Land or Concession Owner', id: 'Land_or_Concession_Owner' },
        {
          label: 'Otros:',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Particular / Sin afiliación',
        value: 'Individual / No Affiliation'
      },
      subsectors: [
        {
          label: 'Otros:',
          id: 'Other:'
        }
      ]
    },
    {
      sector: { label: 'Otros:', value: 'Other:' },
      subsectors: [
        {
          label: 'Otros:',
          id: 'Other:'
        }
      ]
    }
  ],
  pt: [
    {
      sector: { label: 'Governo', value: 'Government' },
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
          label: 'Outro:',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Instituição / Agência Doadora',
        value: 'Donor Institution / Agency'
      },
      subsectors: [
        { label: 'Director/Executive', id: 'Director_Executive' },
        { label: 'Project/Program Manager', id: 'Project_Program_Manager' },
        { label: 'Researcher', id: 'Researcher' },
        { label: 'Monitoring/Evaluation', id: 'Monitoring_Evaluation' },
        { label: 'Field/Country Staff', id: 'Field_Country_Staff' },
        {
          label: 'Outro:',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'ONG local (nacional ou subnacional)',
        value: 'Local NGO (national or subnational)'
      },
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
          label: 'Outro:',
          id: 'Other:'
        }
      ]
    },
    {
      sector: { label: 'ONG internacional', value: 'International NGO' },
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
          label: 'Outro:',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'ONU ou Organização Internacional',
        value: 'UN or International Organization'
      },
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
          label: 'Outro:',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Organização de Pesquisa / Acadêmica',
        value: 'Academic / Research Organization'
      },
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
          label: 'Outro:',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Organização de Mídia / Jornalista',
        value: 'Journalist / Media Organization'
      },
      subsectors: [
        { label: 'Reporter', id: 'Reporter' },
        { label: 'Editor', id: 'Editor' },
        {
          label: 'Outro:',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Organização Indígena ou Comunitária',
        value: 'Indigenous or Community-Based Organization'
      },
      subsectors: [
        { label: 'Community Leader', id: 'Community_Leader' },
        { label: 'Forest Manager/Monitor', id: 'Forest_Manager_Monitor' },
        { label: 'GIS/Technical Specialist', id: 'GIS_Technical_Specialist' },
        { label: 'Communications Specialist', id: 'Communications_Specialist' },
        {
          label: 'Outro:',
          id: 'Other:'
        }
      ]
    },
    {
      sector: { label: 'Setor privado', value: 'Private sector' },
      subsectors: [
        { label: 'Supply Chain Manager', id: 'Supply_Chain_Manager' },
        { label: 'Supply Chain Analyst', id: 'Supply_Chain_Analyst' },
        { label: 'Procurement Staff', id: 'Procurement_Staff' },
        { label: 'Retailer/Trader', id: 'Retailer_Trader' },
        { label: 'Land or Concession Owner', id: 'Land_or_Concession_Owner' },
        {
          label: 'Outro:',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Individual / Sem Filiação',
        value: 'Individual / No Affiliation'
      },
      subsectors: [
        {
          label: 'Outro:',
          id: 'Other:'
        }
      ]
    },
    {
      sector: { label: 'Outro:', value: 'Other:' },
      subsectors: [
        {
          label: 'Outro:',
          id: 'Other:'
        }
      ]
    }
  ],
  ka: [
    {
      sector: { label: 'Government', value: 'Government' },
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
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Donor Institution / Agency',
        value: 'Donor Institution / Agency'
      },
      subsectors: [
        { label: 'Director/Executive', id: 'Director_Executive' },
        { label: 'Project/Program Manager', id: 'Project_Program_Manager' },
        { label: 'Researcher', id: 'Researcher' },
        { label: 'Monitoring/Evaluation', id: 'Monitoring_Evaluation' },
        { label: 'Field/Country Staff', id: 'Field_Country_Staff' },
        {
          label: 'Other',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Local NGO (national or subnational)',
        value: 'Local NGO (national or subnational)'
      },
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
          id: 'Other:'
        }
      ]
    },
    {
      sector: { label: 'International NGO', value: 'International NGO' },
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
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'UN or International Organization',
        value: 'UN or International Organization'
      },
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
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Academic / Research Organization',
        value: 'Academic / Research Organization'
      },
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
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Journalist / Media Organization',
        value: 'Journalist / Media Organization'
      },
      subsectors: [
        { label: 'Reporter', id: 'Reporter' },
        { label: 'Editor', id: 'Editor' },
        {
          label: 'Other',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Indigenous or Community-Based Organization',
        value: 'Indigenous or Community-Based Organization'
      },
      subsectors: [
        { label: 'Community Leader', id: 'Community_Leader' },
        { label: 'Forest Manager/Monitor', id: 'Forest_Manager_Monitor' },
        { label: 'GIS/Technical Specialist', id: 'GIS_Technical_Specialist' },
        { label: 'Communications Specialist', id: 'Communications_Specialist' },
        {
          label: 'Other',
          id: 'Other:'
        }
      ]
    },
    {
      sector: { label: 'Private sector', value: 'Private sector' },
      subsectors: [
        { label: 'Supply Chain Manager', id: 'Supply_Chain_Manager' },
        { label: 'Supply Chain Analyst', id: 'Supply_Chain_Analyst' },
        { label: 'Procurement Staff', id: 'Procurement_Staff' },
        { label: 'Retailer/Trader', id: 'Retailer_Trader' },
        { label: 'Land or Concession Owner', id: 'Land_or_Concession_Owner' },
        {
          label: 'Other',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Individual / No Affiliation',
        value: 'Individual / No Affiliation'
      },
      subsectors: [
        {
          label: 'Other',
          id: 'Other:'
        }
      ]
    },
    {
      sector: { label: 'Other:', value: 'Other:' },
      subsectors: [
        {
          label: 'Other',
          id: 'Other:'
        }
      ]
    }
  ],
  zh: [
    {
      sector: { label: '政府', value: 'Government' },
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
          label: '其他：',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: '捐赠机构',
        value: 'Donor Institution / Agency'
      },
      subsectors: [
        { label: 'Director/Executive', id: 'Director_Executive' },
        { label: 'Project/Program Manager', id: 'Project_Program_Manager' },
        { label: 'Researcher', id: 'Researcher' },
        { label: 'Monitoring/Evaluation', id: 'Monitoring_Evaluation' },
        { label: 'Field/Country Staff', id: 'Field_Country_Staff' },
        {
          label: '其他：',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: '本地 NGO（国家级或亚国家级）',
        value: 'Local NGO (national or subnational)'
      },
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
          label: '其他：',
          id: 'Other:'
        }
      ]
    },
    {
      sector: { label: '国际 NGO', value: 'International NGO' },
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
          label: '其他：',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: '联合国或国际组织',
        value: 'UN or International Organization'
      },
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
          label: '其他：',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: '学术/研究组织',
        value: 'Academic / Research Organization'
      },
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
          label: '其他：',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: '新闻工作者/媒体组织',
        value: 'Journalist / Media Organization'
      },
      subsectors: [
        { label: 'Reporter', id: 'Reporter' },
        { label: 'Editor', id: 'Editor' },
        {
          label: '其他：',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: '本土或基于社区的组织',
        value: 'Indigenous or Community-Based Organization'
      },
      subsectors: [
        { label: 'Community Leader', id: 'Community_Leader' },
        { label: 'Forest Manager/Monitor', id: 'Forest_Manager_Monitor' },
        { label: 'GIS/Technical Specialist', id: 'GIS_Technical_Specialist' },
        { label: 'Communications Specialist', id: 'Communications_Specialist' },
        {
          label: '其他：',
          id: 'Other:'
        }
      ]
    },
    {
      sector: { label: '私营部门', value: 'Private sector' },
      subsectors: [
        { label: 'Supply Chain Manager', id: 'Supply_Chain_Manager' },
        { label: 'Supply Chain Analyst', id: 'Supply_Chain_Analyst' },
        { label: 'Procurement Staff', id: 'Procurement_Staff' },
        { label: 'Retailer/Trader', id: 'Retailer_Trader' },
        { label: 'Land or Concession Owner', id: 'Land_or_Concession_Owner' },
        {
          label: '其他：',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: '个人/无隶属关系',
        value: 'Individual / No Affiliation'
      },
      subsectors: [
        {
          label: '其他：',
          id: 'Other:'
        }
      ]
    },
    {
      sector: { label: '其他：', value: 'Other:' },
      subsectors: [
        {
          label: '其他：',
          id: 'Other:'
        }
      ]
    }
  ],
  id: [
    {
      sector: { label: 'Pemerintah', value: 'Government' },
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
          label: 'Lainnya:',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Lembaga / Badan Donor',
        value: 'Donor Institution / Agency'
      },
      subsectors: [
        { label: 'Director/Executive', id: 'Director_Executive' },
        { label: 'Project/Program Manager', id: 'Project_Program_Manager' },
        { label: 'Researcher', id: 'Researcher' },
        { label: 'Monitoring/Evaluation', id: 'Monitoring_Evaluation' },
        { label: 'Field/Country Staff', id: 'Field_Country_Staff' },
        {
          label: 'Lainnya:',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'LSM Lokal (nasional atau daerah)',
        value: 'Local NGO (national or subnational)'
      },
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
          label: 'Lainnya:',
          id: 'Other:'
        }
      ]
    },
    {
      sector: { label: 'LSM Internasional', value: 'International NGO' },
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
          label: 'Lainnya:',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'PBB atau Organisasi Internasional',
        value: 'UN or International Organization'
      },
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
          label: 'Lainnya:',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Organisasi Akademis / Penelitian',
        value: 'Academic / Research Organization'
      },
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
          label: 'Lainnya:',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Organisasi Wartawan / Media',
        value: 'Journalist / Media Organization'
      },
      subsectors: [
        { label: 'Reporter', id: 'Reporter' },
        { label: 'Editor', id: 'Editor' },
        {
          label: 'Lainnya:',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Organisasi Masyarakat Adat atau Berbasis Komunitas',
        value: 'Indigenous or Community-Based Organization'
      },
      subsectors: [
        { label: 'Community Leader', id: 'Community_Leader' },
        { label: 'Forest Manager/Monitor', id: 'Forest_Manager_Monitor' },
        { label: 'GIS/Technical Specialist', id: 'GIS_Technical_Specialist' },
        { label: 'Communications Specialist', id: 'Communications_Specialist' },
        {
          label: 'Lainnya:',
          id: 'Other:'
        }
      ]
    },
    {
      sector: { label: 'Sektor swasta', value: 'Private sector' },
      subsectors: [
        { label: 'Supply Chain Manager', id: 'Supply_Chain_Manager' },
        { label: 'Supply Chain Analyst', id: 'Supply_Chain_Analyst' },
        { label: 'Procurement Staff', id: 'Procurement_Staff' },
        { label: 'Retailer/Trader', id: 'Retailer_Trader' },
        { label: 'Land or Concession Owner', id: 'Land_or_Concession_Owner' },
        {
          label: 'Lainnya:',
          id: 'Other:'
        }
      ]
    },
    {
      sector: {
        label: 'Pribadi / Tidak Ada Afiliasi',
        value: 'Individual / No Affiliation'
      },
      subsectors: [
        {
          label: 'Lainnya:',
          id: 'Other:'
        }
      ]
    },
    {
      sector: { label: 'Lainnya:', value: 'Other:' },
      subsectors: [
        {
          label: 'Lainnya:',
          id: 'Other:'
        }
      ]
    }
  ]
};

type Topic = { [key: string]: { label: string; id: string }[] };
export const usage: Topic = {
  en: [
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
  ],
  nl: [
    // * NOTE: translation not provided
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
  ],
  hy: [
    // * NOTE: translation not provided
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
  ],
  ka: [
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
  ],
  fr: [
    {
      label: 'Plaidoyer/Campagne',
      id: 'Advocacy/campaigning'
    },
    {
      label: 'Données ou illustrations pour les blogs ou les articles de presse',
      id: 'Data or visuals for blogs or media stories'
    },
    {
      label: 'Données ou visuels pour des présentations et des rapports',
      id: 'Data or visuals for presentations and reports'
    },
    {
      label: 'Matériel de soutien pédagogique',
      id: 'Educational support materials'
    },
    {
      label: 'Recherche générale',
      id: 'General research'
    },
    {
      label: 'Identifiez les activités illégales',
      id: 'Identify illegal activity'
    },
    {
      label: 'Informez les décisions de financement des subventions/paiements basés sur les résultats',
      id: 'Inform grant funding decisions/results-based payments'
    },
    {
      label: 'Inform purchasing/procurement/investment decisions',
      id: 'Inform purchasing/procurement/investment decisions'
    },
    {
      label: "Planification de l'utilisation des terres/allocation des terres",
      id: 'Land use planning/land use allocation'
    },
    {
      label: 'En savoir plus sur les forêts/mon pays',
      id: 'Learn about forests/my country'
    },
    {
      label: 'Surveillez ou gérez une zone',
      id: 'Monitor or manage an area'
    },
    {
      label: 'Surveiller les résultats/impactes',
      id: 'Monitor results/impacts'
    },
    {
      label: 'Pas sûr ; nouveau à GFW',
      id: 'Not sure; new to GFW'
    },
    {
      label: 'Planifier le travail sur le terrain (patrouilles/enquêtes)',
      id: 'Plan field work (patrols/investigations)'
    },
    {
      label: 'Autre',
      id: 'Other'
    }
  ],
  es: [
    {
      label: 'Defensa/campaña',
      id: 'Advocacy/campaigning'
    },
    {
      label: 'Datos o imágenes para blogs o historias de medios de comunicación',
      id: 'Data or visuals for blogs or media stories'
    },
    {
      label: 'Datos o imágenes para presentaciones e informes',
      id: 'Data or visuals for presentations and reports'
    },
    {
      label: 'Materiales de apoyo educativo',
      id: 'Educational support materials'
    },
    {
      label: 'Investigación general',
      id: 'General research'
    },
    {
      label: 'Identificar actividades ilegales',
      id: 'Identify illegal activity'
    },
    {
      label: 'Informar sobre las decisiones de financiación de las subvenciones/pagos basados en los resultados',
      id: 'Inform grant funding decisions/results-based payments'
    },
    {
      label: 'Informar sobre las decisiones de compra/adquisición/inversión',
      id: 'Inform purchasing/procurement/investment decisions'
    },
    {
      label:
        "PlanifiPlanificación del uso de la tierra/asignación del uso de la tierraation de l'utilisation des terres/allocation des terres",
      id: 'Land use planning/land use allocation'
    },
    {
      label: 'Aprender sobre bosques/mi país',
      id: 'Learn about forests/my country'
    },
    {
      label: 'Vigilar o gestionar un área',
      id: 'Monitor or manage an area'
    },
    {
      label: 'Monitorear resultados/efectos',
      id: 'Monitor results/impacts'
    },
    {
      label: 'No estoy seguro(a); soy nuevo(a) en GFW',
      id: 'Not sure; new to GFW'
    },
    {
      label: 'Planifique el trabajo de campo (patrullas/investigaciones)',
      id: 'Plan field work (patrols/investigations)'
    },
    {
      label: 'Otro',
      id: 'Other'
    }
  ],
  pt: [
    {
      label: 'Ativismo/campanha',
      id: 'Advocacy/campaigning'
    },
    {
      label: 'Dados ou imagens para blogs ou artigos de  mídia',
      id: 'Data or visuals for blogs or media stories'
    },
    {
      label: 'Dados ou imagens para apresentações e relatórios',
      id: 'Data or visuals for presentations and reports'
    },
    {
      label: 'Materiais de apoio educacional',
      id: 'Educational support materials'
    },
    {
      label: 'Pesquisa geral',
      id: 'General research'
    },
    {
      label: 'Identifique atividade ilegal',
      id: 'Identify illegal activity'
    },
    {
      label: 'Informe decisões de financiamento de subsídios/pagamentos baseados em resultados',
      id: 'Inform grant funding decisions/results-based payments'
    },
    {
      label: 'Informar decisões de compras/aquisições/investimentos',
      id: 'Inform purchasing/procurement/investment decisions'
    },
    {
      label: 'Planejamento do uso da terra/alocação do uso da terra',
      id: 'Land use planning/land use allocation'
    },
    {
      label: 'Saiba mais sobre florestas/meu país',
      id: 'Learn about forests/my country'
    },
    {
      label: 'Monitore ou gerencie uma área',
      id: 'Monitor or manage an area'
    },
    {
      label: 'Monitorar resultados/impactos',
      id: 'Monitor results/impacts'
    },
    {
      label: 'Não tenho certeza; novo no GFW',
      id: 'Not sure; new to GFW'
    },
    {
      label: 'Planejar trabalho de campo (patrulhas/investigações)',
      id: 'Plan field work (patrols/investigations)'
    },
    {
      label: 'Outro',
      id: 'Other'
    }
  ],
  id: [
    {
      label: 'Advokasi/kampanye',
      id: 'Advocacy/campaigning'
    },
    {
      label: 'Data atau visual untuk kisah blog atau media',
      id: 'Data or visuals for blogs or media stories'
    },
    {
      label: 'Data atau visual untuk presentasi dan laporan',
      id: 'Data or visuals for presentations and reports'
    },
    {
      label: 'Materi pendukung edukasi',
      id: 'Educational support materials'
    },
    {
      label: 'Penelitian umum',
      id: 'General research'
    },
    {
      label: 'Identifikasi aktivitas ilegal',
      id: 'Identify illegal activity'
    },
    {
      label: 'Memberi masukan untuk keputusan pendanaan hibah/pembayaran berbasis hasil',
      id: 'Inform grant funding decisions/results-based payments'
    },
    {
      label: 'Memberi masukan untuk keputusan pembelian/pengadaan/investasi',
      id: 'Inform purchasing/procurement/investment decisions'
    },
    {
      label: 'Perencanaan penggunaan lahan/alokasi penggunaan lahan',
      id: 'Land use planning/land use allocation'
    },
    {
      label: 'Mempelajari tentang hutan/negara saya',
      id: 'Learn about forests/my country'
    },
    {
      label: 'Pantau atau kelola sebuah area',
      id: 'Monitor or manage an area'
    },
    {
      label: 'Memantau hasil/dampak',
      id: 'Monitor results/impacts'
    },
    {
      label: 'Tidak yakin; pengguna baru GFW',
      id: 'Not sure; new to GFW'
    },
    {
      label: 'Upaya lapangan lahan (patroli/investigasi)',
      id: 'Plan field work (patrols/investigations)'
    },
    {
      label: 'Lainnya',
      id: 'Other'
    }
  ],
  zh: [
    {
      label: '倡导/宣传',
      id: 'Advocacy/campaigning'
    },
    {
      label: '用于博客文章或媒体报道的数据或视觉效果图',
      id: 'Data or visuals for blogs or media stories'
    },
    {
      label: '用于演示和报告的数据或视觉资料',
      id: 'Data or visuals for presentations and reports'
    },
    {
      label: '教育辅助材料',
      id: 'Educational support materials'
    },
    {
      label: '一般研究',
      id: 'General research'
    },
    {
      label: '识别非法活动',
      id: 'Identify illegal activity'
    },
    {
      label: '告知资助金拨款决定／基于结果的付款',
      id: 'Inform grant funding decisions/results-based payments'
    },
    {
      label: '通知购买／采购／投资决策',
      id: 'Inform purchasing/procurement/investment decisions'
    },
    {
      label: '土地使用规划／土地用途分配',
      id: 'Land use planning/land use allocation'
    },
    {
      label: '了解森林/我的国家或地区',
      id: 'Learn about forests/my country'
    },
    {
      label: '监测或管理某片区域',
      id: 'Monitor or manage an area'
    },
    {
      label: '监测结果／影响',
      id: 'Monitor results/impacts'
    },
    {
      label: '不确定；GFW 新手',
      id: 'Not sure; new to GFW'
    },
    {
      label: '规划实地工作（巡逻／调查）',
      id: 'Plan field work (patrols/investigations)'
    },
    {
      label: '其他',
      id: 'Other'
    }
  ]
};

export const topics: Topic = {
  en: [
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
      label: 'General information/Data about forests',
      id: 'General_information_Data_about_forests'
    },
    {
      label: 'Innovations in forest monitoring',
      id: 'Innovations_in_forest_monitoring'
    },
    {
      label: 'My region or country',
      id: 'My_region_or_country'
    },
    {
      label: 'Reforestation/Landscape restoration',
      id: 'Reforestation_Landscape_restoration'
    },
    {
      label: 'Small Grants Fund and Tech Fellowship',
      id: 'Small_Grants_Fund_and_Tech_Fellowship'
    },
    {
      label: 'Watersheds',
      id: 'Watersheds_'
    }
  ],
  nl: [
    // * NOTE: translation not provided
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
      label: 'General information/Data about forests',
      id: 'General_information_Data_about_forests'
    },
    {
      label: 'Innovations in forest monitoring',
      id: 'Innovations_in_forest_monitoring'
    },
    {
      label: 'My region or country',
      id: 'My_region_or_country'
    },
    {
      label: 'Reforestation/Landscape restoration',
      id: 'Reforestation_Landscape_restoration'
    },
    {
      label: 'Small Grants Fund and Tech Fellowship',
      id: 'Small_Grants_Fund_and_Tech_Fellowship'
    },
    {
      label: 'Watersheds',
      id: 'Watersheds_'
    }
  ],
  hy: [
    // * NOTE: translation not provided
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
      label: 'General information/Data about forests',
      id: 'General_information_Data_about_forests'
    },
    {
      label: 'Innovations in forest monitoring',
      id: 'Innovations_in_forest_monitoring'
    },
    {
      label: 'My region or country',
      id: 'My_region_or_country'
    },
    {
      label: 'Reforestation/Landscape restoration',
      id: 'Reforestation_Landscape_restoration'
    },
    {
      label: 'Small Grants Fund and Tech Fellowship',
      id: 'Small_Grants_Fund_and_Tech_Fellowship'
    },
    {
      label: 'Watersheds',
      id: 'Watersheds_'
    }
  ],
  ka: [
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
      label: 'General information/Data about forests',
      id: 'General_information_Data_about_forests'
    },
    {
      label: 'Innovations in forest monitoring',
      id: 'Innovations_in_forest_monitoring'
    },
    {
      label: 'My region or country',
      id: 'My_region_or_country'
    },
    {
      label: 'Reforestation/Landscape restoration',
      id: 'Reforestation_Landscape_restoration'
    },
    {
      label: 'Small Grants Fund and Tech Fellowship',
      id: 'Small_Grants_Fund_and_Tech_Fellowship'
    },
    {
      label: 'Watersheds',
      id: 'Watersheds_'
    }
  ],
  zh: [
    {
      label: '农业供应链',
      id: 'Agricultural_supply_chains'
    },
    {
      label: '生物多样性',
      id: 'Biodiversity'
    },
    {
      label: '气候/碳',
      id: 'Climate_Carbon'
    },
    {
      label: '滥伐（毁林）／森林退化',
      id: 'Deforestation_Forest_Degradation'
    },
    {
      label: '火灾',
      id: 'Fires'
    },
    {
      label: '有关森林的一般信息／数据',
      id: 'General_information_Data_about_forests'
    },
    {
      label: '森林监测创新',
      id: 'Innovations_in_forest_monitoring'
    },
    {
      label: '我的国家或地区',
      id: 'My_region_or_country'
    },
    {
      label: '造林再造/景观恢复',
      id: 'Reforestation_Landscape_restoration'
    },
    {
      label: '小额补助基金和科技奖',
      id: 'Small_Grants_Fund_and_Tech_Fellowship'
    },
    {
      label: '流域 ',
      id: 'Watersheds_'
    }
  ],
  fr: [
    {
      label: "Chaînes d'approvisionnement agricoles",
      id: 'Agricultural_supply_chains'
    },
    {
      label: 'Biodiversité',
      id: 'Biodiversity'
    },
    {
      label: 'Climat/Carbone',
      id: 'Climate_Carbon'
    },
    {
      label: 'Déforestation/dégradation des forêts',
      id: 'Deforestation_Forest_Degradation'
    },
    {
      label: 'Feux',
      id: 'Fires'
    },
    {
      label: 'Informations générales/Données sur les forêts',
      id: 'General_information_Data_about_forests'
    },
    {
      label: 'Innovations en matière de surveillance des forêts',
      id: 'Innovations_in_forest_monitoring'
    },
    {
      label: 'Ma région ou mon pays',
      id: 'My_region_or_country'
    },
    {
      label: 'Reforestation/Restauration des paysages',
      id: 'Reforestation_Landscape_restoration'
    },
    {
      label: 'Fonds de petites subventions et bourse de recherche en technologie',
      id: 'Small_Grants_Fund_and_Tech_Fellowship'
    },
    {
      label: 'Bassins versants',
      id: 'Watersheds_'
    }
  ],
  es: [
    {
      label: 'Cadenas de suministro agrícola',
      id: 'Agricultural_supply_chains'
    },
    {
      label: 'Biodiversidad',
      id: 'Biodiversity'
    },
    {
      label: 'Clima/carbono',
      id: 'Climate_Carbon'
    },
    {
      label: 'Deforestación y degradación forestal',
      id: 'Deforestation_Forest_Degradation'
    },
    {
      label: 'Incendios',
      id: 'Fires'
    },
    {
      label: 'Información general/Datos sobre los bosques',
      id: 'General_information_Data_about_forests'
    },
    {
      label: 'Innovaciones en la monitorización de bosques',
      id: 'Innovations_in_forest_monitoring'
    },
    {
      label: 'Mi región o país',
      id: 'My_region_or_country'
    },
    {
      label: 'Reforestación/Restauración del paisaje',
      id: 'Reforestation_Landscape_restoration'
    },
    {
      label: ' Fondo de pequeñas subvenciones y beca tecnológica',
      id: 'Small_Grants_Fund_and_Tech_Fellowship'
    },
    {
      label: 'Cuencas hidrográficas ',
      id: 'Watersheds_'
    }
  ],
  pt: [
    {
      label: 'Cadeias de suprimentos agrícolas',
      id: 'Agricultural_supply_chains'
    },
    {
      label: 'Biodiversidade',
      id: 'Biodiversity'
    },
    {
      label: 'Clima/Carbono',
      id: 'Climate_Carbon'
    },
    {
      label: 'Desmatamento/Degradação Florestal',
      id: 'Deforestation_Forest_Degradation'
    },
    {
      label: 'Incêndios',
      id: 'Fires'
    },
    {
      label: 'Informações gerais/Dados sobre florestas',
      id: 'General_information_Data_about_forests'
    },
    {
      label: 'Inovações no monitoramento de florestas',
      id: 'Innovations_in_forest_monitoring'
    },
    {
      label: 'Minha região ou país',
      id: 'My_region_or_country'
    },
    {
      label: 'Reflorestamento/Restauração da paisagem',
      id: 'Reforestation_Landscape_restoration'
    },
    {
      label: 'Fundo de pequenos subsídios e bolsa de tecnologia',
      id: 'Small_Grants_Fund_and_Tech_Fellowship'
    },
    {
      label: 'Bacias hidrográficas ',
      id: 'Watersheds_'
    }
  ],
  id: [
    {
      label: 'Rantai pasokan pertanian',
      id: 'Agricultural_supply_chains'
    },
    {
      label: 'Keanekaragaman hayati',
      id: 'Biodiversity'
    },
    {
      label: 'Iklim/Karbon',
      id: 'Climate_Carbon'
    },
    {
      label: 'Deforestasi/Degradasi Hutan',
      id: 'Deforestation_Forest_Degradation'
    },
    {
      label: 'Kebakaran',
      id: 'Fires'
    },
    {
      label: 'Informasi umum/Data tentang hutan',
      id: 'General_information_Data_about_forests'
    },
    {
      label: 'Inovasi dalam pemantauan hutan',
      id: 'Innovations_in_forest_monitoring'
    },
    {
      label: 'Daerah atau negara saya',
      id: 'My_region_or_country'
    },
    {
      label: 'Penghutanan kembali/pemulihan bentang alam',
      id: 'Reforestation_Landscape_restoration'
    },
    {
      label: 'Dana Hibah Kecil dan Beasiswa Teknologi',
      id: 'Small_Grants_Fund_and_Tech_Fellowship'
    },
    {
      label: 'Daerah Aliran Sungai ',
      id: 'Watersheds_'
    }
  ]
};

export const emailLoginTranslations = {
  en: {
    email: 'email',
    password: 'password',
    repeatPassword: 'repeat password',
    required: 'This field is required',
    forgotPassword: 'Forgot Password!',
    signup: ['Not a member?', 'Sign Up!'],
    signin: ['Already joined?', 'Sign In!'],
    registerSuccess:
      "Thank you for registering, please check your email and confirm your account. If it doesn't appear check your spam folder.",
    login: 'Login',
    passwordReset: 'To reset your password, enter your email and follow the instructions.',
    passwordResetSuccess:
      "Thank you. Please, check your inbox and follow instructions to reset your password. If it doesn't appear check your spam folder.",
    reset: 'Reset',
    register: 'Register'
  },
  nl: {
    email: 'email',
    password: 'password',
    repeatPassword: 'repeat password',
    required: 'This field is required',
    forgotPassword: 'Forgot Password!',
    signup: ['Not a member?', 'Sign Up!'],
    signin: ['Already joined?', 'Sign In!'],
    registerSuccess:
      "Thank you for registering, please check your email and confirm your account. If it doesn't appear check your spam folder.",
    login: 'Login',
    passwordReset: 'To reset your password, enter your email and follow the instructions.',
    passwordResetSuccess:
      "Thank you. Please, check your inbox and follow instructions to reset your password. If it doesn't appear check your spam folder.",
    reset: 'Reset',
    register: 'Register'
  }, // * NOTE: dutch translation document only had translation for 'reset' property (string -> Reset)
  hy: {
    email: 'email',
    password: 'password',
    repeatPassword: 'repeat password',
    required: 'This field is required',
    forgotPassword: 'Forgot Password!',
    signup: ['Not a member?', 'Sign Up!'],
    signin: ['Already joined?', 'Sign In!'],
    registerSuccess:
      "Thank you for registering, please check your email and confirm your account. If it doesn't appear check your spam folder.",
    login: 'Login',
    passwordReset: 'To reset your password, enter your email and follow the instructions.',
    passwordResetSuccess:
      "Thank you. Please, check your inbox and follow instructions to reset your password. If it doesn't appear check your spam folder.",
    reset: 'Վերադառնալ սկզբնական կարգավորումներին',
    register: 'Register'
  }, // * NOTE: armenian translation document only had translation for 'reset' property
  ka: {
    email: 'ელ. ფოსტა',
    password: 'პაროლი ',
    repeatPassword: 'Გაიმეორეთ პაროლი',
    required: 'საჭიროა',
    forgotPassword: 'პაროლი დაგავიწყდათ',
    signup: ['არ ხართ წევრი?', 'დარეგისტრირდით'],
    signin: ['უკვე ხართ წევრი?', 'გაიარეთ ავტორიზაცია'],
    registerSuccess:
      "წერილი თუ არ ჩანს, შეამოწმეთ 'სპამის' საქაღალდე. შეგიძლიათ გაეცნოთ ჩვენს კონფიდენციალურობის პოლიტიკას და მიიღოთ დამატებითი ინფორმაცია იმის შესახებ თუ როგორ ვიყენებთ პერსონალურ მონაცემებს",
    login: 'შესვლა',
    passwordReset: 'პაროლის აღსადგენად, მიუთითეთ თქვენი ელ. ფოსტის მისამართი და მიყევით ინსტრუქციას',
    passwordResetSuccess: 'მადლობა. გთხოვთ შეამოწმოთ თქვენი ელ. ფოსტა და მიყვეთ ინსტრუქციას პაროლის აღსადგენად',
    reset: 'ახლიდან ჩატვირთვა',
    register: 'დარეგისტრირდით'
  },
  es: {
    email: 'Correo electrónic',
    password: 'contraseña',
    repeatPassword: 'repita la contraseña',
    required: 'Obligatorio',
    forgotPassword: 'Olvidé mi contraseña',
    signup: ['¿No es miembro? ', '¡Regístrese!'],
    signin: ['¿No es miembro? ', '¡Regístrese!'],
    registerSuccess:
      'Thank you for registering, please check your email and confirm your account. Si no aparece, revise su carpeta de correo no deseado.',
    login: 'Nombre de usuario',
    passwordReset: 'Para restablecer su contraseña, introduzca su correo electrónico y siga las instrucciones.',
    passwordResetSuccess:
      'Gracias. Por favor, revise su bandeja de entrada y siga las instrucciones para restablecer su contraseña. Si no aparece, revise su carpeta de correo no deseado.',
    reset: 'Restablecer',
    register: 'Register'
  },
  fr: {
    email: 'e-mail',
    password: 'mot de passe',
    repeatPassword: 'répétez le mot de pas',
    required: 'Requis',
    forgotPassword: 'Mot de passe oublié',
    signup: ["Vous n'êtes pas membre ", 'Inscrivez-vous !'],
    signin: ["Vous n'êtes pas membre ", 'Inscrivez-vous !'],
    registerSuccess:
      "Thank you for registering, please check your email and confirm your account. S'il n'apparaît pas, vérifiez dans votre dossier spam.",
    login: 'Connexion',
    passwordReset: 'Pour réinitialiser votre mot de passe, entrez votre e-mail et suivez les instructions.',
    passwordResetSuccess:
      "Merci. Consultez votre boîte de réception et suivez les instructions pour réinitialiser votre mot de passeS'il n'apparaît pas, vérifiez dans votre dossier spam",
    reset: 'Réinitialiser',
    register: "S'inscrire"
  },
  pt: {
    email: 'email',
    password: 'SENHA',
    repeatPassword: 'repita a senha',
    required: 'Requerido',
    forgotPassword: 'Esqueci a senha',
    signup: ['Não é um membro? ', 'Registre-se!'],
    signin: ['Não é um membro? ', 'Registre-se!'],
    registerSuccess:
      'Thank you for registering, please check your email and confirm your account. Se não aparecer, verifique sua pasta de spam.',
    login: 'Login',
    passwordReset: 'Para redefinir sua senha, insira seu e-mail e siga as instruções.',
    passwordResetSuccess:
      'Obrigado. Por favor, verifique sua caixa de entrada e siga as instruções para redefinir sua senha. Se não aparecer, verifique sua pasta de spam.',
    reset: 'Redefinir',
    register: "S'inscrire"
  },
  id: {
    email: 'email',
    password: 'SANDI',
    repeatPassword: 'ulangi sandi',
    required: 'Diperlukan',
    forgotPassword: 'Lupa sandi',
    signup: ['Bukan anggota? Silakan', 'mendaftar!'],
    signin: ['Bukan anggota? Silakan ', 'mendaftar!'],
    registerSuccess:
      'Thank you for registering, please check your email and confirm your account. Jika tidak muncul silakan cek folder spam.',
    login: 'log masuk',
    passwordReset: 'Untuk mengatur ulang sandi, masukkan email Anda dan ikuti instruksinya.',
    passwordResetSuccess:
      'Terima kasih. Silakan cek kotak masuk Anda dan ikuti instruksi untuk mengatur ulang sandi. Jika tidak muncul silakan cek folder spam. ',
    reset: 'Atur ulang',
    register: "S'inscrire"
  },
  zh: {
    email: '电子邮件',
    password: '密码',
    repeatPassword: '重复输入密码',
    required: '必填',
    forgotPassword: '忘记密码',
    signup: ['不是会员吗？', '注册！'],
    signin: ['不是会员吗？', '注册！'],
    registerSuccess:
      'Thank you for registering, please check your email and confirm your account. 如果没看到它，请检查您的垃圾文件夹。',
    login: '登录',
    passwordReset: '若要重置密码，请输入您的电子邮件并按照说明操作.',
    passwordResetSuccess: ' 谢谢！请检查您的收件箱，并按照说明重置您的密码。如果没看到它，请检查您的垃圾文件夹。',
    reset: '重置',
    register: "S'inscrire"
  }
};

export const editProfileTranslations = {
  en: {
    profileHeader: 'Your Profile',
    profileSubheader:
      "We use this information to make Global Forest Watch more useful for you. Your privacy is important to us and we'll never share your information without your consent.",
    fName: 'First Name',
    lName: 'Last Name',
    required: 'This field is required',
    email: 'email',
    sector: 'Sector',
    role: 'Role',
    jobTitle: 'Job Title',
    company: 'Company / Organization',
    located: 'Where are you located?',
    country: 'Country',
    city: 'City',
    state: 'state / department / province',
    interest: 'What area are you most interested in?',
    topics: 'what topics are you interested in?',
    selectAll: 'select all that apply',
    howUse: 'how do you use global forest watch?',
    delete: ['Email us', 'to delete your MyGFW account.'],
    success: [
      'Thank you for updating your My GFW profile!',
      'You may wish to read our',
      'privacy policy',
      'which provides further information about how we use personal data.'
    ],
    save: 'SAVE',
    back: 'BACK TO MY PROFILE'
  },
  hy: {
    // * NOTE: translation not provided
    profileHeader: 'Your Profile',
    profileSubheader:
      "We use this information to make Global Forest Watch more useful for you. Your privacy is important to us and we'll never share your information without your consent.",
    fName: 'First Name',
    lName: 'Last Name',
    required: 'This field is required',
    email: 'email',
    sector: 'Sector',
    role: 'Role',
    jobTitle: 'Job Title',
    company: 'Company / Organization',
    located: 'Where are you located?',
    country: 'Country',
    city: 'City',
    state: 'state / department / province',
    interest: 'What area are you most interested in?',
    topics: 'what topics are you interested in?',
    selectAll: 'select all that apply',
    howUse: 'how do you use global forest watch?',
    delete: ['Email us', 'to delete your MyGFW account.'],
    success: [
      'Thank you for updating your My GFW profile!',
      'You may wish to read our',
      'privacy policy',
      'which provides further information about how we use personal data.'
    ],
    save: 'SAVE',
    back: 'BACK TO MY PROFILE'
  },
  nl: {
    // * NOTE: translation not provided
    profileHeader: 'Your Profile',
    profileSubheader:
      "We use this information to make Global Forest Watch more useful for you. Your privacy is important to us and we'll never share your information without your consent.",
    fName: 'First Name',
    lName: 'Last Name',
    required: 'This field is required',
    email: 'email',
    sector: 'Sector',
    role: 'Role',
    jobTitle: 'Job Title',
    company: 'Company / Organization',
    located: 'Where are you located?',
    country: 'Country',
    city: 'City',
    state: 'state / department / province',
    interest: 'What area are you most interested in?',
    topics: 'what topics are you interested in?',
    selectAll: 'select all that apply',
    howUse: 'how do you use global forest watch?',
    delete: ['Email us', 'to delete your MyGFW account.'],
    success: [
      'Thank you for updating your My GFW profile!',
      'You may wish to read our',
      'privacy policy',
      'which provides further information about how we use personal data.'
    ],
    save: 'SAVE',
    back: 'BACK TO MY PROFILE'
  },
  fr: {
    profileHeader: 'Votre profil',
    profileSubheader:
      'Nous utilisons ces informations pour que Global Forest Watch vous soit plus utile. La protection de votre vie privée est importante pour nous et nous ne partagerons jamais vos informations sans votre consentement.',
    fName: 'PRÉNOM',
    lName: 'NOM/PRÉNOM',
    required: 'Requis',
    email: 'E-MAIL',
    sector: 'SECTEUR',
    role: 'RÔLE',
    jobTitle: 'TITRE DU POSTE',
    company: 'SOCIÉTÉ/ORGANISATION',
    located: 'Où vous trouvez-vous ?',
    country: 'PAYS',
    city: 'VILLE',
    state: 'ÉTAT / DÉPARTEMENT / PROVINCE',
    interest: 'Quel est le domaine qui vous intéresse le plus ?',
    topics: 'QUELS SONT LES SUJETS QUI VOUS INTÉRESSENT ?',
    selectAll: "SÉLECTIONNEZ TOUT CE QUI S'APPLIQUE.",
    howUse: 'COMMENT UTILISEZ-VOUS GLOBAL FOREST WATCH ?',
    delete: ['Envoyez-nous un e-mail', 'pour supprimer votre compte MyGFW.'],
    success: [
      'Thank you for updating your My GFW profile!',
      'You may wish to read our',
      'privacy policy',
      'which provides further information about how we use personal data.'
    ],
    save: 'ENREGISTRER',
    back: 'BACK TO MY PROFILE'
  },
  es: {
    profileHeader: 'Su perfil',
    profileSubheader:
      'Utilizamos esta información para lograr que Global Forest Watch sea más útil para usted. Su privacidad es importante para nosotros y nunca compartiremos su información sin su consentimiento.',
    fName: 'NOMBRE DE PILA',
    lName: 'APELLIDOS',
    required: 'Obligatorio',
    email: 'CORREO ELECTRÓNICO',
    sector: 'SECTOR',
    role: 'FUNCIÓN',
    jobTitle: 'CARGO',
    company: 'EMPRESA/ORGANIZACIÓN',
    located: '¿Dónde se encuent?ra',
    country: 'PAÍS',
    city: 'CIUDAD',
    state: 'ESTADO/DIVISIÓN/PROVINCIA',
    interest: '¿Qué es lo que más le interesa?',
    topics: '¿QUÉ TEMAS LE INTERESAN ',
    selectAll: 'SELECCIONE TODAS LAS OPCIONES QUE CORRESPONDAN.',
    howUse: '¿CÓMO USA GLOBAL FOREST WATCH',
    delete: ['Envíenos un correo electrónio', 'para eliminar su cuenta de MyGFW.'],
    success: [
      'Thank you for updating your My GFW profile!',
      'You may wish to read our',
      'privacy policy',
      'which provides further information about how we use personal data.'
    ],
    save: 'GUARDAR',
    back: 'BACK TO MY PROFILE'
  },
  pt: {
    profileHeader: 'Seu perfil',
    profileSubheader:
      'Usamos essas informações para tornar o Global Forest Watch mais útil para você. Sua privacidade é importante para nós, e nunca compartilharemos suas informações sem o seu consentimento.',
    fName: 'PRIMEIRO NOME',
    lName: 'ÚLTIMO NOME/SOBRENOME',
    required: 'Requerido',
    email: 'E-MAIL',
    sector: 'SETOR',
    role: 'FUNÇÃO',
    jobTitle: 'CARGO',
    company: 'EMPRESA / ORGANIZAÇÃO',
    located: 'Onde você está localiza?',
    country: 'PAÍS',
    city: 'CIDADE',
    state: 'ESTADO /DEPARTAMENTO / PROVÍNCIA',
    interest: 'Em que área você está mais interessado?',
    topics: 'EM QUAIS TÓPICOS VOCÊ ESTÁ INTERESSADO?',
    selectAll: 'SELECIONE TUDO QUE SE APLICA.',
    howUse: 'COMO VOCÊ USA O GLOBAL FOREST WATCH?',
    delete: ['Envie-nos um e-mail', ' para excluir sua conta no Meu GFW.'],
    success: [
      'Thank you for updating your My GFW profile!',
      'You may wish to read our',
      'privacy policy',
      'which provides further information about how we use personal data.'
    ],
    save: 'SALVAR',
    back: 'BACK TO MY PROFILE'
  },
  ka: {
    profileHeader: 'Your Profile',
    profileSubheader:
      "We use this information to make Global Forest Watch more useful for you. Your privacy is important to us and we'll never share your information without your consent.",
    fName: 'First Name',
    lName: 'Last Name',
    required: 'This field is required',
    email: 'email',
    sector: 'Sector',
    role: 'Role',
    jobTitle: 'Job Title',
    company: 'Company / Organization',
    located: 'Where are you located?',
    country: 'Country',
    city: 'City',
    state: 'state / department / province',
    interest: 'What area are you most interested in?',
    topics: 'what topics are you interested in?',
    selectAll: 'select all that apply',
    howUse: 'how do you use global forest watch?',
    delete: ['Email us', 'to delete your MyGFW account.'],
    success: [
      'Thank you for updating your My GFW profile!',
      'You may wish to read our',
      'privacy policy',
      'which provides further information about how we use personal data.'
    ],
    save: 'SAVE',
    back: 'BACK TO MY PROFILE'
  },
  zh: {
    profileHeader: '您的资料',
    profileSubheader:
      '我们需要使用这些信息以使 Global Forest Watch 对您更为有用。您的隐私对我们来说很重要。未经您的同意，我们绝不会分享您的信息。',
    fName: '名字',
    lName: '姓氏',
    required: '必填',
    email: '电子邮件',
    sector: '部门',
    role: '职责',
    jobTitle: '职位',
    company: '公司/组织',
    located: '您在哪里？',
    country: '国家/地区',
    city: '城市',
    state: '州/部门/省',
    interest: '您对什么区域最感兴趣？',
    topics: '您对哪些主题感兴趣？',
    selectAll: '选择所有适用项',
    howUse: '您如何使用 Global Forest Watch？',
    delete: ['如需删除您的 MyGFW 账户，请', '给我们发电子邮件联系'],
    success: [
      'Thank you for updating your My GFW profile!',
      'You may wish to read our',
      'privacy policy',
      'which provides further information about how we use personal data.'
    ],
    save: '保存',
    back: 'BACK TO MY PROFILE'
  },
  id: {
    profileHeader: 'Profil Anda',
    profileSubheader:
      'Kami menggunakan informasi ini untuk menjadikan Global Forest Watch lebih bermanfaat bagi Anda. Privasi Anda penting bagi kami dan kami takkan pernah menyebarkan informasi tanpa persetujuan Anda.',
    fName: 'nama depan',
    lName: 'nama belakang',
    required: 'Diperlukan',
    email: 'email',
    sector: 'SEKTOR',
    role: 'TUGAS',
    jobTitle: 'JABATAN',
    company: 'PERUSAHAAN / ORGANISASI',
    located: 'Di mana lokasi Anda?',
    country: 'NEGARA',
    city: 'KOTA',
    state: 'NEGARA BAGIAN / DEPARTEMEN / PROVINSI',
    interest: 'Di daerah mana Anda paling berminat?',
    topics: 'TOPIK APA YANG ANDA MINATI?',
    selectAll: 'PILIH SEMUA YANG BERLAKU.',
    howUse: 'BAGAIMANA ANDA MENGGUNAKAN GLOBAL FOREST WATCH?',
    delete: ['Kirim email kepada kami', ' untuk menghapus akun MyGFW Anda.'],
    success: [
      'Thank you for updating your My GFW profile!',
      'You may wish to read our',
      'privacy policy',
      'which provides further information about how we use personal data.'
    ],
    save: 'SIMPAN',
    back: 'BACK TO MY PROFILE'
  }
};
