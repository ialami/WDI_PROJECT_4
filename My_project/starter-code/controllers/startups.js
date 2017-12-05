const StartUp = require('../models/startup');

function startUpsIndex(req, res, next) {
  StartUp
    .find()
    .populate('createdBy')
    .exec()
    .then(startUps => res.json(startUps))
    .catch(next);
}

function startUpsCreate(req, res, next) {

  if (req.file) req.body.image = req.file;
  if (req.user) req.body.createdBy = req.user._id;

  StartUp
    .create(req.body)
    .then(startUp => res.status(201).json(startUp))
    .catch(next);
}

function startUpsShow(req, res,next) {
  StartUp
    .findById(req.params.id)
    .exec()
    .then(startUp => {
      if (!startUp) return res.notFound();
      res.json(startUp);
    })
    .catch(next);
}

function startUpsUpdate(req, res, next) {

  if (req.file) req.body.image = req.file.filename;

  StartUp
    .findById(req.params.id)
    .exec()
    .then(startUp => {
      if (!startUp) return res.notFound();
      if (!startUp.belongsTo(req.user)) return res.unauthorized();

      startUp = Object.assign(startUp, req.body);
      return startUp.save();
    })
    .then(startUp => res.json(startUp))
    .catch(next);
}

function startUpsDelete(req, res, next) {
  StartUp
    .findById(req.params.id)
    .exec()
    .then(startUp => {
      if(!startUp) return res.notFound();
      if (!startUp.belongsTo(req.user)) return res.unauthorized();

      return startUp.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: startUpsIndex,
  create: startUpsCreate,
  show: startUpsShow,
  update: startUpsUpdate,
  delete: startUpsDelete
};
