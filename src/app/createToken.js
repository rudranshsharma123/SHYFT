import React, { useState, useEffect } from 'react'
import { connectTheWallet, signAndConfirmTransaction } from "../utilityfunc";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateToken() {
    const [walletId, setWalletId] = useState(null);
    const [hasAccess, setAccess] = useState(false);
    const [hasToken, setHasToken] = useState(false);
    const [tokenAddress, setTokenAddress] = useState("")
    const nav = useNavigate();
    const solanaConnect = async () => {
        const resp = await connectTheWallet();
        console.log(resp)
        setWalletId(resp.addr);
    }
    const callback = (signature, result) => {
        console.log("Signature ", signature);
        console.log("result ", result);





        //console.log("minted: ",minted);
        //setComMinted(true);


    }

    const mintToken = async () => {
        const xKey = "NhIyOlvozMoHtXq4";
        const endPoint = "https://api.shyft.to/sol/v1/";
        // const prvKey = process.env.REACT_APP_PRIVATE_KEY;
        const publicKey = walletId;
        let nftUrl = `${endPoint}token/mint_detach`;
        axios({
            // Endpoint to get NFTs
            url: nftUrl,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": xKey,
            },
            data: {
                network: 'devnet',
                wallet: publicKey,
                token_address: tokenAddress,
                receiver: publicKey,
                amount: 100,
                message: "Go Fuck yourself",



            }
        })
            // Handle the response from backend here
            .then(async (res) => {
                console.log(res.data);
                if (res.data.success === true) {
                    const transaction = res.data.result.encoded_transaction;
                    console.log(transaction)
                    const ret_result = await signAndConfirmTransaction('devnet', transaction, callback); //flow from here goes to utility func
                    console.log(ret_result);


                }
                else {
                    console.log("Some Error Occured")
                }
            })
            // Catch errors if any
            .catch((err) => {
                console.warn(err);
            });
    }
    useEffect(() => {
        if (hasToken) {
            nav("/access")
        }


    }, [hasToken])

    const checkTokenInfo = async () => {
        const xKey = "NhIyOlvozMoHtXq4";
        const endPoint = "https://api.shyft.to/sol/v1/";
        // const prvKey = process.env.REACT_APP_PRIVATE_KEY;
        const publicKey = walletId;
        const token_address = tokenAddress
        let nftUrl = `${endPoint}wallet/token_balance?network=devnet&wallet=${publicKey}&token=${token_address}`;
        axios({
            // Endpoint to get NFTs
            url: nftUrl,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": xKey,
            },

        })
            // Handle the response from backend here
            .then(async (res) => {
                console.log(res.data);
                if (res.data.success === true) {
                    const balance = res.data.result.balance;
                    if (balance > 0) {
                        setHasToken(true)
                    }

                }
                else {
                    console.log("Some Error Occured")
                }
            })
            // Catch errors if any
            .catch((err) => {
                console.warn(err);
            });
    }
    const sendToken = async () => {
        const xKey = "NhIyOlvozMoHtXq4";
        const endPoint = "https://api.shyft.to/sol/v1/";
        // const prvKey = process.env.REACT_APP_PRIVATE_KEY;
        const publicKey = walletId;
        let nftUrl = `${endPoint}token/transfer_detach`;
        axios({
            // Endpoint to get NFTs
            url: nftUrl,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": xKey,
            },
            data: {
                network: 'devnet',
                from_address: publicKey,
                to_address: "8QCJWmu1gErc9zRFtww9Bo4R7bne58YGvL4YZRGbSeX9",
                token_address: tokenAddress,
                amount: 10

            }
        })
            // Handle the response from backend here
            .then(async (res) => {
                console.log(res.data);
                if (res.data.success === true) {
                    const transaction = res.data.result.encoded_transaction;
                    console.log(transaction)
                    const ret_result = await signAndConfirmTransaction('devnet', transaction, callback); //flow from here goes to utility func
                    console.log(ret_result);

                }
                else {
                    console.log("Some Error Occured")
                }
            })
            // Catch errors if any
            .catch((err) => {
                console.warn(err);
            });
    }
    const createTokenInfo = async () => {
        const xKey = "NhIyOlvozMoHtXq4";
        const endPoint = "https://api.shyft.to/sol/v1/";
        // const prvKey = process.env.REACT_APP_PRIVATE_KEY;
        const publicKey = walletId;
        let nftUrl = `${endPoint}token/create_detach`;
        axios({
            // Endpoint to get NFTs
            url: nftUrl,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": xKey,
            },
            data: {
                network: 'devnet',
                wallet: publicKey,
                name: "Lol",
                symbol: "lol",
                description: "this is just for fucking test",
                decimals: 9,



            }
        })
            // Handle the response from backend here
            .then(async (res) => {
                console.log(res.data);
                if (res.data.success === true) {
                    const transaction = res.data.result.enoded_transaction;
                    console.log(transaction)
                    const ret_result = await signAndConfirmTransaction('devnet', transaction, callback); //flow from here goes to utility func
                    console.log(ret_result);
                    console.log(res.data.result.mint)
                    setTokenAddress(res.data.result.mint);
                    //ReactSession.set("auth", true);
                    //ReactSession.set("nft_key", mint_addr);
                    // setLoading(false);
                    // setSuccess(true);
                    //navigate('/');

                }
                else {
                    console.log("Some Error Occured")
                }
            })
            // Catch errors if any
            .catch((err) => {
                console.warn(err);
            });
    }

    return (<>
        <button style={{ marginTop: "100px" }}
            className="btn-solid-grad-wide"
            onClick={solanaConnect}
        >
            Connect Phantom
        </button>

        <button style={{ marginTop: "100px" }}
            className="btn-solid-grad-wide"
            onClick={createTokenInfo}
        >
            CreateToken
        </button>
        <button style={{ marginTop: "100px" }}
            className="btn-solid-grad-wide"
            onClick={sendToken}
        >
            Send token
        </button>
        <button style={{ marginTop: "100px" }}
            className="btn-solid-grad-wide"
            onClick={mintToken}
        >
            Mint Token
        </button>
        <button style={{ marginTop: "100px" }}
            className="btn-solid-grad-wide"
            onClick={checkTokenInfo}
        >
            Check Token Info
        </button>
        <div>{walletId}</div>
    </>
    )
}

export default CreateToken