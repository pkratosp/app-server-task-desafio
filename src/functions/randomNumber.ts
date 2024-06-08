// gera uma sequencia de numeros aleatórios
export function randomNumber () {
    const numbers = Array.from({ length: 12 }, (_, i) => Math.floor(Math.random() * 10));

    const string = numbers.join("");

    return string;
}