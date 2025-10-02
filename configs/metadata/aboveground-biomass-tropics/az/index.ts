export const az = {
  title: 'Tropik yerüstü canlı meşəli biokütlə sıxlığı',
  subtitle: 'Tropiklər, Zarin/WHR',
  download_data: 'http://data.globalforestwatch.org/datasets/8f93a6f94a414f9588ce4657a39c59ff_1',
  content: [
    {
      label: 'Funksiya',
      value: 'Yerüstü canlı meşə biokütləsinin karbon sıxlığı dəyərlərini göstərir',
    },
    {
      label: 'Qətmə',
      value: '30 m',
    },
    {
      label: 'Coğrafi əhatə',
      value: 'Tropiklər (30 dərəcə Ş., 20 dərəcə S)',
    },
    {
      label: 'Mənbə',
      value: 'ICEsat GLAS lidar, MODIS, Landsat, yer ölçmələri',
    },
    {
      label: 'Məzmun tarixi',
      value: 2000,
    },
    {
      label: 'Xəbərdarlıqlar',
      value:
        'Karbonun qiymətləndirilməsi və yoxlanılması üçün həm yerüstü karbon sıxlığı, həm də qeyri-müəyyənlik qiymətlərinin birlikdə istifadə edilməsi tövsiyə olunur. Xəritə layihə və regional səviyyəli qiymətləndirmələr üçün böyük ərazilərə (5000-10000 ha) birləşdirildikdə yerüstü karbon ehtiyatının və yerüstü karbon sıxlığının dəqiq hesablamalarını təmin edəcək. Bir pikselin biokütlə sıxlığı dəyəri yoxlama üçün kiçik sahələrlə müqayisədə böyük qeyri-müəyyənliyə malik ola bilər.',
    },
    {
      label: 'Lisenziya',
      value: 'Creative Commons CC BY 4.0',
    },
  ],
  overview: {
    label: 'Ümumi baxış',
    value:
      'Bu, Baccini və s.-də təqdim olunan metodologiyanı genişləndirən daha yüksək ayırdetməli məlumat məhsuludur. (2012) təqribən 2000-ci il üçün 30 m rezolyusiyada yerüstü canlı meşə biokütləsinin sıxlığının pan-tropik xəritəsini yaratmaq üçün. Karbon sıxlığı qiymətləri ilə yanaşı, yerüstü karbon sıxlığının təxminində qeyri-müəyyənliyi təmin edən eyni məkan qətnaməsində səhv xəritəsi var. Bu xəritələr biokütlə təxminlərinin Hansen və digərləri ilə birgə yerləşməsinə imkan verir. (2013, v1.0) oxşar məkan ayırdetmədə ağac örtüyü itkisi təxminləri. Meşə biokütləsinin sıxlığının yer əsaslı ölçüləri və Baccini və digərləri tərəfindən təsvir edildiyi kimi birgə yerləşdirilmiş Geoscience Lazer Altimeter System (GLAS) LiDAR dalğa forması ölçüləri arasında əldə edilən statistik əlaqə. (2012) tropiklərdə 40.000-dən çox GLAS ayaq izinin biokütlə sıxlığını qiymətləndirmək üçün istifadə edilmişdir. Daha sonra, randomForest modellərindən istifadə edərək, biokütlə sıxlığının GLAS-dən əldə edilən təxminləri Landsat 7 ETM+ peyk şəkilləri və məhsulları (məsələn, əks etdirmə), yüksəklik və biofiziki dəyişənlər daxil olmaqla davamlı, şəbəkəli dəyişənlərlə əlaqələndirildi. RandomForest modellərinə giriş kimi davamlı gridded verilənlər toplusundan istifadə etməklə, tropiklər boyunca yerüstü meşəli biokütlə sıxlığının divardan divara 30 m ayırdetmə xəritəsi, eləcə də əlaqəli qeyri-müəyyənlik təbəqəsi hazırlanmışdır. Qeyri-müəyyənlik səviyyəsi allometrik tənliklərdən, LiDAR əsaslı modeldən və randomForest modelindən olan səhvləri nəzərə alır. Bütün səhvlər son biokütlə təxmininə qədər yayılır. İşin ətraflı təsviri hazırlanmaqda olan yeni sənəddə təqdim olunacaq.',
  },
  citation: {
    label: 'Sitat',
    value:
      'Baccini A., W. Walker, L. Carvahlo, M. Farina, D. Sulla-Menashe, R. Houghton (2015). Tropik meşələr qazanc və zərərin yeni ölçülərinə əsaslanan xalis karbon mənbəyidir. Baxışda. Qlobal Forest Watch Climate vasitəsilə [tarix] tarixində əldə edilib. iqlim.globalforestwatch.org.',
  },
};
