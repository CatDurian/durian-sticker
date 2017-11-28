const fs = require("fs")
const path = require("path")
const glob = require("glob")
const JSZip = require('jszip')
const pngPath = path.resolve(__dirname, "../png-compressed")
const zipPath = path.resolve(__dirname, "../sticker.zip")

glob(`${pngPath}/*.png`, (err, files) => {
    if (err) {
        throw err
    }
    const zip = new JSZip()
    for(const fpath of files) {
        zip.file(
            path.basename(fpath).replace("-fs8", ""),
            fs.readFileSync(fpath, "binary")
        )
    }
    zip.generateNodeStream({streamFiles:true}).pipe(fs.createWriteStream(zipPath))
})
