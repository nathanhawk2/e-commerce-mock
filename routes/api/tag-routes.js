const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        through: ProductTag,
        model: Product,
      }
    ],
  }).then(allTags => res.json(allTags))
    .catch(err => res.status(400).json(err))
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        through: ProductTag
      }
    ],
  }).then(singleTag => res.json(singleTag))
    .catch(err => res.status(400).json(err))
});

router.post('/', (req, res) => {
  Tag.create(req.body)
    .then(createdTag => res.json(createdTag))
    .catch(err => res.status(400).json(err))
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(updatedTag => res.json(updatedTag))
    .catch(err => res.status(400).json(err))
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(deletedTag => res.json(deletedTag))
    .catch(err => res.status(400).json(err))
});

module.exports = router;