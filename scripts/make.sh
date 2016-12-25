rm build/archive.zip
cd ../src
zip -r -D ../scripts/build/archive.zip ./* -x ".DS_Store"
