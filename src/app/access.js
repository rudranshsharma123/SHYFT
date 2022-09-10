import React, { useState, useEffect } from 'react'
import { connectTheWallet, signAndConfirmTransaction } from "../utilityfunc";
import axios from 'axios';
import image from "../resources/images/NFT-images/ganemede.png"
function Access() {
    const [walletId, setWalletId] = useState(null);
    const [hasAccess, setAccess] = useState(false);
    const [hasToken, setHasToken] = useState(false);
    const [tokenAddress, setTokenAddress] = useState("")
    const [selectedFile, setSelectedFile] = useState(null);
    const callback = (signature, result) => {
        console.log("Signature ", signature);
        console.log("result ", result);




    }
    const solanaConnect = async () => {
        const resp = await connectTheWallet();
        console.log(resp)
        setWalletId(resp.addr);
    }
    const createTokenInfo = async () => {
        const xKey = "NhIyOlvozMoHtXq4";
        const endPoint = "https://api.shyft.to/sol/v1/";
        // const prvKey = process.env.REACT_APP_PRIVATE_KEY;
        const publicKey = walletId;
        let nftUrl = `${endPoint}nft/mint_detach`;
        var formdata = new FormData();
        formdata.append("network", "devnet");
        formdata.append("wallet", "BvzKvn6nUUAYtKu2pH3h5SbUkUNcRPQawg4bURBiojJx");
        formdata.append("name", "Super Saiyan");
        formdata.append("symbol", "SD");
        // formdata.append("file", selectedFile, "token_logo.jpg");

        var requestOptions = {
            method: 'POST',
            body: formdata,
            headers: {
                'Content-Type': 'application/json',
                "x-api-key": xKey,
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow'
        };

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
                master_nft_address: "CTkSfvM2WeWBRpphRhgeVCReJK8T7woHMqddY9nCUW34",
                receiver: walletId,
                transfer_authority: false
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
        <input
            type="file"

            onChange={(e) => setSelectedFile(e.target.files[0])}
        />
        <div>{walletId}</div>
    </>
    )
}

export default Access