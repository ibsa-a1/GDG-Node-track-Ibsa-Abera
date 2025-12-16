import express from 'express';
const app = express();
const port = 3000;

app.get('/home', (req, res) => {
    res.send(`
    <html>
      <body>
        <h1 style="color: green;">Welcome to the Home Page</h1>
      </body>
    </html>
  `)
})

app.get('/about', (req, res) => {
    res.send("This is About page for our Express Server.");
})

app.get("/students/:studentId", (req, res) => {
    const { studentId } = req.params;
    const { department } = req.query;

    res.json({
        studentId,
        department: department || "Not specified"
    });
});

app.listen(port, () => {
    console.log(`Express Server is running on http://localhost:${port}`);
})