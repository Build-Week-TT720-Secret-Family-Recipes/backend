const jwt = require('jsonwebtoken');

function restrict() {
	const authError = {
		message: 'Unauthorized',
	};

	return async (req, res, next) => {
		try {
			const { token } = req.cookies;

			if (!token) {
				return res.status(401).json(authError);
			}

			jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
				if (err) {
					return res.status(401).json(authError);
				}

				req.id = decoded.id;
				next();
			});
		} catch (err) {
			next(err);
		}
	};
}

module.exports = restrict;
