import { useState } from "react";
import { ethers } from "ethers-react";

const payment = async ({ setError, setText, ether, add }) => {
  try {
    if (!window.ethereum) throw new Error("Error");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(add);
    const txt = await signer.sendTransaction({
      to: add,
      value: ethers.utils.parseEther(ether),
    });
    console.log({ ether, add });
    console.log("txt", txt);
    setText([txt]);
  } catch (err) {
    setError(err.message);
  }
};

export default function Example() {
  const [error, setError] = useState();
  const [txts, setText] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    await payment({
      setError,
      setText,
      ether: data.get("ether"),
      add: data.get("add"),
    });
  };

  return (
    <div className="relative bg-white border">
      <div className="absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50" />
      </div>
      <div className="relative mx-auto max-w-7xl lg:grid lg:grid-cols-5">
        <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
          <div className="mx-auto max-w-lg">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Form Transfer ETH
            </h2>
            <p className="mt-3 text-lg leading-6 text-gray-500">Metamask</p>
          </div>
        </div>
        <div className="bg-white py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
          <div className="mx-auto max-w-lg lg:max-w-none">
            <form
              action="#"
              method="POST"
              className="grid grid-cols-1 gap-y-6"
              onSubmit={handleSubmit}
            >
              <div>
                <label htmlFor="full-name" className="sr-only">
                  Recipient Address
                </label>
                <input
                  type="text"
                  name="addr"
                  className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Recipient Address"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  ETH
                </label>
                <input
                  name="ether"
                  type="text"
                  className="block w-full rounded-md border-gray-300 py-3 px-4 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="ETH"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-6 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Transfer ETH
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
