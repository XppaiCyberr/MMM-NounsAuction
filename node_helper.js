/* node_helper.js */
const NodeHelper = require("node_helper");
const { ethers } = require("ethers");

module.exports = NodeHelper.create({
  start: function() {
    console.log("Starting node helper for: " + this.name);
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "FETCH_CONTRACT_DATA") {
      this.fetchContractData(payload);
    }
  },

  fetchContractData: async function(config) {
    try {
      // Create a provider
      const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
      
      // ABI for the auctionStorage function
      const abi = [
        {
          "inputs": [],
          "name": config.functionName,
          "outputs": [
            {"name": "nounId", "type": "uint96"},
            {"name": "clientId", "type": "uint32"},
            {"name": "amount", "type": "uint128"},
            {"name": "startTime", "type": "uint40"},
            {"name": "endTime", "type": "uint40"},
            {"name": "bidder", "type": "address"},
            {"name": "settled", "type": "bool"}
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ];
      
      // Create contract instance
      const contract = new ethers.Contract(config.contractAddress, abi, provider);
      
      // Call the function
      const result = await contract[config.functionName]();
      
      // Convert BigNumber objects to strings for transmission
      const processedResult = {
        nounId: result.nounId.toString(),
        clientId: result.clientId.toString(),
        amount: result.amount.toString(),
        startTime: result.startTime.toString(),
        endTime: result.endTime.toString(),
        bidder: result.bidder,
        settled: result.settled
      };
      
      this.sendSocketNotification("CONTRACT_DATA_RESULT", { data: processedResult });
    } catch (error) {
      console.error("Error fetching contract data:", error);
      this.sendSocketNotification("CONTRACT_DATA_RESULT", { error: error.message });
    }
  }
});