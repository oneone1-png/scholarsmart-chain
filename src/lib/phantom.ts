import {
  Connection,
  clusterApiUrl,
  Transaction,
  TransactionInstruction,
  PublicKey,
} from "@solana/web3.js";

export async function connectPhantom() {
  const provider = (window as any).solana;

  if (!provider || !provider.isPhantom) {
    alert("Install Phantom wallet dulu");
    return null;
  }

  const resp = await provider.connect();
  return resp.publicKey.toString();
}

export async function sendTransaction(applicationId: string, status: string) {
  try {
    const provider = (window as any).solana;

    if (!provider || !provider.isPhantom) {
      alert("Install Phantom wallet dulu");
      return null;
    }

    await provider.connect();

    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const publicKey = provider.publicKey;

    const balance = await connection.getBalance(publicKey);
    console.log("BALANCE:", balance);

    if (balance <= 0) {
      alert("Saldo Devnet SOL masih kosong.");
      return null;
    }

    const memoProgramId = new PublicKey(
      "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
    );

    const memoText = `SmartScholar | Application: ${applicationId} | Status: ${status}`;

    const transaction = new Transaction().add(
      new TransactionInstruction({
        keys: [
          {
            pubkey: publicKey,
            isSigner: true,
            isWritable: false,
          },
        ],
        programId: memoProgramId,
        data: Buffer.from(memoText, "utf8"),
      })
    );

    transaction.feePayer = publicKey;

    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash();

    transaction.recentBlockhash = blockhash;

    const signed = await provider.signTransaction(transaction);

    const signature = await connection.sendRawTransaction(signed.serialize());

    await connection.confirmTransaction(
      {
        signature,
        blockhash,
        lastValidBlockHeight,
      },
      "confirmed"
    );

    console.log("SUCCESS TX:", signature);
    return signature;
  } catch (error) {
    console.error("TX ERROR:", error);
    alert("Transaksi gagal. Cek Console browser.");
    return null;
  }
}