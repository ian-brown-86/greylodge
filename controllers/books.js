const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// // seed route
// router.get('/seed', (req, res) => {
//     const data = require('../data.json');
//     Book.deleteMany({}, (err, result) => {
//         Book.insertMany(data, (err, result) => {
//         res.redirect('/books');
//         });
//     });
// });

// Index
router.get('/', (req, res) => {
	Book.find({}, (error, allBooks) => {
		res.render('books/index.ejs', {
			books: allBooks,
		});
	});
});

// new
router.get('/new', (req, res) => {
    res.render('books/new.ejs');
});

// delete
router.delete('/:id', (req, res) => {
    Book.findByIdAndDelete(req.params.id, (err, deletedBook) => {
        res.redirect('/books');
    });
});

// update
router.put('/:id', (req, res) => {
    req.body.completed = !!req.body.completed;
    Book.findByIdAndUpdate(req.params.id, req.body, (err, prevBook) => {
        res.redirect(`/books/${req.params.id}`);
    });
});

// create
router.post('/', (req, res) => {
    req.body.completed = !!req.body.completed;
    Book.create(req.body, (err, createdBook) => {
		res.redirect('/books');
	});
});

// edit
router.get("/:id/edit", (req, res) => {
    Book.findById(req.params.id, (error, foundBook) => {
      res.render("books/edit.ejs", {
        book: foundBook,
      });
    });
});

// show
router.get('/:id', (req, res) => {
	Book.findById(req.params.id, (err, foundBook) => {
		res.render('books/show.ejs', {book: foundBook});
	});
});

// Nested Resource Routes - Books and Reviews

router.post('/:id/reviews', (req, res) => {
    Book.findById(req.params.id, (err, foundBook) => {
        foundBook.reviews.push(req.body);
        foundBook.save((err, savedBook) => {
            res.redirect('/books/' + req.params.id);
        });
    })
});


module.exports = router;
