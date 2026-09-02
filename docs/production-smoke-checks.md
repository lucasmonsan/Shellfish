# Production smoke checks

- Confirm Coolify deployed the intended merged commit.
- Request `/up` without credentials; it must return HTTP 200 and exactly `ok`.
- Request `/` without credentials; it must return HTTP 401 with a Basic authentication challenge.
- Authenticate with the configured credentials and open `/components`.
- Confirm the locale selector preserves the current route and the catalog remains `noindex, nofollow`.
- Confirm the component guide, controls, generated code and copy action work.
- Review Coolify logs for unexpected `4xx` or `5xx` responses.
