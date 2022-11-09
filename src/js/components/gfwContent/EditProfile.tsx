import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../js/store';
import '../../../css/formInputs.scss';
import '../../../css/editProfile.scss';
import { allRequiredFieldsPresent, Attributes, getUserData } from './utils';
import { setIsProfileComplete } from '../../store/appState/actions';
import { SuccessScreen } from './SuccessScreen';
import ProfileForm from './ProfileForm';
import { handleCustomColorTheme } from '../../../utils';

const LoadingScreen = () => {
  return <div style={{ padding: 50 }}>User profile loading...</div>;
};

const EditProfile = (): JSX.Element => {
  const customColorTheme = useSelector((store: RootState) => store.appSettings.customColorTheme);
  const selectedLanguage = useSelector((store: RootState) => store.appState.selectedLanguage);
  const isProfileComplete = useSelector((store: RootState) => store.appState.isProfileComplete);

  const [existingProfileInfo, setExistingProfileInfo] = React.useState<Attributes | any>({});
  const [updateSuccess, setUpdateSuccess] = React.useState(false);
  const [dataLoading, setDataLoading] = React.useState(true);
  const [updateError, setUpdateError] = React.useState();
  const [userInfo, setUserInfo] = React.useState<{
    userToken: null | string;
    userID: null | string;
    profileURL: null | string;
  }>({ userToken: null, userID: null, profileURL: null });

  const dispatch = useDispatch();

  const themeColor = handleCustomColorTheme(customColorTheme);

  React.useEffect(() => {
    setDataLoading(true);
    const userID = localStorage.getItem('userID');
    const userToken = localStorage.getItem('userToken');
    const profileURL = `https://production-api.globalforestwatch.org/user/${userID}`;
    const userData = async () => {
      const data = await getUserData(userID, userToken);
      const userData = data.userData;
      if (data?.error) {
        //hande error
        console.log('Err:', data.errorMsg);
        dispatch(setIsProfileComplete(false));
        setDataLoading(false);
      }
      if (data?.userData?.attributes) {
        const profileData = userData?.attributes;
        if (profileData?.fullName) {
          const name = profileData.fullName.split(' ');
          profileData.firstName = name[0];
          profileData.lastName = name[1];
        }
        // if (data?.userData?.attributes?.sector) {
        // const sectorIdx = sectors[selectedLanguage].findIndex(
        //   sector => sector?.sector?.value === data?.userData?.attributes?.sector
        // );
        // }
        setUserInfo({ userToken, userID, profileURL });
        setExistingProfileInfo(data.userData.attributes);
        dispatch(setIsProfileComplete(allRequiredFieldsPresent(data.userData).length === 0));
        setDataLoading(false);
      }
    };
    userData();
  }, []);

  const onSubmit = (data: any): void => {
    const userID = localStorage.getItem('userID');
    const userToken = localStorage.getItem('userToken');
    const payload = {
      ...data,
      id: userInfo.userID,
      loggedIn: true,
    };

    if (payload.subsector) {
      if (payload.subsector.toLowerCase().includes('other') && data?.roleOther?.length !== 0) {
        payload.subsector = `Other:${data.roleOther}`;
      }
    }

    if (payload.howDoYouUse.includes('Other') && data?.usageOther?.length !== 0) {
      const usageArr = payload.howDoYouUse.map((usage) => {
        if (usage === 'Other') {
          return `${usage}: ${data.usageOther}`;
        } else {
          return usage;
        }
      });
      payload.howDoYouUse = usageArr;
    }
    let profileURL: any = userInfo.profileURL;
    if (!userInfo.profileURL) {
      profileURL = `https://production-api.globalforestwatch.org/user/${userID}`;
    }
    //Update the API
    fetch(profileURL, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${userInfo.userToken || userToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((msg) => {
        if (msg?.errors) {
          setUpdateError(msg.errors[0].detail);
          dispatch(setIsProfileComplete(true));
        } else {
          setUpdateSuccess(true);
          setExistingProfileInfo(msg?.data.attributes);
          dispatch(setIsProfileComplete(allRequiredFieldsPresent(msg?.data).length === 0));
        }
      })
      .catch((e) => {
        console.log(e);
        setUpdateError(e);
      });
  };

  return (
    <div className="edit-profile-container">
      {!updateSuccess && !dataLoading && (
        <ProfileForm
          selectedLanguage={selectedLanguage}
          isProfileComplete={isProfileComplete}
          onSubmit={onSubmit}
          customColorTheme={themeColor}
          defaultValues={existingProfileInfo}
        />
      )}
      {updateSuccess && <SuccessScreen setUpdateSuccess={setUpdateSuccess} />}
      {dataLoading && <LoadingScreen />}
    </div>
  );
};

export default EditProfile;
