#!/bin/bash
# Build script for the extension

echo "Building Chrome Extension..."

# Create dist directory
mkdir -p extension/dist

# Copy public files
cp -r extension/public/* extension/dist/

# Copy source files
cp extension/src/background.js extension/dist/
cp extension/src/content.js extension/dist/
cp extension/src/popup.js extension/dist/

echo "Extension built successfully at extension/dist/"
echo "Load the extension from chrome://extensions/ in Chrome"
