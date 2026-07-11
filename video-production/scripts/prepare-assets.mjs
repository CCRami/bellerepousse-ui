import {cp, mkdir} from 'node:fs/promises';
import path from 'node:path';

const files = [
  'snaptik_7471700328363183382_v3.mp4',
  'snaptik_7531800872146210053_v3.mp4',
  'snaptik_7589589834960850196_v3.mp4',
  'snaptik_7628272399879818518_v3.mp4',
  'ssstik.io_1783694621425.mp4',
];

const sourceDirectory = path.resolve('../assets/myassets');
const targetDirectory = path.resolve('public/source/new');
await mkdir(targetDirectory, {recursive: true});

await Promise.all(
  files.map((file) => cp(path.join(sourceDirectory, file), path.join(targetDirectory, file))),
);

console.log(`Prepared ${files.length} source videos.`);
