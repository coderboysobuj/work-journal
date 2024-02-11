## Work Journal application

### Track you every day activies with work journal application

## Get started

From your terminal:

```sh
git clone https://github.com/coderboysobuj/work-journal.git
cd work-journal
pnpm install
cp .env.example .env
npx prisma migrate dev
pnpm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.
