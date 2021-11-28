function txSuccess(recpt, toastFunc, refreshMonFunc) {
  if (!recpt) return

  if (recpt.status === 1) {
    toastFunc
      ? toastFunc.success(`Success, Tx hash: ${recpt.transactionHash}`)
      : console.log(`Success, Tx hash: ${recpt.transactionHash}`)
    if (refreshMonFunc) refreshMonFunc()
  }
}

export default txSuccess;
