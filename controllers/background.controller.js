const Background = require('../models/Background');
const multipleUploadMiddleware = require("../middlewares/upload.handle.middleware");
const Utils = require('../libs/Utils')

exports.getAllBackground = async (req, res) => {
    try {
        const promise = new Promise((resolve, reject) => {
            Background.find({})
              .exec(function (err, data) {
                if (err) {
                  reject(err);
                } else {
                    data = data.map(m => {
                        const fullpath = (m.path + m.name).replace('./public','');
                        return {fullpath: fullpath, active: m.isActive, id: m._id}
                    })
                  resolve(data);
                }
              });
        
          });
        const backgrounds = await promise;
        return { success: true, data: backgrounds }
    } catch (error) {
        return { success: false }
    }
}

exports.insert = async (req, res) => {
    async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(index, array[index], array)
        }
    }
    try {
        // Thực hiện upload image
        let uploadFilesStatus = await multipleUploadMiddleware(req, res);
            if (req.files.length <= 0) {
                return res.status(400).send({ success: false, code: 'ERR403', message: 'You must select at least 1 file or more.' });
            } else {
                let bgs = [];
                await asyncForEach(req.files, async (i) => {
                    let moveStatus = await Utils.moveFile(req.files[i].path, 'images', req.files[i].originalname);
                    let fileUploaded = { ...req.files[i] };
                    fileUploaded.status = false;
                    delete fileUploaded.fieldname;
                    delete fileUploaded.destination;
                    delete fileUploaded.path;
                    if (moveStatus.success) {
                        fileUploaded.status = true;
                        fileUploaded.path = moveStatus.newPath;
                        fileUploaded.newFilename = moveStatus.fileName;
                        fileUploaded.fullPath = moveStatus.fullPath;
                    }

                    // Thêm bản ghi thông tin ảnh
                    const bg = {
                        name: fileUploaded.newFilename,
                        path: fileUploaded.fullPath,
                        type: fileUploaded.mimetype,
                        size: fileUploaded.size,
                        isActive: false
                    }
                    bgs.push(bg);
                });
                const data = Background.insertMany(bgs)

                return res.status(201).send({ success: true, data: await data });
            }
        
    } catch (error) {
        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(201).send({ success: false, code: 'ERR402', message: 'Exceeds the number of files allowed to upload.' });
        }
        return res.status(201).send({ success: false, code: 'ERR401', message: `Error when trying upload many files: ${error}}` });
    }
};

exports.updateSelectedBackground = async (req, res) => {
    try {
        const ids = req.body.selectedBackgroundId;
        await Background.updateMany({
            _id: { $in : [...ids] }
        }, { $set : { isActive : true } });
        return { success: trues }
    } catch (error) {
        return { success: false }
    }
}