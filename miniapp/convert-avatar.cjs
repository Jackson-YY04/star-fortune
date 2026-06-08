const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgBuf = fs.readFileSync(path.join(__dirname, 'images', 'avatar.svg'));

// 生成多尺寸
const sizes = [144, 96, 48];

async function convert() {
  for (const size of sizes) {
    await sharp(svgBuf)
      .resize(size, size)
      .png()
      .toFile(path.join(__dirname, 'images', `avatar-${size}.png`));
    console.log(`avatar-${size}.png 生成完成`);
  }
  // 默认144尺寸
  await sharp(svgBuf)
    .resize(144, 144)
    .png()
    .toFile(path.join(__dirname, 'images', 'avatar.png'));
  console.log('avatar.png 生成完成');
}

convert().catch(console.error);