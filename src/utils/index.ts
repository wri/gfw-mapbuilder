import { eachDayOfInterval, format } from 'date-fns';

export const handleCustomColorTheme = (theme: string | null | undefined) => {
  if (!theme) return '#f0ab00';
  return theme;
};

/**
 * @description Generate range of dates labels based on the start and end date for the slider
 * @param start Date
 * @param end Date
 * @returns {
 *  min: number,
 * max: number,
 * marks: {
 *  label: Date string,
 *  style: { display: 'block' | 'none' },
 *  value: number
 *  }
 * }
 */
export const generateRangeDate = (start: Date, end: Date) => {
  const datesList = eachDayOfInterval({ start, end });

  const data = {};
  let max = 0;
  const middleIndex = Math.floor(datesList.length / 2);
  const lastIndex = datesList.length - 1;

  datesList.forEach((date, index) => {
    max = index;
    data[index] = {
      label: format(date, 'P'),
      style: { display: index === 0 || middleIndex === index || lastIndex === index ? 'block' : 'none' },
      value: index,
    };
  });

  return { min: 0, max, marks: data };
};
