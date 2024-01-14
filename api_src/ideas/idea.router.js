const { 
    submitIdea,
    getIdeas,
    getIdeaById,
    updateIdea,
    deleteIdea
} = require('../ideas/idea.controller');

const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation');

router.post('/ideas/submit', submitIdea);
router.get('/ideas', getIdeas);
router.get('/ideas/:id', getIdeaById);
// router.patch('/ideas/update/:id', checkToken, updateIdea);
// router.delete('/ideas/delete/:id', checkToken, deleteIdea);

module.exports = router;
