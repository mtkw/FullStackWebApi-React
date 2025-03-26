export function currencyFormat(ammout: number){
    return '$' + (ammout / 100).toFixed(2);
}