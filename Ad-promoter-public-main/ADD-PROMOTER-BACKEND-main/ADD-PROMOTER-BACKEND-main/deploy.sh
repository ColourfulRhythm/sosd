echo "Kill all the running PM2 actions"
sudo pm2 kill

echo "Jump to app folder"
cd /home/ubuntu/ad-promoter-api

echo "Update app from Git"
git pull

echo "Install app dependencies"
sudo npm prune
sudo npm install

echo "Build your app"
sudo npm run build

echo "Run new PM2 action"
sudo cp /home/ubuntu/ad-promoter-api
sudo pm2 start dist/main.js --name AdPromoterApi