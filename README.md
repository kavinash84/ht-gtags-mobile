# HomeTown Mobile #

[Mobile-PWA](https://m.hometown.in)

## Installing Dependencies

```bash
npm install
```

## Running Dev Server

```bash
npm run dev
```

## Building and Running Production Server

```bash
npm run build
npm run start 
```

## Pm2 configuration

```bash
pm2 add pm2.json
```

## Port Details

- Runs production server on 8080 prot
- Dev Server runs on 3000 prot

## Nginx configuration

```bash
location / {
  proxy_pass http://127.0.0.1:8080;
  }

  location /service-worker.js {
    root {path}/static/m-dist/;
  }

  location ~ /m-dist/ {
    root {path}/static/;
  }

  # Any route containing a file extension (e.g. /devicesfile.js)
  location ~ ^.+\..+$ {
    try_files $uri =404;
  }

  location / {
    try_files $uri $uri/ /index.html;
  }
```
