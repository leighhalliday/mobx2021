import { makeAutoObservable } from "mobx";
import sha256 from "crypto-js/sha256";
import { createContext, useContext, useEffect, FC } from "react";

interface IBlock {
  hash: string;
  transactions: Array<string>;
}

class BlockchainStore {
  blocks: Array<IBlock> = [];
  transactions: Array<string> = [];

  constructor() {
    makeAutoObservable(this);
  }

  get numberBlocks() {
    return this.blocks.length;
  }

  get valid() {
    return this.blocks.every((block, index) => {
      const prevBlock = this.blocks[index - 1] ?? { hash: "" };
      const hash = sha256(
        `${prevBlock.hash}${JSON.stringify(block.transactions)}`
      ).toString();
      return hash === block.hash;
    });
  }

  addTransaction(message: string) {
    this.transactions.push(message);
  }

  writeBlock() {
    if (this.transactions.length === 0) {
      return;
    }

    const transactions = [...this.transactions];
    this.transactions = [];

    const prevBlock = this.blocks[this.blocks.length - 1] ?? { hash: "" };
    const hash = sha256(
      `${prevBlock.hash}${JSON.stringify(transactions)}`
    ).toString();

    this.blocks.push({ hash, transactions });
  }
}

const StoreContext = createContext<BlockchainStore>(new BlockchainStore());

const StoreProvider: FC<{ store: BlockchainStore }> = ({ store, children }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      store.writeBlock();
    }, 5000);

    return () => clearInterval(interval);
  }, [store]);

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

const useStore = () => {
  return useContext(StoreContext);
};

export { BlockchainStore, StoreProvider, useStore };
