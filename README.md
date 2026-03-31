This Build is an Auth portal for the NeoNav authentication endpoints.

## Getting Started

This build expects to be run https on a neonav.net subdomain:

### 1. Hosts File

Edit your machine's hosts file to redirect localhost to `local.neonav.net`:

- **macOS/Linux:** `/etc/hosts`
- **Windows:** `C:\Windows\System32\drivers\etc\hosts`

Add the following line:
```
127.0.0.1 local.neonav.net
```

### 2. SSL Certificates

Create SSL certificates at the root of the project. The filenames must match your `CERT_PATH` env var value with `.cer` and `.key` extensions. For example, if `CERT_PATH="local.neonav.net"`, you need:

```
local.neonav.net.cer
local.neonav.net.key
```

To generate a self-signed certificate using mkcert:
```bash
mkcert local.neonav.net
```

Or using openssl:
```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout local.neonav.net.key \
  -out local.neonav.net.cer \
  -subj "/CN=local.neonav.net"
```

### 3. Environment Variables

Create a `.env` file at the root of the project:

```
NODE_ENV="development"
CERT_PATH="local.neonav.net"       # Prefix for your .cer and .key cert files
LOCAL_DOMAIN="local.neonav.net"    # Local domain name
API_DOMAIN="devapi.neonav.net"     # Backend API domain
NEXT_PUBLIC_CALLBACK_DOMAIN="https://beta.neonav.net"  # Post-login redirect target
```

### 4. Running the Dev Server

```bash
npm run dev
```

Starts the development server at `https://local.neonav.net:3000`.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Next.js development server (standard) |
| `npm run sdev` | Custom HTTPS development server (`server/development-index.js`) — use this if you need the custom server logic |
| `npm run build` | Build the Next.js application for production |
| `npm run start` | Start the production server |
| `npm run deploy` | Deploy using PM2 |
| `npm run lint` | Run ESLint |

## Pages and Routes

| Route | Description |
|-------|-------------|
| `/login` | User login |
| `/register` | New user registration |
| `/logout` | Logs the user out and clears the session |
| `/forgot` | Forgot password — initiates reset flow |
| `/reset` | Reset password using a token |
| `/verify` | Email verification |
| `/invite` | Accept a user invitation |
| `/changepassword` | Change password (authenticated users only) |
| `/developer` | Developer portal — manage API keys |
| `/eula` | End-User License Agreement |

## Middleware and Routing Behavior

Next.js middleware (`middleware.ts`) handles route protection:

- Unauthenticated users accessing `/` are redirected to `/login`
- Authenticated users accessing `/login` or `/` are redirected to `/logout`

Authentication is determined by the presence of an `accessToken` cookie.

## Authentication and Session Management

- On successful login, an `accessToken` is stored in a cookie scoped to `.neonav.net`
- All authenticated API requests send this token via the `x-access-token` header
- The cookie is shared across all `*.neonav.net` subdomains
- HTTPS is required for the cookie to be transmitted securely

## Query Parameters

The login page supports the following query parameters:

| Parameter | Description |
|-----------|-------------|
| `?redirect=` | URL to redirect the user to after successful login |
| `?post=` | A POST endpoint to call with user credentials after successful login |

Any query parameters present on the login page are displayed as chips on the form for visibility.

## Post-Login Callback Redirect

After a successful login, the portal redirects the user using the following priority order:

1. **`?redirect=` query parameter** (highest priority) — if the login URL includes a `redirect` param, the user is sent there after login. Example:
   ```
   https://auth.neonav.net/login?redirect=https://app.neonav.net/dashboard
   ```
2. **`NEXT_PUBLIC_CALLBACK_DOMAIN` env var** — if set, the user is redirected to this domain after login.
3. **`https://neonav.net`** (default) — used if neither of the above are present.

This allows other NeoNav apps to send unauthenticated users to the auth portal and have them returned to the correct page after login.

> **Note:** The `redirect` query parameter is not currently validated against an allowlist. Avoid passing untrusted URLs and consider restricting redirects to `*.neonav.net` domains in future.
