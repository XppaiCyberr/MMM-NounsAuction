/* MMM-NounsAuction.js */
Module.register("MMM-NounsAuction", {
    defaults: {
      updateInterval: 300000, // 5 minutes
      contractAddress: "0x830BD73E4184ceF73443C15111a1DF14e495C706",
      functionName: "auctionStorage",
      rpcUrl: "https://eth-mainnet.g.alchemy.com/v2/CZ1Bsb283_CT07OfVn3uYSOfmCURtNFq", // Replace with your prefer rpc
      showImage: true,
      showRawData: false,
      header: "Nouns Auction Watcher"
    },
  
    requiresVersion: "2.1.0",
  
    start: function() {
      Log.info("Starting module: " + this.name);
      this.auctionData = null;
      this.loaded = false;
      this.scheduleUpdate();
    },
  
    getDom: function() {
      const wrapper = document.createElement("div");
      wrapper.className = "ethereum-contract-reader";
  
      // Add header
      const header = document.createElement("header");
      header.className = "module-header";
      header.textContent = this.config.header;
      wrapper.appendChild(header);
  
      // If we're still loading
      if (!this.loaded) {
        const loading = document.createElement("div");
        loading.className = "dimmed light";
        loading.innerHTML = this.translate("LOADING");
        wrapper.appendChild(loading);
        return wrapper;
      }
  
      // If we have an error
      if (this.error) {
        const errorMessage = document.createElement("div");
        errorMessage.className = "error-message";
        errorMessage.textContent = this.error;
        wrapper.appendChild(errorMessage);
        return wrapper;
      }
  
      // If we have data
      if (this.auctionData) {
        const content = document.createElement("div");
        content.className = "auction-content";
  
        // Container for the entire module
        const container = document.createElement("div");
        container.className = "auction-container";
  
        // Create a row for the content
        const row = document.createElement("div");
        row.className = "auction-row";
  
        // Only show image if configured to do so
        if (this.config.showImage) {
          const imageContainer = document.createElement("div");
          imageContainer.className = "image-container";
  
          const nounImage = document.createElement("img");
          nounImage.className = "noun-image";
          nounImage.src = `https://noun.pics/${this.auctionData.nounId}.jpg`;
          nounImage.alt = `Noun #${this.auctionData.nounId}`;
          nounImage.onerror = function() {
            this.style.display = "none";
          };
  
          const nounId = document.createElement("div");
          nounId.className = "noun-id";
          nounId.textContent = `Noun #${this.auctionData.nounId}`;
  
          imageContainer.appendChild(nounImage);
          imageContainer.appendChild(nounId);
          row.appendChild(imageContainer);
        }
  
        // Details container
        const detailsContainer = document.createElement("div");
        detailsContainer.className = "details-container";
  
        // Create table for auction details
        const table = document.createElement("table");
        table.className = "auction-table";
  
        // Add rows for each field
        const fields = [
          { label: "Current Bid", value: `${this.formatEther(this.auctionData.amount)} ETH` },
          { label: "End Time", value: this.formatTimestamp(this.auctionData.endTime) },
          { label: "Current Bidder", value: this.truncateAddress(this.auctionData.bidder) },
          { label: "Status", value: this.auctionData.settled ? "Settled" : "Active" }
        ];
  
        fields.forEach(field => {
          const row = document.createElement("tr");
          
          const labelCell = document.createElement("td");
          labelCell.className = "label-cell";
          labelCell.textContent = field.label;
          
          const valueCell = document.createElement("td");
          valueCell.className = "value-cell";
          valueCell.textContent = field.value;
          
          row.appendChild(labelCell);
          row.appendChild(valueCell);
          table.appendChild(row);
        });
  
        detailsContainer.appendChild(table);
        row.appendChild(detailsContainer);
        container.appendChild(row);
  
        // Add raw data if configured
        if (this.config.showRawData) {
          const rawData = document.createElement("pre");
          rawData.className = "raw-data";
          rawData.textContent = JSON.stringify(this.auctionData, null, 2);
          container.appendChild(rawData);
        }
  
        content.appendChild(container);
        wrapper.appendChild(content);
      }
  
      return wrapper;
    },
  
    getStyles: function() {
      return [
        "MMM-NounsAuction.css",
      ];
    },
  
    getScripts: function() {
      return [
        this.file('node_modules/ethers/dist/ethers.umd.min.js')
      ];
    },
  
    scheduleUpdate: function() {
      const self = this;
      self.updateDom();
      setInterval(function() {
        self.fetchContractData();
      }, this.config.updateInterval);
      
      // Initial fetch
      self.fetchContractData();
    },
  
    fetchContractData: async function() {
      try {
        // Use the Node Helper to fetch the data
        this.sendSocketNotification("FETCH_CONTRACT_DATA", {
          rpcUrl: this.config.rpcUrl,
          contractAddress: this.config.contractAddress,
          functionName: this.config.functionName
        });
      } catch (error) {
        this.error = "Error fetching data: " + error.message;
        this.updateDom();
      }
    },
  
    socketNotificationReceived: function(notification, payload) {
      if (notification === "CONTRACT_DATA_RESULT") {
        if (payload.error) {
          this.error = payload.error;
        } else {
          this.auctionData = payload.data;
          this.error = null;
        }
        this.loaded = true;
        this.updateDom();
      }
    },
  
    formatTimestamp: function(timestamp) {
      return new Date(timestamp * 1000).toLocaleString();
    },
  
    formatEther: function(wei) {
      return parseFloat(wei) / 1e18;
    },
  
    truncateAddress: function(address) {
      return address.substring(0, 6) + "..." + address.substring(address.length - 4);
    }
  });