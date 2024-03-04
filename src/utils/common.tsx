interface IOption {
  [index: string]: string
}
export const getLabelByValue = (
  options: IOption[],
  value: string | number,
  valueKey = 'value',
  labelKey='label'
) => {
  if (!options) {
    return ;
  }
  const item = options.find((item) => {
    
    return item[valueKey] === value
  })
  return item ? item[labelKey] : item;
}
export const getOptions = (values: (string | number)[]) => {
  return values.map((val) => {
    return {
      label: val,
      value: val
    }
  })
}
export const extractName = (values: string[] = [] ,list:IOption[] , valueKey: string, nameKey: string) => {
  if (!list) {
    return []
  }
  return list.filter((item) => {
    return values.includes(item[valueKey])
  })
  .map((item) => {
    return item[nameKey];
  })
}