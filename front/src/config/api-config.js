let backendHost;
const apiVersion = 'v1';

const hostname = window && window.location && window.location.hostname;

if(hostname === 'easimmo.com') {
  backendHost = 'https://api.easimmo.com';
} else if(hostname === 'release.easimmo.com') {
  backendHost = 'https://staging.api.easimmo.com';
} else if(hostname === "localhost") {
  backendHost = `http://localhost:8000`;
} else {
  backendHost = process.env.REACT_APP_BACKEND_HOST || 'http://localhost:8000';
}

export const API_ROOT = `${backendHost}`;