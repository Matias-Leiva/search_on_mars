export default function (querys) {
  const querysArray = Object.entries(querys).map(([key, value]) => {
    if (value === '') {
      return '';
    }
    return `&${key}=${String(value)}`;
  });
  const querysString = querysArray.join('');
  return querysString;
}
