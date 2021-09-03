const JWT_KEY = 'jwt';
const ROLE_KEY = 'role';
const NAME_KEY = 'name';
const USERNAME_KEY = 'username';
const ID_KEY = 'id';
const RESTAURANT_ID_KEY = "restaurantId"

const getItem = (key) => localStorage.getItem(key);

const getJWTPayload = (jwt) => {
    const base64Payload = jwt.split('.')[1];
    const stringPayload = base64ToString(base64Payload);
    return JSON.parse(stringPayload);
}

const base64ToString = (base64str) => decodeURIComponent(escape(atob(base64str)))

export const getJwt = () => getItem(JWT_KEY);
export const getRole = () => getItem(ROLE_KEY);
export const getName = () => getItem(NAME_KEY);
export const getUsername = () => getItem(USERNAME_KEY);
export const getId = () => getItem(ID_KEY);
export const getRestaurantId = () => getItem(RESTAURANT_ID_KEY);

export const saveClaimsToLocalStorage = (jwt) => {
    const payload = getJWTPayload(jwt);
    localStorage.setItem(JWT_KEY, jwt);
    localStorage.setItem(ROLE_KEY, payload.role);
    localStorage.setItem(NAME_KEY, payload.name);
    localStorage.setItem(USERNAME_KEY, payload.sub);
    localStorage.setItem(ID_KEY, payload.id);
    dispatchEvent(new CustomEvent('user-logged-in', {
        detail: {
          creds: [
            getRole(),
            getId()
          ]
        }
    }));
}

export const setRestaurantId = (id) => {
  localStorage.setItem(RESTAURANT_ID_KEY, id);
  dispatchEvent(new CustomEvent('manager-logged-in', {
    detail: { 
        managerRestaurantId: id
    }
  }))
}

export const clearStorage = () => localStorage.clear();

export const minDate = new Date(-8640000000000000);
export const maxDate = new Date(8640000000000000);