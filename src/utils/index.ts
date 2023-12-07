export const getMaskPhone = (value: string) => value.replace(/(?<=\d{3})(?<!\d{4})\d{4}/g, '****')
