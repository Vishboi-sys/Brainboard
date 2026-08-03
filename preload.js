const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("panelAPI", {
    hidePanel: () => ipcRenderer.send("hide-panel"),
    submitQuery: (text) => ipcRenderer.invoke("submit-query", text),
});