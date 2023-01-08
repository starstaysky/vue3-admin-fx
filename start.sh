cd client
npm run build
rm -rf ../server/public/
cp -r dist/ ../server/public
pm2 start ../server/koa-component.js