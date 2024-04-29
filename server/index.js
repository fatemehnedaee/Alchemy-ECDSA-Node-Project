const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { keccak256 } = require("ethereum-cryptography/keccak");
const { secp256k1 } = require("ethereum-cryptography/secp256k1.js")
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const{ toHex } = require("ethereum-cryptography/utils");


app.use(cors());
app.use(express.json());

const balances = {
  "0x5d5cfbfcccede9a040cab219d48119ace761e360": 100, //Fatemeh
  "0x2b012b3ecc18b8a3f20407cac369cfe8f2b82b1a": 50, //Hossein
  "0xb2cd466409681404193b135841ad53a1ddfc9e93": 75, //Jesi
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  
  const { sender, recipient, amount, signature } = req.body;

  let sign = JSON.parse(signature);
  sign.r = BigInt(sign.r);
  sign.s = BigInt(sign.s);
  
  sign = new secp256k1.Signature(sign.r, sign.s, sign.recovery);
  const recoveredPubKey = sign.recoverPublicKey(keccak256(utf8ToBytes(amount.toString())));
  
  const address = keccak256(recoveredPubKey.toRawBytes().slice(1)).slice(-20);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if("0x" + toHex(address) != sender){
    res.status(500).send({ message: "You are a hacker!" });
  }else{
    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
