const express = require('express');
const router = express.Router();
const shots = require('../shots');
router.get('/getAllShots', (req, res) => {
	res.json(
		shots.filter((shot) => {
			let newShot = {};
			newShot.id = shot.id;
			newShot.title = shot.title;
			newShot.view_count = shot.view_count;
			newShot.comments_count = shot.comments_count;
			newShot.likes_count = shot.likes_count;
			newShot.liked = shot.liked;
			newShot.username = shot.username;
			newShot.image_link = shot.image_link;
			newShot.avatar = shot.avatar;
			return newShot;
		})
	);
});
router.get('/getShotDetail/:id', (req, res) => {
	const found = shots.some((member) => member.id === parseInt(req.params.id));
	if (found) {
		res.json(
			shots.filter((member) => member.id === parseInt(req.params.id))
		);
	} else {
		res.status(400).json({
			msg: `No member with the id of ${req.params.id}`,
		});
	}
});

module.exports = router;
