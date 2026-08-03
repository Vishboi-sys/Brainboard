const {app, BrowserWindow, globalShortcut, ipcMain} = require("electron");

let windows = [];

function createBoxWindow(file, x, y, width, height) {
    const win = new BrowserWindow({
        width: width,
        height: height,
        x: x,
        y: y,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        show: false,
        webPreferences: {
            preload: __dirname + "/preload.js",
        },
    });

    win.loadFile(file);
    return win;
}

app.whenReady().then(() => {
    const searchWindow = createBoxWindow("search.html", 600, 120, 500, 60);
    const todoWindow = createBoxWindow("todo.html", 600, 190, 500, 300);
    const notepadWindow = createBoxWindow("notepad.html", 1110, 120, 350, 200);
    const pomodoroWindow = createBoxWindow("pomodoro.html", 1110, 330, 350, 150);

    windows = [searchWindow, todoWindow, notepadWindow, pomodoroWindow];

    globalShortcut.register("Control+Space", () => {
        const isVisible = windows[0].isVisible();

        for (const win of windows) {
            if (isVisible) {
                win.hide();
            } else {
                win.show();
            }
        }
    });
});

ipcMain.on("hide-panel", () => {
    for (const win of windows) {
        win.hide();
    }
});

app.on("will-quit", () => {
    globalShortcut.unregisterAll();
});