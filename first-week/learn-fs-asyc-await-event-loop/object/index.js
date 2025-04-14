const {
    tambahUser,
    hapusUser,
    cariUser,
    tampilkanUsers
  } = require('./lib/userService');
  
  const [mode, ...args] = process.argv.slice(2);
  
  async function main() {
    switch (mode) {
      case 'tambah':
        await tambahUser(args[0], args[1]);
        break;
      case 'hapus':
        if (await hapusUser(args[0])) console.log('✅ Dihapus');
        else console.log('❌ Tidak ditemukan');
        break;
      case 'cari':
        const hasil = await cariUser(args[0]);
        console.log(hasil.length ? hasil : '❌ Tidak ditemukan');
        break;
      default:
        console.log('📌 Gunakan: tambah, hapus, update, cari');
    }
  
    const all = await tampilkanUsers();
    console.log('\n📋 Data Saat Ini:');
    all.forEach((u, i) => console.log(`${i + 1}. ${u.nama} (${u.umur})`));
  }
  
  main();
  