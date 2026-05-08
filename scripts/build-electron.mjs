#!/usr/bin/env node
import { copyFileSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const appName = 'АНТИКОР ДАСТУР ИЭС АЖ';
const gerbIconPath = path.join(__dirname, '../public/images/gerb.png');
const appIconPath = path.join(__dirname, '../Complaens-win32-x64/resources/app/icon.png');
const nativefierJsonPath = path.join(__dirname, '../Complaens-win32-x64/resources/app/nativefier.json');

async function updateDesktopApp() {
  try {
    console.log('Updating Desktop App...');
    
    // Copy gerb.png as icon
    console.log('Copying icon...');
    copyFileSync(gerbIconPath, appIconPath);
    console.log('✓ Icon copied to app resources');
    
    // Update nativefier.json
    console.log('Updating app metadata...');
    const nativefierJson = JSON.parse(readFileSync(nativefierJsonPath, 'utf8'));
    nativefierJson.name = appName;
    nativefierJson.win32metadata.ProductName = appName;
    nativefierJson.win32metadata.FileDescription = appName;
    writeFileSync(nativefierJsonPath, JSON.stringify(nativefierJson));
    console.log('✓ App metadata updated');
    
    console.log('\n✓ Desktop app updated successfully!');
    console.log('\nNote: The app will use the new icon and name on next restart.');
    console.log('If it still shows the old icon, you may need to clear app cache or rebuild with Nativefier.');
    
  } catch (error) {
    console.error('✗ Update failed:', error.message);
    process.exit(1);
  }
}

updateDesktopApp();
