# MagicVics CRM

## Structure

- `client/` React (Vite)
- `server/` Node/Express API

## Client

```bash
cd client
npm install
npm run dev
```

## Server

```bash
cd server
npm install
npm run dev
```

## Notes

The dashboard UI is implemented in `client/src/App.jsx`.

## Deploy (Railway)

Railway builds from repository root. This project now includes a root `package.json`
with workspaces so Railway can detect Node correctly.

- Build command: `npm run build`
- Start command: `npm start`

The server serves `client/dist` automatically when it exists.
