import React, { useEffect, useState } from "react"
import { Header, Footer } from "components"

import "./Terms.scss"
import imgMainBgSrc from "assets/images/space-background.webp"

export const Terms = (): JSX.Element => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="terms" style={{backgroundImage: `url(${imgMainBgSrc})`}}>
      <Header />
      <div className='news-prices'>
        {
          // @ts-ignore
          (<gecko-coin-price-marquee-widget coin-ids="bitcoin,ethereum,weth,binancecoin,usd-coin,uniswap,chainlink,wrapped-bitcoin,tether,pancakeswap-token,baby-doge-coin,trust-wallet-token,stepn,coin98,aptos,optimism,matic-network,avalanche-2,arbitrum,chainlink,manta-network,fantom,dydx-chain" currency="usd"
                                            dark-mode="true"
                                                locale="en"/>)
        }
      </div>

      <div className="terms-content">
        <h1 className="terms-content-title">TERMS OF USE</h1>
        <h3 className="terms-content-subtitle">1. General</h3>
        <p className="terms-content-desc">
          These terms and conditions (“Terms”) govern the use of the Website (defined below) and the Services (defined
          below). These Terms also include any guidelines, announcements, additional terms, policies, and disclaimers
          made available or issued by us from time to time. These Terms constitute a binding and enforceable legal
          contract between(“Company”, “Cryptomesh.io Finance”, “we”, “us”) and you, an end user of the services (“you” or
          “User”) at https://Cryptomesh.io.com/ (“Services”). By accessing, using or clicking on our website (and all
          related subdomains) or its mobile applications (“Website”) or accessing, using or attempting to use the
          Services, you agree that you have read, understood, and to are bound by these Terms and that you comply with
          the requirements listed herein. If you do not agree to all of these Terms or comply with the requirements
          herein, please do not access or use the Website or the Services. In addition, when using some features of the
          Services, you may be subject to specific additional terms and conditions applicable to those features.
          <br/>
          <br/>
          We may also change, update, add or remove provisions of these Terms from time to time. Any and all
          modifications or changes to these Terms will become effective upon publication on our Website or release to
          Users. Therefore, your continued use of our Services is deemed your acceptance of the modified Terms and
          rules. If you do not agree to any changes to these Terms, please do not access or use the Website or the
          Services. We note that these Terms between you and us do not enumerate or cover all rights and obligations of
          each party, and do not guarantee full alignment with needs arising from future development. Therefore, our
          privacy policy, platform rules, guidelines and all other agreements entered into separately between you and us
          are deemed supplementary terms that are an integral part of these Terms and shall have the same legal effect.
          Your use of the Website or Services is deemed your acceptance of any supplementary terms too.
        </p>
        <h3 className="terms-content-subtitle">2. Eligibility</h3>
        <p className="terms-content-desc">
          By accessing, using, or clicking on the Cryptomesh.io website and using or attempting to use our Services, you
          represent and warrant that:
          <br/>
          (a) as an individual, legal person, or other organization, you have full legal capacity and authority to agree
          and bind yourself to these Terms;
          <br/>
          (b) you are at least 18 or are of legal age to form a binding contract under applicable laws;
          <br/>
          (c) your use of the Services is not prohibited by applicable law, and at all times compliant with applicable
          law, including but not limited to regulations on anti-money laundering, anti-corruption, and counter-terrorist
          financing (&quot;CTF&quot;);
          <br/>
          (d) you have not been previously suspended or removed from using our Services;
          <br/>
          (e) if you act as an employee or agent of a legal entity, and enter into these Terms on their behalf, you
          represent and warrant that you have all the necessary rights and authorizations to bind such legal entity; and
          <br/>
          (f) you are solely responsible for use of the Services and, if applicable, for all activities that occur on or
          through your Cryptomesh.io user account.
        </p>
        <h3 className="terms-content-subtitle">3. Identity Verification</h3>
        <p className="terms-content-desc">
          We and our affiliates may, but are not obligated to, collect and verify information about you in order to keep
          appropriate record of our users, protect us and the community from fraudulent users, and identify traces of
          money laundering, terrorist financing, fraud and other financial crimes, or for other lawful purposes.
          <br/>
          <br/>
          We may require you to provide or verify additional information before permitting you to access, use or click
          on our Website and/or use or attempt to use our use or access any Service. We may also suspend, restrict, or
          terminate your access to our Website or any or all of the Services in the following circumstances: (a) if we
          reasonably suspect you of using our Website and Services in connection with any prohibited use or business;
          (b) your use of our Website or Services is subject to any pending litigation, investigation, or government
          proceeding and/or we perceive a heightened risk of legal or regulatory non-compliance associated with your
          activity; or (c) you take any action that we deem as circumventing our controls, including, but not limited
          to, abusing promotions which we may offer from time to time.
          <br/>
          <br/>
          In addition to providing any required information, you agree to allow us to keep a record of that information
          during the period for which your account is active and within five (5) years after your account is closed. You
          also authorize us to share your submitted information and documentation to third parties to verify the
          authenticity of such information. We may also conduct necessary investigations directly or through a third
          party to verify your identity or protect you and/or us from financial crimes, such as fraud, and to take
          necessary action based on the results of such investigations. We will collect, use and share such information
          in accordance with our privacy policy.
          <br/>
          <br/>
          If you provide any information to us, you must ensure that such information is true, complete, and timely
          updated when changed. If there are any grounds for believing that any of the information you provided is
          incorrect, false, outdated or incomplete, we reserve the right to send you a notice to demand correction,
          directly delete the relevant information, and as the case may be, terminate all or part of the Services we
          provide for you. You shall be fully liable for any loss or expense caused to us during your use of the
          Services. You hereby acknowledge and agree that you have the obligation to keep all the information accurate,
          update and correct at all times.
        </p>
        <h3 className="terms-content-subtitle">4. Restrictions</h3>
        <p className="terms-content-desc">
          You shall not access, use or click on our Website and/or use or attempt to use the Services in any manner
          except as expressly permitted in these Terms. Without limiting the generality of the preceding sentence, you
          may NOT:
          <br/>
          (a) use our Website or use the Services in any dishonest or unlawful manner, for fraudulent or malicious
          activities, or in any manner inconsistent with these Terms;
          <br/>
          (b) violate applicable laws or regulations in any manner;
          <br/>
          (c) infringe any proprietary rights, including but not limited to copyrights, patents, trademarks, or trade
          secrets of Cryptomesh.io Finance;
          <br/>
          (d) use our Website or use the Services to transmit any data or send or upload any material that contains
          viruses, Trojan horses, worms, time-bombs, keystroke loggers, spyware, adware, or any other harmful programmes
          or computer code designed to adversely affect the operation of any computer software or hardware;
          <br/>
          (e) use any deep linking, web crawlers, bots, spiders or other automatic devices, programs, scripts,
          algorithms or methods, or any similar or equivalent manual processes to access, obtain, copy, monitor,
          replicate or bypass the Website or the Services;
          <br/>
          (f) make any back-up or archival copies of the Website or any part thereof, including disassembling or
          de-compilation of the Website;
          <br/>
          (g) violate public interests, public morals, or the legitimate interests of others, including any actions that
          would interfere with, disrupt, negatively affect, or prohibit other Users from using our Website and the
          Services;
          <br/>
          (h) use the Services for market manipulation (such as pump and dump schemes, wash trading, self-trading, front
          running, quote stuffing, and spoofing or layering, regardless of whether prohibited by law);
          <br/>
          (i) attempt to access any part or function of the Website without authorization, or connect to the Website or
          Services or any Company servers or any other systems or networks of any the Services provided through the
          services by hacking, password mining or any other unlawful or prohibited means;
          <br/>
          (j) probe, scan or test the vulnerabilities of the Website or Services or any network connected to the
          properties, or violate any security or authentication measures on the Website or Services or any network
          connected thereto;
          <br/>
          (k) reverse look-up, track or seek to track any information of any other Users or visitors of the Website or
          Services;
          <br/>
          (l) take any actions that imposes an unreasonable or disproportionately large load on the infrastructure of
          systems or networks of the Website or Services, or the infrastructure of any systems or networks connected to
          the Website or Services;
          <br/>
          (m) use any devices, software or routine programs to interfere with the normal operation of any transactions
          of the Website or Services, or any other person’s use of the Website or Services; or
          <br/>
          (n) forge headers, impersonate, or otherwise manipulate identification, to disguise your identity or the
          origin of any messages or transmissions you send to Cryptomesh.io Finance or the Website. By accessing the
          Services,
          you agree that we have the right to investigate any violation of these Terms, unilaterally determine whether
          you have violated these Terms, and take actions under relevant regulations without your consent or prior
          notice.
        </p>
        <h3 className="terms-content-subtitle">5. Company Services and Staking</h3>
        <p className="terms-content-desc">
          We provide a staking or deposit service in which Users can deposit their chosen cryptocurrency to receive a
          liquid staking token representing a share of a stake pool on the Cryptomesh.io platform. Users are required to
          input
          the amount of their chosen cryptocurrency to be staked on the platform by connecting our Website with their
          compatible wallet. Once the staking instructions are confirmed, the system will record such instructions and
          mint the corresponding liquid staking tokens for the User based on the platform&apos;s token ratio.
          <br/>
          <br/>
          You acknowledge that we cannot promise or guarantee a certain amount of rewards from staking your
          cryptocurrency tokens.
          <br/>
          <br/>
          You further acknowledge and agree that we have sole discretion to reject your participation in staking if you
          are unable to fulfill your identity verification requirements or for any other suspicious activity detected
          while participating on our Website and in our Services.
          <br/>
          <br/>
          In the event that you wish to unstake or withdraw your liquid staking tokens and receive the rewards, you will
          provide unstaking instructions through our Website, whereby Cryptomesh.io performs a swap using the liquidity
          pool.
          Following this swap, you will receive the equivalent amount of your original cryptocurrency according to the
          liquid staking tokens that the user instructs to convert minus a swap fee transaction. You acknowledge and
          agree that when you unstake the liquid staking tokens, the delivery time of your original cryptocurrency into
          your wallet may vary based on the time of day of the request and execution. We will also levy a withdrawing
          fee or minimum transaction amount, which will vary and be subject to amendment only at our sole discretion
          periodically.
          <br/>
          <br/>
          You acknowledge and agree that Cryptomesh.io reserves the right to amend any terms related to any specific
          staking
          protocol implemented by us at any time in our sole discretion. We shall not be liable for any losses due to
          your misunderstanding of the terms and conditions of our staking protocol terms and changes to such terms.
        </p>
        <h3 className="terms-content-subtitle">6. Termination</h3>
        <p className="terms-content-desc">
          Cryptomesh.io Finance may terminate, suspend, or modify your access to Website and/or the Services, or any
          portion
          thereof, immediately and at any point, at its sole discretion. Cryptomesh.io Finance will not be liable to you
          or to
          any third party for any termination, suspension, or modification of your access to the Services. Upon
          termination of your access to the Services, these Terms shall terminate, except for those clauses that
          expressly or are intended to survive termination or expire.
        </p>
        <h3 className="terms-content-subtitle">7. Disclaimers</h3>
        <p className="terms-content-desc">
          OUR SERVICES ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT ANY
          REPRESENTATION OR WARRANTY, WHETHER EXPRESS, IMPLIED OR STATUTORY. YOU HEREBY ACKNOWLEDGE AND AGREE THAT YOU
          HAVE NOT RELIED UPON ANY OTHER STATEMENT OR AGREEMENT, WHETHER WRITTEN OR ORAL, WITH RESPECT TO YOUR USE AND
          ACCESS OF THE SERVICES.
          <br/>
          <br/>
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTIES OF TITLE,
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND/OR NON-INFRINGEMENT. Cryptomesh.io FINANCE DOES NOT MAKE
          ANY
          REPRESENTATIONS OR WARRANTIES THAT ACCESS TO THE WEBSITE, ANY PART OF THE SERVICES, INCLUDING MOBILE SERVICES,
          OR ANY OF THE MATERIALS CONTAINED THEREIN, WILL BE CONTINUOUS, UNINTERRUPTED, TIMELY, OR ERROR-FREE AND WILL
          NOT BE LIABLE FOR ANY LOSSES RELATING THERETO. Cryptomesh.io FINANCE DOES NOT REPRESENT OR WARRANT THAT THE
          WEBSITE,
          THE SERVICES OR ANY MATERIALS OF Cryptomesh.io FINANCE ARE ACCURATE, COMPLETE, RELIABLE, CURRENT, ERROR-FREE, OR
          FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
          <br/>
          <br/>
          ANY PERFORMANCE OR NON-PERFORMANCE OF THE SERVICES, OR ANY OTHER PRODUCT, SERVICE OR OTHER ITEM PROVIDED BY OR
          ON BEHALF OF Cryptomesh.io FINANCE OR ITS AFFILIATES;
          <br/>
          (a) ANY AUTHORIZED OR UNAUTHORIZED USE OF THE WEBSITE OR SERVICES, OR IN CONNECTION WITH THIS AGREEMENT;
          <br/>
          (b) ANY INACCURACY, DEFECT OR OMISSION OF ANY DATA OR INFORMATION ON THE WEBSITE;
          <br/>
          (c) ANY ERROR, DELAY OR INTERRUPTION IN THE TRANSMISSION OF SUCH DATA;
          <br/>
          (d) ANY DAMAGES INCURRED BY ANY ACTIONS, OMISSIONS OR VIOLATIONS OF THESE TERMS BY ANY THIRD PARTIES; OR
          <br/>
          (e) ANY DAMAGE CAUSED BY ILLEGAL ACTIONS OF OTHER THIRD PARTIES OR ACTIONS WITHOUT AUTHORIZED BY Cryptomesh.io
          FINANCE.
          <br/>
          (f) EVEN IF Cryptomesh.io FINANCE KNEW OR SHOULD HAVE KNOWN OF THE POSSIBILITY OF SUCH DAMAGES AND
          NOTWITHSTANDING
          THE FAILURE OF ANY AGREED OR OTHER REMEDY OF ITS ESSENTIAL PURPOSE, EXCEPT TO THE EXTENT OF A FINAL JUDICIAL
          DETERMINATION THAT SUCH DAMAGES WERE A RESULT OF OUR GROSS NEGLIGENCE, ACTUAL FRAUD, WILLFUL MISCONDUCT OR
          INTENTIONAL VIOLATION OF LAW OR EXCEPT IN JURISDICTIONS THAT DO NOT ALLOW THE EXCLUSION OR LIMITATION OF
          INCIDENTAL OR CONSEQUENTIAL DAMAGES. THIS PROVISION WILL SURVIVE THE TERMINATION OF THESE TERMS.
          <br/>
          <br/>
          WE MAKE NO WARRANTY AS TO THE MERIT, LEGALITY OR JURIDICAL NATURE OF ANY TOKEN SOLD ON OUR PLATFORM (INCLUDING
          WHETHER OR NOT IT IS CONSIDERED A SECURITY OR FINANCIAL INSTRUMENT UNDER ANY APPLICABLE SECURITIES LAWS).
        </p>
        <h3 className="terms-content-subtitle">8. Intellectual Property</h3>
        <p className="terms-content-desc">
          All present and future copyright, title, interests in and to the Services, registered and unregistered
          trademarks, design rights, unregistered designs, database rights and all other present and future intellectual
          property rights and rights in the nature of intellectual property rights that exist in or in relation to the
          use and access of the Website and the Services are owned by or otherwise licensed to Cryptomesh.io Finance.
          Subject
          to your compliance with these Terms, we grant you a non-exclusive, non-sub license, and any limited license to
          merely use or access the Website and the Services in the permitted hereunder.
          <br/>
          <br/>
          Except as expressly stated in these Terms, nothing in these Terms should be construed as conferring any right
          in or license to our or any other third party’s intellectual rights.
          <br/>
          <br/>
          If and to the extent that any such intellectual property rights are vested in you by operation of law or
          otherwise, you agree to do any and all such acts and execute any and all such documents as we may reasonably
          request in order to assign such intellectual property rights back to us.
          <br/>
          <br/>
          You agree and acknowledge that all content on the Website must not be copied or reproduced, modified,
          redistributed, used, created for derivative works, or otherwise dealt with for any other reason without being
          granted a written consent from us.
          <br/>
          <br/>
          Third parties participating on the Website may permit us to utilise trademarks, copyrighted material, and
          other intellectual property associated with their businesses. We will not warrant or represent that the
          content of the Website does not infringe the rights of any third party.
        </p>
        <h3 className="terms-content-subtitle">9. Independent Parties</h3>
        <p className="terms-content-desc">
          Cryptomesh.io Finance is an independent contractor but not an agent of you in the performance of these Terms.
          These
          Terms shall not be interpreted as facts or evidence of an association, joint venture, partnership or franchise
          between the parties.
        </p>
        <h3 className="terms-content-subtitle">10. Indemnification</h3>
        <p className="terms-content-desc">
          You agree to indemnify and hold harmless Cryptomesh.io Finance and its affiliates and their respective
          shareholders,
          members, directors, officers, employees, attorneys, agents, representatives, suppliers or contractors from and
          against any potential or actual claims, actions, proceedings, investigations, demands, suits, costs, expenses
          and damages (including attorneys’ fees, fines or penalties imposed by any regulatory authority) arising out of
          or related to:
          <br/>
          (a) your use of, or conduct in connection with, the Website or Services;
          <br/>
          (b) your breach or our enforcement of these Terms; or
          <br/>
          (c) your violation of any applicable law, regulation, or rights of any third party during your use of the
          Website or Services.
          <br/>
          <br/>
          If you are obligated to indemnify Cryptomesh.io Finance and its affiliates and their respective shareholders,
          members, directors, officers, employees, attorneys, agents, representatives, suppliers or contractors pursuant
          to these Terms, Cryptomesh.io Finance will have the right, in its sole discretion, to control any action or
          proceeding and to determine whether Cryptomesh.io Finance wishes to settle, and if so, on what terms.
          <br/>
          <br/>
          Your obligations under this indemnification provision will continue even after these Terms have expired or
          been terminated.
        </p>
        <h3 className="terms-content-subtitle">11. Confidentiality</h3>
        <p className="terms-content-desc">
          You acknowledge that the Services contain Cryptomesh.io Finance’s and its affiliates’ trade secrets and
          confidential
          information. You agree to hold and maintain the Services in confidence, and not to furnish any other person
          any confidential information of the Services or the Website. You agree to use a reasonable degree of care to
          protect the confidentiality of the Services. You will not remove or alter any of Cryptomesh.io Finance’s or its
          affiliates’ proprietary notices. Your obligations under this provision will continue even after these Terms
          have expired or been terminated.
        </p>
        <h3 className="terms-content-subtitle">12. Anti-Money Laundering</h3>
        <p className="terms-content-desc">
          Cryptomesh.io Finance expressly prohibits and rejects the use of the Website or the Services for any form of
          illicit
          activity, including money laundering, terrorist financing or trade sanctions violations. By using the Website
          or the Services, you represent that you are not involved in any such activity.
        </p>
        <h3 className="terms-content-subtitle">13. Force Majeure</h3>
        <p className="terms-content-desc">
          Cryptomesh.io Finance shall have no liability to you if it is prevented from or delayed in performing its
          obligations or from carrying on its Services and business, by acts, events, omissions or accidents beyond its
          reasonable control, including, without limitation, strikes, failure of a utility service or telecommunications
          network, act of God, war, riot, civil commotion, malicious damage, compliance with any law or governmental
          order, rule, regulation, or direction.
        </p>
        <h3 className="terms-content-subtitle">14. Jurisdiction and Governing Law</h3>
        <p className="terms-content-desc">
          The parties shall attempt in good faith to mutually resolve any and all disputes, whether of law or fact, and
          of any nature whatsoever arising from or with respect to these Terms. These Terms and any dispute or claim
          arising out of or in connection with the Services or the Website shall be governed by, and construed in
          accordance with, the laws of the British Virgin Islands.
          <br/>
          <br/>
          Any dispute that is not resolved after good faith negotiations may be referred by either party for final,
          binding resolution by arbitration under the arbitration rules of the Hong Kong International Arbitration
          Centre (“HKIAC”) under the HKIAC Administered Arbitration Rules in force when the notice of arbitration is
          submitted. The law of this arbitration clause shall be Hong Kong law. The seat of arbitration shall be Hong
          Kong. The number of arbitrators shall be one (1). The arbitration proceedings shall be conducted in English.
          <br/>
          <br/>
          Any Dispute arising out of or related to these Terms is personal to you and us and will be resolved solely
          through individual arbitration and will not be brought as a class arbitration, class action or any other type
          of representative proceeding. There will be no class arbitration or arbitration in which an individual
          attempts to resolve a dispute as a representative of another individual or group of individuals. Further, a
          dispute cannot be brought as a class or other type of representative action, whether within or outside of
          arbitration, or on behalf of any other individual or group of individuals.
        </p>
        <h3 className="terms-content-subtitle">15. Severability</h3>
        <p className="terms-content-desc">
          If any provision of these Terms is determined by any court or other competent authority to be unlawful or
          unenforceable, the other provisions of these Terms will continue in effect.
          <br/>
          <br/>
          If any unlawful or unenforceable provision would be lawful or enforceable if part of it were deleted, that
          part will be deemed to be deleted, and the rest of the provision will continue in effect (unless that would
          contradict the clear intention of the clause, in which case the entirety of the relevant provision will be
          deemed to be deleted).
        </p>
        <h3 className="terms-content-subtitle">16. Notices</h3>
        <p className="terms-content-desc">
          All notices, requests, demands, and determinations for us under these Terms (other than routine operational
          communications) shall be sent to{" "}
          <a href="mailto:support@arclaim.com" target="_blank" rel="noopener noreferrer">
            support@arclaim.com
          </a>
        </p>
        <h3 className="terms-content-subtitle">17. Assignment</h3>
        <p className="terms-content-desc">
          You may not assign or transfer any right to use the Services or any of your rights or obligations under these
          Terms without prior written consent from Cryptomesh.io Finance, including any right or obligation related to the
          enforcement of laws or the change of control. Cryptomesh.io Finance may assign or transfer any or all of its
          rights
          or obligations under these Terms, in whole or in part, without notice or obtaining your consent or approval.
        </p>
        <h3 className="terms-content-subtitle">18. Third Party Rights</h3>
        <p className="terms-content-desc">
          No third party shall have any rights to enforce any terms contained herein.
        </p>
        <h3 className="terms-content-subtitle">19. Indemnification</h3>
        <p className="terms-content-desc">
          Any links to third party websites from our Services does not imply endorsement by us of any product, service,
          information or disclaimer presented therein, nor do we guarantee the accuracy of the information contained on
          them. If you suffer loss from using such third party product and service, we will not be liable for such loss.
          In addition, since we have no control over the terms of use or privacy policies of third-party websites, you
          should carefully read and understand those policies.
        </p>
        <p className="terms-content-last-desc">
          BY MAKING USE OF OUR SERVICES, YOU ACKNOWLEDGE AND AGREE THAT: (A) YOU ARE AWARE OF THE RISKS ASSOCIATED WITH
          TRANSACTIONS OF ENCRYPTED OR DIGITAL TOKENS OR CRYPTOCURRENCIES WITH A CERTAIN VALUE THAT ARE BASED ON
          BLOCKCHAIN AND CRYPTOGRAPHY TECHNOLOGIES AND ARE ISSUED AND MANAGED IN A DECENTRALIZED FORM (“DIGITAL
          CURRENCIES”); (B) YOU SHALL ASSUME ALL RISKS RELATED TO THE USE OF THE SERVICES AND TRANSACTIONS OF DIGITAL
          CURRENCIES; AND (C) Cryptomesh.io FINANCE SHALL NOT BE LIABLE FOR ANY SUCH RISKS OR ADVERSE OUTCOMES. AS WITH
          ANY
          ASSET, THE VALUES OF DIGITAL CURRENCIES ARE VOLATILE AND MAY FLUCTUATE SIGNIFICANTLY AND THERE IS A
          SUBSTANTIAL RISK OF ECONOMIC LOSS WHEN PURCHASING, HOLDING OR INVESTING IN DIGITAL CURRENCIES.
        </p>
      </div>
      <Footer/>
    </div>
  )
}
