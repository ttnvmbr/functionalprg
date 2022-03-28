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
  const timeStamp = data.timestamp;

  const transactions2 =
    data.transactions[0].from +
    data.transactions[0].to +
    data.transactions[0].amount +
    data.transactions[0].timestamp;

  const BBB = hash + transactions + timeStamp + nonce;
  console.log(mod10(BBB));
  const BBBResult =
    "caf9a0776c7a7a7febd3e04d62dc9e1cfb0d18ba4c325e3b58d8691ed1d30756";
  let bbb = 0;

  const CCC = BBBResult + transactions2 + bbb;
  console.log(BBB, "space", CCC);
  // mod10("test");
}

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
