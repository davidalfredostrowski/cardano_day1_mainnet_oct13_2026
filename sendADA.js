

///cb02b




import { getLucid } from "./lucid.js";

const lucid = await getLucid();

// REPLACE with your Coinbase ADA deposit address
//const coinbaseAddress = "addr1...";
const coinbaseAddress = "";



// Amount to send in ADA
const amountADA = 9;

// Convert ADA to lovelace
const lovelace = BigInt(amountADA * 1_000_000);

// Verify mainnet address
if (!coinbaseAddress.startsWith("addr1")) {
  throw new Error("Invalid Cardano mainnet address");
}

// Get wallet information
const walletAddress = await lucid.wallet().address();
const utxos = await lucid.wallet().getUtxos();

const balance = utxos.reduce(
  (sum, utxo) => sum + utxo.assets.lovelace,
  0n
);

console.log("From:", walletAddress);
console.log("To:", coinbaseAddress);
console.log("Balance:", Number(balance) / 1_000_000, "ADA");
console.log("Sending:", amountADA, "ADA");

// Build transaction
const tx = await lucid
  .newTx()
  .pay.ToAddress(coinbaseAddress, {
    lovelace
  })
  .complete();

console.log("Transaction built successfully.");

// Safety: do not submit until explicitly enabled
const SUBMIT = false;

if (!SUBMIT) {
  console.log("DRY RUN: No ADA sent.");
  console.log("Set SUBMIT = true to send.");
  process.exit(0);
}

// Sign transaction
const signedTx = await tx.sign.withWallet().complete();

// Submit transaction
const txHash = await signedTx.submit();

console.log("Transaction submitted!");
console.log("Transaction hash:", txHash);
console.log(
  "Explorer:",
  `https://cardanoscan.io/transaction/${txHash}`
);

