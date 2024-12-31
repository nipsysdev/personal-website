#!/bin/bash
echo "-- Running build"
pnpm run build
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
