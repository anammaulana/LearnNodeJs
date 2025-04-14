const fs = require('fs').promises;
const filePath = './users.json';

async function readUsers() {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveUsers(users) {
  await fs.writeFile(filePath, JSON.stringify(users, null, 2));
}

module.exports = { readUsers, saveUsers };
