import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './tmp/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  },
})

export const upload = multer({ storage })

export const uploadFile = (req, res) => {
  const file = req.file
  res.status(200).json(file.filename)
}
