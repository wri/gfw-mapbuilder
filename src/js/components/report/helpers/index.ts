export const getLocalStorageDates = (key: string) => {
  const dateStr = localStorage.getItem(key);
  if (dateStr) return JSON.parse(dateStr);
  return null;
};

export const addDateByType = (data: any, key: string) => {
  const localStorageData = getLocalStorageDates(key);
  if (!localStorageData || localStorageData?.type === 'default') return data;

  //  we need dates at the parent and children level
  return data.map((item: any) => {
    if (item.analysisId === localStorageData.type) {
      return {
        ...item,
        minDate: localStorageData.minDate,
        maxDate: localStorageData.maxDate,
        analysisParams: item.analysisParams.map((params: any) => {
          return {
            ...params,
            minDate: localStorageData.minDate,
            maxDate: localStorageData.maxDate,
          };
        }),
      };
    }
    return item;
  });
};
