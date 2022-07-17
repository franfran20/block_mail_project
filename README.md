# LINK TO VIDEO DEMO
Here is the link to the video demo on [youtube](https://youtu.be/MAbMyI3uK1g). The video guide just below!
Here is the [link](https://restless-limit-8335.on.fleek.co) to the live demo hosted on fleek. (It might be a bit buggy :( )

Note: Keep in mind that the video was sped up by 3x. When playing with the live demo wait a little after clicking a button. I know its not the best UX, its what i could work with given the time.

## Video guide
- I'm using two accounts to show the power of blockmail. I already had some mails in there from previous testings.

- I sign in with Metamask with account 2 and try to send a message to account 1.
  - I input an address I'm sending the message to along with the title and message
  - I click the encrypt button so i would'nt store the private message I wish to unencrypted and then sign to encrypt.
  - I chose not to add matic but you could if you want!
  - Then I copied my encrypted link and sent it via blockmail to the expected receipient.
  - The transaction fails and gives me an error because account 1 has not given me permission to send them a mail.

- I then switch to account one and allow account 2 to be able to send me a mail, wait for the transaction to be confirmed.
- Switch back again to account 2 and try to send a mail and this time around it works.
- I connect to blockmail again with account 1 and I see that a new mail has appeared.
- I open it up and see the encrypted message. I then decrypt the message using my signature(account 1).
- Boom! the messages' true value is revealed

- The last section is to show anyone can have the encrypted link stored on ipfs but it requires only the signature of the required adsress to decrypt.
- This is a huge integration of IPFS and LIT protocol.

<img src="https://ipfs.io/ipfs/bafybeiewrmkuchawpjpvb6mr7gtqpk5qyoh6lk5tbdpvewufbyddf6rl3u/newlogo.png" alt="Blockmail" style="height: 700px; width:1200px;"/>

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
- Fleek for hosting.

# Future Improvements

Most of the imporovements listed down below that couldn't be completed were due to time and inability to find teamates within the time of hearing about the hackathon.

- Make frontend nice.
  Currently the frontend is very basic due to the fact that this was a solo project, had a specific deadline and inability to find teamates within the time I heard about the hacakathon.
- Add more values to messages
  Right now only MATIC test currency can be sent along with a blockmail. Improvements to this will be to send NFT's and tokens alongside messages.
- Add a fee structure
  To reduce the abuse of the mail service, a fee structure can be established so only important mails can be sent from address to address. To abstract away the service being used as a social app. People wil only pay a transaction fee to send a messsage they consider important!!
- Other Improvements would come along once the project is ready to go mainstream!
- Adding links, images and music as part of a blockmail. Right now its just limited to string messages.

# Links
- Link to live demo [here](https://restless-limit-8335.on.fleek.co).
- Link to the smart contracts code [here](https://github.com/franfran20/blockmail_smart_contracts_testnet).
- Link to the frontend code [here](https://github.com/franfran20/block_mail_project).
- Contract Address in mumbai - 0xe0DE79AFdE2a6e6517F7A20E0923d957ee24b3cd
