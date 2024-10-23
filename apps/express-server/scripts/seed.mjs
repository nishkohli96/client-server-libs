import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

async function readFile() {
  /* Get the current file path from the module URL */
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, '../src/data/people.json');

  console.log('about to readFile');
  try {
    const data = fs.readFileSync(filePath);
  } catch (err) {
    console.log('err: ', err);
    process.exit(1);
  }
  process.exit(0);
}

readFile();
