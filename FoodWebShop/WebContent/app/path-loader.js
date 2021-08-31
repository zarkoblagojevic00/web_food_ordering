const origin = 'http://localhost:8080/FoodWebShop';

const getRoot = () => isDevMode() ? '' : origin;
const isDevMode = () => location.port == 5500;

export const api = `${origin}/rest`

export const load = (relPath) => `${getRoot()}/${relPath}`; 

export const initEndPointCreator = resource => relPath => `${resource}/${relPath}`;

