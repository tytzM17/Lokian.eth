function txFail(recpt, toastFunc) {
    if (!recpt) return
  
    if (recpt.status === 0) {
      toastFunc
        ? toastFunc.error(`Error, Tx hash: ${recpt.transactionHash}`)
        : console.log(`Error, Tx hash: ${recpt.transactionHash}`)
    }
  }
  
  export default txFail;