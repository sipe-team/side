#!/bin/sh

echo "Current directory: $(pwd)"
echo "Contents: $(ls -la)"

if [ -d "../.storybook" ]; then
    echo "Found .storybook in parent directory, moving up"
    cd ../
elif [ ! -d ".storybook" ]; then
    echo "ERROR: .storybook directory not found!"
    echo "Current location: $(pwd)"
    echo "Contents: $(ls -la)"
    exit 1
fi

mkdir -p output

if [ -d ".storybook" ]; then
    cp -r .storybook output/
    echo "Copied .storybook"
else
    echo "ERROR: .storybook not found in $(pwd)"
    exit 1
fi

if [ -f ".gitignore" ]; then
    cp .gitignore output/
    echo "Copied .gitignore"
fi

if [ -f "tsconfig.json" ]; then
    cp tsconfig.json output/
    echo "Copied tsconfig.json"
fi

if [ -d "./side" ]; then
    cp -R ./side/* ./output/
    echo "Copied side/* to output"
fi

if [ -d "./packages" ]; then
    cp -R ./packages ./output/
    echo "Copied packages to output"
fi

if [ -f "package.json" ]; then
    cp package.json output/
    echo "Copied package.json"
fi

if [ -f "pnpm-lock.yaml" ]; then
    cp pnpm-lock.yaml output/
    echo "Copied pnpm-lock.yaml"
fi

if [ -f "tsconfig.base.json" ]; then
    cp tsconfig.base.json output/
    echo "Copied tsconfig.base.json"
fi

if [ -f "tsconfig.node.json" ]; then
    cp tsconfig.node.json output/
    echo "Copied tsconfig.node.json"
fi

echo "Build.sh completed successfully"
echo "Output directory contents:"
ls -la output/