const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.resolve(__dirname, "preload.electron.js"),
      // contextIsolationは基本的にtrueに設定するのが推奨されています。falseにすると、レンダラープロセスでNode.jsの全APIにアクセスできるため、意図しないコードが実行されるリスクが高くなります。
      contextIsolation: true,
      // もしpreload.jsを利用する場合は、Node.js関連の操作はpreload.jsで処理するように変更し、nodeIntegration: falseにするのがセキュリティ的にベストです。
      nodeIntegration: false,
    },
  });

  if (process.env.NODE_ENV === "development") {
    win
      .loadURL("http://localhost:5173")
      .catch((error) =>
        console.error("Failed to load development URL:", error)
      );
  } else {
    const indexPath = path.resolve(__dirname, "index.html");
    win
      .loadFile(indexPath)
      .catch((error) =>
        console.error("Failed to load development html:", error)
      );
  }
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("get-versions", () => ({
  chrome: process.versions.chrome,
  electron: process.versions.electron,
  node: process.versions.node,
}));
