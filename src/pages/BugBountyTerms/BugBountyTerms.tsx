import React, { useEffect } from "react"
import {Footer, Header} from "components"

import imgMainBgSrc from "assets/images/space-background.webp"

export const BugBountyTerms = (): JSX.Element => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="terms" style={{backgroundImage: `url(${imgMainBgSrc})`}}>
      <Header/>
      <div className='news-prices'>
        {
          // @ts-ignore
          (<gecko-coin-price-marquee-widget
            coin-ids="bitcoin,ethereum,weth,binancecoin,usd-coin,uniswap,chainlink,wrapped-bitcoin,tether,pancakeswap-token,baby-doge-coin,trust-wallet-token,stepn,coin98,aptos,optimism,matic-network,avalanche-2,arbitrum,chainlink,manta-network,fantom,Cryptomesh.io-chain"
            currency="usd"
            dark-mode="true"
            locale="en"/>)
        }
      </div>
      <article className="terms-content"><h1
        className="terms-content-title">Bug Bounty Program Terms and Conditions</h1>
        <div className="LegalDocumentContent__Legal-sc-1nv2gkj-0 OyWDD"><p>PARTICIPATION IN THE BUG BOUNTY PROGRAM IS
          SUBJECT TO COMPLIANCE WITH THE <a href="https://Cryptomesh.io.com/terms?"><u>TERMS OF USE</u></a> OF Cryptomesh.io TRADING
          INC.</p><p>These Bug Bounty Program Terms and Conditions (these “Bug Bounty Terms”) apply to, and will govern,
          all vulnerabilities that are discovered by you and reported to Cryptomesh.io Trading Inc. (“Cryptomesh.io”) in accordance with
          these Bug Bounty Terms (the “Bug Bounty Program”). In the event of a conflict between these Bug Bounty Terms
          and the <a href="https://Cryptomesh.io.com/terms?"><u>Terms of Use</u></a> of Cryptomesh.io (the “Terms of Use”), or any
          other previously published Cryptomesh.io program, the terms of these Bug Bounty Terms will govern to the extent of such
          conflict. Please read these Bug Bounty Terms carefully before you participate in the Bug Bounty Program. By
          participating in the Bug Bounty Program, you represent and agree to be bound by these Bug Bounty Terms. By
          participating in the Bug Bounty Program, you agree to the Terms of Use and the <a
            href="https://Cryptomesh.io.com/privacy?"><u>Privacy Policy</u></a> (the “Privacy Policy”). If you do not agree
          with the Terms of Use or Privacy Policy, then you should immediately stop using or accessing the Services and
          participating in the Bug Bounty Program. </p><p>Cryptomesh.io&apos;s decision with respect to paying or not paying a bug
          bounty is entirely discretionary, and shall not in any circumstance be construed as an admission or concession
          of fault or liability by Cryptomesh.io, nor shall it be construed as an endorsement by Cryptomesh.io of the accuracy of a
          description of an alleged vulnerability, alleged root causes of it, or any other information asserted by you
          or other third parties. </p><h2><b>1. ELIGIBILITY</b></h2><p>Subject to these Bug Bounty Terms, to be eligible
          to participate in the Bug Bounty Program, during the period of your participation, you must:&nbsp;</p>
          <ul>
            <li><p>be of legal age in the jurisdiction in which you reside and you must have the legal capacity to enter
              into, and be bound by, these Bug Bounty Terms if you are participating in the Bug Bounty Program as an
              individual;</p></li>
            <li><p>have the legal authority to accept these Bug Bounty Terms on the applicable entity&apos;s behalf, in which
              case “you” (except as used in this paragraph) will mean the foregoing entity if you are participating in
              the Bug Bounty Program as an entity;</p></li>
            <li><p>be the first person to report or disclose the vulnerability to Cryptomesh.io in accordance with these Bug
              Bounty Terms, including by emailing sufficient information to support@arclaim.com&nbsp;</p></li>
            <li><p>provide sufficient information to enable Cryptomesh.io to reproduce and fix the applicable vulnerability;</p>
            </li>
            <li><p>not engage in any unlawful conduct when discovering, reporting or disclosing the vulnerability to
              Cryptomesh.io, including the use of threats, demands or any other coercive tactics;</p></li>
            <li><p>not have exploited or attempted to exploit the vulnerability in any way, including by making such
              vulnerability public or by obtaining a profit or other benefit (other than a payment under the Bug Bounty
              Program);</p></li>
            <li><p>make a good faith effort to avoid privacy violations, destruction of data, interruption or
              degradation of any Services or Site (as defined in the Terms of Use), including using automated testing
              that generates significant amounts of traffic;</p></li>
            <li><p>submit only one (1) vulnerability per report or disclosure, unless you need to combine
              vulnerabilities to provide sufficient information with respect to any of the applicable
              vulnerabilities;</p></li>
            <li><p>not submit a vulnerability caused by the same underlying issue on which a payment has been provided
              under the Bug Bounty Program;&nbsp;</p></li>
            <li><p>not ask for payment in exchange for vulnerability details or dispute the applicability of the Bug
              Bounty Program to you, including the amount of any proposed or actual payment or categorization of a
              vulnerability; and</p></li>
            <li><p>not be a current or former employee (within 6 months), vendor, contractor, or agent for Cryptomesh.io, or a
              current or former&nbsp; employee (within 6 months) of any of the foregoing.</p></li>
          </ul>
          <p>Cryptomesh.io reserves the right to limit or refuse your eligibility to participate in the Bug Bounty Program for
            any reason in its sole discretion, including but not limited to where your participation is prohibited by
            any Applicable Law. If Cryptomesh.io becomes aware of any violation of these Bug Bounty Terms or the Terms of Use,
            Cryptomesh.io may elect to, among other things, (a) prohibit you from using the Services or the Site; (b) withhold,
            amend or cancel the benefits of or payments under the Bug Bounty Program; or (c) require return of any
            payment made to you, including taking any action at law to obtain such payment.</p><h2><b>2. SCOPE OF
            VULNERABILITIES</b></h2><p>The following non-exhaustive types of vulnerabilities are excluded from any
            payments with respect to the Bug Bounty Program:</p>
          <ul>
            <li><p>vulnerabilities previously known to Cryptomesh.io;&nbsp;</p></li>
            <li><p>vulnerabilities with respect to sites hosted by third parties unless such vulnerabilities lead to a
              vulnerability on the Site;</p></li>
            <li><p>vulnerabilities contingent on physical attack, social engineering, spamming, DDOS attack or other
              similar types of exploitation;</p></li>
            <li><p>vulnerabilities affecting outdated or unpatched browsers;</p></li>
            <li><p>vulnerabilities in third party applications that use Cryptomesh.io API;</p></li>
            <li><p>vulnerabilities publicly disclosed in third-party libraries or technology used in the Services or the
              Site;</p></li>
            <li><p>vulnerabilities that require an improbable level of user interaction;</p></li>
            <li><p>vulnerabilities that require rooting or jailbreaking a mobile device;&nbsp;</p></li>
            <li><p>missing security headers without proof of exploitability;</p></li>
            <li><p>suggestions on best practices;&nbsp;</p></li>
            <li><p>software version disclosure;&nbsp;</p></li>
            <li><p>front end bugs;</p></li>
            <li><p>unsophisticated or generic DDOS attacks;</p></li>
            <li><p>spamming;</p></li>
            <li><p>phishing;</p></li>
            <li><p>automated tools (github actions, aws); and</p></li>
            <li><p>compromise or misuse of third party systems or services.</p></li>
          </ul>
          <p>Cryptomesh.io reserves the right to determine whether a vulnerability is eligible for a payment under the Bug Bounty
            Program in its sole discretion.</p><h2><b>3. DISCLOSURE AND REPORTING REQUIREMENTS</b></h2><p>Any
            vulnerability discovered must be only reported to the following email: support@arclaim.com, and must
            comply with all other requirements in this Bug Bounty Program.</p><p>The vulnerability must not have been or
            be disclosed publicly or to any other persons before Cryptomesh.io has been notified, has fixed the issue, and has
            granted permission, if at all, for such disclosure. The disclosure to Cryptomesh.io must be made within twenty-four
            (24) hours following discovery of the applicable vulnerability. If similar vulnerabilities are reported
            within the applicable twenty-four (24)-hour period any payment may be split by Cryptomesh.io between such reporters,
            or may be paid to the first person to make such report, and in either case shall be determined in the sole
            discretion of Cryptomesh.io.</p><p>A detailed report of a vulnerability increases the likelihood of a payment and may
            increase the amount of such payment. Please provide as much information about the vulnerability as possible,
            including:</p>
          <ul>
            <li><p>the conditions on which reproducing the vulnerability is contingent;</p></li>
            <li><p>the steps needed to reproduce the vulnerability or, preferably, a proof of concept; and</p></li>
            <li><p>the potential implications of abusing the vulnerability.</p></li>
          </ul>
          <h2><b>4. PAYMENTS</b></h2><p>Subject to these Bug Bounty Terms, you will receive payments based on the type
            of vulnerability reported or disclosed in accordance with Exhibit A. The categorization and amount of any
            payment will be determined at the sole discretion of Cryptomesh.io, including without limitation eligibility for such
            payment, and the severity of any applicable vulnerability.</p><h2><b>5. BUG BOUNTY PROGRAM
            ADMINISTRATION</b></h2><p>Cryptomesh.io reserves the right to administer the Bug Bounty Program in its sole
            discretion:&nbsp;</p>
          <ul>
            <li><p>Cryptomesh.io hereby reserves the right to amend, suspend or terminate the Bug Bounty Program at any time with
              or without prior notice or consent. Cryptomesh.io further reserves the right to amend, withhold or cancel any Bug
              Bounty Program payments or benefits granted if Cryptomesh.io becomes aware of any violation of these Bug Bounty
              Terms or the Terms of Use.&nbsp;</p></li>
            <li><p>Administration of the Bug Bounty Program is at the sole discretion of Cryptomesh.io, subject to the Applicable
              Law(as defined in the Terms of Use). Any questions relating to eligibility, or these Bug Bounty Terms or
              the Bug Bounty Program will be resolved by Cryptomesh.io at Cryptomesh.io&apos;s sole discretion and its decision will be final
              and binding with respect thereto.&nbsp;If it is discovered by Cryptomesh.io that you have or have attempted to
              violate these Bug Bounty Terms or the Terms of Use, then Cryptomesh.io may disqualify you from any Bug Bounty
              Program payments or benefits in its sole discretion.</p></li>
            <li><p>Cryptomesh.io reserves the right to make awards that do not comply with every requirement herein, such as your
              failure to provide a detailed report of any vulnerability, or your failure to notify Cryptomesh.io through the
              correct channel.&nbsp; Awards made pursuant to such exceptions made by Cryptomesh.io do not constitute any waiver
              by Cryptomesh.io of any other terms and conditions set forth herein.&nbsp;</p></li>
          </ul>
          <h2><b>6. PRIVACY</b></h2><p>By participating in the Bug Bounty Program, you acknowledge and agree that any
            personal information that you provide will be maintained in accordance with the Privacy Policy. By
            participating in the Bug Bounty Program, you hereby (a) grant to Cryptomesh.io the right to use your name, country of
            residence, email address and any other information you provide to Cryptomesh.io (“Personal Information”) for the
            purpose of administering the Bug Bounty Program; (b) grant to Cryptomesh.io the right to use your Personal
            Information for publicity, promotional, marketing and advertising purposes relating to the Bug Bounty
            Program, in any and all media now known or hereafter devised, without further compensation unless prohibited
            by Applicable Law; and (c) acknowledge that Cryptomesh.io may disclose your Personal Information to its third-party
            agents and service providers in connection with any of the foregoing activities. Cryptomesh.io will use your Personal
            Information only for the identified purposes and as contemplated in the Privacy Policy.&nbsp; Any conflict
            between the Privacy Policy and any authorization and/or licensing provided herein shall be governed by these
            Bug Bounty Terms.</p><p>If you access any personal information or other sensitive information for which you
            do not have authority to access, then you must immediately stop accessing such information and destroy all
            copies thereof. You must not provide such information to Cryptomesh.io and must only provide Cryptomesh.io a description
            thereof.&nbsp;</p><h2><b>7. RELEASE AND PUBLICITY</b></h2><p>YOU AGREE TO RELEASE AND HOLD HARMLESS Cryptomesh.io AND
            ITS OFFICERS, DIRECTORS, EMPLOYEES, PARTNERS, AFFILIATED COMPANIES, SUBSIDIARIES, SUPPLIERS, DISTRIBUTORS,
            ADVERTISING AND PROMOTIONAL AGENCIES, AGENTS, SUCCESSORS AND ASSIGNS FROM AND AGAINST ANY CLAIM OR CAUSE OF
            ACTION ARISING OUT OF YOUR PARTICIPATION IN THE BUG BOUNTY PROGRAM AND/OR ANY DETERMINATION MADE ABOUT YOUR
            ELIGIBILITY IN THE BUG BOUNTY PROGRAM OR ANY PAYMENT THEREUNDER THAT MAY OR MAY NOT BE DUE TO YOU. YOU AGREE
            THAT Cryptomesh.io AND ITS OFFICERS, DIRECTORS, EMPLOYEES, PARTNERS, AFFILIATED COMPANIES, SUBSIDIARIES, SUPPLIERS,
            DISTRIBUTORS, ADVERTISING AND PROMOTIONAL AGENCIES, AGENTS, SUCCESSORS AND ASSIGNS ARE NOT LIABLE FOR
            INJURIES, LOSSES OR DAMAGES OF ANY KIND ARISING FROM YOUR PARTICIPATION IN THE BUG BOUNTY PROGRAM AND
            ACCEPTANCE, POSSESSION AND USE OF THE BENEFITS OR PAYMENTS RECEIVED UNDER THE BUG BOUNTY PROGRAM. Cryptomesh.io IS
            NOT RESPONSIBLE FOR ANY TYPOGRAPHICAL OR OTHER ERROR IN THE PUBLICATION OF THESE BUG BOUNTY TERMS OR
            ADMINISTRATION OF THE BUG BOUNTY PROGRAM OR ANNOUNCEMENT THEREOF.&nbsp;</p><h2><b>8. TAXES</b></h2><p>You
            will be solely responsible for all income tax liabilities that arise from or in any way relate to any
            benefit or payment that Cryptomesh.io conveys to you, including income taxes, sales, personal property, use, VAT,
            excise, withholding and self-employment taxes. Cryptomesh.io has the right to withhold from any amounts payable to
            you such foreign, federal, state or local taxes as may be required to be withheld under any Applicable Law.
            You agree to report the value of the benefit or payment you receive from Cryptomesh.io to all applicable legal and
            local authorities, and complete any required tax forms that Cryptomesh.io requests be completed prior to receiving
            your benefit or payment.&nbsp;</p><h2><b>9. GENERAL</b></h2><p>Sections 11 through 17 of the Terms of Use
            are incorporated herein by reference, and you are equally subject to those provisions <i>mutatis
              mutandis</i> with respect to these Bug Bounty Terms and the Bug Bounty Program.&nbsp;Unless the context
            expressly otherwise requires, (a) wherever the word “include,” “includes” or “including” is used, it will be
            deemed to be followed by the words “without limitation”; and (b) the word “or” is not exclusive. Cryptomesh.io may,
            without or without notice, revise these Bug Bounty Terms, including any benefits or payments, and publish
            amended versions thereof from time to time. Your participation or continued participation in the Bug Bounty
            Program constitute your acceptance of any amendments to these Bug Bounty Terms. Cryptomesh.io may, in its sole
            discretion, amend or terminate the Bug Bounty Program at any time with or without notice, and your continued
            use of the Cryptomesh.io platform or participation in the Bug Bounty Program after such amendment shall constitute
            acceptance of all amended terms.</p><h2><b><u>EXHIBIT A</u></b></h2><h2><b>BUG BOUNTY PAYMENTS&nbsp;</b>
          </h2>
          <table>
            <tbody>
            <tr>
              <td><p><b>Type of Vulnerability</b></p></td>
              <td><p><b>Payment Range (USD Coin (USDC/USDT))</b></p></td>
            </tr>
            <tr>
              <td><p>Very Low Severity, Ineligible Reports, etc.</p></td>
              <td><p>To be determined in Cryptomesh.io&apos;s sole discretion.</p></td>
            </tr>
            <tr>
              <td><p>Low Severity</p></td>
              <td><p>1,000</p></td>
            </tr>
            <tr>
              <td><p>Medium Severity</p></td>
              <td><p>1,000 – 5,000</p></td>
            </tr>
            <tr>
              <td><p>High Severity</p></td>
              <td><p>5,000 – 20,000</p></td>
            </tr>
            <tr>
              <td><p>Critical Severity</p></td>
              <td><p>Up to 100,000</p></td>
            </tr>
            </tbody>
          </table>
          <p>
          </p></div>
      </article>
      <Footer/>
    </div>
  )
}
