import express, { Request, Response } from 'express';

const app = express();
const port: number = 8080;

app.get('/', (req: Request, res: Response) => {
  // Static HTML response documenting the slow API route
  const htmlResponse = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Documentation</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
        }
        h1 {
          color: #333;
        }
        p {
          color: #666;
        }
      </style>
    </head>
    <body>
      <h1>Slow API Documentation</h1>
      <p>This is a slow API route. You can access it at <code>/slow-api</code>.</p>
      <p>To specify a delay, append <code>?delay=desired_delay_in_milliseconds</code> to the URL.</p>
    </body>
    </html>
  `;

  res.send(htmlResponse);
});

app.get('/slow-api', async (req: Request, res: Response) => {
  const delay: number = Number(req.query.delay);
  await new Promise((resolve) => setTimeout(resolve, delay));
  res.json({
    message: 'This is a slow API',
    delay,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
