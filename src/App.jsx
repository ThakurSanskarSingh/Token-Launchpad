import './App.css'
import {ConnectionProvider,WalletProvider} from '@solana/wallet-adapter-react'
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
  WalletConnectButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';

import { TokenLaunchpad } from './components/TokenLaunchpad'

function App() 

{const endpoint = 'https://api.devnet.solana.com'
  return (
    <>
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider  wallets={[]} autoConnect>
        <WalletModalProvider>
          <div style={{
            display : 'flex',
            justifyContent : 'center',
            padding : 20
          }}>
            <WalletMultiButton />

          </div>
          
    <TokenLaunchpad></TokenLaunchpad>

        </WalletModalProvider>
        
      </WalletProvider>

    </ConnectionProvider>
    </>
  )
}

export default App
