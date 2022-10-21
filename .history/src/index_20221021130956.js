import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { store } from './redux/configStore';

import 'antd/dist/antd.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DOMAIN, DOMAIN2 } from './util/settings/config';
//Cấu hình realtime (websocket với signalR)
import * as signalR from '@aspnet/signalr'

//Import đa ngôn ngữ
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));

//Đoạn code để kết nối đến server lắng nghe sự kiện từ server
export const connection = new signalR.HubConnectionBuilder().withUrl(`${DOMAIN}/DatVeHub`).configureLogging(signalR.LogLevel.Information).build();




connection.start().then(() => {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}).catch(errors => {
  console.log(errors);
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
