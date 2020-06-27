import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { RootState } from 'js/store';
import 'css/formInputs.scss';
import 'css/editProfile.scss';

const EditProfile = (): JSX.Element => {
  const customColorTheme = useSelector(
    (store: RootState) => store.appSettings.customColorTheme
  );
  const { register, handleSubmit, errors } = useForm();

  const onDefaultSubmit = (data: any): void => {
    console.log(data);
  };

  const sectors = [
    {
      Government: [
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
      'Donor Institution / Agency': [
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
      'Local NGO (national or subnational)': [
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
      'International NGO': [
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
      'UN or International Organization': [
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
      'Academic / Research Organization': [
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
      'Journalist / Media Organization': [
        { label: 'Reporter', id: 'Reporter' },
        { label: 'Editor', id: 'Editor' },
        {
          label: 'Other',
          id: 'Other: '
        }
      ]
    },
    {
      'Indigenous or Community-Based Organization': [
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
      'Private sector': [
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
      'Individual / No Affiliation': [
        {
          label: 'Other',
          id: 'Other: '
        }
      ]
    },
    {
      'Other:': [
        {
          label: 'Other',
          id: 'Other: '
        }
      ]
    }
  ];

  /*
   *
   * sector: 'Individual / No Affiliation', subsector: 'Other: na'
   */

  //https://production-api.globalforestwatch.org/user/5e174a050e4ae500105d3d4e --

  // {
  // "type": "user",
  // "id": "5e174a050e4ae500105d3d4e",
  // "attributes": {
  //   "firstName": "Vaidotas",
  //   "lastName": "Piekus",
  //   "email": "vpiekus@blueraster.com",
  //   "createdAt": "2020-06-10T16:59:19.718Z",
  //   "sector": "Individual / No Affiliation",
  //   "primaryResponsibilities": [],
  //   "subsector": "Other: na",
  //   "jobTitle": "dev",
  //   "company": "Blue Raster LLC",
  //   "country": "USA",
  //   "aoiCountry": "USA",
  //   aoiState: 'dc'
  //   "interests": [
  //     "Agricultural_supply_chains"
  //   ],
  //   "howDoYouUse": [
  //     "Advocacy/campaigning"
  //   ],
  //   "signUpForTesting": false,
  //   "signUpToNewsletter": false,
  //   "topics": [],
  //   "profileComplete": false
  // }
  // }

  return (
    <div className="edit-profile-container">
      <h2>Your profile</h2>
      <p>
        {
          "We use this information to make Global Forest Watch more useful for you. Your privacy is important to us and we'll never share your information without your consent."
        }
      </p>
      <div>
        <form onSubmit={handleSubmit(onDefaultSubmit)}>
          <div className="form-section">
            <label htmlFor="firstName" className="input-label">
              first name
            </label>
            <input
              className="input-text"
              type="firstName"
              placeholder="First Name"
              name="firstName"
              ref={register({ required: false })}
            />
            {errors.fname && (
              <p className="input-error">This field is required</p>
            )}
          </div>
          <div className="form-section">
            <label htmlFor="lastName" className="input-label">
              last name *
            </label>
            <input
              className="input-text"
              type="lastName"
              placeholder="Last Name"
              name="lastName"
              ref={register({ required: true })}
            />
            {errors.lname && (
              <p className="input-error">This field is required</p>
            )}
          </div>
          <div className="form-section">
            <label htmlFor="email" className="input-label">
              email *
            </label>
            <input
              className="input-text"
              type="email"
              placeholder="example@globalforestwatch.com"
              name="email"
              ref={register({ required: true })}
            />
            {errors.email && (
              <p className="input-error">This field is required</p>
            )}
          </div>
          <div className="form-section">
            <p>Sector</p>
          </div>
          <div className="form-section">
            <p>Role</p>
          </div>
          <div className="form-section">
            <label htmlFor="jobTitle" className="input-label">
              job title
            </label>
            <input
              className="input-text"
              type="jobTitle"
              placeholder="Job Title"
              name="jobTitle"
              ref={register({ required: false })}
            />
          </div>
          <div className="form-section">
            <label htmlFor="company" className="input-label">
              company / organization *
            </label>
            <input
              className="input-text"
              type="company"
              placeholder="Company / Organization"
              name="company"
              ref={register({ required: true })}
            />
            {errors.company && (
              <p className="input-error">This field is required</p>
            )}
          </div>

          <h4>Where are you located?</h4>
          <div className="form-section">
            <p>Country Picker</p>
          </div>
          <div className="form-section">
            <label htmlFor="city" className="input-label">
              city
            </label>
            <input
              className="input-text"
              type="city"
              placeholder="Company / Organization"
              name="city"
              ref={register({ required: false })}
            />
          </div>
          <div className="form-section">
            <label htmlFor="aoiState" className="input-label">
              state / department / province
            </label>
            <input
              className="input-text"
              type="aoiState"
              placeholder="State / Department / Province"
              name="aoiState"
              ref={register({ required: false })}
            />
          </div>
          <h4>What area are you most interested in?</h4>
          <input
            className="orange-button profile-submit"
            style={{ backgroundColor: customColorTheme, width: '120px' }}
            type="submit"
            value="Save"
          />
        </form>
      </div>
      <p>
        <a
          href="mailto:gfw@wri-org"
          style={{ cursor: 'pointer', color: customColorTheme }}
        >
          Email us
        </a>{' '}
        to delete your MyGFW account.
      </p>
    </div>
  );
};

export default EditProfile;
