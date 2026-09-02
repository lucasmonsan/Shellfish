# Internal catalog deployment

Deploy Shellfish only as an internal catalog. The component package remains a reusable library.

## Coolify

- Build pack: Nixpacks
- Exposed port: `3000`
- Healthcheck: `GET /up`
- Branch: the merged deployment branch

Coolify must set these secrets:

- `SHELLFISH_CATALOG_USERNAME`
- `SHELLFISH_CATALOG_PASSWORD`

Both are required in production. Without them, catalog routes return `503`; `/up` remains public and returns `ok`.

The catalog uses HTTP Basic authentication and sends `noindex, nofollow` metadata. `noindex` is not an access control mechanism.

## Runtime

- Node: `22`
- Package manager: `pnpm@11.17.0`
- Build: `npx --yes pnpm@11.17.0 install --frozen-lockfile && npx --yes pnpm@11.17.0 build`
- Start: `node build/index.js`

Do not commit credentials, domains, Coolify tokens or VPS details.
