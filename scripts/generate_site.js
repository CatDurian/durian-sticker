const fs = require("fs")
const path = require("path")
const glob = require("glob")
const JSZip = require('jszip')
const md5File = require('md5-file')
const pngPath = path.resolve(__dirname, "../png-compressed")
const jsonPath = path.resolve(pngPath, "hashes.json")
const HTMLPath = path.resolve(pngPath, "index.html")

const size = 256

let html = `
<meta charset="UTF-8">
<title>可爱的榴莲</title>
<style>
    body {
        background-color: #eee;
    }
    div.gallery {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    div.gallery a {
        box-sizing: border-box;        
        padding: 5px;
        border: 1px solid #ccc;
    }
    div.gallery a:hover {
        border: 1px solid #777;
    }
    img {
        height: ${size}px;
        width: ${size}px;
    }
</style>
<div class="gallery">
`

glob(`${pngPath}/*.png`, (err, files) => {
    if (err) {
        throw err
    }
    const hashes = {}
    for(const fpath of files) {
        const filename = path.basename(fpath)
        const hash = md5File.sync(fpath)
        hashes[filename] = hash
        html += `
<a target="_blank" href="./${filename}">
    <img src="./${filename}" alt="${filename.replace('-fs8.png', '')}">
</a>
`
    }
    fs.writeFileSync(jsonPath, JSON.stringify(hashes), 'utf-8')
    fs.writeFileSync(HTMLPath, html + '</div>', 'utf-8')    
})
