export const formatedAddress = (_wallet) => {
    const data = _wallet?.slice(0, 4) + "......" + _wallet?.slice(-4);
    return data;
};

export function formatNumber(number) {
    // Converts the number to a string and uses a regular expression to add commas
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}