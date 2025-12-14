const patientMiddleware = (req, res, next) => {

    if (req.user?.role !== "patient") {
        return res.status(403).json({ message: "Access denied. Patients only." });
    }

    next();
};



module.exports = patientMiddleware;
