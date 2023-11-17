import jwt from "jsonwebtoken";

export function jwtAuth(req, res, next) {
    try {
        req.decoded = jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );

        return next();
    } catch (err) {
        res.status(403).json({
            result: 1,
            message: "Login is failed",
        });
    }
}
