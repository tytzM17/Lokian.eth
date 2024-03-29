import { toastErrParams } from "./toastErrParams";

function txFail(recpt, toastFunc, isLoadingFunc=null) {
    if (!recpt) return
  
    if (recpt.status === 0) {
      toastFunc
        ? toastFunc.error(`Error, Tx hash: ${recpt.transactionHash}`, toastErrParams)
        : console.log(`Error, Tx hash: ${recpt.transactionHash}`)
      if (isLoadingFunc) {
        isLoadingFunc(false)
      }
    }
  }
  
  export default txFail;