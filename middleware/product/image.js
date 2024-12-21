const errorApi = require('../../error/errorApi')

const validateImages = (req, res, next) => {
    if (!req.files || !req.files.img || req.files.img.length === 0) {
        next(errorApi.badRequest({ errors: 'At least one image file is required.' }))
    }

    // req.files.img.forEach((img) => {
    //     const allowedTypes = ['image/jpg', 'image/png', 'image/gif'];
    //     if (!allowedTypes.includes(img.mimetype)) {
    //         next(errorApi.badRequest({ errors: 'Invalid image type. Allowed: JPEG, PNG, GIF.' }))
    //     }

    //     const maxSize = 2 * 1024 * 1024; // 2 MB
    //     if (img.size > maxSize) {
    //         next(errorApi.badRequest({ errors: 'Image size exceeds the maximum limit of 2MB.' }))
    //     }
    // });

    next();
};

module.exports = validateImages