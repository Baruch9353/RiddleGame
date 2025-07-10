export default function (req, res, next) {
    console.log({ url: req.url, method: req.method, time: new Date().toLocaleString() });
    next();
}