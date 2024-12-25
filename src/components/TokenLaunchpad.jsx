import { createMint,getMinimumBalanceForRentExemptMint,MINT_SIZE,TOKEN_PROGRAM_ID, createInitializeMint2Instruction } from "@solana/spl-token"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { Keypair,Transaction,SystemProgram } from "@solana/web3.js"





export function TokenLaunchpad() {

    const wallet = useWallet()
    const {connection} = useConnection()

   async  function createToken() {
        const name = document.getElementById('name').value
        const symbol = document.getElementById('symbol').value
        const image = document.getElementById('image').value
        const initialSuply = document.getElementById('initialSupply').value

        const lamports = await getMinimumBalanceForRentExemptMint(connection);
        const keypair  = Keypair.generate()

        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: wallet.publicKey,
                newAccountPubkey: keypair.publicKey,
                space: MINT_SIZE, //req size to store data = 82 bytes
                lamports, //amount of lamports req to create this accouunt
                programId : TOKEN_PROGRAM_ID, //is the owner of the account - who owns this - Solana-Token_program
            }),
            createInitializeMint2Instruction(keypair.publicKey, 6, wallet.publicKey, wallet.publicKey,TOKEN_PROGRAM_ID ), //pass the data to account created
        );

        const recentBlockHash = await connection.getLatestBlockhash()
        transaction.recentBlockhash = recentBlockHash.blockhash

        transaction.feePayer = wallet.publicKey

        transaction.partialSign(keypair)
      const response = await  wallet.sendTransaction(transaction,connection)
      console.log(response)


    }

    return  <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }}>
        <h1>Solana Token Launchpad</h1>
        <input  id="name " className='inputText' type='text' placeholder='Name'></input> <br />
        <input id="symbol" className='inputText' type='text' placeholder='Symbol'></input> <br />
        <input id="image" className='inputText' type='text' placeholder='Image URL'></input> <br />
        <input id="initialSupply" className='inputText' type='text' placeholder='Initial Supply'></input> <br />
        <button onClick={createToken} className='btn'>Create a token</button>
    </div>
}