'use client';

import Alert from "@mui/material/Alert";
import { set } from "mongoose";
import { useEffect, useState } from "react";

interface Params {
    token: string
}



export default function Verification({ params }: { params: Params}) {
    const { token } = params;
    const [ success, setSuccess ] = useState<boolean>(false);
    const [ feedback, setFeedback ] = useState<string>('');

    const verifyUser = async (token: string) => {
        const resp = await fetch('/api/users/verification', {
            method: 'POST',
            body: JSON.stringify({ token }),
          }).then((res) => res.json()).then((res) => {
            if (res.error) {
                setSuccess(false);
                setFeedback(res.error);
            } else {
                if(res.userFound && res.validated) {
                    setSuccess(true);
                    setFeedback('Account successfully verified. You can now login.');
                } else if(!res.userFound) {
                    setSuccess(false);
                    setFeedback('Oops. It seems that your link is invalid.');
                } else {
                    setSuccess(false);
                    setFeedback('Oops. We could not verify your account. Please try again later.');
                }
            }
          });
    }

    useEffect(() => {
        verifyUser(token) 
    }, [token])

    return (
        <div>
            {
                feedback 
                    ? <Alert severity={success ? 'success' : 'error'}>{ feedback }</Alert>
                    : <Alert severity="info">Verifying your account...</Alert>
            }
        </div>
    )
}
