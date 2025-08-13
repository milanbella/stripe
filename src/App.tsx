import './App.css'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import SetupForm from './SetupForm';
import {callGetCustomer, callCreateSetupIntent} from './api';
import {useState, useEffect} from 'react';

const stripePromise = loadStripe('pk_test_51Rlo2YQ80JCjuAv7xV8FIm6BbkSvrMrVHLRTALb2uT3VWFCwTIlaL69Mm1lpbSpb64fejxgl2MG8jEU1ow5tGYSv00sAofh52q');

interface GetSetupIntentResult {
    clientSecret: string
}

async function getSetupIntent(): Promise<GetSetupIntentResult> {
    let getCustomerResult = await callGetCustomer()
    if (getCustomerResult.response === null) {
        throw new Error("could not get stripe customer id");
    }
    let setuIntentResult = await callCreateSetupIntent({
        stripeCustomerId: getCustomerResult.response.stripeCustomerId
    })
    if (setuIntentResult.response === null) {
        throw new Error("could create stripe setup intent");
    }

    return {
        clientSecret: setuIntentResult.response.stripeClientSecret
    }
}

function App() {
    let [getSetupIntentResult, setGetSetupIntentResult] = useState<GetSetupIntentResult | null>(null);
    useEffect(() => {
        (async () => {
            try {
                let resultSi = await getSetupIntent()
                setGetSetupIntentResult(resultSi)
            } catch (err) {
                console.error('creating setup intent failed');
                throw new Error('creating setup intent failed')
            }
        })()
    },[])

    if (getSetupIntentResult !== null) {
        const options: any = {
            clientSecret: getSetupIntentResult.clientSecret,
            appearance: {/*...*/},
        };
        return (
            <>
                <Elements stripe={stripePromise} options={options}>
                    <SetupForm />
                </Elements>
            </>
        )
    } else {
        return (
            <>
                {"Loading ..."}
            </>
        )
    }
}

export default App
