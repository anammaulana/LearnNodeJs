const { readUsers, saveUsers } = require('./db');

async function tambahUser(nama, umur) {
  const users = await readUsers();
  users.push({ nama, umur: Number(umur) });
  await saveUsers(users);
}

async function hapusUser(nama) {
  let users = await readUsers();
  const awal = users.length;
  users = users.filter(u => u.nama.toLowerCase() !== nama.toLowerCase());
  await saveUsers(users);
  return users.length < awal;
}


async function cariUser(nama) {
  const users = await readUsers();
  return users.filter(u => u.nama.toLowerCase().includes(nama.toLowerCase()));
}

async function tampilkanUsers() {
  const users = await readUsers();
  return users;
}

module.exports = {
  tambahUser,
  hapusUser,
  cariUser,
  tampilkanUsers
};
