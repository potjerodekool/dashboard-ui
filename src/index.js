import { createApp } from "vue";
import App from "./App.vue";
import router from './router.ts';
import api from './api/api'

const app = createApp(App);

api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.common['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

api.interceptors.response.use(response => {
  if (response.status === 200 || response.status == 201) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(response);
  }
}, error => {
  if (error.response.status) {
    switch(error.response.status) {
      case 401:
        //Unauthorized redirect to login page.
        break;
      case 403:
        //Forbidden redirect to login page.
        break;  
    }

    return Promise.reject(error.response);
  }
});

app.use(router);
app.mount("#app");

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose(() => {
    app.unmount();
  });
}


