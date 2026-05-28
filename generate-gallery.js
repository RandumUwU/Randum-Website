const fs = require("node:fs");
const path = require("path");

const imagesDir = path.join(__dirname, 'images-optimized');
const imagesOutputFile = path.join(__dirname, 'images.json');

const validExtensions = [".webp"];

try {
    const files = fs.readdirSync(imagesDir);
    const images = files.filter(file => {
        const fileExtension = path.extname(file).toLowerCase();
        return validExtensions.includes(fileExtension);
    });

    fs.writeFileSync(imagesOutputFile, JSON.stringify(images, null, 2));
    console.log(`✅ images.json with ${images.length} images`);
} catch (error) {
    console.error("❌ Error reading the directory:", error);
}