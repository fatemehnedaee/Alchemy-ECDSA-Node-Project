import { useState } from "react";
import server from "./server";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { utf8ToBytes,  } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

const privateKeys = {
  "0x5d5cfbfcccede9a040cab219d48119ace761e360": "876498a3c953f6343945deaf97e3fbbcd38cb688b848f2e8078de260722ea463",
  "0x2b012b3ecc18b8a3f20407cac369cfe8f2b82b1a": "a829f035369f0abec246a35b1ee056de9c7f83f8358248387907977b4e638b54",
  "0xb2cd466409681404193b135841ad53a1ddfc9e93": "4fd7fe78437c58d787995c488c049e0dd8117fe51b843b90d853731f31d16922",
};

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    
    let sign = secp256k1.sign(keccak256(utf8ToBytes(sendAmount)), privateKeys[address]);
    sign.r = sign.r.toString();
    sign.s = sign.s.toString();
    
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        signature: JSON.stringify(sign),
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x..."
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
