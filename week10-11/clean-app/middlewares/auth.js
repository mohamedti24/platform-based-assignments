/**
 * Check if user is logged in
 */
const isAuthenticated = (req, res, next) => {
  if (!req.session?.user) {
    return res.redirect('/login');
  }
  next();
};

/**
 * Admin only
 */
const isAdmin = (req, res, next) => {
  if (req.session.user.role !== 'ADMIN') {
    return res.status(403).send('Admins only');
  }
  next();
};

/**
 * Owner or Admin
 * @param {PrismaModel} model
 */
const isOwnerOrAdmin = (model) => {
  return async (req, res, next) => {
    const resource = await model.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!resource) {
      return res.status(404).send('Not found');
    }

    if (
      req.session.user.role === 'ADMIN' ||
      resource.authorId === req.session.user.id
    ) {
      return next();
    }

    return res.status(403).send('Forbidden');
  };
};

module.exports = {
  isAuthenticated,
  isAdmin,
  isOwnerOrAdmin,
};
