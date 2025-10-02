export const az = {
  title: 'Ağac örtüyünün qazancı',
  subtitle: '(20 il, 30 m, qlobal, UMD/NASA GEDI)',
  content: [
    {
      label: 'Funksiya',
      value: 'Ağac örtüyünün qazandığı sahələri müəyyən edir',
    },
    {
      label: 'Qətmə',
      value: '30 × 30 metr',
    },
    {
      label: 'Coğrafi əhatə',
      value: 'Qlobal',
    },
    {
      label: 'Mənbə',
      value:
        'Potapov, P., Hansen, M.C., Pickens, A., Hernandez-Serna, A., Tyukavina, A., Turubanova, S., Zalles, V., Li, X., Khan, A., Stolle, F., Harris, N., Song, X-P., Baggett, A., Kommardy, I., Kommardy, I. 2022. Landsat Arxivindən Alınmış Qlobal 2000-2020 Torpaq Örtüsü və Torpaqdan İstifadə Dəyişikliyi Data Seti: İlk Nəticələr. Uzaqdan Zondlamada Sərhədlər, 13 aprel 2022. https://doi.org/10.3389/frsen.2022.856903',
    },
    {
      label: 'Məzmun tarixi',
      value: '2000-2020',
    },
    {
      label: 'Xəbərdarlıqlar',
      value:
        'Bu məlumat dəstində “ağac örtüyü” hündürlüyü 5 m və daha yüksək olan meşəli bitki örtüyü kimi müəyyən edilir və müxtəlif örtük sıxlığı üzrə təbii meşəliklər, meşələr və ya ağac plantasiyaları formasını ala bilər. Ağac örtüyünün artımı birbaşa bərpa, meşəsalma və ya meşələrin bərpasına bərabər deyil. \n\nTədqiqat metodologiyasındakı və məzmun tarixinin dəyişməsi səbəbindən ağac örtüyü, qazanc və illik itki məlumat dəstləri bir-biri ilə dəqiq müqayisə edilə bilməz. Müvafiq olaraq, illik ağac örtüyü itkisi məlumat dəstindən ağac örtüyünün qazancı üçün rəqəmləri çıxmaqla “xalis” hesablana bilməz. Bunun əvəzinə, yalnız ağac hündürlüyü məlumatlarına əsasən hesablanmış xalis ağac örtüyünün dəyişdirilməsi təbəqəsindən istifadə edilməlidir. \n\nGFW-də mövcud olan örtük örtüyünün sıxlığı məlumatları kimi digər məhsulların inteqrasiya olunmuş istifadəsi ehtiyatla həyata keçirilməlidir. \n\nMüəlliflər məhsulun düzgünlüyünü qiymətləndirmişlər və ümumi dəqiqlik 99,3%, komissiya xətası (yanlış pozitivlər) 28,6% və buraxılış xətası (yanlış neqativlər) 42,2% müəyyən edilmişdir. Dəqiqlik biome görə dəyişir və buna görə də hər hansı bir xüsusi yerdə daha yüksək və ya aşağı ola bilər. Buraxılma xətası komissiya xətasından yüksək olduğundan, bu, məhsulun meşə dinamikasının mühafizəkar qiymətləndirmələrini təmin etdiyini göstərir. \n\nMeşələrin genişləndirilməsi (mövcud meşə hündürlüyünün artması) və meşə artımı (2000-ci il ərzində meşələrin salınması) arasında çaşqınlıq var idi və bu, 2000-ci ildə meşə hündürlüyünü müəyyən etmək çətin olan boreal meşə sahələrində daha qabarıq idi.',
    },
    {
      label: 'Lisenziya',
      value: 'CC 4.0',
    },
  ],
  overview: {
    label: 'Ümumi baxış',
    value:
      'Merilend Universitetindəki GLAD (Qlobal Torpaq Təhlili və Kəşf) laboratoriyasından əldə edilən bu məlumat dəsti 20 illik kümülatif təbəqə kimi göstərilən 30 × 30 metr təsvir ölçüsündə bütün dünyada 2000-2020-ci illərdə ağac örtüyünün artım sahələrini ölçür. Ağac örtüyünün artımı 2000 və 2020-ci illərdəki ağac hündürlüyü məlumatından istifadə etməklə müəyyən edilmişdir. Ağacın hündürlüyü Qlobal Ekosistem Dinamikası Tədqiqatının (GEDI) lidar meşə strukturu ölçmələrinin və Landsat analizinə hazır data zaman seriyasının inteqrasiyası ilə modelləşdirilmişdir. NASA GEDI 2019-cu ilin aprel ayından Beynəlxalq Kosmik Stansiyada fəaliyyət göstərən kosmik lidar alətidir. O, qlobal miqyasda 52°Ş. və 52°S arasında olan enliklərdə meşə örtüyünün hündürlüyü də daxil olmaqla, bitki örtüyünün strukturunun nöqtə əsasında ölçülməsini təmin edir. Piksellərin 2020-ci ildə ≥5 m və 2000-ci ildə ağacın hündürlüyünün <5 m olduğu yerlərdə qazanc müəyyən edilmişdir. \n\nAğac örtüyünün artımı təbii meşə artımı, ağac məhsullarının dövriyyəsi və ya ağac əkilməsinin idarə edilməsi də daxil olmaqla bir sıra potensial fəaliyyətləri göstərə bilər. \n\nBöyüdüldükdə (< böyütmə səviyyəsi 12), qazanc pikselləri 30 x 30 metr miqyasda qazancın sıxlığına uyğun olaraq kölgələnir. Daha tünd kölgəli piksellər ağac örtüyü qazancının daha yüksək konsentrasiyası olan sahələri təmsil edir, daha açıq kölgəli piksellər isə ağac örtüyü qazancının daha az konsentrasiyasını göstərir. Məlumat tam ayırdetmədə olduqda (≥ böyütmə səviyyəsi 12) piksel kölgəsində heç bir dəyişiklik yoxdur.',
  },
  citation: {
    label: 'Sitat',
    value:
      'Bu məlumat göstərildikdə aşağıdakı kreditdən istifadə edin: \n29/01/2025-ci ildə Qlobal Meşə Nəzarəti vasitəsilə əldə edilib. www.globalforestwatch.org. \n\nBu məlumat qeyd edildikdə aşağıdakı kreditdən istifadə edin: \nPotapov, P., Hansen, M.C., Pickens, A., Hernandez-Serna, A., Tyukavina, A., Turubanova, S., Zalles, V., Li, X., Khan, A., Stolle, F., Harris, N., Song, X-P., Baggett, A., Kommardy, I., Kommardy, I. 2022. Landsat Arxivindən Alınmış Qlobal 2000-2020 Torpaq Örtüsü və Torpaqdan İstifadə Dəyişikliyi Data Seti: İlk Nəticələr. Uzaqdan Zondlamada Sərhədlər, 13 aprel 2022. https://doi.org/10.3389/frsen.2022.856903',
  },
};
