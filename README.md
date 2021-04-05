# django-next-graphql

This is an example/proof of concept of a monorepo for a site with a Django backend and a next.js frontend using graphql (graphene and urql). Right now it demonstrates a hybrid approach where the nextjs application will use the django application as a fallback. During server side rendering the cookies are proxied allowing authentication to persist through SSR, CSR, and the nextjs fallback rewrites.

The monorepo is using yarn for node, alongside poetry for python dependencies. Yarn is traditionally a node package manager, this repo uses the yarn v2 workspaces feature as nice monorepo framework.

## Dependencies

To start developing in this repository you only need nix

- [Nix](https://nixos.org/)

  Nix is a package manager itself so any further dependencies are managed through nix automatically. You should familiarize a bit with nix yourself but the highlights as they relate to this project are:

  - Contained

    Dependencies managed through nix won't contaminate the rest of your system. You can also garbage collect or completely remove dependencies easily.

  - Reproducable

    This is good for keeping the development and production environments as similar as possible.

- [direnv](https://direnv.net/)

  This repo has a `.envrc` file that is used by direnv to enter the nix shell automatically (and the option of adding further local modifications to `.envrc.local`). It's also being used for setting up isolated python environment, this should probably be done through the nix shell in the future though.

## Developing

Install the dependencies with `yarn install`. (This will also install the poetry dependencies).

Run `yarn all:dev` to start both the API and the webapp
