export const API_URL =
  location.hostname === "localhost" ? "http://localhost:9999" : "/api";
export const LOGIN_URL = `${API_URL}/login`;
export const SIGNUP_URL = `${API_URL}/signup`;
export const LOGOUT_URL = `${API_URL}/logout`;
export const PROFILE_VIEW_URL = `${API_URL}/profile/view`;
export const PROFILE_EDIT_URL = `${API_URL}/profile/edit`;
export const FEED_URL = `${API_URL}/feed`;
export const USER_CONNECTIONS_URL = `${API_URL}/user/connections`;
export const USER_REQUESTS_URL = `${API_URL}/user/requests/received`;
export const REQUEST_REVIEW_URL = `${API_URL}/request/review`;
export const REQUEST_SEND_URL = `${API_URL}/request/send`;
export const REQUEST_SEND_STATUS_URL = `${API_URL}/request/send`;
