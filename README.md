# SnappiesFront

This the front end of the Snappies project. It is an Angular 17 project.
We are using Angular Material for the UI. And Angular/PWA for the progressive web app.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build --configuration production` to build the project. The build artifacts will be stored in the `dist/` directory.

## Deployement

The project is deployed on a VPS using Docker. The Dockerfile is in the root of the project. Everything is managed by Githuh Actions. There is two workflows, one for the development and one for the production. The production workflow is triggered when a tag is pushed on the main branch. The development workflow is triggered when a push is made on the dev branch.

## Authors

-   **Corentin D'haeyere** - [cdhaeyere](https://github.com/cdhaeyere)
-   **Thomas Johnen** - [ThomasJohnen](https://github.com/ThomasJohnen)
-   **Lucas Fuentes Gonzalez** - [LucasFueGo](https://github.com/LucasFueGo)
-   **Laurent Vandermeersch** - [laurentVDM](https://github.com/laurentVDM)
-   **Loic Thomas** - [LoicThomas9170](https://github.com/LoicThomas9170)
