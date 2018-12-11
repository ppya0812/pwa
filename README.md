mario PWA
----

> Very simple code to demonstrate Progressive Web Apps.

### 启动服务：
方法一： chrome添加扩展程序 web-server-for-chrome
        即可通过web server URL访问  eg. http://127.0.0.1:8887

        下载地址： https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb

方法二：本地启动http-server, 通过localhost访问  eg.http://localhost:8080

       ```bash
      npm install http-server -g
      http-server -c-1 # with cache disabled
      ``` 

### 添加至桌面：
  浏览器【application】 --> 【manifest】--> 【add to homescreen】
  确定后，即可在chrome 应用中 或者桌面程序中看到

### License

MIT


### 本地开发
node node-server.js
ngrok http 8080
http-server


### sw-register-webpack-plugin
