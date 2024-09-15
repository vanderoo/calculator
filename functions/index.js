/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const math = require('mathjs');


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.calculate = onRequest(
    { cors: true },
    (req, res) => {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'method not allowed' });
        }
        const { expression } = req.body;

        if (!expression || typeof expression !== 'string') {
            return res.status(400).json({ error: 'Invalid input. Please provide a valid expression as a string' });
        }

        try {
            const result = math.evaluate(expression);

            return res.status(200).json({ result });
        } catch (error) {
            return res.status(400).json({ error: 'Error evaluating expression. Please ensure the expression is valid.' });
        }

    }
);
