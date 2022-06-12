'use strict';
const path = require('path');
const Service = require('egg').Service;
const Sd = require('silly-datetime');
const Mkdirp = require('mz-modules/mkdirp');
const fs = require('fs')
const { promisify } = require('util')

const removeFile = promisify(fs.unlink)
const readDir = promisify(fs.readdir)

class ToolService extends Service {

    async getTime() {
        let now = new Date();
        return now.getTime();
    }

    async removeImage($path) {
        let _path = path.resolve(__dirname, '../public' + $path.split('/cdn')[1])
        let dateDir = path.resolve(__dirname, '../public/image/' + $path.split('/image/')[1].split('/')[0])
        await removeFile(_path)
        const file = await readDir(dateDir)
        !file.length && fs.rmdir(dateDir, function (e) {

        })

    }

    async getUploadFile(filename) {
        let now = Sd.format(new Date(), 'YYYYMMDD');
        let dir = path.join(this.config.uploadDir, now);
        await Mkdirp(dir);
        let timestamp = await this.getTime();
        let uploadDir = path.join(dir, timestamp + path.extname(filename));
        return {
            uploadDir: uploadDir,
            saveDir: uploadDir.slice(3).replace(/\\/g, '/')
        }
    }
}

module.exports = ToolService;