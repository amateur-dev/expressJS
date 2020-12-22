const path = require('path');
const pathUtil = require('../utils/path');
const path2views = path.join(pathUtil, "views");


const pageNotFound = (req, res, next) => {
    res.status(404).render(path.join(path2views, '404'), { pageTitle: 'Page Not Found' });
}

module.exports = pageNotFound;