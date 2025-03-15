#!/bin/sh
cd ../
mkdir output

cp -r .storybook output/
cp -r .gitignore output/
cp -R ./side/* ./output
cp -R ./output ./side/