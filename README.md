# MMM-NounsAuction

A [MagicMirror²](https://github.com/MichMich/MagicMirror) module that displays real-time Nouns auction information from the Ethereum blockchain. This module shows the current Nouns NFT auction status, including the current bid, end time, bidder information, and the Noun image.

## Preview



## Features

- Displays current Nouns auction information in real-time
- Shows the Noun NFT image
- Displays current bid amount in ETH
- Shows auction end time
- Displays current highest bidder's address
- Indicates if the auction is active or settled
- Configurable update interval
- Customizable display options

## Installation

1. Navigate to your MagicMirror's `modules` directory:
```bash
cd ~/MagicMirror/modules
```

2. Clone this repository:
```bash
git clone https://github.com/XppaiCyberr/MMM-NounsAuction.git
```

3. Install dependencies:
```bash
cd MMM-NounsAuction
npm install
```

## Configuration

Add the following configuration to your `config/config.js` file:

```javascript
{
    module: "MMM-NounsAuction",
    position: "top_right", // Any valid MagicMirror position
    config: {
        updateInterval: 300000, // Update every 5 minutes (in milliseconds)
        contractAddress: "0x830BD73E4184ceF73443C15111a1DF14e495C706", // Nouns auction contract address
        rpcUrl: "YOUR_RPC_URL", // Replace with your Ethereum RPC URL
        showImage: true, // Whether to show the Noun image
        showRawData: false, // Whether to show raw auction data
        header: "Nouns Auction Watcher" // Module header text
    }
}
```

### Configuration Options

| Option | Description | Default |
|--------|-------------|---------|
| `updateInterval` | How often to fetch new auction data (in milliseconds) | 300000 (5 minutes) |
| `contractAddress` | The Nouns auction contract address | "0x830BD73E4184ceF73443C15111a1DF14e495C706" |
| `rpcUrl` | Your Ethereum RPC URL (e.g., from Alchemy, Infura) | Required |
| `showImage` | Whether to display the Noun NFT image | true |
| `showRawData` | Whether to display raw auction data | false |
| `header` | Text to display in the module header | "Nouns Auction Watcher" |

## Dependencies

- [ethers.js](https://docs.ethers.org/v5/) - For Ethereum blockchain interaction

## Updating

To update the module to the latest version:

```bash
cd ~/MagicMirror/modules/MMM-NounsAuction
git pull
npm install
```

## Contributing

Feel free to submit issues and pull requests!

## License

MIT

## Support

If you find this module helpful, please consider:
- Starring the repository
- Contributing to the code
- Submitting bug reports or feature requests

## Acknowledgments

- [MagicMirror²](https://github.com/MichMich/MagicMirror) project
- [Nouns DAO](https://nouns.wtf/) for the NFT auction platform 
- [Nouns Pics](https://noun.pics) for the Nouns Image API 

