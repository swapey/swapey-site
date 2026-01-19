import { Connection, PublicKey } from "@solana/web3.js";
import { Jupiter } from "@jup-ag/core";

const connectBtn = document.getElementById("connect");
const status = document.getElementById("wallet-status");
const balanceEl = document.getElementById("wallet-balance");
const tokensEl = document.getElementById("wallet-tokens");
const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");

let wallet, connection, jupiter;

connectBtn.onclick = async () => {
  if (!window.solana) return alert("Install Phantom");

  wallet = await window.solana.connect();
  connection = new Connection("https://api.mainnet-beta.solana.com");

  status.innerText = `Phantom: ${wallet.publicKey.toString().slice(0,6)}...`;

  const sol = await connection.getBalance(wallet.publicKey);
  balanceEl.innerText = `SOL: ${(sol / 1e9).toFixed(4)}`;

  jupiter = await Jupiter.load({
    connection,
    cluster: "mainnet-beta",
    user: wallet.publicKey,
  });

  const tokens = jupiter.getTokens();
  Object.values(tokens).slice(0,120).forEach(t => {
    const opt1 = new Option(t.symbol, t.address);
    const opt2 = new Option(t.symbol, t.address);
    fromSelect.add(opt1);
    toSelect.add(opt2);
  });
};
