import * as React from 'react';
import { useState, useEffect } from 'react';
import { loadModules } from 'esri-loader';
import MapContent from './MapContent';
import Header from './header/Header';
import ModalCard from './modal/modalCard';
import { RootState } from '../../js/store/index';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../js/components/sharedComponents/Loader';
import { overwriteSettings } from '../../js/store/appSettings/actions';
import { setIsProfileComplete, setLoggedIn } from '../../js/store/appState/actions';
import { AppSettings } from '../../js/store/appSettings/types';
import {
  checkForReportView,
  loadGoogleAnalytics,
  changeDefaultLanguage,
  attachCMSEventHandlers,
} from '../helpers/appLoading';
import resources from '../../../configs/resources';
import { allRequiredFieldsPresent, CHECK_LOGGED_URL, getUserData } from './gfwContent/utils';
import { mapController } from '../controllers/mapController';
import '../../css/index.scss';

const App = (props: AppSettings | any): JSX.Element => {
  //Check for Report param in the URL (if that exists, we render a report view instead of our full scale application
  const reportView = checkForReportView();
  const [showGlobalSpinner, setShowGlobalSpinner] = useState(true);
  const dispatch = useDispatch();
  //Listen to map loading state that comes from mapController via redux store change
  const hideHeader = useSelector((store: RootState) => store.appSettings.hideHeader);
  const sharinghost = useSelector((store: RootState) => store.appSettings.sharinghost);
  const analyticsCode = useSelector((store: RootState) => store.appSettings.analyticsCode);

  loadGoogleAnalytics(analyticsCode);

  const fetchPortalInfo = async (appID: string) => {
    const [Portal, PortalItem] = await loadModules(['esri/portal/Portal', 'esri/portal/PortalItem']);

    // APPID existing on the URL indicates that mapbuilder is loaded using arcgis template and we need to fetch settings using that app id to overwrite our default settings
    const portalURL = sharinghost || 'https://www.arcgis.com';
    const portalA = new Portal({ url: portalURL });
    const portItem = new PortalItem({ id: appID, portal: portalA });
    portItem
      .fetchData('json')
      .then((res) => {
        const { values } = res;
        // const geoJSONData = [
        //   {
        //     url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson',
        //     title: 'geoJSON test data',
        //     symbolColor: '',
        //     definitionExpression: '',
        //   },
        // ];
        const geoJSONData = [
          {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Polygon',
                  coordinates: [
                    [
                      [-77.826571, 39.939225, 0],
                      [-77.958217, 39.79177, 0],
                      [-77.521237, 39.713641, 0],
                      [-77.185001, 39.834311, 0],
                      [-77.825715, 39.941826, 0],
                      [-77.826571, 39.939225, 0],
                    ],
                  ],
                },
                properties: {
                  start: '2022-10-27T12:21:35.527-04:00',
                  end: '2022-10-27T12:24:12.686-04:00',
                  today: '2022-10-26',
                  username: 'username not found',
                  phonenumber: 'phonenumber not found',
                  'group_ui8ry81/La_date_d_aujourd_hui': '2022-10-27',
                  'group_ui8ry81/_2_Pr_nom_et_nom_enqu_teur': 'Kristine L',
                  'group_ui8ry81/_Enregistrer_votre_position_actuelle_latitude': '38.565348',
                  'group_ui8ry81/_Enregistrer_votre_position_actuelle_longitude': '-77.123007',
                  'group_ui8ry81/_Enregistrer_votre_position_actuelle_altitude': '0',
                  'group_ui8ry81/_Enregistrer_votre_position_actuelle_precision': '0',
                  'group_cd6am98/Pr_nom_s_du_Producteur': 'K',
                  'group_cd6am98/Le_nom_du_producteur': 'K',
                  'group_cd6am98/_3_Ajouter_num_ro_d_f_d_exploitation_CE': '1',
                  'group_cd6am98/T_l_phone_du_producteur': '1',
                  'group_cd6am98/Genre': 'female',
                  'group_cd6am98/Tranche_d_ge': '20_30_years',
                  'group_cd6am98/Quel_est_le_nom_de_votre_commu_001': 'bouss',
                  'Partie_3_Qualit_et_diversit_/Pratiquez_vous_la_RNA_': 'oui',
                  'Partie_3_Qualit_et_diversit_/Did_you_follow_any_training_on': 'yes',
                  'Partie_3_Qualit_et_diversit_/De_qui_quelle_de_str_la_formation_en_RNA': '1',
                  'Partie_3_Qualit_et_diversit_/Depuis_combien_de_temps_pratiq': '1___3_ans',
                  'Partie_3_Qualit_et_diversit_/What_types_of_restoration_meth': 'za',
                  'Partie_3_Qualit_et_diversit_/Voulez_vous_soumettr_otre_champs_sur_RNA_': 'oui',
                  'Partie_3_Qualit_et_diversit_/le_nombre_d_arbres': '1',
                  'Partie_3_Qualit_et_diversit_/Please_tell_us_the_local_nam': 'Adansonia',
                  'Partie_3_Qualit_et_diversit_/Savez_vous_quel_ge_opri_t_en_ann_es': 'moins_de_1_an',
                  'Partie_3_Qualit_et_diversit_/Connaissez_vous_la_h_opri_t_en_m_tres': 'entre_3_et_5_m_tres',
                  'Partie_3_Qualit_et_diversit_/Quels_de_types_de_pressions_su': 'divagation_des_animaux',
                  'Partie_3_Qualit_et_diversit_/Si_oui_tes_vous_propri_taire': 'don',
                  'Partie_3_Qualit_et_diversit_/_1_Ma_terre_est_plus_erte_qu_il_y_a_un_an': 'vrai',
                  'Partie_3_Qualit_et_diversit_/_2_Il_y_a_plus_d_arbres_sur_mon_terrain': 'vrai',
                  'Partie_3_Qualit_et_diversit_/_3_Il_y_a_plus_de_pieds_sur_mon_terrain': 'vrai',
                  'Partie_3_Qualit_et_diversit_/_4_Le_sol_est_plus_fix': 'vrai',
                  'Partie_3_Qualit_et_diversit_/_5_Plus_d_arbres_sur_es_conditions_du_sol': 'vrai',
                  'Partie_4_Socio_economic/Are_you_part_of_the_Village_Co': 'no',
                  'Partie_4_Socio_economic/Does_your_VC_has_an_annual_pla': 'no',
                  'Partie_4_Socio_economic/You_mentioned_before_that_you_': 'Non',
                  'Partie_4_Socio_economic/Votre_comit_villageois_promeu': 'yes',
                  'Partie_4_Socio_economic/If_Yes_how_does_the_VC_show_i': 'providing_training',
                  'Partie_4_Socio_economic/Avez_vous_b_n_ficier_des_mesur': 'petits_mat_riels_d_lagage',
                  'Partie_4_Socio_economic/Pourriez_vous_s_il_v_es_dans_votre_m_nage': '1',
                  'Partie_4_Socio_economic/Does_your_agricultural_field_p': 'yes',
                  'Partie_4_Socio_economic/If_Yes_what_types_of_food_p': 'mil',
                  'Partie_4_Socio_economic/Quels_types_de_produits_d_riv_': 'jus__fait___base_des_fruits',
                  'Partie_4_Socio_economic/Does_your_agricultural_field_p_001': 'yes',
                  'Partie_4_Socio_economic/Are_you_part_of_a_agro_cooper': 'yes',
                  'Partie_4_Socio_economic/Quel_est_le_nom_de_la_coop_ration_': 'Test',
                  'group_aw6cw94/la_superficie_de_vos_champ_carte':
                    '39.939225 -77.826571 0 0;39.941826 -77.825715 0 0;39.834311 -77.185001 0 0;39.713641 -77.521237 0 0;39.79177 -77.958217 0 0;39.939225 -77.826571 0 0',
                  'group_aw6cw94/Avez_vous_un_autre_champ': 'si',
                  'group_aw6cw94/Veuillez_indiquer_su_erficie_de_vos_champ':
                    '42.836703 -74.94311 0 0;41.60004 -76.783921 0 0;41.807277 -74.240384 0 0;42.564334 -74.053719 0 0;42.836703 -74.94311 0 0',
                  'group_aw6cw94/Avez_vous_un_autre_champ_001': 'non',
                  'group_aw6cw94/la_superficie_de_vot_champ_en_hectares': '10',
                },
              },
            ],
          },
        ];

        console.log('new property geoJSONData:', geoJSONData);

        const updatedData = {
          ...resources,
          ...props,
          ...values,
          // webmap: '867c7e7d37ef402a81b43853f8267cf2',
          geoJSONData,
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [-74.94311, 42.836703, 0],
                [-76.783921, 41.60004, 0],
                [-74.240384, 41.807277, 0],
                [-74.053719, 42.564334, 0],
                [-74.94311, 42.836703, 0],
              ],
            ],
          },
          properties: {
            start: '2022-10-27T12:21:35.527-04:00',
            end: '2022-10-27T12:24:12.686-04:00',
            today: '2022-10-26',
            username: 'username not found',
            phonenumber: 'phonenumber not found',
            'group_ui8ry81/La_date_d_aujourd_hui': '2022-10-27',
            'group_ui8ry81/_2_Pr_nom_et_nom_enqu_teur': 'Kristine L',
            'group_ui8ry81/_Enregistrer_votre_position_actuelle_latitude': '38.565348',
            'group_ui8ry81/_Enregistrer_votre_position_actuelle_longitude': '-77.123007',
            'group_ui8ry81/_Enregistrer_votre_position_actuelle_altitude': '0',
            'group_ui8ry81/_Enregistrer_votre_position_actuelle_precision': '0',
            'group_cd6am98/Pr_nom_s_du_Producteur': 'K',
            'group_cd6am98/Le_nom_du_producteur': 'K',
            'group_cd6am98/_3_Ajouter_num_ro_d_f_d_exploitation_CE': '1',
            'group_cd6am98/T_l_phone_du_producteur': '1',
            'group_cd6am98/Genre': 'female',
            'group_cd6am98/Tranche_d_ge': '20_30_years',
            'group_cd6am98/Quel_est_le_nom_de_votre_commu_001': 'bouss',
            'Partie_3_Qualit_et_diversit_/Pratiquez_vous_la_RNA_': 'oui',
            'Partie_3_Qualit_et_diversit_/Did_you_follow_any_training_on': 'yes',
            'Partie_3_Qualit_et_diversit_/De_qui_quelle_de_str_la_formation_en_RNA': '1',
            'Partie_3_Qualit_et_diversit_/Depuis_combien_de_temps_pratiq': '1___3_ans',
            'Partie_3_Qualit_et_diversit_/What_types_of_restoration_meth': 'za',
            'Partie_3_Qualit_et_diversit_/Voulez_vous_soumettr_otre_champs_sur_RNA_': 'oui',
            'Partie_3_Qualit_et_diversit_/le_nombre_d_arbres': '1',
            'Partie_3_Qualit_et_diversit_/Please_tell_us_the_local_nam': 'Adansonia',
            'Partie_3_Qualit_et_diversit_/Savez_vous_quel_ge_opri_t_en_ann_es': 'moins_de_1_an',
            'Partie_3_Qualit_et_diversit_/Connaissez_vous_la_h_opri_t_en_m_tres': 'entre_3_et_5_m_tres',
            'Partie_3_Qualit_et_diversit_/Quels_de_types_de_pressions_su': 'divagation_des_animaux',
            'Partie_3_Qualit_et_diversit_/Si_oui_tes_vous_propri_taire': 'don',
            'Partie_3_Qualit_et_diversit_/_1_Ma_terre_est_plus_erte_qu_il_y_a_un_an': 'vrai',
            'Partie_3_Qualit_et_diversit_/_2_Il_y_a_plus_d_arbres_sur_mon_terrain': 'vrai',
            'Partie_3_Qualit_et_diversit_/_3_Il_y_a_plus_de_pieds_sur_mon_terrain': 'vrai',
            'Partie_3_Qualit_et_diversit_/_4_Le_sol_est_plus_fix': 'vrai',
            'Partie_3_Qualit_et_diversit_/_5_Plus_d_arbres_sur_es_conditions_du_sol': 'vrai',
            'Partie_4_Socio_economic/Are_you_part_of_the_Village_Co': 'no',
            'Partie_4_Socio_economic/Does_your_VC_has_an_annual_pla': 'no',
            'Partie_4_Socio_economic/You_mentioned_before_that_you_': 'Non',
            'Partie_4_Socio_economic/Votre_comit_villageois_promeu': 'yes',
            'Partie_4_Socio_economic/If_Yes_how_does_the_VC_show_i': 'providing_training',
            'Partie_4_Socio_economic/Avez_vous_b_n_ficier_des_mesur': 'petits_mat_riels_d_lagage',
            'Partie_4_Socio_economic/Pourriez_vous_s_il_v_es_dans_votre_m_nage': '1',
            'Partie_4_Socio_economic/Does_your_agricultural_field_p': 'yes',
            'Partie_4_Socio_economic/If_Yes_what_types_of_food_p': 'mil',
            'Partie_4_Socio_economic/Quels_types_de_produits_d_riv_': 'jus__fait___base_des_fruits',
            'Partie_4_Socio_economic/Does_your_agricultural_field_p_001': 'yes',
            'Partie_4_Socio_economic/Are_you_part_of_a_agro_cooper': 'yes',
            'Partie_4_Socio_economic/Quel_est_le_nom_de_la_coop_ration_': 'Test',
            'group_aw6cw94/la_superficie_de_vos_champ_carte':
              '39.939225 -77.826571 0 0;39.941826 -77.825715 0 0;39.834311 -77.185001 0 0;39.713641 -77.521237 0 0;39.79177 -77.958217 0 0;39.939225 -77.826571 0 0',
            'group_aw6cw94/Avez_vous_un_autre_champ': 'si',
            'group_aw6cw94/Veuillez_indiquer_su_erficie_de_vos_champ':
              '42.836703 -74.94311 0 0;41.60004 -76.783921 0 0;41.807277 -74.240384 0 0;42.564334 -74.053719 0 0;42.836703 -74.94311 0 0',
            'group_aw6cw94/Avez_vous_un_autre_champ_001': 'non',
            'group_aw6cw94/la_superficie_de_vot_champ_en_hectares': '10',
          },
        };

        async function addLayer() {
          // await mapController.addGeoJSONLayer({ url: geoJSONData[0].url, layerParams: geoJSONData[0] });
          await mapController.addGeoJSONLayer(geoJSONData);
        }
        addLayer();

        dispatch(overwriteSettings(updatedData));

        changeDefaultLanguage(values?.language);
        setShowGlobalSpinner(false);
      })
      .catch((e) => {
        console.error(e);
        dispatch(overwriteSettings({ ...resources, ...props }));
        changeDefaultLanguage(resources.language);
        setShowGlobalSpinner(false);
      });
  };

  useEffect(() => {
    const appID = new URL(window.location.href).searchParams.get('appid');
    if (appID) {
      fetchPortalInfo(appID);
    } else {
      //Read our local resources.js file And any external library resources (which are prioritized)
      dispatch(overwriteSettings({ ...resources, ...props }));
      if (props && Object.keys(props).length !== 0) {
        changeDefaultLanguage(props.language);
      } else {
        changeDefaultLanguage(resources.language);
      }
      setShowGlobalSpinner(false);
    }
  }, [dispatch, props, sharinghost]); //dispatch should never update and this useEffect should fire only once, adding per eslint rule warning

  //Subscriptions for the CMS
  attachCMSEventHandlers();

  //Check that we are logged in by looking for token in localStorage and hitting the auth API
  useEffect(() => {
    function checkForLoginState(): void {
      //Check for url param token as well, incase we had a redirect
      const urlToken = new URL(window.location.href).searchParams.get('token');
      const token = localStorage.getItem('userToken');
      let userToken: any = null;
      //URL token takes priority
      if (urlToken) {
        userToken = urlToken;
        localStorage.setItem('userToken', userToken);
      } else if (!urlToken && token) {
        userToken = token;
      }
      if (userToken) {
        fetch(CHECK_LOGGED_URL, {
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
          .then((response) => {
            const hasError = response.status !== 200;
            response.json().then((data) => {
              if (hasError) return;
              localStorage.setItem('userID', data.id);
              localStorage.setItem('email', data?.email);
              dispatch(setLoggedIn(true));

              //check if user has completed their profile
              getUserData(data.id, userToken).then((dataRes) => {
                if (dataRes?.error) {
                  //handle error
                  console.log('Err:', dataRes.errorMsg);
                  dispatch(setIsProfileComplete(false));
                } else if (dataRes?.userData) {
                  if (dataRes?.userData) {
                    dispatch(setIsProfileComplete(allRequiredFieldsPresent(dataRes?.userData).length === 0));
                  }
                }
              });
            });
          })
          .catch((e) => console.error(e));
      }
    }

    //We dont care about login state for the report view as it does not have any info behind gfw login
    if (!reportView) {
      checkForLoginState();
    }
  }, []);

  return (
    <>
      {showGlobalSpinner ? (
        <Loader
          containerPositionStyling={{
            position: 'absolute',
            top: '40%',
            left: '50%',
          }}
          color={'#cfcdcd'}
          size={100}
        />
      ) : (
        <>
          {!reportView && !hideHeader && <Header />}
          <MapContent report={reportView} />
          <ModalCard />
        </>
      )}
    </>
  );
};

export default App;
