import app from './core/app';
import * as functions from 'firebase-functions';
const PORT = process.env.PORT || 5000;
export const api = functions.https.onRequest(app);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});