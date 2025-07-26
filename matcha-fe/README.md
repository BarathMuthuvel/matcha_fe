Frontend deployment steps:

chmod 400 MatchaFE-Secret.pem
ssh -i "MatchaFE-Secret.pem" ubuntu@ec2-3-27-18-138.ap-southeast-2.compute.amazonaws.com
Install Node
git clone https://github.com/BarathMuthuvel/matcha_fe.git
Frontend:
npm install
npm run build
sudo apt update
sudo apt install nginx
sudo systemctl start nginx
sudo systemctl status nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
sudo scp -r dist/_ /var/www/html/
sudo cp -r dist/_ /var/www/html/
/var/www/html/
Enable port: 80 in AWS instance

# Remove existing node if any

sudo apt remove nodejs -y

# Install curl if not present

sudo apt install curl -y

# Download the Node.js v20 setup script from NodeSource

curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Install Node.js (latest v20.x)

sudo apt install -y nodejs
