const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [Product],
  }).then(allCategories => res.json(allCategories))
    .catch(err => res.status(400).json(err))
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [Product],
  }).then(singleCategory => res.json(singleCategory))
    .catch(err => res.status(400).json(err))
});

router.post('/', (req, res) => {
  Category.create(req.body)
    .then(createdCategory => res.json(createdCategory))
    .catch(err => res.status(400).json(err))
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(updatedCategory => res.json(updatedCategory))
    .catch(err => res.status(400).json(err))
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(deletedCategory => res.json(deletedCategory))
    .catch(err => res.status(400).json(err))
});

module.exports = router;