#!/bin/bash
echo "-- Running build"
astro build --mode web3
cd dist || exit
rm CNAME
printf "\n\n-- Uploading files\n"
scp -r . ipfsnode:~/dist
printf "\n\n-- Deploying on IPFS\n"
ssh ipfsnode << 'EOF'
  rm -rf xav-website
  mv dist xav-website
  ipfs add -r xav-website
EOF
printf "\n\n-- Done"
