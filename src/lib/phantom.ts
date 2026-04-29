import { Connection, clusterApiUrl, Transaction, SystemProgram, PublicKey } from "@solana/web3.js";

export async function sendTransaction() {
  const provider = (window as any).solana;

  if (!provider || !provider.isPhantom) {
    alert("Phantom tidak ditemukan");
    return null;
  }

  await provider.connect();

  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const fromPubkey = provider.publicKey;

  if (!fromPubkey) {
    alert("Wallet belum terhubung");
    return null;
  }

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey,
      toPubkey: fromPubkey,
      lamports: 1000,
    })
  );

  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash();

  transaction.feePayer = fromPubkey;
  transaction.recentBlockhash = blockhash;

  const signed = await provider.signTransaction(transaction);

  const signature = await connection.sendRawTransaction(
    signed.serialize()
  );

  await connection.confirmTransaction(
    {
      signature,
      blockhash,
      lastValidBlockHeight,
    },
    "confirmed"
  );

  return signature;
}