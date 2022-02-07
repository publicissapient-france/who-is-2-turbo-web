<h1 align="center">
  Who Is 2 Turbo 🚀
</h1>

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
* Firebase Hosting - [https://firebase.google.com/docs/hosting](https://firebase.google.com/docs/hosting)
