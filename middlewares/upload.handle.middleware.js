const util = require("util");
const path = require("path");
const multer = require("multer");
const moment = require('moment');
const fs = require('fs');
const maxUploadFiles = 15;
const tempFolder = "images";
const permissionFolder = "0777";

// Khởi tạo biến cấu hình cho việc lưu trữ file upload
let storage = multer.diskStorage({
    // Định nghĩa nơi file upload sẽ được lưu lại
    destination: (req, file, callback) => {
        let pathUpload = path.join(`${__dirname}/../public/dist/${tempFolder}`);
        if (!fs.existsSync(pathUpload)) {
            fs.mkdir(pathUpload, permissionFolder, function (err) { });
        }
        callback(null, path.join(`${__dirname}/../public/dist/${tempFolder}`));
    },
    filename: (req, file, callback) => {
        // Danh sách các loại file được phép upload
        let math = [
            "image/png",
            "image/jpeg",
            "image/gif",
            "audio/wave",
            "audio/wav",
            "audio/x-wav",
            "audio/webm",
            "video/webm",
            "video/mp4",
            "video/ogg",
            "application/x-rar-compressed",
            "application/octet-stream",
            "application/zip",
            "application/octet-stream",
            "application/x-zip-compressed",
            "multipart/x-zip",
            "application/msword",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
            "application/vnd.ms-word.document.macroEnabled.12",
            "application/vnd.ms-word.template.macroEnabled.12",
            "application/vnd.ms-excel",
            "application/vnd.ms-excel",
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
            "application/vnd.ms-excel.sheet.macroEnabled.12",
            "application/vnd.ms-excel.template.macroEnabled.12",
            "application/vnd.ms-excel.addin.macroEnabled.12",
            "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
            "application/vnd.ms-powerpoint",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            "application/vnd.openxmlformats-officedocument.presentationml.template",
            "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
            "application/vnd.ms-powerpoint.addin.macroEnabled.12",
            "application/vnd.ms-powerpoint.presentation.macroEnabled.12",
            "application/vnd.ms-powerpoint.template.macroEnabled.12",
            "application/vnd.ms-powerpoint.slideshow.macroEnabled.12",
            "application/pdf"
        ];
        // console.log(file);
        if (math.indexOf(file.mimetype) === -1) {
            let errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image jpeg or png.`;
            return callback(errorMess, null);
        }
        // Tạo tên file mới để tránh bị trùng tên
        let filename = `${moment().format('YYYYMMDDhhmmss')}-${file.originalname}`;
        callback(null, filename);
    }
});

// Khởi tạo middleware uploadManyFiles với cấu hình như ở trên,
let uploadManyFiles = multer({ storage: storage }).array("upload-files[]", maxUploadFiles);

// Mục đích của util.promisify() là để bên controller có thể dùng async-await để gọi tới middleware này
let multipleUploadMiddleware = util.promisify(uploadManyFiles);
module.exports = multipleUploadMiddleware;