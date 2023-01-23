# node-crud-api

Simple node remote control with Node.js.

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [API](#api)

## General info

This project is simple remote control application.

## Technologies

Project is created with:

- Node.js 18 LTS
- [Websocket protocol](https://en.wikipedia.org/wiki/WebSocket)

## Prerequisites

To run this project please make sure to have `Node.js 18 LTS` installed.

## Setup

To setup the project, please follow these steps:

1. clone this repo to your machine using 'git clone'

2. open project folder

3. go to develop branch using 'git checkout dev'

4. install packages using 'npm install'

Now you can start the application:

1. In development mode:

`npm run start:dev`

2. In production mode:

`npm run start`

To test the application with client application please come [here](https://github.com/rolling-scopes-school/remote-control) and follow instructions.

## Features

List of websocket commands and their syntax (<- - cmd from frontend, -> - answer):

- Navigation over the x and y axis
  - Move mouse up
  ```bash
  <- mouse_up {y px}
  ```
  - Move mouse down
  ```bash
  <- mouse_down {y px}
  ```
  - Move mouse left
  ```bash
  <- mouse_left {x px}
  ```
  - Move mouse right
  ```bash
  <- mouse_right {x px}
  ```
  - Send mouse coordinates
  ```bash
  <- mouse_position
  -> mouse_position {x px},{y px}
  ```
- Drawing
  - Draw circle with pushed left button:
  ```bash
  <- draw_circle {px}
  ```
  - Draw rectangle with pushed left button:
  ```bash
  <- draw_rectangle {px} {px}
  ```
  - Draw square with pushed left button:
  ```bash
  <- draw_square {px}
  ```
- Print screen
  - Make print screen command and send image (a base64 buffer of the 200 px square around the mouse position):
  ```bash
  <- prnt_scrn
  -> prnt_scrn {base64 string (png buf)}
  ```
