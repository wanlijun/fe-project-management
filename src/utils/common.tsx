interface IOption {
  label: string;
  value: string;
}
export const getLabelByValue = (options: IOption[], value: string | number) => {
  const item = options.find((item) => item.value === value)
  return item?.label
}