const { UserProductRating } = require('../../db');
const errorApi = require('../../error/errorApi');

const checkUserRating = async (req, res, next) => {
  const { userId, productId } = req.body;

  try {
    const userProductRating = await UserProductRating.findOne({
      where: {
        userId,
        productId,
      },
    });

    if (userProductRating) {
      return next(errorApi.badRequest('You have already rated this product'));
    }

    next();
  } catch (error) {
    next(errorApi.internalServerError(error.message));
  }
};

module.exports = checkUserRating;