const LoadData = async () => {
  try {
    const url = "https://programmeren9.cmgt.hr.nl:8000/api/blockchain/next";

    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

LoadData().then((data) => hashData(data));

function hashData(data) {
  const hash = data.blockchain.hash;
  const nonce = data.blockchain.nonce;
  const transactions =
    data.blockchain.data[0].from +
    data.blockchain.data[0].to +
    data.blockchain.data[0].amount +
    data.blockchain.data[0].timestamp;
  const timeStamp = data.blockchain.timestamp;

  const transactions2 =
    data.transactions[0].from +
    data.transactions[0].to +
    data.transactions[0].amount +
    data.transactions[0].timestamp;

  const BBB = hash + transactions + timeStamp + nonce;

  const BBBResult = mod10(BBB);

  BBBResult.then((res) => {
    findNonce(res, transactions2);
  });
}

function findNonce(input, transactions) {
  let finalHash = "";
  let newNonce = 0;

  while (!isHashValid(finalHash)) {
    newNonce++;
    const fullInput = input + transactions + newNonce;
    mod10(fullInput).then((res) => {
      console.log(res);
      resolveAnswer(res);
    });
    // console.log(newNonce, "New Nonce");
    // console.log(finalHash, "finalHash");
  }

  console.log(newNonce);
}

const isHashValid = (hash) => hash.startsWith("0000");

const sendData = async () => {
  try {
    const url = "https://programmeren9.cmgt.hr.nl:8000/api/blockchain";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nonce: 447, user: "Inci Yesiltepe" }),
    });

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

// sendData().then((data) => console.log(data));
