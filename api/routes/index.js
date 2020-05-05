const express = require('express');
const router = express.Router();
const shots = require('../shots');
router.get('/getAllShots', (req, res) => {
	res.json(shots);
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
router.put('/follow/:id', (req, res) => {
	const found = shots.some((member) => member.id === parseInt(req.params.id));
	if (found) {
		shots.forEach((shot) => {
			if (shot.id === req.params.id) {
				shot.following = !shot.following;
			}
			return shot;
		});
		res.json({ msg: 'Following updated successfully!' });
	} else {
		res.status(400).json({
			msg: `No member with the id of ${req.params.id}`,
		});
	}
});
router.put('/like/:id', (req, res) => {
	const found = shots.some((member) => member.id === parseInt(req.params.id));
	console.log(found);
	if (found) {
		shots.forEach((shot) => {
			if (shot.id === req.params.id) {
				shot.liked = !shot.liked;
				if (shot.liked) {
					shot.likes_count++;
				} else shot.likes_count--;
			}
			return shot;
		});
		res.json({ msg: 'Likes updated successfully!' });
	} else {
		res.status(400).json({
			msg: `No member with the id of ${req.params.id}`,
		});
	}
});

module.exports = router;
