export const getDateFormat = (timestamp: string): string => {
  let date = new Date(timestamp);
  let now = new Date();

  const diff = (now.getTime() - date.getTime()) / (1000 * 3600);
  console.log({diff});

  if (diff > 48) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days[date.getDay()];
  }

  if (diff > 24) {
    return 'Yesterday';
  }

  let hours = date.getHours();
  let mins = date.getMinutes();
  const minutesStr = mins < 10 ? '0' + mins : mins.toString();

  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12;

  return `${hours}:${minutesStr} ${ampm}`;
};
