const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  bacaData: (nama) => ipcRenderer.invoke('baca-data', nama),
  tulisData: (nama, isi) => ipcRenderer.invoke('tulis-data', nama, isi)
});
