export const hourToInt = (hour) => {
    const [minutes,seconds] = hour.split(':');
    return (minutes * 60) + seconds;
}