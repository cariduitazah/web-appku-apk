const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

// Data disimpan di folder "data" sejajar dengan aplikasi
const folderData = path.join(process.cwd(), 'data');
if (!fs.existsSync(folderData)) {
  fs.mkdirSync(folderData, { recursive: true });
}

function ambilLokasiFile(nama) {
  return path.join(folderData, `${nama}.json`);
}

async function bacaData(nama) {
  const lokasi = ambilLokasiFile(nama);
  try {
    if (fs.existsSync(lokasi)) {
      const isi = fs.readFileSync(lokasi, 'utf-8');
      return JSON.parse(isi);
    }
    return [];
  } catch {
    return [];
  }
}

async function tulisData(nama, data) {
  try {
    fs.writeFileSync(ambilLokasiFile(nama), JSON.stringify(data, null, 2), 'utf-8');
    return { sukses: true };
  } catch {
    return { sukses: false };
  }
}

let mainWindow;

function buatJendela() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    title: 'Archive Dzikir',
    icon: path.join(__dirname, 'app-icon.ico'), // hapus baris ini kalau belum punya file icon
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile('index.html');
}

// === PENTING: Nama harus sama dengan di preload ===
app.whenReady().then(() => {
  ipcMain.handle('baca-data', async (_, nama) => await bacaData(nama));
  ipcMain.handle('tulis-data', async (_, nama, isi) => await tulisData(nama, isi));
  buatJendela();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) buatJendela();
});
