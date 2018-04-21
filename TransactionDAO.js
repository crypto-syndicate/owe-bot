class MemoryTransactionDAO {
    constructor() {
        this.memory = [];
    }

    addTransaction(transaction) {
        this.memory.push(transaction);
    }

    getTransactions(query) {
        return this.memory;
    }
}