import axios from 'axios';

export const pinJSONToIPFS = (params) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    const pinataApiKey = process?.env.REACT_APP_PINATA_API_KEY;
    const pinataSecretApiKey = process?.env.REACT_APP_PINATA_SECRET_API_KEY;
    const speciesImgIdx = params?.mon?.species ? parseInt(params.mon.species)+1 : 0; // add 1

    const JSONBody = {
        pinataMetadata: {
            name: `${params?.monName || ''}_issue_no_${params?.mon?.id || ''}`,
            keyvalues: {
                owner: params?.mon?.owner || 'no owner',
                id: params?.mon?.id || 'no id',
                species: params?.mon?.species || 'no species',
            }
        },
        pinataContent: {
            owner: params?.mon?.owner || 'no owner',
            name: `${params?.monName || ''}_issue_no_${params?.mon?.id || ''}`,
            image: `https://gateway.pinata.cloud/ipfs/QmfJELqQZM2vYcDhLKfyo6SWv5KGTbkPQ3Uh3BhoQoFf5S/${speciesImgIdx}.png`,
            id: params?.mon?.id || 'no id',
            species: params?.mon?.species || 'no species',
            
            price: params?.mon?.price || 'no price',
            forSale: params?.mon?.forSale || 'no forSale',
            monType: params?.mon?.monType || 'no monType',
            evolve: params?.mon?.evolve || 'no evolve',

            hp: params?.mon?.hp || 'no hp',
            atk: params?.mon?.atk || 'no atk',
            def: params?.mon?.def || 'no def',
            speed: params?.mon?.speed || 'no speed',

            sharedTo: params?.mon?.sharedTo || 'no sharedTo'
        }
    }

    return axios
        .post(url, JSONBody, {
            headers: {
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