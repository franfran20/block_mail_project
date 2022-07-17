# LINK TO VIDEO DEMO
Video demo would and description will be out in less than 2 hours.
Here is the [link](https://restless-limit-8335.on.fleek.co/2) to the live demo hosted on fleek.
It might be a bit glitchy, depends!


# What is BlockMail?

BlockMail is a mail service built on top of the decentralized web which is IPFS. Blockmail solves the problem of **spam mails(unwanted mails)**, also allowing mails to have **monetary values** attached to those mails/messages. Most importantly, blockmail gives you one hundred percent **control** over how you wish to manage your mails. Exciting right? Oh and for the rest of this article we'll refer to mails as **blockmails**.

# The Regular Mail Services and Its Problems

### Spams

The regular mail services today in and of its self isn't acrually that bad, but it can be better. When using the regular mail services built around us today. We end up receiving mails like **promotions**, **socials**, **subscriptions** and like I said earlier, this isn't really a bad thing that will make our pants go on fire but it definitely can make your mail inbox noisy and abstract away most of the important mails that matter to you. Sometimes this even leads to users opening a new mail for a specific purpose. Annoying!.

### Phishing Attacks

According to stats from the [Tessian blog](https://www.tessian.com/blog/phishing-statistics-2020/) 96% of phishing attacks arrive by email. Another 3% are carried out through malicious websites and just 1% via phone. 96% percent is a huge number and most of these attacks have lead to security breaches in huge financial infrastructures and loss of individuals funds. Simply because someone had access to the mail of some staff of an institution/organization. BlockMail changes this with its in built access control mechanism allowing you to decide who sends you mails. This in turn helps manage your mail lists and keeps you safe!

### Privacy On The Decentralized Web like IPFS

Privacy and blockchain don't go hand in hand. One of the major purposes of a blockchain is transparency but there are some things you want to keep private, like a horrible photo of yourself, the text message you sent to your crush in middle school or an important document for your boss. We all need privacy one way or the other. A mail service is definitely on the list. BlockMail uses lit protocol to encrypt data in a decentralized way based on an on chain condition.
What do I mean? Lit protocol grants access to specific content based on whether the address satisfies a condition on the blockchain. How does blockMail use this? BlockMail stores all its mails on IPFS. IPFS by nature is public and was built that way on purpose. Now BlockMail doesnt store the mail as is. Instead it encrypts the mail which has a unique id and maps that mail to an address. Meaning only the address mapped to a specific mail ID can decrpt the public mail on IPFS. Sick right? I know.

# IPFS AND FILECOIN IMPLEMENTATION

BlockMails by default are stored on the IPFS via web3.storage. You can check out the implementation of the code [here]("link to web3storage"). BlockMail uses web3.storage to store the encrypted data for the user on IPFS using the javascript client which is really cool. Using web3.storage store the encrypted information as a json object that we could easily fetch using a GET request.
The code below:

```js
async function makeFileObjectsAndStore(_message) {
  await disconnectWeb3();
  console.log(mailId);
  const packagedData = await encrypt(_message, mailId.toString());
  const blob = new Blob([JSON.stringify(packagedData)], {
    type: "application/json",
  });
  const files = [new File([blob], `${mailId}.json`)];

  const onStoredChunk = (size) => {
    uploaded += size;
    const pct = totalSize / uploaded;
    setUploadStatus(`Uploading... ${pct.toFixed(2)}% complete`);
  };

  const client = makeStorageClient();
  const cid = await client.put(files, { onRootCidReady, onStoredChunk });
  console.log(`stored mail ${mailId} with cid:`, cid);
  const publicLink = addPublicGateway(cid, mailId).toString();
  setEncryptedLink(publicLink);
}
```

### TOOLS AND PROTOCOLS USED FOR THIS PROJECT

- IPFS for decentralized storage.
- Web3.storage for programatically uploading mails to IPFS.
- Lit Protocol for Encrypting mails before upload.
- NEXT js for frontend.
- Moralis for indexing blockchain data and frontend web3 hooks.
- Brownie for scripts for smart contracts.
- Solidity for smart contracts.

# Future Improvements

Most of the imporovements listed down below that couldn't be completed were due to time and inability to find teamates within the time of hearing about the hackathon.

- Make frontend nice.
  Currently the frontend is very basic due to the fact that this was a solo project, had a specific deadline and inability to find teamates within the time I heard about the hacakathon.
- Add more values to messages
  Right now only MATIC test currency can be sent along with a blockmail. Improvements to this will be to send NFT's and tokens alongside messages.
- Add a fee structure
  To reduce the abuse of the mail service, a fee structure can be established so only important mails can be sent from address to address. To abstract away the service being used as a social app. People wil only pay a transaction fee to send a messsage they consider important!!
- Other Improvements would come along once the project is ready to go mainstream!

# Links
- Link to the smart contracts code [here](https://github.com/franfran20/blockmail_smart_contracts_testnet).
- Link to the frontend code [here](https://github.com/franfran20/block_mail_project).
- Contract Address in mumbai - 0xe0DE79AFdE2a6e6517F7A20E0923d957ee24b3cd
