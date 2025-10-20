# Quick Start Guide - Clone & Install with Bun

## Prerequisites

Make sure you have [Bun](https://bun.sh) installed on your system.

```bash
# Check if Bun is installed
bun --version
```

If not installed, visit [bun.sh](https://bun.sh) for installation instructions.

## Clone the Repository

```bash
git clone git@github.com-luxeave:luxeave/gcp-secret-demo.git
cd gcp-secret-demo
```

## Install Dependencies

Using Bun is faster than npm or yarn:

```bash
bun install
```

This will:
- Read `package.json` and `bun.lock`
- Install all dependencies from `dependencies` and `devDependencies`
- Create/update `node_modules/`

## Verify Installation

```bash
# Check that dependencies are installed
ls node_modules

# Verify TypeScript is available
bun run tsc --version
```

## Deploy

```bash
# export SECRET_ID="APP_ENV"
# export PORT=8080
bun run tsc
bun run node dist/index.js
```

## Test with `curl`

```bash
curl http://localhost:8080
# → {"ok":true,"app":"sm-demo","version":"1.0.0"}
curl http://localhost:8080/debug
# → shows selected env vars (for demo only)
```

## Project Structure

```
.
├── src/
│   ├── index.ts          # Main entry point
│   └── secret.ts         # Secret Manager utilities
├── package.json          # Project metadata & dependencies
├── bun.lock              # Bun lock file (commit this)
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
```

## Dependencies

- **@google-cloud/secret-manager**: ^6.1.1 - Google Cloud Secret Manager client
- **@types/node**: ^24.8.1 - TypeScript types for Node.js
- **typescript**: ^5.9.3 - TypeScript compiler

## Next Steps

- Review `README.md` for project details
- Check `src/index.ts` to understand the application
- Run TypeScript compiler: `bun run tsc`

## Troubleshooting

**Issue**: `bun: command not found`
- Solution: Install Bun from https://bun.sh

**Issue**: Dependencies not installing
- Solution: Delete `node_modules` and `bun.lock`, then run `bun install` again

**Issue**: TypeScript errors
- Solution: Run `bun run tsc` to check for type errors

