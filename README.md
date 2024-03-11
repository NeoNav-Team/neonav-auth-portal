This Build is an Auth portal for the NeoNav authentication endpoints.

## Getting Started

This build expects to be run https on a neonav.net subdomain:

To do this locally, please edit your machine's hosts file to redirect localhost to `local.neonav.net`

Then, create shh certs at the root of the build for this domain.

create a `.env` file that contains the following:

```
NODE_ENV="development"
CERT_PATH="local.neonav.net"
LOCAL_DOMAIN="local.neonav.net"
API_DOMAIN="devapi.neonav.net"
NEXT_PUBLIC_CALLBACK_DOMAIN="https://beta.neonav.net"
```

Lastly, run `npm run dev` which will run a development server using these certificates at `https://local.neonav.net:3000`


