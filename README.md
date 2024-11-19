# Corsoft

https://github.com/mechtool/corsoft.git

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.12.

В данном примере применена архитектура прогрессивных веб приложений (https://web.dev/explore/progressive-web-apps?hl=ru), что в значительной степени повышает отказоустойчивость приложения, используя активное кэширование ресурсов без участия разработчика (https://developer.mozilla.org/ru/docs/Web/API/Cache), и не имеет 
критических уязвимостей производительности микросервисов. Приложение может устанавливаться на мобильные устройства (https://web.dev/articles/pwas-in-app-stores), минуя разработку на языках программирования для мобильныых устройств .

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files. 

Однако, сервисный рабочий в данном режиме не 
запустится, поскольку имеет ограничения на запуск в режиме разработки. Для запуска сервисного рабочего нужно загрузить глобально `npm install http-server`. В файле package.json прописана команда запуска этого сервера
`start-pwa`, которая сначала собирает сборку, предварительно ее визуализирует (ssr angular prerender), а затем запускае сервер с прописанным путем к индексному файлу.

## Build

Run `npm run start-pwa` to build the project. The build artifacts will be stored in the `dist/corsoft` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
