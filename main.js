const {app, BrowserWindow, globalShortcut, ipcMain} = require("electron");
let win;
function createWindow() {
    win = new BrowserWindow({
        width: 500,
        height: 300,
        x: 600,
        y: 120,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        show: false,
        webPreferences: {
            preload: __dirname + "/preload.js",
        },
    });
    win.loadFile("index.html");
}

app.whenReady().then(() => {
    createWindow();
    globalShortcut.register("Control+Space", () => {
        if (win.isVisible()) {
            win.hide();
        } else {
            win.show();
        }
    });
});

ipcMain.on("hide-panel", () => {
    win.hide();
});

app.on("will-quit", () => {
    globalShortcut.unregisterAll();
});