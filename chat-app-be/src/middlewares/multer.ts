import { File } from "../types/types";

const multer = require('multer');
const sizeOf = require('image-size');

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: Function) {
    cb(null, 'public/uploads/')
  },
  filename: function (req: any, file: any, cb: Function) {
    const extension = file.originalname.split('.').pop()
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
  }
});

export default multer({ storage });

export const getFileMeta = (file: File) => {
  if (!file?.path) {
    return null;
  }

  const dimensions = sizeOf(file.path)

  return {
    mimetype: file?.mimetype,
    size: file?.size,
    width: dimensions.width,
    height: dimensions.height,
  };
}
