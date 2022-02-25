export const CHECK_LOGGED_URL = 'https://api.resourcewatch.org/auth/check-logged';

//TODO: export to type files
export interface UserData {
  type: string;
  id: string;
  attributes: Attributes;
}

export interface Attributes {
  firstName: string;
  lastName: string; //req
  email: string; //req
  createdAt: string;
  sector: string; //req
  primaryResponsibilities: string[];
  subsector: string;
  jobTitle: string;
  company: string; //req
  fullName?: string;
  country?: string; //req
  state: string;
  city?: string;
  aoiCountry: string;
  aoiCity: string;
  aoiState: string;
  interests: string[];
  howDoYouUse: string[]; //req
  signUpForTesting: boolean;
  signUpToNewsletter: boolean;
  topics: string[]; //req
  profileComplete: boolean;
  usageOther?: string;
  roleOther?: string;
}

const requiredFields = ['lastName', 'email', 'sector', 'company', 'country', 'howDoYouUse', 'subsector'];
/**
 * Checks returned user profile data object for the presence of all required data fields
 * @param {UserData} {userData} data object for user fields in profile
 * @returns {array} array representing missing required keys in data
 */
export function allRequiredFieldsPresent(userData: UserData): Array<string> {
  const missingKeys: string[] = [];
  for (const requiredKey of requiredFields) {
    const value = userData.attributes[requiredKey];
    if (!value || value.length === 0 || (Array.isArray(value) && value.every(k => k.length === 0))) {
      missingKeys.push(requiredKey);
    }
  }
  return missingKeys;
}

interface GetUserData {
  userData: UserData | null;
  error: boolean;
  errorMsg: string;
}
export async function getUserData(
  userID?: string | null,
  userToken?: string | null,
  type?: string
): Promise<GetUserData> {
  const result: GetUserData = {
    userData: null,
    error: false,
    errorMsg: ''
  };
  if (!userID || !userToken) return result;
  const BASE_PROFILE_URL = `https://production-api.globalforestwatch.org/user/${userID}`;
  let error = false;
  let errorMsg = '';
  let method = 'GET';
  if (type === 'user-profile') {
    method = 'PATCH';
  }
  const userData = (await fetch(BASE_PROFILE_URL, {
    method: method,
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${userToken}`
    }
  })
    .then(res => res.json())
    .then((data: any) => {
      if (data?.errors) {
        error = true;
        errorMsg = data.errors[0].detail;
        return;
      } else {
        return data?.data;
      }
      // debugger;
      // return data?.data;
    })
    .catch(e => {
      console.log(e);
      error = true;
      return null;
    })) as UserData;
  return {
    userData: userData || null,
    error: error,
    errorMsg: errorMsg
  };
}
