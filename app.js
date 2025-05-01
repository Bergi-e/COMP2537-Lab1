const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();

// Serve static files (e.g. public/style.css)
app.use(express.static(path.join(__dirname, 'public')));

// Use express-session middleware
app.use(session({
    secret: 'yourSecretKey',    // a secret string to sign session ID cookies
    resave: false,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Home route: display count and styles
app.get('/', (req, res) => {
    // Initialize session data if not present
    if (req.session.count == null) {
        req.session.count = 0;
    }
    // Default colors if not set
    const fgColor = req.session.color || 'black';
    const bgColor = req.session.bg || 'white';
    res.render('index', {
        count: req.session.count,
        fgColor: fgColor,
        bgColor: bgColor
    });
});
  
// Route to increment count
app.get('/up', (req, res) => {
    req.session.count = (req.session.count || 0) + 1;
    res.redirect('/');
});
  
// Route to decrement count
app.get('/down', (req, res) => {
    req.session.count = (req.session.count || 0) - 1;
    res.redirect('/');
});
  
// Route to change text/background color via query parameters
app.get('/changeStyle', (req, res) => {
    const { color, bg } = req.query;
    if (color) req.session.color = color;
    if (bg) req.session.bg = bg;
    res.redirect('/');
});
  
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅  Server listening on http://localhost:${PORT}`);
});
