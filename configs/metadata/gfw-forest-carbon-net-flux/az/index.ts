export const az = {
  title: 'Net Meşə Karbon Fluks',
  subtitle: '30 m, global, 2001-2025, Harris et al. 2021',
  download_data: 'https://data.globalforestwatch.org/datasets/94871bf57f544ea39e594feb92b06305',
  learn_more: '',
  content: [
    {
      label: 'Funksiya',
      value:
        'Meşə ekosisteminin karbonun net itkisini nümayiş etdirir. Bu, meşənin yerini alan meşə distrofsiyalarından meşə karbon emissiyaları ilə meşə artımından karbonun çıxarılması arasındakı fərq kimi hesablanır',
    },
    {
      label: 'Qətmə',
      value: '30 × 30m',
    },
    {
      label: 'Coğrafi əhatə',
      value: 'Qlobal',
    },
    {
      label: 'Mənbə',
      value:
        'Harris, N.L., D.A. Gibbs, A. Baccini, R.A. Birdsey, S. de Bruin, M. Farina, L. Fatoyinbo, M.C. Hansen, M. Herold, R.A. Houghton, P.V. Potapov, D. Requena Suarez, R.M. Roman-Cuesta, S.S. Saatchi, C.M. Slay, S.A. Turubanova, A. Tyukavina. 2021. Global maps of twenty-first century forest carbon fluxes. Nature Climate Change. https://doi.org/10.1038/s41558-020-00976-6<br /><br />Gibbs, D. A., Rose, M., Grassi, G., Melo, J., Rossi, S., Heinrich, V., &amp; Harris, N. L. 2025. Revised and updated geospatial monitoring of 21st century forest carbon fluxes. Earth System Science Data. https://essd.copernicus.org/articles/17/1217/2025/',
    },
    {
      label: 'Tezlik',
      value: 'İllik',
    },
    {
      label: 'Məzmun tarixi',
      value: '2001-2025',
    },
    {
      label: 'Xəbərdarlıqlar',
      value:
        '- Verilənlər modelləşdirmənin məhsuludur və beləliklə, anadangəlmə xəta və qeyri-müəyyənlik dərəcəsinə malikdirlər. İstifadəçilər məlumat istifadə etməzdən əvvəl metadata və digər mövcud olan sənədləri oxumaq və tam dərk etmək üçün güclü şəkildə təşviq olunurlar.\n- Net fluks 2001-2025-cü ilin model dövrü üzrə ümumiliyi əks etdirir. Bu, trendin alına biləcəyi illik zaman seriyası deyil. Beləliklə, orta illik net axımların hesablanması üçün dəyərlər 23-ə bölünməlidir.\n- Ümumi aradan qaldırılmasında qeyri-müəyyənlik emissiyaya nisbətən daha yüksəkdir, xüsusilə aradan qaldırma faktorlarında qeyri-müəyyənlik nəticəsində baş verir. Bu qeyri-müəyyənliklər net axımında qeyri-müəyyənliyə qədər yayılmağa başlar.\n- Meşə sahələri üçün qiymətlər tətbiq olunur (kanopiya örtüyü >30 faiz, hündürlüyü isə >5 m). Analizdə istifadə olunan meşə tərifi haqqında əlavə məlumat üçün bax: Harris et al. (2021).\n- Emissiya Landsat peyk təsvirlərində müşahidə edilən və nəzarətsiz meşə deqradasiyasından emissiya daxil olmayan, stand-əvəz edən narahatlıqları əks etdirir.\n- Təxminin əsası kimi istifadə olunan aktivlik məlumatlarında temporal uyğunsuzluqlar var:\n- Removals data temporal uyğunsuzluqlar ehtiva edir, çünki ağac örtüyü qazanmaq 2025-cü ilə qədər təxmini olaraq illik qazanc deyil, 2000-2020-ci illərdə bir toplu ümumi təmsil edir.\n- 2011-2015-ci illər arasında yeni peyk məlumatlarının və metodologiya dəyişikliklərinin daxil edilməsi nəticəsində ağac örtüyü itkisinin aşkarlanmasının təkmilləşdirilməsi son illər əvvəlki illərlə müqayisədə emissiyanın daha yüksək hesablanması ilə nəticələnə bilər. Əlavə məlumat üçün buraya müraciət etmək.\n- Bəzi sərhəd boyunca net fluksda böyük sıçrayışlar ekozona xas olan aradan qaldırma faktorlarının istifadəsi ilə bağlıdır. Net axımının dəyişməsi ekozona sərhədlərində baş verir. Hər tərəfdə müxtəlif aradan qaldırma faktorları tətbiq edilir.\n- Bu dataset orijinal nəşrindən etibarən yenilənmişdir. Ətraflı məlumat üçün bax: Ümumi məlumat.',
    },
    {
      label: 'Lisenziya',
      value: 'CC 4.0',
    },
  ],
  overview: {
    label: 'Ümumi baxış',
    value:
      'Bu xalis axını təbəqəsi Harris və başqalarında təsvir edilən meşə karbon axını modelinin bir hissəsidir. (2021). Bu sənəd meşələrdən gələn istixana qazı axınlarını izləməkdə və emissiyaları azaltmaqda və ya meşələr tərəfindən çıxarılmasını artırmaqda müxtəlif aktorlara və təşkilatlara kömək edə bilən qlobal meşə karbon axınlarının təxmin edilməsi üçün geoməkan monitorinq çərçivəsini təqdim edir. Xalis meşə karbon axını model dövründə meşələr tərəfindən buraxılan və meşələr tərəfindən çıxarılan (yaxud sekvestr edilmiş) karbon arasında hesablanan meşə ekosistemi karbonunun xalis itkisini əks etdirir. Xalis karbon axını, hər bir meşəlik pikseldə illik ümumi emissiyalardan orta ümumi təmizlənmələri çıxmaqla hesablanır; mənfi dəyərlər meşələrin karbonun xalis yuvası olduğu yerlər və müsbət dəyərlər 2001-2025-cü illər arasında meşələrin xalis karbon mənbəyi olduğu yerlərdir. Xalis axınlar 2000-ci ildə meşələrin mövcud olduğu və ya 2000-2020-ci illər arasında qurulmuş hər piksel üzrə milli istixana qazları ehtiyatları üçün IPCC Təlimatlarına əsasən hesablanır. 2022. Bu təbəqə model dövründə (2001-2025) məcmu xalis axını əks etdirir və orta illik xalis axını əldə etmək üçün 23-ə bölünməlidir; xalis axın dəyərləri modelin ayrı-ayrı illərinə təyin edilə bilməz. Bütün giriş təbəqələri Hansen və digərlərinə uyğun olmaq üçün hər biri 0,00025 x 0,00025 dərəcə ümumi ayırdetmə ilə yenidən nümunələndirildi. (2013).\n\n- Hər il ağac örtüyünün itməsi, ağac örtüyünün itməsinin sürücüləri, yanan ərazi yenilənir. 2025 və 2025-cü illərdə aşağıda təsvir olunduğu kimi bir neçə model giriş məlumat dəsti və sabitləri də dəyişdirildi. Əlavə məlumat üçün bu blog yazısına baxın.\n- Yeraltı karbon və yerüstü karbon arasındakı nisbətin mənbəyi. Əvvəllər bir qlobal sabitdən istifadə edilmişdir; indi Huang et al xəritəsindən istifadə edir. 2021\n- Ağac örtüyünün qazandığı illər. Əvvəllər istifadə olunub 2000-2012; indi Potapov et al 2000-2020 istifadə edir. 2022.\n- Yanğın məlumatlarının mənbəyi. Əvvəllər istifadə edilən MODIS-in yanmış sahəsi; indi Tyukavina et al yanğınlar ağac örtüyü zərər istifadə edir. 2022.\n- Torf xəritələrinin mənbəyi. Yeni tropik məlumat dəstləri daxil edildi və 40 dərəcədən yuxarı şimal məlumat dəsti dəyişdirildi.\n- CH4 və N2O üçün qlobal istiləşmə potensialı (GWP) sabitləri. IPCC Beşinci Qiymətləndirmə Hesabatından əvvəllər istifadə edilmiş GWP-lər; indi IPCC Altıncı Qiymətləndirmə Hesabatındakı GWP-lərdən istifadə edir.\n- Köhnə (>20 yaş) ikinci dərəcəli mülayim meşələr və onlarla əlaqədar qeyri-müəyyənliklər üçün aradan qaldırılması amilləri. Milli İstixana Qazları Ehtiyatları üzrə 2006-cı il IPCC Təlimatlarına 2019-cu ilin Təkmilləşdirilməsinin Cədvəl 4.9-da dərc edilmiş əvvəllər istifadə edilmiş xaricetmə amilləri; indi 4-cü Korrigendadan 2006-cı il IPCC Milli İstixana Qazı Ehtiyatlarına dair Təlimatlara qədər 2019-cu ilin Təkmilləşdirməsinə qədər düzəldilmiş xaricetmə amillərindən və qeyri-müəyyənliklərdən istifadə edir.\n- Əkilmiş ağacın ölçüsü və aradan qaldırılması amilləri. Əvvəllər istifadə edilən Əkilmiş Ağacların Məkan Məlumat Bazası (SDPT) Versiya 1.0; indi SDPT Version 2.0 və əlaqədar aradan qaldırılması amillərindən istifadə edir.\n\nNet flux model müddəti ərzində iki müxtəlif sahə vahidində yükləmək üçün mövcuddur: 1) CO2 emissiyalarının meqaqramları/ha və 2) CO2 emissiyalarının/pikselin meqaqramları. Birincisi xalis axının vizuallaşdırılması (xəritələnməsi) üçün uyğundur, çünki o, hər hektarda karbon axınının sıxlığını təmsil edir. İkincisi, maraq zonasında (AOI) xalis axını hesablamaq üçün uyğundur, çünki AOI-dəki piksellərin qiymətləri həmin sahə üçün ümumi karbon axını əldə etmək üçün cəmlənə bilər. Sonuncudakı dəyərlər enliyə görə dəyişən hər bir pikselin ölçüsünə görə hektar başına xalis axını tənzimləməklə hesablanmışdır. 2001 və 2025-cü illər arasında müəyyən sayda il ərzində baş verən xalis axını təxmin edərkən dəyərləri model müddətinə bölün və sonra maraq dövründəki illərin sayına vurun. Hər iki məlumat dəstinə Harris və digərlərinin metodlarında müəyyən edildiyi kimi yalnız meşələr daxilində piksellər daxildir. (2021) və 2020-ci ilə qədər ağac örtüyü artımı ilə yeniləndi.',
  },
  citation: {
    label: 'Sitat',
    value:
      'Harris et al. (2021). Global maps of 21st century forest carbon fluxes. Accessed on 14/02/2025 from Global Forest Watch.',
  },
};
