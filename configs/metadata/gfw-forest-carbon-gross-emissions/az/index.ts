export const az = {
  title: 'Meşə Karbon Emissiyaları',
  subtitle: '30 m, global, 2001-2025, Harris et al. 2021',
  download_data: 'https://data.globalforestwatch.org/datasets/753016096c1d49f0977e7b62533375ee',
  learn_more: '',
  content: [
    {
      label: 'Funksiya',
      value: 'Stendi əvəz edən narahatlıqlardan meşə istixana qazlarının emalını nümayiş etdirir',
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
        'Harris, N.L., D.A. Gibbs, A. Baccini, R.A. Birdsey, S. de Bruin, M. Farina, L. Fatoyinbo, M.C. Hansen, M. Herold, R.A. Houghton, P.V. Potapov, D. Requena Suarez, R.M. Roman-Cuesta, S.S. Saatchi, C.M. Slay, S.A. Turubanova, A. Tyukavina. 2021. Global maps of twenty-first century forest carbon fluxes. Nature Climate Change. https://doi.org/10.1038/s41558-020-00976-6',
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
        '- Verilənlər modelləşdirmənin məhsuludur və beləliklə, anadangəlmə xəta və qeyri-müəyyənlik dərəcəsinə malikdirlər. İstifadəçilər məlumat istifadə etməzdən əvvəl metadata və digər mövcud olan sənədləri oxumaq və tam dərk etmək üçün güclü şəkildə təşviq olunurlar. \n- Dəyərlər yalnız meşə sahələri üçün tətbiq olunur (kanopiya örtüyü >30 faiz və >5 m hündürlüyü və ya ağac örtüyü qazancı olan ərazilər). Analizdə istifadə olunan meşə tərifi haqqında əlavə məlumat üçün bax: Harris et al. (2021).\n- Hər bir pikseldə emissiyalar konkret narahatlıq ili ilə əlaqələndirilsə də, maraq sahəsi üzərində emissiya 2001-2025-cü ilin model dövrü üzrə ümumiliyi əks etdirir. Beləliklə, orta illik aradan qaldırılmasını hesablamaq üçün dəyərlər 23-ə bölünməlidir.\n- Emissiya Landsat peyk təsvirlərində müşahidə edilən və nəzarətsiz meşə deqradasiyasından emissiya daxil olmayan, stand-əvəz edən narahatlıqları əks etdirir.\n- Emissiya ümumi bir təxmini əks etdirir, yəni, narahatlıq sonra baş verən hər hansı bir regrowth-dən karbon aradan qaldırılması daxil deyil. Bunun əvəzinə, ümumi karbon təmizləmələri yoldaş meşə karbon təmizləmə qatında hesablanır.\n- Emissiya məlumatlarında temporal uyğunsuzluqlar var. 2011-2015-ci illər arasında yeni peyk məlumatlarının və metodologiya dəyişikliklərinin daxil edilməsi nəticəsində ağac örtüyünün itirilməsinin aşkar edilməsinin təkmilləşdirilməsi son illər əvvəlki illərlə müqayisədə emissiyanın daha yüksək hesablanması ilə nəticələnə bilər. Əlavə məlumat üçün buraya müraciət etmək.\n- Meşə karbon emissiyaları ekosistem karbon hovuzlarından yığılan oduncaq məhsulları (HWP) hovuzuna karbon transferlərini əks etdirmir.\n- Bu dataset orijinal nəşrindən etibarən yenilənmişdir. Ətraflı məlumat üçün bax: Ümumi məlumat.',
    },
    {
      label: 'Lisenziya',
      value: '',
    },
  ],
  overview: {
    label: 'Ümumi baxış',
    value:
      'Bu emissiya təbəqəsi Harris və başqalarında təsvir edilən meşə karbon axını modelinin bir hissəsidir. (2021). Bu sənəd meşələrdən gələn istixana qazı axınlarını izləməkdə və emissiyaları azaltmaqda və ya meşələr tərəfindən çıxarılmasını artırmaqda müxtəlif aktorlara və təşkilatlara kömək edə bilən qlobal meşə karbon axınlarının təxmin edilməsi üçün geoməkan monitorinq çərçivəsini təqdim edir. Meşə karbon emissiyaları, modelləşdirilmiş hər bir ildə baş verən tək-tək meşə pozuntuları nəticəsində yaranan istixana qazı emissiyalarını təmsil edir (meqaqram CO2 emissiyaları/ha, 2001 və 2025-cü illər arasında). Emissiyalara bütün müvafiq ekosistem karbon hovuzları (yerüstü biokütlə, yeraltı biokütlə, ölü ağac, zibil, torpaq üzvi karbon) və istixana qazları (CO2, CH4, N2O) daxildir. Hər piksel üçün emissiya təxminləri, Hansen və digərlərinin Qlobal Meşə Dəyişikliyi üzrə illik ağac örtüyü itkisi məlumatında göstərildiyi kimi, IPCC Təlimatlarına uyğun olaraq, əvəzedici pozğunluğun baş verdiyi milli istixana qazları ehtiyatlarına əsasən hesablanır. (2013). Hər bir pikseldən yayılan karbon 2000-ci illə 2000-ci il arasında yığılmış karbonun tənzimlənməsi ilə 2000-ci ildəki karbon sıxlığına əsaslanır.\n\nEmissiyalar ümumi təxmini əks etdirir, yəni sonrakı artımdan karbon xaricləri daxil edilmir. Əvəzində, təmizlənmədən sonra sonrakı yenidən böyümə nəticəsində yaranan ümumi karbon xaricləri meşənin karbondan təmizlənməsi təbəqəsində nəzərə alınır. Narahatlıq zamanı hər pikseldən buraxılan karbonun payına (emissiya əmsalı) bir neçə amil təsir edir, o cümlədən birbaşa pozğunluq, yanğının müşahidə olunan narahatlıq hadisəsindən əvvəlki ildə və ya ondan əvvəl müşahidə edilib-edilməməsi, torfda baş verib-verməməsi və s. Bütün emissiyaların pozulma ilində baş verəcəyi güman edilir. Emissiyalar Hansen ağacı örtüyü itkisi məlumatından istifadə edərək müəyyən bir ilə təyin edilə bilər; GFW-dən hər il üçün emissiyalar üçün ayrıca rasterlər mövcud deyil. Bütün giriş təbəqələri Hansen və digərlərinə uyğun olmaq üçün hər biri 0,00025 × 0,00025 dərəcə ümumi qətnamə ilə yenidən nümunələndirildi. (2013).\n\nHər il ağac örtüyünün itməsi, ağac örtüyünün itməsinin sürücüləri və yanmış sahə yenilənir. 2025 və 2025-cü illərdə aşağıda təsvir olunduğu kimi bir neçə model giriş məlumat dəsti və sabitləri də dəyişdirildi. Əlavə məlumat üçün bu blog yazısına baxın.\n\n- Yeraltı biokütlə karbonu ilə yerüstü biokütlə karbonu arasındakı nisbətin mənbəyi. Əvvəllər bir qlobal sabitdən istifadə edilmişdir; indi Huang et al xəritəsindən istifadə edir. 2021\n- Ağac örtüyünün qazandığı illər. Əvvəllər istifadə olunub 2000-2012; indi Potapov et al 2000-2020 istifadə edir. 2022.\n- Yanğın məlumatlarının mənbəyi. Əvvəllər istifadə edilən MODIS-in yanmış sahəsi; indi Tyukavina et al yanğınlar ağac örtüyü zərər istifadə edir. 2022.\n- Torf xəritələrinin mənbəyi. Yeni tropik məlumat dəstləri daxil edildi və 40 dərəcədən yuxarı şimal məlumat dəsti dəyişdirildi.\n- CH4 və N2O üçün qlobal istiləşmə potensialı (GWP) sabitləri. IPCC Beşinci Qiymətləndirmə Hesabatından əvvəllər istifadə edilmiş GWP-lər; indi IPCC Altıncı Qiymətləndirmə Hesabatındakı GWP-lərdən istifadə edir.\n- Köhnə (>20 yaş) ikinci dərəcəli mülayim meşələr və onlarla əlaqədar qeyri-müəyyənliklər üçün aradan qaldırılması amilləri. Milli İstixana Qazları Ehtiyatları üzrə 2006-cı il IPCC Təlimatlarına 2019-cu ilin Təkmilləşdirilməsinin Cədvəl 4.9-da dərc edilmiş əvvəllər istifadə edilmiş xaricetmə amilləri; indi 4-cü Korrigendadan 2006-cı il IPCC Milli İstixana Qazı Ehtiyatlarına dair Təlimatlara qədər 2019-cu ilin Təkmilləşdirməsinə qədər düzəldilmiş xaricetmə amillərindən və qeyri-müəyyənliklərdən istifadə edir.\n- Əkilmiş ağacın ölçüsü və aradan qaldırılması amilləri. Əvvəllər istifadə edilən Əkilmiş Ağacların Məkan Məlumat Bazası (SDPT) Versiya 1.0; indi SDPT Version 2.0 və əlaqədar aradan qaldırılması amillərindən istifadə edir.\n\nEmissiyaları iki müxtəlif sahə vahidində yükləmək mümkündür: 1) CO2 emissiyalarının meqaqramları/ha və 2) CO2 emissiyalarının/pikselin meqaqramları. Birincisi emissiyaların vizuallaşdırılması (xəritələnməsi) üçün uyğundur, çünki o, hektar başına emissiyaların sıxlığını təmsil edir. İkincisi, maraq zonasında (AOI) emissiyaların hesablanması üçün uyğundur, çünki AOI-dəki piksellərin dəyərləri həmin sahə üçün ümumi emissiyaları əldə etmək üçün cəmlənə bilər. Sonuncudakı dəyərlər enliyə görə dəyişən hər bir pikselin ölçüsünə görə hektar başına emissiyaları tənzimləməklə hesablanmışdır. Hər iki məlumat dəstinə Harris və digərlərinin metodlarında müəyyən edildiyi kimi yalnız meşələr daxilində piksellər daxildir. (2021) və 2020-ci ilə qədər ağac örtüyü artımı ilə yeniləndi.',
  },
  citation: {
    label: 'Sitat',
    value:
      'Harris et al. (2021). Global maps of 21st century forest carbon fluxes. Accessed on 14/02/2025 from Global Forest Watch.',
  },
};
