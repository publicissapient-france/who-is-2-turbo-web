<h1 align="center">
  Who Is 2 Turbo 🚀
</h1>

[![ci-cd](https://github.com/publicissapient-france/who-is-2-turbo-web/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/publicissapient-france/who-is-2-turbo-web/actions/workflows/ci-cd.yml)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=publicissapient-france_who-is-2-turbo-web&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=publicissapient-france_who-is-2-turbo-web)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=publicissapient-france_who-is-2-turbo-web&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=publicissapient-france_who-is-2-turbo-web)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=publicissapient-france_who-is-2-turbo-web&metric=bugs)](https://sonarcloud.io/summary/new_code?id=publicissapient-france_who-is-2-turbo-web)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=publicissapient-france_who-is-2-turbo-web&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=publicissapient-france_who-is-2-turbo-web)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=publicissapient-france_who-is-2-turbo-web&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=publicissapient-france_who-is-2-turbo-web)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=publicissapient-france_who-is-2-turbo-web&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=publicissapient-france_who-is-2-turbo-web)

## Contribute

```shell
npm install
npm run develop
```

## Preview

Who Is can use [preview](https://firebase.google.com/docs/hosting/manage-hosting-resources)

* Create a configuration file `.env.production.preview`
* Set appropriate `GATSBY_FIREBASE_AUTH_DOMAIN` and `GATSBY_SITE_URL` according to your preview URL
* Run command:

```shell
PREVIEW=true npm run build && firebase hosting:channel:deploy <preview name> --expires 7d
```

## Stack

* Gatsby - [https://www.gatsbyjs.com/](https://www.gatsbyjs.com/)
* TailwindCSS - [https://tailwindcss.com/](https://tailwindcss.com/docs)
  * [Recommended class order](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier#how-classes-are-sorted)
* Firebase Hosting - [https://firebase.google.com/docs/hosting](https://firebase.google.com/docs/hosting)
