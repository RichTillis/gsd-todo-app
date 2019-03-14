# GSD: A Simple To-Do List Manager
This project is a simple todo app built using the Ionic and Angular JavaScript frameworks. It lets you create, update, and complete todo items. It also contains grouping elements, which you can apply to todos, that you can also create, update, and delete. This app uses local memory to store the todos and categories.

I've been building this app to better understand Ionic, Angular, Typescript, RxJs, Git, and eventually Karma. This app gives me an excuse to find ways to implement concepts like lazy-loading, shadow DOM style updating, Observables, interfaces, services, etc. It also gives me a chance to get more comfortable with basic git concepts (push, pull, commit, branch, tag, merge, etc.)


## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


### Prerequisites
Be sure to have the following software installed 

  Node 9 (or higher) & NPM 6 (or higher)
  [Nodejs.org](https://nodejs.org/en/) - Follow directions based on your OS

Angular 7
```
npm install @angular/cli -g
```
Ionic 4
```
npm install -g ionic
```


### Installing
Installation to get a development environment up and running is straight-forward.    

Clone the repository
```
git clone git@github.com:RichTillis/gsd-todo-app.git
```
Change Directory into the project directory 
```
cd gsd-todo-app
```
Use NPM and install the project's dependencies
```
npm install
```
Run the app
```
ionic serve
```
If all goes well, your default browser will open and a new tab will eventually display the GSD todo app.


## Running the tests
Once tests exist I will:

Explain how to run the automated tests for this system


### Break down into end to end tests
Explain what these tests test and why

```
Give an example
```


### And coding style tests
Explain what these tests test and why

```
Give an example
```


## Deployment
Because this is built within the Ionic framework, this app can be built as a Progressive Web App (PWA), an Electron desktop app, or built and deployed to the iOS or Android app stores.

Follow the instructions documented in the [Ionic Documentation](https://ionicframework.com/docs/publishing/progressive-web-app) to deploy to a specific environment.


## Built With
*  [Ionic](https://ionicframework.com/) - An open-source JavaScript SDK for hybrid mobile app development

*  [Angular](https://angular.io/) -   A TypeScript-based open-source web application framework led by the Angular Team at Google 

*  [Typescript](https://www.typescriptlang.org/) - TypeScript is an open-source programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript, and adds optional static typing to the language.

*   [Capacitor](https://capacitor.ionicframework.com/) - From the Ionic team. Capacitor is a cross-platform app runtime that makes it easy to access and use native device features through web-focused API Plugins.


## Contributing
I don't yet have a contributing document for details on our code of conduct, and the process for submitting pull requests to us. When I do I will add a link to that here.


## Versioning
I'll be attempting to use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/RichTillis/gsd-todo-app/releases).


## Authors
*  **Rich Tillis**


## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


## Acknowledgments
* [PurpleBooth](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)  for the great README.md template
