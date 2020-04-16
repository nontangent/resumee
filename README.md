# Resumee
Resumee is a web app that renders a resume written in Markdown beautifully for LaTeX.

## Demo
Access to [https://resumee.work](https://resumee.work)  

## Develop
How to develop is using docker or npm. 
I recommend development with npm beacause file I/O overhead is too large.

### Useing Docker 
```
$ git clone https://github.com/nontan18/resumee.git
$ cd resumee
$ docker-compose up
```
Open `http://localhost:4200` in your browser.

### NPM
```
$ git clone https://github.com/nontan18/resumee.git
$ cd resumee/app
$ npm install
$ npm dev:ssr
```
Open `http://localhost:4200` in yout browser.

## LISENCE
MIT LISENCE
