import { Client } from '@/utils/config';
import * as AWS from '@aws-sdk/client-polly';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const TestToSpeechGenerator = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case 'GET':
      try {
        let audioURL: string;

        const polly = new AWS.Polly({
          region: process.env.AWS_REGION!,
          credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
          },
        });

        // const plainText = req.body.plainText;
        // console.log('plainText: ', plainText);
        const params = {
          Engine: 'neural',
          LanguageCode: 'en-US',
          OutputFormat: 'mp3',
          Text: `AWS SDK for JavaScript`,
          VoiceId: 'Kimberly',
        };

        const synthesisResult = await polly.synthesizeSpeech(params);
        // console.log('synthesisResult: ', synthesisResult.AudioStream);
        if (synthesisResult.AudioStream) {
          const buffer = Buffer.from(
            await streamToBuffer(synthesisResult.AudioStream)
          );
          const sanityFile = await Client.assets.upload('file', buffer, {
            filename: 'audio.mp3',
          });
          //   // Set the response headers for an MP3 audio file
          // res.setHeader('Content-Type', 'audio/mpeg');
          // res.setHeader(
          //   'Content-Disposition',
          //   'attachment; filename="output.mp3"'
          // );

          console.log('sanityFile', sanityFile);
          //   // Stream the audio buffer directly to the response
          //   return;
          audioURL = sanityFile.url;
          // res.send({ buffer });
        }
        return res.json({ audioURL: audioURL });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
      }
      break;

    default:
      res.status(500).json({ error: 'Method not allowed' });
      break;
  }
};

async function streamToBuffer(stream: any) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

export default TestToSpeechGenerator;
