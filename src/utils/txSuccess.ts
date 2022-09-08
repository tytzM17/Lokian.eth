function txSuccess(recpt, toastFunc, refreshMonFunc, isLoadingFunc=null) {
  if (!recpt) return

  if (recpt.status === 1) {
    toastFunc
      ? toastFunc.success(`Success, Tx hash: ${recpt.transactionHash}`)
      : console.log(`Success, Tx hash: ${recpt.transactionHash}`)
    if (refreshMonFunc) refreshMonFunc()
    if (isLoadingFunc) isLoadingFunc(false)
  }
}

export default txSuccess;
