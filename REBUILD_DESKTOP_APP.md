# Rebuilding the Desktop Application

The desktop application was built with Nativefier and stored in `Complaens-win32-x64/`.

To update the icon and app name to use the gerb.png image and name "АНТИКОР ДАСТУР ИЭС АЖ", you have two options:

## Option 1: Rebuild with Nativefier (Recommended)

Prerequisites:
- Node.js and npm installed
- Nativefier installed globally: `npm install -g nativefier`

Steps:
1. Make sure the web app is built: `npm run build && npm start`
2. Run the build script: `npm run build:electron`

This will create a new `Complaens-app-win32-x64` folder with the updated icon and name.

## Option 2: Use an Icon Extraction/Replacement Tool

1. Convert gerb.png to ICO format using an online tool or ImageMagick
2. Use Resource Hacker or similar tools to replace the icon in `Complaens.exe`
3. Update the executable's metadata

## Files Already Updated:
- ✓ `_document.js` - Added favicon for web version
- ✓ `nativefier.json` - Updated metadata
- ✓ `package.json` - Updated app name
- ✓ `installer/ComplaensSetup.iss` - Updated installer name

After rebuilding, the desktop app will display:
- App Name: "АНТИКОР ДАСТУР ИЭС АЖ"
- Icon: gerb.png
