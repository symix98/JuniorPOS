const setupEvents = require("./installers/setupEvents");
if (setupEvents.handleSquirrelEvent()) {
  return;
}

const server = require("./server");
const { app, BrowserWindow, ipcMain } = require("electron");
// const https = require("https");
// let licKey;
// https
//   .get("https://fakestoreapi.com/products", (response) => {
//     let data = "";

//     response.on("data", (chunk) => {
//       data += chunk;
//     });

//     response.on("end", () => {
//       console.log(data);
//     });
//   })
//   .on("error", (error) => {
//     console.error(error);
//   });
// const isValidLicenseKey = false;
const path = require("path");

const contextMenu = require("electron-context-menu");

let mainWindow, licenseWindow;

function createWindow() {
  // licenseWindow = new BrowserWindow({
  //   maxWidth: 500,
  //   minHeight: 400,
  //   webPreferences: {
  //     nodeIntegration: true,
  //   },
  //   parent: mainWindow,
  //   frame: true,
  //   modal: true,
  //   show: false,
  // });

  mainWindow = new BrowserWindow({
    width: 1500,
    height: 1200,
    frame: false,
    minWidth: 1200,
    minHeight: 750,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
    show: false,
  });
  mainWindow.loadURL(`file://${path.join(__dirname, "index.html")}`);

  // licenseWindow.loadFile("license.html");

  // licenseWindow.on("closed", () => {
  //   licenseWindow = null;
  // });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  // if (isValidLicenseKey) {
  mainWindow.maximize();
  // } else {
  // licenseWindow.show();
  // }
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on("app-quit", (evt, arg) => {
  app.quit();
});

ipcMain.on("app-reload", (event, arg) => {
  mainWindow.reload();
});

contextMenu({
  prepend: (params, browserWindow) => [
    {
      label: "DevTools",
      click(item, focusedWindow) {
        focusedWindow.toggleDevTools();
      },
    },
    {
      label: "Reload",
      click() {
        mainWindow.reload();
      },
      // },
      // {  label: 'Quit',  click:  function(){
      //    mainWindow.destroy();
      //     mainWindow.quit();
      // }
    },
  ],
});
