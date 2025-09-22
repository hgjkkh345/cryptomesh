import React, { useEffect } from "react"
import {Footer, Header} from "components"

import imgMainBgSrc from "assets/images/space-background.webp"

export const Employee = (): JSX.Element => {
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
        className="terms-content-title">Employee Referral Program</h1>
        <div className="LegalDocumentContent__Legal-sc-1nv2gkj-0 OyWDD"><p>This Employee Referral Program (this
          “<b><i>Program</i></b>”), as revised or modified from time to time, is a legally binding agreement between
          Cryptomesh.io Trading Inc., a Delaware corporation (“<b><i>Cryptomesh.io</i></b>” or the “<b><i>Company</i></b>”), and you (“<b><i>Referrer</i></b>”
          and together with Cryptomesh.io, the “<b><i>Parties</i></b>”). This Program incorporates and supplements Cryptomesh.io’s Terms
          of Use, available at https://Cryptomesh.io.com/terms (the “<b><i>Terms</i></b>”), other than with respect to the
          exclusion of US Persons (as defined therein), who shall be eligible to participate in this Program, and
          Privacy Policy, available at https://Cryptomesh.io.com/privacy (the “<b><i>Privacy Policy</i></b>”), to which
          Referrer agrees that Referrer is bound and is a party, and the terms of which apply to this Program. Please
          review the Terms carefully to understand Referrer’s rights and obligations, including with respect to
          governing law, arbitration, venue for dispute resolution and other dispute resolution matters, prohibited
          activities, indemnification, disclosures and disclaimers, limitations of liability, and exclusions of
          consequential damages and other claims.</p><p>Participating in this Program indicates Referrer’s acceptance of
          this Program, as well as the Terms and the Privacy Policy, and establishes a binding and executed written
          agreement between Referrer and Cryptomesh.io. If Referrer does not accept this Program or the Terms, Referrer may not
          participate in this Program.</p>
          <ol>
            <li><p><b>Purpose and Services</b>. Cryptomesh.io is strongly committed to attracting and retaining talented
              professionals. Accordingly, Cryptomesh.io makes this Program available to Referrer for the purpose of referring
              qualified candidates (“<i><b>Candidates</b></i>”) to Cryptomesh.io (the “<i><b>Services</b></i>”).
            </p></li>
            <li><p><b>Referrer Eligibility</b>. Subject to the Terms and the preamble herein, only the following
              individuals will be eligible to participate in this Program:
            </p>
              <ol>
                <li><p>A person who is not an employee of Cryptomesh.io;</p></li>
                <li><p>A person who is of legal age in the jurisdiction in which such individual resides, and in any
                  case at least eighteen (18) years old;</p></li>
                <li><p>A person who is not associated with, employed by or a consultant of a staffing or recruiting
                  agency or other third party that is, at the time of such referral or payment for such referral,
                  providing Cryptomesh.io recruiting services;</p></li>
                <li><p>A person that is able to provide the necessary tax documentation required by the Company,
                  according to local law, and in the Company’s discretion;</p></li>
                <li><p>A person that is not foreign or domestic government official or employee;</p></li>
                <li><p>A person that has complied with all applicable laws related to participation in this Program,
                  including privacy laws and anti-bribery laws, and payment to such person does will not constitute a
                  violation of any applicable law; and</p></li>
                <li><p>A person that that is not on any economic or trade restrictions or sanctions list, or to whom
                  payment by the Company would result in any breach of the Terms.</p></li>
              </ol>
            </li>
            <li><p><b>Service Fee</b>.
            </p>
              <ol>
                <li><p>Referrer will be eligible to receive fifteen thousand U.S. dollars ($15,000) (the “<i><b>Service
                  Fee</b></i>”) ninety (90) days after the Candidate’s start date if such Candidate remains employed by
                  the Company at such date (the “<i><b>Initial Period</b></i>”), subject to the requirements herein.
                </p></li>
                <li><p>Upon successful completion of the Initial Period, Referrer will receive an email from the Company
                  confirming the status of the Candidate and requesting certain tax documentation
                </p></li>
                <li><p>Referrer will receive the Service Fee within thirty (30) days after the Initial Period and the
                  completion of any required tax forms requested by Cryptomesh.io.
                </p></li>
                <li><p>Referrer will be solely responsible for all income tax liabilities that arise from or in any way
                  relate to any Service Fee that Cryptomesh.io conveys to Referrer, including income taxes, sales, personal
                  property, use, VAT, excise, withholding and self-employment taxes. Cryptomesh.io has the right to withhold from
                  any amounts payable to Referrer such foreign, federal, state or local taxes as may be required to be
                  withheld under any applicable laws. Referrer must report the value of the benefit or reward Referrer
                  receives from Cryptomesh.io to any applicable government authority, and complete any required tax forms that
                  Cryptomesh.io requests be completed prior to receiving the Service Fee, and after receiving the Service Fee, as
                  applicable.
                </p></li>
              </ol>
            </li>
            <li><p><b>Candidate Requirements</b>. You may only refer:
            </p>
              <ol>
                <li><p>any individual who is not the Referrer or a current employee or contractor of Cryptomesh.io;
                </p></li>
                <li><p>any individual who is not subject to any non-compete agreements or any other similar agreements
                  that would prevent Cryptomesh.io from hiring such individual;
                </p></li>
                <li><p>any individual whose employment at Cryptomesh.io you are not restricted from soliciting pursuant to any
                  non-solicitation agreement or similar agreement;</p></li>
                <li><p>any individual that has not applied to a position at the Company or has not been in engaged with
                  the Company&apos;s recruiting personnel within the 180 days prior to a referral;
                </p></li>
                <li><p>the following types of individuals:
                </p>
                  <ol>
                    <li><p>an individual whom you know personally;
                    </p></li>
                    <li><p>a former coworker;
                    </p></li>
                    <li><p>immediate or extended family; or
                    </p></li>
                    <li><p>any other individual on whom you have conducted reasonable diligence and determined may be a
                      qualified candidate for the applicable position.
                    </p></li>
                  </ol>
                </li>
              </ol>
            </li>
            <li><p><b>Referral Procedures</b>.
            </p>
              <ol>
                <li><p>To submit a qualifying referral, the applicable Candidate must include the required Referrer
                  information in such Candidate’s initial communication submitted by the Candidate to the Company
                  (whether email, phone, or application).
                </p></li>
                <li><p>To ensure that an application will satisfy the requirement set forth in Section 5(a), Candidates
                  must (i)&nbsp;<b>first</b>, submit their application for a specific role at Cryptomesh.io, using this
                  link:&nbsp;<a href="https://Cryptomesh.io.com/careers">https://Cryptomesh.io.com/careers</a>.
                  (ii)&nbsp;<b>second</b>, in the application, select from the drop down that this is a “Referral” and
                  submit details (name and email) about the Referrer. Any qualifying referral information must be
                  submitted prior or in connection with the initial communication (including email or phone) between the
                  Candidate and any member of the Cryptomesh.io’s human resources department. If there are any questions, feel
                  free to reach out to&nbsp;<a href="mailto:support@arclaim.com">support@arclaim.com</a>. Any
                  qualifying referral information must be submitted prior or in connection with the initial
                  communication (including email or phone) between the Candidate and any member of the Cryptomesh.io’s human
                  resources department.
                </p></li>
                <li><p>In the event that a Candidate receives an offer from Cryptomesh.io, and thereafter accepts such offer and
                  becomes an employee of the Company, Cryptomesh.io will promptly provide notice to the Referrer of such
                  Candidate’s status, and the timeline for the Initial Period (defined above). Referrers should not
                  contact Cryptomesh.io requesting such information.

                </p></li>
                <li><p>If two or more Referrers refer the same Candidate, then only the first Referrer provided by such
                  Candidate will be eligible for the referral bonus. There is no limit to the number of referrals that a
                  Referrer can make.
                </p></li>
                <li><p>Cryptomesh.io reserves the right, in its sole discretion, to (i) review the circumstances with respect to
                  each referral and determine whether such referral, and the Referrer, qualify for a referral bonus, and
                  (ii) determine whether the Candidate will receive an offer or other consideration, including any
                  screening.
                </p></li>
                <li><p>Referrer should not submit Candidate information directly to Cryptomesh.io; any such submission of
                  personal information is potentially a violation of privacy laws, will not qualify as a referral under
                  the Program and all associated personal records will be promptly destroyed by Cryptomesh.io.
                </p></li>
              </ol>
            </li>
            <li><p><b>Termination</b>. Notwithstanding any other provision of this Program or the Terms, Cryptomesh.io reserves
              the right to terminate this Program, or limit, deny or terminate your participation in this Program in its
              sole discretion at any time without notice to you.
            </p></li>
            <li><p><b>Relationship of the Parties; Independent Contractor</b>. The relationship between the Parties is
              that of independent contractors. Nothing contained in this Agreement will be construed as creating any
              agency, partnership, joint venture or other form of joint enterprise, employment or fiduciary relationship
              between the Parties, and neither party will have authority to contract for or bind the other party in any
              manner whatsoever. You are not the agent of the Company and are not authorized to make any representation,
              warranty, contract, or commitment on behalf of the Company. You are not entitled to any of the benefits
              which the Company may make available to its employees, such as group insurance, profit-sharing or
              retirement benefits. You will be solely responsible for all tax returns and payments required to be filed
              with or made to any taxing authority with respect to your performance of the Services and receipt of fees
              under this Agreement. Nothing in this Agreement shall be deemed to either directly or indirectly create a
              relationship of an employer, agent, associate or representative between you and Company, and this
              Agreement is executed solely on a principal to principal arrangement. You agree to accept exclusive
              liability for complying with all applicable laws governing self-employed individuals, including
              obligations such as payment of taxes, social security, disability and other contributions based on any
              fees paid to you under this Agreement.
            </p></li>
            <li><p><b>Severability</b>. If any provision of this Program is invalid, illegal or unenforceable in any
              jurisdiction, such invalidity, illegality or unenforceability will not affect any other term or provision
              of this Program or invalidate or render unenforceable such term or provision in any other jurisdiction.
              Upon such determination that any term or other provision is invalid, illegal or unenforceable, Cryptomesh.io will
              in good faith modify this Program so as to effect the original intent of this Program as closely as
              possible in order that the transactions contemplated hereby be consummated as originally contemplated to
              the greatest extent possible.
            </p></li>
            <li><p><b>Jurisdiction</b>. By participating in the Program, you agree that any suit, action or proceeding
              seeking to enforce any provision of, or any matter arising out of, or in connection with this Agreement
              must be brought in the state of Delaware or such other jurisdiction as may be mutually agreed, in writing,
              by the Parties.
            </p></li>
            <li><p><b>Entire Agreement</b>. This Program, together with the Terms and Privacy Policy, constitutes the
              sole and entire agreement of the Parties with respect to the subject matter of this Program and supersedes
              all prior and contemporaneous understandings, agreements, representations and warranties, both written and
              oral, with respect to such subject matter.
            </p></li>
            <li><p><b>Assignment</b>. Cryptomesh.io may assign this Program or assign, subcontract, delegate, license or
              sublicense any or all of its rights and obligations hereunder. This Program is personal to you and cannot
              be assigned or transferred by you. Any attempted assignment or transfer in violation of this Section 11
              will be null and void.
            </p></li>
            <li><p><b>Interpretation</b>. Except to the extent otherwise provided or unless the context otherwise
              requires, for the purposes of this Program: (a) references made in this Program to a Section are
              references to a section of this Program; (b) the headings in this Program are for reference purposes only
              and do not affect in any way the meaning or interpretation of this Program; (c) whenever the words
              “include,” “includes” or “including” are used in this Program, they are deemed to be followed by the words
              “without limitation”; and (d) the use of “or” is not intended to be exclusive.
            </p></li>
            <li><p><b>Communications</b>. You consent to receive all communications, agreements, documents, receipts,
              notices and disclosures (collectively, “<i><b>Communications</b></i>”) that Cryptomesh.io provides in connection
              with this Program electronically. You agree that Cryptomesh.io may provide Communications to you by posting them on
              the Site (as defined in the Terms), by emailing them to you at the email address you provide in connection
              with providing the Services, if any, or by sending them via the Telegram channel last used between Cryptomesh.io
              and Referrer. You should maintain copies of Communications by printing a paper copy or saving an
              electronic copy. You may contact Cryptomesh.io with questions or complaints at legal@arclaim.exchange.
            </p></li>
            <li><p><b>No Equitable Remedies</b>. You will not be entitled to any equitable remedy by reason of any
              breach of this Program, and you agree not seek, any equitable relief, whether injunctive or otherwise.
            </p></li>
            <li><p><b>Other Remedies</b>. Any right or remedy of Cryptomesh.io set forth in this Program or the Terms is in
              addition to, and not in lieu of, any other right or remedy whether described in this Program or the Terms,
              under applicable law, at law, or in equity. The failure or delay of Cryptomesh.io in exercising any right, power or
              privilege under this Program or the Terms will not operate as a waiver thereof.
            </p></li>
            <li><p><b>No Third-Party Beneficiaries</b>. You agree that, except as otherwise expressly provided in this
              Program or the Terms, there will be no third-party beneficiaries to the Program or the Terms other than
              the Indemnified Parties.
            </p></li>
            <li><p><b>Conflicts</b>. In the event of a conflict between this Program and the Terms, the terms of this
              Program will govern to the extent of such conflict.
            </p></li>
            <li><p><b>Modifications</b>. Cryptomesh.io may revise or modify this Program at any time by posting the changes or
              the updated Program on the webpage on which it is displayed. Your participation in this Program after the
              date any such changes become effective constitutes your acceptance of the modified and new terms of this
              Program.
            </p></li>
            <li><p><b>Anti-Bribery</b>. You certify that, to your best knowledge, you have not violated any anti-bribery
              law, and have not been convicted of bribery, attempted bribery, or conspiracy to bribe under the laws of
              any foreign jurisdiction or state of the United States.
            </p></li>
            <li><p><b>Provision of Personal Information; Protection Thereof</b>. The Parties acknowledge and agree that
              this Agreement is not intended to require you to provide personal information, as that phrase may be
              defined by any data privacy legislation, to the Company. However, to the extent that personal information
              is provided by you to the Company, the Company agrees to comply with all applicable confidentiality
              obligations and privacy laws that govern the personal information shared or otherwise made accessible to
              Company by you. The Company further agrees to use commercially reasonable efforts to protect any personal
              information of yours that it acquires or accesses in connection with this Agreement.
            </p></li>
            <li><p><b>Surviving Terms</b>. The preamble herein and Section 6 through Section 20 and any other right or
              obligation of the Parties in this Program that, by its nature, should survive termination, expiration or
              assignment of this Program, will survive any expiration, termination or assignment of this Program.
            </p></li>
          </ol>
          <p></p></div>
      </article>
      <Footer/>
    </div>
  )
}
