const electronInstaller = require('electron-winstaller');
const path = require('path');

const rootPath = path.join('./');

resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: './release-builds/JUNIOR POS',
    outputDirectory: './installers',
    authors: 'Hossein elshmely~+96171465002',
    noMsi: true,
    exe: 'JUNIOR.exe',
    setupExe: 'JUNIORInstaller.exe',
    setupIcon: path.join(rootPath, 'assets', 'images', 'icon.ico')
  });

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));