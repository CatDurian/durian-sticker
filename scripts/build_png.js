const glob = require("glob")
const path = require("path")
const PSD = require("psd")

const psdPath = path.resolve(__dirname, '../psd')
const pngPath = path.resolve(__dirname, '../png')

glob(`${psdPath}/*.psd`, (err, files) => {
    if (err) {
        throw err
    }
    for(const fpath of files) {
        const filename = path.basename(fpath, path.extname(fpath))  // no ext
        const psd = PSD.fromFile(fpath)
        psd.parse()
        psd.image.saveAsPng(path.resolve(pngPath, `${filename}.png`))
    }
})