import { createMint,getMinimumBalanceForRentExemptMint,MINT_SIZE,TOKEN_2022_PROGRAM_ID, createInitializeMint2Instruction } from "@solana/spl-token"
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
        const metadata = {
            name,
            symbol,
            uri: image,
            sellerFeeBasisPoints: 0,
            creators: null,
            collection: null,
            uses: null,
        }
        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: wallet.publicKey,
                newAccountPubkey: keypair.publicKey,
                space: MINT_SIZE, //req size to store data = 82 bytes
                lamports, //amount of lamports req to create this accouunt
                programId : TOKEN_2022_PROGRAM_ID, //is the owner of the account - who owns this - Solana-Token_program
            }),
            createInitializeMint2Instruction(keypair.publicKey, 6, wallet.publicKey, wallet.publicKey,TOKEN_2022_PROGRAM_ID ), //pass the data to account created
            createMetaDa
        );

        const recentBlockHash = await connection.getLatestBlockhash()
        transaction.recentBlockhash = recentBlockHash.blockhash

        transaction.feePayer = wallet.publicKey

        transaction.partialSign(keypair)
      const response = await  wallet.sendTransaction(transaction,connection)
      console.log(response)
//create a transaction of createAccount - give it fromPubKey - users publckey, newPubKey - keypair.publickey new generated tokens public key 
//space - mint_size size req to store data whicih is usually 82 bytes
//lanports - mini lamports to be rent exempted
//programId token program id owner of the program which is solana tokemn program
//empty account is creates now add data to this account using crateinitialze mint transacrion funciton and passing is pubkey,decimals,mint authority  , freeze authority
//normallly create mint req users privatey for creatin a token but we will use partiall sign methid and thenwe will send transaction to wallet for accepitng the creation of otken it also req recent block a=hash bcoz in solana we cannot add further blockd without recent block hash it is interconnected 


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