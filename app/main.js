const { app, ipcMain, BrowserWindow, dialog } = require('electron')

const process = require('process')
const path = require('path');
const fs = require('fs/promises')

let mainWindow;

function createWindow () {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            preload: path.resolve(__dirname, "preload.js")
        }
    })

    mainWindow.loadFile('./app/index.html')
}

app.on("ready", createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

ipcMain.on('versions', (event, args) => {
    event.returnValue = {
        chrome: process.versions.chrome,
        electron: process.versions.electron,
        node: process.versions.node,
    }
})
ipcMain.handle('load', async (event, args) => {
    const chosen = await dialog.showOpenDialog(mainWindow, {
        properties: ['openFile', 'openDirectory']
    });
    let content = await fs.readFile(chosen.filePaths[0]);
    return JSON.parse(content.toString());
})