import * as AWS from '@aws-sdk/client-polly';
import { NextApiRequest, NextApiResponse } from 'next';



const TestToSpeechGenerator = async (req: NextApiRequest, res: NextApiResponse) => {

    console.log('AWS', AWS)
    
    res.send('Hello World')
};

export default TestToSpeechGenerator;
