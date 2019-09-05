import MD5 from 'md5'

const privateKey = '2a75d9feabf3616d141de171a6e13952ea786c81';

export const publicKey = 'e3dee2e7c3eae4488e26a938419c00b8';

export let ts = new Date().getTime();

export let hash = MD5(ts + privateKey + publicKey).toString();

export const url = 'https://gateway.marvel.com';

