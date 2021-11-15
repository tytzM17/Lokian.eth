function cryptoRandom(x, y) {
    return x + (y - x + 1) * crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32 | 0;
}

export default cryptoRandom