interface TimestampDateParams {
  checkList: string[];
  value: number | undefined | null;
  label: string;
}

const convertTimestampToStringDate = (value: number) => {
  return new Date(value).toLocaleString();
};

/**
 *
 * @param params {
 * checkList: string[];  list of labels to convert to string date
 * value: number | undefined | null;  value to convert to string date
 * label: string;  label to check if it is in checkList
 * }
 * @returns string date or empty string
 */
export const handleTimestampDate = (params: TimestampDateParams) => {
  const { checkList, value, label } = params;

  if (value === undefined || value === null) return '';

  if (typeof value === 'string') return value;

  if (checkList.includes(label)) {
    return convertTimestampToStringDate(value);
  }

  return value;
};
