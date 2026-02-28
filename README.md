# Keycloakify Shadcn Starter

Starter Keycloak login theme built with React, TypeScript, Tailwind CSS v4, shadcn/ui, and Keycloakify.

## Quick Start

```bash
pnpm install
pnpm dev
```

## Main Commands

```bash
pnpm dev                  # run login theme locally
pnpm storybook            # component playground
pnpm emails:preview       # preview email templates
pnpm build                # app build
pnpm build-keycloak-theme # build Keycloak theme JAR
```

## Build Output

`pnpm build-keycloak-theme` creates the deployable theme JAR in `dist_keycloak/`.

Note: Maven must be installed for Keycloakify theme packaging.

## Where To Customize

- Login layout and pages: `src/login/`
- Main login template: `src/login/components/Template/Template.tsx`
- Theme styles: `src/login/index.css`
- Logo: `src/login/assets/img/auth-logo.svg`
- Login translations: `src/login/i18n.ts`
- Language selector: `src/components/langauges.tsx`
- Email templates: `src/email/templates/`
- Email translations: `src/email/locales/`

## Login Languages

The login UI is currently configured to show only:

- English (`en`)
- Español (`es`)
- Català (`ca`)
