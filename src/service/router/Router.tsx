import { BrowserRouter, Route, Routes } from "react-router-dom"

import {
  Cookies,
  Docs,
  FAQ,
  Farms,
  Home,
  Pool,
  PoolInfo,
  Privacy,
  Referral,
  Swap,
  SwapInfo,
  Terms,
  Token,
  News, Roadmap
} from "pages"
import { routes } from "utils"
import {TokenOpen} from "../../pages/TokenOpen";
import {TokensData} from "../../pages/TokensData";
import {PriceGraf} from "../../pages/PriceGraf";
import {Trademark} from "../../pages/Trademark";
import {Information} from "../../pages/Information";
import {Error} from "../../pages/Error";
import {Protocol} from "../../pages/Protocol";
import {SupportedTokens} from "../../pages/SupportedTokens";
import {Blog} from "../../pages/Blog";
import {Future} from "../../pages/Future";
import {Job} from "../../pages/Job";
import {Employee} from "../../pages/Employee";
import {Promotion} from "../../pages/Promotion";
import {BugBountyTerms} from "../../pages/BugBountyTerms";
import { Brand } from "../../pages/Brand"
import { WhitelabelValidators } from "../../pages/WhitelabelValidators"
import { ChainlinkOracles } from "../../pages/ChainlinkOracles"
import { DevApiPage } from "../../pages/DevApiPage"
import { CryptoIncubator } from "../../pages/CryptoIncubator"

export const Router = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Error />} />
        <Route path={routes.index} element={<Home />} />
        <Route path={routes.farms} element={<Farms />} />
        <Route path={routes.terms} element={<Terms />} />
        <Route path={routes.privacy} element={<Privacy />} />
        <Route path={routes.cookies} element={<Cookies />} />
        <Route path={routes.referral} element={<Referral />} />
        <Route path={routes.pool} element={<Pool />} />
        <Route path={routes.tokensData} element={<TokensData />} />
        <Route path={routes.careers} element={<Future />} />
        <Route path={routes.jobs} element={<Job />} />
        <Route path={routes.brand} element={<Brand />} />
        <Route path={routes.priceGraf} element={<PriceGraf />} />
        <Route path={routes.page}>
          <Route path=":id">
            <Route path=":pool" element={<TokenOpen />} />
          </Route>
        </Route>
        <Route path={routes.swapInfo} element={<SwapInfo />} />
        <Route path={routes.swap} element={<Swap />} />
        <Route path={routes.faq} element={<FAQ />} />
        <Route path={routes.docs} element={<Docs />} />
        <Route path={routes.roadmap} element={<Roadmap />} />
        <Route path={routes.news} element={<News />} />
        <Route path={routes.trademark} element={<Trademark />} />
        <Route path={routes.information} element={<Information />} />
        {/*<Route path={routes.audit} element={<Audit />} />*/}
        <Route path={routes.supportedToken} element={<SupportedTokens />} />
        <Route path={routes.employReferralProgram} element={<Employee />} />
        <Route path={routes.promotion} element={<Promotion />} />
        <Route path={routes.bugBountyTerms} element={<BugBountyTerms />} />
        <Route path={routes.protocol} element={<Protocol />} />
        <Route path={routes.whitelabelValidators} element={<WhitelabelValidators />} />
        <Route path={routes.chainlinkOracles} element={<ChainlinkOracles />} />
        <Route path={routes.devapipage} element={<DevApiPage />} />
        <Route path={routes.cryptoIncubator} element={<CryptoIncubator />} />
        <Route path={routes.token}>
          <Route path=":id" element={<Token />} />
        </Route>
        <Route path={routes.blog} element={<Blog />}>
          <Route path=":id" element={<Blog />} />
        </Route>
        <Route path={routes.poolInfo}>
          <Route path=":id" element={<PoolInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
