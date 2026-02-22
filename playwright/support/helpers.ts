export function generateOrderCode() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';

    function randomString(chars, length) {
      let result = '';
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    }

    const part1 = randomString(letters, 3);
    const part2 = randomString(numbers, 3);
    const part3 = randomString(letters, 3);

    return `${part1}-${part2}${part3}`;
}