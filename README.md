# dotenv-to-yaml

Convert your dotenv files to their YAML equivalent.

## Motivations

I initially developed this package to easily deploy Google Cloud Functions because the `gcloud` CLI does not understand
dotenv files.

> Extracted from the [`gcloud functions deploy`](https://cloud.google.com/sdk/gcloud/reference/functions/deploy#--env-vars-file) docs:
>
> `--env-vars-file=FILE_PATH`
>
> Path to a local YAML file with definitions for all environment variables. All existing environment variables will be removed before the new environment variables are added.

## Installation

Install locally (inside a project where a `package.json` is defined):

```shell
npm install dotenv-to-yaml
```

Note: you may want to use the `--dev` flag if you are only interested in the CLI feature.

## Usage

### Command Line Interface

Global usage:

```shell
dotenv-to-yaml [source] [destination]

Transform a dotenv file to YAML one

Positionals:
  source       The source dotenv file or `-` if the file content is piped to
               STDIN.                                 [string] [default: ".env"]
  destination  The destination YAML file or `-` to pipe the conversion result to
               STDOUT.                           [string] [default: ".env.yaml"]

```

#### Piping from STDIN

dotenv-to-yaml supports piping the dotenv content through STDIN; the converted output will be sent to STDOUT.

Example:

```shell
dotenv-to-yaml < samples/bedrock.env
```

will print:

```yaml
AUTH_KEY: qVQ9646_?j*46vlO^j$;cGY/|;4i7z%&&bk/O#rex[.72@*R8_{9h8#D$|8@7_Wj
SECURE_AUTH_KEY: SoHEtm!HO3M2r#Z$3l]PX}aSc-hyLq95m_w7oY=a]fOM4b[/Q^=L`MB^lb`qAU-y
LOGGED_IN_KEY: dt{MU>/B9YO.V)M#3Ho=QmJc4s:/WC58r%CZTrQkx7jpgRvrO@iDYo[COU8X*=C|
NONCE_KEY: '*#XT#t,y2ucBk87C;88;0(Cwq+zA1()WIwsR!P4TIzJQZPA2P$Saww8xQ(GDx_y]'
AUTH_SALT: .J2bEZQvDKMM%kWwdgXFf/q/&10c7AtSbl%NLH.3j.}.4.|MPdC,Tnp$:|i#sF)y
SECURE_AUTH_SALT: /DdIXg_TI|E`;/C#t24^>i[@WG/1SsnoQU*bfmdf#p9e%Zo(xe?b9CJ(tZD;:^o3
LOGGED_IN_SALT: c5AMtWe?Nut`]sVo5Sdw4:)N,togVS6L{IvRvCxi>;VJyz4xDE$&X#q4)JB<#LUH
NONCE_SALT: Nmfdg*9@x$tdb[TZj.1-p)(<ay]:k=:5u(lmH2bpi8]A|qAMm_AGajQ90ZQQI.f<
```

#### Specifying source and destination

```shell
dotenv-to-yaml .env .env.yaml
```

### Node.js

```javascript
const { dotenvToYAML } = require('dotenv-to-yaml');
```

### ESM / TypeScript

```typescript
import { dotenvToYAML } from 'dotenv-to-yaml';
// OR with default import:
import dotenvToYAML from 'dotenv-to-yaml';
```