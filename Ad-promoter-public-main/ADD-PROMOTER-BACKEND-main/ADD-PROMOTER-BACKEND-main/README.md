# Ad Promoter REST API 🇳🇬

## Description

An API for Ad Promoter.

## Table of Contents

-   [Features](#features)
-   [Quick run](#quick-run)
-   [Comfortable development](#comfortable-development)
-   [Links](#links)
-   [Automatic update of dependencies](#automatic-update-of-dependencies)
-   [Database utils](#database-utils)
-   [Tests](#tests)

## Features

-   [x] Database ([typeorm](https://www.npmjs.com/package/typeorm)).
-   [x] CI (Github Actions).
-   [x] Swagger.
-   [x] E2E and units tests.
-   [x] Docker.

## Quick run

Run the application with docker

```bash

```

## Comfortable development

### - Install dependencies

```bash
npm install
```

Install Nest-cli for easy development, and maintenance of your Nestjs project

```bash
npm install -g @nestjs/cli
```

### - Environment Configuration

`ConfigService` read all environment variables from `.env` files.

Copy the `.env.example` file to `.env` and edit it, with your own values.

```bash
cp .example.env .env

```

### - To run the application in development mode with `npm run start:dev`

### - To run the application as a docker container

```bash
docker-compose up
```

### - To re-build the application docker image

```bash
docker-compose up --build
```

Generate a new resource with nest-cli, e.g users

```bash
$ nest generate resource users
```

This assumes you have nest-cli installed.

## Links

-   Swagger: http://localhost:3000/docs
<!-- - Adminer (client for DB): http://localhost:8080
-   Maildev: http://localhost:1080 -->

### Install Act for local testing of the github actions

Make sure you have docker installed for act to work.

```bash
npm install -g act
```

Or install using homebrew

```bash
brew install act
```

Test the github actions locally

```bash
$ act
```

For M1 users,

```bash
$ act --container-architecture linux/amd64
```
