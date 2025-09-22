import React, { useEffect, useState } from "react"

import "./Table.scss"
import { Input } from "../Input"
import { CollapseTable } from "../CollapseTable"
import { NetworkDropdown } from "../NetworkDropdown"
import { apiCoin } from "../../service/api/apiCoinGecko"
import { poolData } from "./data"
import { poolDataBsc } from "./dataBsc"
import useDebounce from "../../utils/useDebounce"
import { useSearchParams } from "react-router-dom"
import { scrollToElement } from "../../utils"
import { Loading } from "../Loading"
import {config} from "../../index";
import {useAccount} from "wagmi";
import {getChainId} from "@wagmi/core";
import {poolDataOpt} from "./dataOpt";
import {poolDataArb} from "./dataArb";
import {poolDataFantom} from "./dataFantom";
import {poolDataBase} from "./dataBase";
import {poolDataAvax} from "./dataAvax";
import {poolDataManta} from "./dataManta";
import {poolDataPol} from "./dataPol";

type Props = {
  stakedDisplay: boolean
}

export const Table = ({ stakedDisplay }: Props): JSX.Element => {
  const [search] = useSearchParams()
  const [input, setInput] = useState("")
  const [index, setIndex] = useState<undefined | number>(undefined)
  const [token, setToken] = useState<undefined | string>(undefined)
  const [filteredPoolData, setFilteredPoolData] = useState(poolData)
  const debouncedSearchCountries = useDebounce(input, 500)
  const [stat, setStat] = useState<any[]>([])
  const [loaded, setLoaded] = useState(false)
  const [addressRematch, setAccountRematch] = useState('')
  const { address } = useAccount();
  const chainId = getChainId(config)


  useEffect(() => {
    if (chainId === 56) {
      if (debouncedSearchCountries) {
        setFilteredPoolData(
          poolDataBsc.filter(
            i =>
              i.token.toLocaleLowerCase().match(debouncedSearchCountries.toLowerCase()) ||
              i.name.toLocaleLowerCase().match(debouncedSearchCountries.toLowerCase()),
          ),
        )
      } else {
        setFilteredPoolData(poolDataBsc)
      }
      return
    }
    if (chainId === 10) {
      if (debouncedSearchCountries) {
        setFilteredPoolData(
          poolDataOpt.filter(
            i =>
              i.token.toLocaleLowerCase().match(debouncedSearchCountries.toLowerCase()) ||
              i.name.toLocaleLowerCase().match(debouncedSearchCountries.toLowerCase()),
          ),
        )
      } else {
        setFilteredPoolData(poolDataOpt)
      }
      return
    }
    if (chainId === 42161) {
      if (debouncedSearchCountries) {
        setFilteredPoolData(
          poolDataArb.filter(
            i =>
              i.token.toLocaleLowerCase().match(debouncedSearchCountries.toLowerCase()) ||
              i.name.toLocaleLowerCase().match(debouncedSearchCountries.toLowerCase()),
          ),
        )
      } else {
        setFilteredPoolData(poolDataArb)
      }
      return
    }
    if (chainId === 250) {
      if (debouncedSearchCountries) {
        setFilteredPoolData(
          poolDataFantom.filter(
            i =>
              i.token.toLocaleLowerCase().match(debouncedSearchCountries.toLowerCase()) ||
              i.name.toLocaleLowerCase().match(debouncedSearchCountries.toLowerCase()),
          ),
        )
      } else {
        setFilteredPoolData(poolDataFantom)
      }
      return
    }
    if (chainId === 8453) {
      if (debouncedSearchCountries) {
        setFilteredPoolData(
          poolDataBase.filter(
            i =>
              i.token.toLocaleLowerCase().match(debouncedSearchCountries.toLowerCase()) ||
              i.name.toLocaleLowerCase().match(debouncedSearchCountries.toLowerCase()),
          ),
        )
      } else {
        setFilteredPoolData(poolDataBase)
      }
      return
    }
    if (chainId === 43114) {
      if (debouncedSearchCountries) {
        setFilteredPoolData(
          poolDataAvax.filter(
            i =>
              i.token.toLocaleLowerCase().match(debouncedSearchCountries.toLowerCase()) ||
              i.name.toLocaleLowerCase().match(debouncedSearchCountries.toLowerCase()),
          ),
        )
      } else {
        setFilteredPoolData(poolDataAvax)
      }
      return
    }
    if (chainId === 169) {
      if (debouncedSearchCountries) {
        setFilteredPoolData(
          poolDataManta.filter(
            i =>
              i.token.toLocaleLowerCase().match(debouncedSearchCountries.toLowerCase()) ||
              i.name.toLocaleLowerCase().match(debouncedSearchCountries.toLowerCase()),
          ),
        )
      } else {
        setFilteredPoolData(poolDataManta)
      }
      return
    }
    if (chainId === 137) {
      if (debouncedSearchCountries) {
        setFilteredPoolData(
          poolDataPol.filter(
            i =>
              i.token.toLocaleLowerCase().match(debouncedSearchCountries.toLowerCase()) ||
              i.name.toLocaleLowerCase().match(debouncedSearchCountries.toLowerCase()),
          ),
        )
      } else {
        setFilteredPoolData(poolDataPol)
      }
      return
    }
    if (debouncedSearchCountries) {
      setFilteredPoolData(
        poolData.filter(
          i =>
            i.token.toLocaleLowerCase().match(debouncedSearchCountries.toLowerCase()) ||
            i.name.toLocaleLowerCase().match(debouncedSearchCountries.toLowerCase()),
        ),
      )
    } else {
      setFilteredPoolData(poolData)
    }
  }, [debouncedSearchCountries,chainId])

  useEffect(() => {
    apiCoin
      .getStat()
      .then(rOther => {
        setStat(rOther)
      })
      .finally(() => setLoaded(true))
  }, [])

  useEffect(() => {
    if (chainId === 1 || !address) {
      setFilteredPoolData(poolData)
    }
    if (chainId === 56) {
      setFilteredPoolData(poolDataBsc)
    }
    if (chainId === 10) {
      setFilteredPoolData(poolDataOpt)
    }
    if (chainId === 42161) {
      setFilteredPoolData(poolDataArb)
    }
    if (chainId === 250) {
      setFilteredPoolData(poolDataFantom)
    }
    if (chainId === 137) {
      setFilteredPoolData(poolDataPol)
    }
    if (chainId === 8453) {
      setFilteredPoolData(poolDataBase)
    }
    if (chainId === 43114) {
      setFilteredPoolData(poolDataAvax)
    }
    if (chainId === 169) {
      setFilteredPoolData(poolDataManta)
    }
  }, [chainId, address])

  useEffect(() => {
    if (!!search.get("token")?.length) {
      setTimeout(() => {
        scrollToElement(`${search.get("token")}`)
      }, 500)
      setToken(`${search.get("token")}`)
    }
    if (!!search.get("index")?.length) {
      setIndex(Number(`${search.get("index")}`))
    }
  }, [search])

  const getFirstPlan = (token: string) => {
    if (token === 'ETH') {
      return '14'
    }
    if (token === 'UNI') {
      return '14'
    }
    if (token === 'WBTC') {
      return '14'
    }
    if (token === 'USDT') {
      return '14'
    }
    if (token === 'USDC') {
      return '14'
    }
    if (token === 'BNB') {
      return '3'
    }
    return '1'
  }

  return (
    <div className="table">
      {!loaded && <Loading />}
      <div className="table-header">
        <div className="table-header-left">
          <div className="table-header-left-title">Flexible Lock-Up Choices</div>
          <div className="table-header-left-desc">
            Explore various staking plans tailored to your preferences, offering different lock-up periods for optimal
            returns on your selected currency.
          </div>
        </div>
        <div className="table-header-right">
          <NetworkDropdown chainId={chainId} mobileRight account={address ? address : ""} />
          <Input onChange={v => setInput(v)} value={input} placeholder="Search All" variant="search" />
        </div>
      </div>
      <div className="table-content">
        {filteredPoolData?.map((i: any, indexOther) => (
          <div key={indexOther}>
            <CollapseTable
              index={1}
              stakedDisplay={stakedDisplay}
              token={i.token}
              img={i.icon}
              checkAddress={i.addresses[0]}
              plan={getFirstPlan(i.token)}
              quantity={`${i.quantity[0]} ${i.token}`}
              percent={i.percents[0]}
              addAddress={i.addAddress?.[0]}
              day={i.days[0]}
              stat={stat}
              id={i.id}
              isNew
              accountRematch={addressRematch}
            />
            <CollapseTable
              index={2}
              stakedDisplay={stakedDisplay}
              token={i.token}
              img={i.icon}
              checkAddress={i.addresses[1]}
              plan={(i.token === "ETH" ||i.token === "USDC" || i.token === 'USDT' || i.token === 'BNB'|| i.token === 'UNI'|| i.token === 'WBTC') ? "30" : "14"}
              quantity={`${i.quantity[1]} ${i.token}`}
              percent={i.percents[1]}
              stat={stat}
              day={i.days[1]}
              addAddress={i.addAddress?.[1]}
              id={i.id}
              isNew
              accountRematch={addressRematch}
            />
            <CollapseTable
              index={3}
              stakedDisplay={stakedDisplay}
              token={i.token}
              img={i.icon}
              checkAddress={i.addresses[2]}
              plan={(i.token === "ETH" ||i.token === "USDC" || i.token === 'USDT' || i.token === 'BNB'|| i.token === 'UNI'|| i.token === 'WBTC') ? "60" : "30"}
              quantity={`${i.quantity[2]} ${i.token}`}
              percent={i.percents[2]}
              stat={stat}
              day={i.days[2]}
              addAddress={i.addAddress?.[2]}
              id={i.id}
              isNew
              accountRematch={addressRematch}
            />
            <CollapseTable
              index={4}
              stakedDisplay={stakedDisplay}
              token={i.token}
              img={i.icon}
              checkAddress={i.addresses[3]}
              plan={(i.token === "ETH" ||i.token === "USDC" || i.token === 'USDT' || i.token === 'BNB'|| i.token === 'UNI'|| i.token === 'WBTC') ? "90" : "60"}
              quantity={`${i.quantity[3]} ${i.token}`}
              percent={i.percents[3]}
              stat={stat}
              day={i.days[3]}
              addAddress={i.addAddress?.[3]}
              id={i.id}
              isNew
              accountRematch={addressRematch}
            />
            {!!i.percents[4] && (
              <CollapseTable
                index={5}
                stakedDisplay={stakedDisplay}
                token={i.token}
                img={i.icon}
                checkAddress={i.addresses[4]}
                plan={(i.token === "ETH" || i.token === 'USDT' || i.token === 'BNB'|| i.token === 'UNI'|| i.token === 'WBTC') ? "90" : "5"}
                quantity={`${i.quantity[4]} ${i.token}`}
                percent={i.percents[4]}
                stat={stat}
                day={i.days[4]}
                addAddress={i.addAddress?.[4]}
                id={i.id}
                isNew
                accountRematch={addressRematch}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
