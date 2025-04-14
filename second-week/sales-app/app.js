const fs = require('fs');
const path = require('path');
const transaksiFile = path.join(__dirname, 'transaction.json');
const logFile = path.join(__dirname, 'log.txt');

function bacaTransaksi() {
  return new Promise((resolve, reject) => {
    fs.readFile(transaksiFile, 'utf8', (err, data) => {
      if (err) return resolve([]); // Kalau file belum ada, anggap kosong
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        reject(e);
      }
    });
  });
}

function simpanTransaksi(transaksiBaru) {
  return bacaTransaksi().then(data => {
    data.push(transaksiBaru);
    return new Promise((resolve, reject) => {
      fs.writeFile(transaksiFile, JSON.stringify(data, null, 2), err => {
        if (err) reject(err);
        else resolve();
      });
    });
  });
}

function tulisLog(pesan) {
  const waktu = new Date().toISOString();
  fs.appendFile(logFile, `[${waktu}] ${pesan}\n`, err => {
    if (err) console.error('Gagal menulis log');
  });
}

async function tambahTransaksi(nama, nominal) {
  const transaksi = { nama, nominal: Number(nominal), waktu: new Date().toISOString() };
  await simpanTransaksi(transaksi);
  tulisLog(`Transaksi ditambahkan: ${nama} - Rp${nominal}`);
  console.log('Transaksi berhasil disimpan!');
}

async function tampilkanStatistik() {
  const data = await bacaTransaksi();
  const total = data.reduce((acc, cur) => acc + cur.nominal, 0);
  console.log(`Total Transaksi: ${data.length}`);
  console.log(`Total Nominal: Rp${total}`);
  tulisLog('Statistik ditampilkan.');
}

// CLI Command
const cmd = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];

if (cmd === 'add') {
  tambahTransaksi(arg1, arg2);
} else if (cmd === 'stats') {
  tampilkanStatistik();
} else {
  console.log('Perintah tidak dikenal. Gunakan: add <nama> <nominal> atau stats');
}
