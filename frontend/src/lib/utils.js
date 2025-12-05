export function fromatDateTime(date){
    return new Date(date).toLocaleString('en-US', {
        hours: '2-digits',
        minutes: '2-digits',
        hour12: 'false',
    });
}