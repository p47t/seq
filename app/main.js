const { app, ipcMain, BrowserWindow } = require('electron')

const process = require('process')
const path = require("path");

function createWindow () {
    console.log(path.resolve(__dirname, "preload.js"))
    const win = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            preload: path.resolve(__dirname, "preload.js")
        }
    })

    win.loadFile('./app/index.html')
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

ipcMain.on('versions', (event) => {
    event.returnValue = {
        chrome: process.versions.chrome,
        electron: process.versions.electron,
        node: process.versions.node,
    }
})