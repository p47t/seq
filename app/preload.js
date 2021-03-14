const { contextBridge, ipcRenderer } = require('electron')

console.log(ipcRenderer)

contextBridge.exposeInMainWorld(
    'app',
    {
        versions: () => ipcRenderer.sendSync('versions'),
        load: () => ipcRenderer.invoke('load'),
    }
)