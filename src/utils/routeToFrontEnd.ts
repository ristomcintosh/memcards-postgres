import express, { Application } from 'express';
import path from 'path';

export default function(app: Application) {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    );
  }
}
