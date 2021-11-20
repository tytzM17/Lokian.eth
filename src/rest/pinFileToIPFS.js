import axios from 'axios'
import bg10 from '../sprites/background/10.png' // test
import { dataURItoBlob } from "../utils/dataURItoBlob";

export const pinFileToIPFS = (params) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    const pinataApiKey = process.env.REACT_APP_PINATA_API_KEY;
    const pinataSecretApiKey = process.env.REACT_APP_PINATA_SECRET_API_KEY;

    const monName = params?.monName;
    console.log('mon name ifps:', monName);

    //we gather a local file for this example, but any valid readStream source will work here.
    let data = new FormData();
    const monImg = require(`../sprites/${parseInt(params?.mon?.species || "-1") + 1}.png`);
    const monImgBlob = dataURItoBlob(monImg);
    console.log('mon img blob', monImgBlob);
    data.append('file', monImgBlob, `${monName}.png`);

    //You'll need to make sure that the metadata is in the form of a JSON object that's been convered to a string
    //metadata is optional
    
    const metadata = JSON.stringify({
        name: `${monName || params?.mon?.owner || 'no name'}`,
        keyvalues: {
            owner: params?.mon?.owner || 'no owner',
            id: params?.mon?.id || 'no id',
            species: params?.mon?.species || 'no species',
            hp: params?.mon?.hp || 'no hp',
            atk: params?.mon?.atk || 'no atk',
            def: params?.mon?.def || 'no def',
            speed: params?.mon?.speed || 'no speed'
        }
    });
    data.append('pinataMetadata', metadata);

    //pinataOptions are optional
    const pinataOptions = JSON.stringify({
        cidVersion: 0,
        customPinPolicy: {
            regions: [
                {
                    id: 'FRA1',
                    desiredReplicationCount: 1
                },
                {
                    id: 'NYC1',
                    desiredReplicationCount: 2
                }
            ]
        }
    });
    data.append('pinataOptions', pinataOptions);

    return axios
        .post(url, data, {
            maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataSecretApiKey
            }
        })
        .then(function (response) {
            //handle response here
            if (params && params.success) params.success(response);
        })
        .catch(function (error) {
            //handle error here
            if (params && params.error) params.error(error);
        });
};