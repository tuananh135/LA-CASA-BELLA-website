const fs = require('fs')
const moment = require('moment');
const util = require('util')
const writeFile = util.promisify(fs.writeFile)
const readFile = util.promisify(fs.readFile)
const { v4: uuidv4 } = require('uuid');

exports.send = (statusCode, body) => {
  return {
    statusCode: statusCode,
    body: body,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };
};

exports.convertFile = (data) => {
  let base64Data = data.replace(/^data:.+;base64,/, '');
  base64Data = Buffer.from(base64Data, 'base64');
  return base64Data;
}

exports.writeFileContent = async (path, fileName, data) => {
  try {
    let pathCheck = await this.checkAndCreateFolder(path);
    let fileExtension = fileName.split('.').pop();
    let fileNameOnly = fileName.replace('.' + fileExtension, '');
    let filePath = pathCheck.path + fileName;
    if (fs.existsSync(filePath)) {
      fileName = fileNameOnly + "_" + moment().format('YYYYMMDDhhmmss') + "." + fileExtension;
      filePath = pathCheck.path + fileName;
    }
    let base64Data = data.replace(/^data:.+;base64,/, '');
    base64Data = Buffer.from(base64Data, 'base64');
    await writeFile(filePath, base64Data);
    return { success: true, fullPath: pathCheck.path, path, fileName };
  } catch (error) {
    return { success: false }
  }
}

exports.OverwriteFileContent = async (path, fileName, data) => {
  try {
    let pathCheck = await this.checkAndCreateFolder(path);
    let fileExtension = fileName.split('.').pop();
    let fileNameOnly = fileName.replace('.' + fileExtension, '');
    let filePath = pathCheck.path + fileName;
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    let base64Data = data.replace(/^data:.+;base64,/, '');
    base64Data = Buffer.from(base64Data, 'base64');
    await writeFile(filePath, base64Data);
    return { success: true, fullPath: pathCheck.path, path, fileName };
  } catch (error) {
    return { success: false }
  }
}

exports.moveFile = async (sourcePath, newPath, fileName) => {
  try {
    let pathCheck = await this.checkAndCreateFolder(newPath);
    let fileExtension = fileName.split('.').pop();
    let fileNameOnly = fileName.replace('.' + fileExtension, '');
    let filePath = pathCheck.path + fileName;
    if (fs.existsSync(filePath)) {
      fileName = fileNameOnly + "_" + moment().format('YYYYMMDDhhmmss') + "." + fileExtension;
      filePath = pathCheck.path + fileName;
    }
    await fs.rename(sourcePath, filePath, function (err) {});
    return { success: true, fullPath: pathCheck.path, newPath, fileName };
  } catch (e) {
    console.log(e);
    return { success: false }
  }
}

exports.checkAndCreateFolder = async (path) => {
  let permissionFolder = '0777';
  let convertPathToArray = path.split("/");
  let pathCheck = './public/dist';
  convertPathToArray.forEach(pathElement => {
    let pathElementString = pathElement.trim();
    if (pathElementString) {
      pathCheck += "/" + pathElementString;
      if (!fs.existsSync(pathCheck)) {
        fs.mkdir(pathCheck, permissionFolder, function (err) { });
      }
    }
  });
  return { success: true, path: pathCheck + "/" };
} 