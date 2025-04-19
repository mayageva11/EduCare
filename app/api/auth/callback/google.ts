import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import { googleConfig } from '../../../../lib/googleConfig';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;
  
  if (!code) {
    return res.status(400).json({ error: 'Missing authorization code' });
  }

  try {
    const oauth2Client = new google.auth.OAuth2(
      googleConfig.clientId,
      googleConfig.clientSecret,
      googleConfig.redirectUri
    );

    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code as string);
    
    // Return tokens to client-side
    res.setHeader('Content-Type', 'text/html');
    res.send(`
      <html>
        <body>
          <script>
            localStorage.setItem('google_tokens', '${JSON.stringify(tokens)}');
            window.location.href = '/';
          </script>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Error getting tokens:', error);
    res.status(500).json({ error: 'Failed to authenticate with Google' });
  }
}