const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = path.join(__dirname, 'images');
const outputDir = path.join(__dirname, 'images-optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Allowed extensions
const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

async function processImages() {
    try {
        const files = fs.readdirSync(inputDir);
        const images = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return validExtensions.includes(ext);
        });

        console.log(`Found ${images.length} images to compress. Starting...`);

        let processedCount = 0;
        let totalOriginalSize = 0;
        let totalOptimizedSize = 0;

        for (const file of images) {
            const ext = path.extname(file).toLowerCase();
            const basename = path.basename(file, ext);
            // Output file will always be .webp
            const outputFile = `${basename}.webp`;
            
            const inputPath = path.join(inputDir, file);
            const outputPath = path.join(outputDir, outputFile);
            
            const isAnimated = ext === '.gif';

            try {
                const stats = fs.statSync(inputPath);
                totalOriginalSize += stats.size;

                await sharp(inputPath, { animated: isAnimated })
                    .webp({
                        quality: 85,
                        effort: 4,
                    })
                    .toFile(outputPath);

                // Get new size
                const newStats = fs.statSync(outputPath);
                totalOptimizedSize += newStats.size;

                processedCount++;
                if (processedCount % 10 === 0) {
                    console.log(`Processed ${processedCount}/${images.length} images...`);
                }
            } catch (err) {
                console.error(`Error processing ${file}:`, err.message);
            }
        }

        const originalMB = (totalOriginalSize / (1024 * 1024)).toFixed(2);
        const optimizedMB = (totalOptimizedSize / (1024 * 1024)).toFixed(2);
        const savedMB = (originalMB - optimizedMB).toFixed(2);
        const savedPercent = ((savedMB / originalMB) * 100).toFixed(2);

        console.log('\n--- Compression Complete ---');
        console.log(`Total images processed: ${processedCount}/${images.length}`);
        console.log(`Original Size:  ${originalMB} MB`);
        console.log(`Optimized Size: ${optimizedMB} MB`);
        console.log(`Saved:          ${savedMB} MB (${savedPercent}%)`);
        console.log('----------------------------\n');

    } catch (error) {
        console.error("Error reading the directory:", error);
    }
}

processImages();
