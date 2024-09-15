import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import getOrdinalSuffix from "./DeterminSuffix";
import logo from "../assets/images/newadminlogo2.png";

//import jsPDF from "jspdf";
//import html2canvas from "html2canvas";

const LendingAgreement = (props) => {
  const { data, isClick, setisbtnclick } = props;
  const [business, setbusiness] = useState([]);
  const [settings, setsettings] = useState(0);
  const [finance, setfinance] = useState([]);
  const [interest, setinterest] = useState([]);
  // console.log(settings);

  const { state } = useLocation();
  //console.log(state);
  /**
  useEffect(() => {
    if (isClick === true) {
      const handleDownload = () => {
        // Create a new jsPDF instance
        const input = document.getElementById("page-content");

        html2canvas(input).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF();
          pdf.addImage(imgData, "PNG", 0, 0);
          pdf.save("download.pdf");
          setisbtnclick(false);
        });
      };
      handleDownload();
    }
  }, [isClick]);
  */
  useEffect(() => {
    const getBusinessDetails = async () => {
      await axios
        .get(`/v1/admin/get-full-business-details/${data.business._id}`)
        .then((res) => {
          // console.log(res);
          setbusiness(res.data.data.business);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    getBusinessDetails();
  }, []);
  useEffect(() => {
    const fetchSettings = async () => {
      await axios
        .get(`/v1/admin/setting`)
        .then((res) => {
          //   console.log(res);
          setsettings(
            state.customtype === "Credit Line"
              ? res.data.data.financeCreditLineInterest
              : state.customtype === "Factoring"
              ? res.data.data.financeInvoiceInterest
              : res.data.data.financeWorkingCapitalInterest
          );
        })
        .catch((e) => {
          console.log(e);
        });
    };

    fetchSettings();
  }, []);
  // console.log(finance);
  useEffect(() => {
    const fecthFinance = async () => {
      if (state.customtype === "Credit Line") {
        await axios
          .get(`/v1/admin/get-single-finance-credit-line/${state._id}`)
          .then((res) => {
            //  console.log(res);
            setfinance(res.data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (state.customtype === "Factoring") {
        await axios
          .get(`/v1/admin/get-single-finance-invoice/${state._id}`)
          .then((res) => {
            //  console.log(res);
            setfinance(res.data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        await axios
          .get(`/v1/admin/get-single-finance-trade-credit/${state._id}`)
          .then((res) => {
            //  console.log(res);
            setfinance(res.data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    };
    fecthFinance();
  }, []);
  const getCurrency = (value) => {
    if (value === "NGN") {
      return "₦";
    } else if (value === "USD") {
      return "$";
    } else if (value === "GBP") {
      return "£";
    } else {
      return "€";
    }
  };
  const getCurrencyInWords = (value) => {
    if (value === "NGN") {
      return "Naira";
    } else if (value === "USD") {
      return "Dollar";
    } else if (value === "GBP") {
      return "Pounds";
    } else {
      return "Euro";
    }
  };
  function numberToWords(number) {
    const units = [
      "",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ];
    const teens = [
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ];
    const tens = [
      "",
      "",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ];

    const scales = ["", "thousand", "million", "billion", "trillion"];

    if (number === 0) return "zero";

    let result = "";

    for (let i = 0; number > 0; i++) {
      if (number % 1000 !== 0) {
        result = `${numberToWordsHelper(number % 1000)} ${scales[i]} ${result}`;
      }
      number = Math.floor(number / 1000);
    }

    return result.trim();
  }

  function numberToWordsHelper(number) {
    const units = [
      "",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ];
    const teens = [
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ];
    const tens = [
      "",
      "",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ];

    let result = "";

    const hundred = Math.floor(number / 100);
    const ten = Math.floor((number % 100) / 10);
    const unit = number % 10;

    if (hundred > 0) {
      result += `${units[hundred]} hundred `;
    }

    if (ten > 1) {
      result += `${tens[ten]} `;
      if (unit !== 0) {
        result += `${units[unit]} `;
      }
    } else if (ten === 1) {
      result += `${teens[unit]} `;
    } else if (unit !== 0) {
      result += `${units[unit]} `;
    }

    return result.trim();
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <>
      <div style={{ width: "100%", backgroundColor: "#fff" }}>
        <div style={{ maxWidth: 592, width: "100%", margin: "0 auto" }}>
          <div style={{ width: "100%" }} id="page-content">
            <div style={{ width: "100%", maxWidth: 592 }}>
              <div
                style={{
                  width: "100%",
                  display: "inline-block",
                  padding: "24px 32px 24px 32px",
                  boxSizing: "border-box",
                }}
              >
                <div style={{ width: "50%", float: "left" }}>
                  <img src={logo} width="140px" />
                </div>
                <div
                  style={{
                    float: "right",
                    marginTop: 10,
                    fontSize: 20,
                    fontWeight: 500,
                    color: "#101828",
                  }}
                >
                  <b> AGREEMENT</b>
                </div>
              </div>
              <div
                style={{ width: "100%", height: 4, background: "#6F00FF" }}
              ></div>
              <div
                style={{
                  padding: "24px 32px 24px 32px",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    color: "#6F00FF",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  LENDING SERVICES AGREEMENT
                </div>
                <div
                  style={{
                    fontSize: 14,
                    lineHeight: "19.6px",
                    padding: "16px 0",
                  }}
                >
                  <b>THIS LENDING SERVICES AGREEMENT (“Agreement”)</b> is made
                  this
                  <b> {getOrdinalSuffix(new Date().getDate())} </b>
                  day of
                  <b>
                    {" "}
                    {months[new Date().getMonth()]} {new Date().getFullYear()}
                  </b>
                  .
                </div>
                <div>
                  <b> BETWEEN</b>
                </div>
                <div
                  style={{
                    fontSize: 14,
                    lineHeight: "19.6px",
                    padding: "16px 0",
                  }}
                >
                  <b> TRADEVU TECHNOLOGY LIMITED,</b> a company registered under
                  the laws of the Federal Republic of Nigeria and having its
                  business address at 42 Montgomery Road Yaba Lagos (hereinafter
                  referred to as “the Lender” which expression shall where the
                  context so admits include its assigns and successors-in-title)
                  of the first part;
                </div>
                <div>
                  <b> AND</b>
                </div>
                <div
                  style={{
                    fontSize: 14,
                    lineHeight: "19.6px",
                    padding: "16px 0",
                  }}
                >
                  <p>
                    {" "}
                    <b
                      style={{
                        textTransform: "uppercase",
                      }}
                    >
                      {" "}
                      {business?.name}
                    </b>
                    , a company registered under the laws of the Federal{" "}
                  </p>
                  <p>
                    Republic of Nigeria and having its business address at{" "}
                    <b
                      style={{
                        textTransform: "uppercase",
                      }}
                    >
                      {" "}
                      {business?.address}
                    </b>
                  </p>
                  <p>
                    (hereinafter referred to as the <b>“Borrower”</b> which
                    expression shall where the context so admits include its
                    successors-in-title and assigns) of the second part;
                  </p>
                  <p>
                    The Lender and the Borrower shall both be referred to as the{" "}
                    <b>“Parties”</b> and each a <b>“Party”</b> as stated
                    hereunder.
                  </p>
                </div>
                <div>
                  <b>WHEREAS:</b>
                </div>
                <div
                  style={{
                    fontSize: 14,
                    lineHeight: "19.6px",
                    padding: "16px 0",
                  }}
                >
                  <ol>
                    <li
                      style={{
                        listStyle: "lower-alpha",
                        lineHeight: "19.6px",
                        paddingBottom: 10,
                      }}
                    >
                      The Lender carries on business of financial services,
                      technology, and software solutions.
                    </li>
                    {/**
                    <li
                      style={{
                        listStyle: "lower-alpha",
                        lineHeight: "19.6px",
                        paddingBottom: 10,
                      }}
                    >
                      The Borrower carries on the business of{" "}
                      <b>{data.userType}</b>
                    </li>
                    */}
                    <li
                      style={{
                        listStyle: "lower-alpha",
                        lineHeight: "19.6px",
                        paddingBottom: 10,
                      }}
                    >
                      The borrower is desirous of securing Supply Chain Finance
                      in the sum of{" "}
                      <b>
                        {getCurrency(data.currency)}
                        {parseFloat(
                          finance?.loanAmount === undefined
                            ? finance.requestedAmount
                            : finance?.loanAmount
                        ).toLocaleString()}
                      </b>{" "}
                      (hereinafter known as the "Loan Amount")
                    </li>
                    <li
                      style={{
                        listStyle: "lower-alpha",
                        lineHeight: "19.6px",
                        paddingBottom: 10,
                      }}
                    >
                      To meet the financing demands of the business, the
                      Borrower has approached the Lender to provide the
                      necessary credit facility highlighted in this Agreement.
                    </li>
                    <li
                      style={{
                        listStyle: "lower-alpha",
                        lineHeight: "19.6px",
                        paddingBottom: 10,
                      }}
                    >
                      The Parties wish to set out in this Agreement the terms
                      and conditions that will govern the repayment of the
                      invested sum.
                    </li>
                  </ol>
                </div>
                <div>
                  <b>IT IS HEREBY AGREED AS FOLLOWS:</b>
                </div>
                <div style={{ padding: "16px 0" }}>
                  <b>1. DEFINITIONS AND INTERPRETATION</b>
                </div>
                <div>
                  <b>1.1 Definitions</b>
                </div>
                <div
                  style={{
                    width: "100%",
                    fontSize: 14,
                    lineHeight: "19.6px",
                    padding: "16px 0",
                    paddingLeft: 20,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      paddingBottom: 10,
                    }}
                  >
                    <div>1.1.1</div>
                    <div style={{ marginLeft: 10 }}>
                      <b> “Account(s)”</b> means and includes the Borrower’s
                      Tradevu account and 2 (Two) of its other operational
                      business bank accounts which shall be used to determine
                      its debt capacity and credit worthiness.
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      paddingBottom: 10,
                    }}
                  >
                    <div>1.1.2</div>
                    <div style={{ marginLeft: 10 }}>
                      <b> “Agreement”</b> means this Lending Service Agreement;
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      paddingBottom: 10,
                    }}
                  >
                    <div>1.1.3</div>
                    <div style={{ marginLeft: 10 }}>
                      <b> “Event of Default”</b> means each of the events set
                      out in Clause 4 of this Agreement.
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      paddingBottom: 10,
                    }}
                  >
                    <div>1.1.4</div>
                    <div style={{ marginLeft: 10 }}>
                      <b> “Loan”</b> means the total requested sum by the
                      Borrower.
                    </div>
                  </div>
                </div>
                <div style={{ padding: "16px 0" }}>
                  <b>
                    1.2 Interpretation (unless the context otherwise requires):
                  </b>
                </div>
                <div
                  style={{
                    width: "100%",
                    fontSize: 14,
                    lineHeight: "19.6px",
                    padding: "16px 0",
                    paddingLeft: 20,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      paddingBottom: 10,
                    }}
                  >
                    <div>1.2.1</div>
                    <div style={{ marginLeft: 10 }}>
                      The contents page, headings and sub-headings are for
                      reference and do not affect meaning.
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      paddingBottom: 10,
                    }}
                  >
                    <div>1.2.2</div>
                    <div style={{ marginLeft: 10 }}>
                      Words in the singular include the plural and vice versa.
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      paddingBottom: 10,
                    }}
                  >
                    <div>1.2.3</div>
                    <div style={{ marginLeft: 10 }}>
                      A reference to an entity or company includes its
                      directors, creditors, shareholders, subsidiaries of the
                      company, association, organization or trust (in each case
                      whether or not it is a separate legal personality).
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      paddingBottom: 10,
                    }}
                  >
                    <div>1.2.4</div>
                    <div style={{ marginLeft: 10 }}>
                      A reference to a provision of any legislation includes any
                      subordinate legislation made under it and all as amended,
                      consolidated or re-enacted from time to time.
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      paddingBottom: 10,
                    }}
                  >
                    <div>1.2.5</div>
                    <div style={{ marginLeft: 10 }}>
                      A reference to a clause is to a clause in this Agreement.
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      paddingBottom: 10,
                    }}
                  >
                    <div>1.2.6</div>
                    <div style={{ marginLeft: 10 }}>
                      A reference to this Agreement includes its schedules.
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      paddingBottom: 10,
                    }}
                  >
                    <div>1.2.7</div>
                    <div style={{ marginLeft: 10 }}>
                      Any word or phrase introduced by the words "including",
                      "include", "in particular" or any similar word or
                      expression is illustrative and is not intended to limit
                      the meaning of the related general words.
                    </div>
                  </div>
                </div>
                <div style={{ paddingTop: 16 }}>
                  <b>2.&nbsp;REQUESTED SERVICES – CREDIT FACILITY:</b>
                </div>
                <div>
                  <ul>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      <b>
                        Principal Sum – {getCurrency(data.currency)}
                        {parseFloat(
                          finance?.loanAmount === undefined
                            ? finance.requestedAmount
                            : finance?.loanAmount
                        ).toLocaleString()}{" "}
                        (
                        {numberToWords(
                          parseInt(
                            finance?.loanAmount === undefined
                              ? finance.requestedAmount
                              : finance?.loanAmount
                          )
                        )}{" "}
                        {getCurrencyInWords(data.currency)}, Only)
                      </b>
                    </li>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      <b>
                        {parseFloat(settings) * 100}% Interest Rate (per 30
                        Calendar Days){" "}
                      </b>
                      on the Principal Sum
                    </li>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      <b>1% Management Fee&nbsp;</b>
                      on the Principal Sum
                    </li>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      <b>Tenure: {finance.tenure} Calendar Days </b>
                      effectively commencing on the date the Borrower's account
                      on the Lender’s platform is credited with the Principal
                      Sum.
                    </li>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      The Management Fee of 1% shall be payable on the date the
                      Customer’s Wallet on the Tradevu Platform is credited with
                      the principal sum.
                    </li>
                  </ul>
                </div>
                <div style={{ padding: "16px 0" }}>
                  <b>3. EFFECTIVE DATE</b>
                </div>
                <div style={{ fontSize: 14 }}>
                  This Agreement shall effectively commence on the day the
                  parties execute it and shall subsist for the duration of the
                  credit tenure.
                </div>
                <div style={{ padding: "16px 0" }}>
                  <b>4. EFFECTIVE DATE</b>
                </div>
                <div style={{ fontSize: 14 }}>
                  Without prejudice to the Lender's right to demand payment of
                  any outstanding sum, or terminate this Agreement at any time
                  in line with the agreed provisions, the Principal Sum or the
                  balance for the time being outstanding including the margins
                  accruing thereto shall be accelerated, immediately become
                  payable to the Lender, and this agreement automatically
                  terminated without any notice to the Borrower, upon occurrence
                  of any of the following events:
                </div>
                <div>
                  <ol style={{ listStyleType: "lower-alpha" }}>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      If the Borrower fails to pay any sum hereunder when due
                      from it, in line with the provisions of this Agreement;
                    </li>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      If any creditor takes possession of or a receiver or other
                      similar officer is appointed for all or any part of the
                      undertaking and assets of the Borrower.
                    </li>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      If the Borrower commits any breach of this Agreement and
                      in the case of any breach capable of remedy fails to
                      remedy the breach within 5 (Five) business days of being
                      required in writing by the Lender to do so.{" "}
                    </li>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      Any Government consent required by law for the validity,
                      enforceability or legality of this Agreement and the
                      securities hereunder or the performance thereof ceases to
                      be or is not for any reason in full force and effect;{" "}
                    </li>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      If any representation or warranty made by the Borrower in
                      this Agreement or in any notice, certificate or statement
                      delivered or made hereunder proves to have been incorrect
                      or materially inaccurate when made or delivered;
                    </li>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      If the Borrower is unable to pay any of its debts within
                      the meaning of Section 571 of the Companies and Allied
                      Matters Act 2020 or any other enactment repealing or
                      amending the same;
                    </li>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      If the Borrower ceases or threatens to cease to carry on
                      its business.{" "}
                    </li>
                  </ol>
                </div>
                <div style={{ padding: "16px 0" }}>
                  <b>5. RETURN RATE AND DEFAULT CHARGES COMPUTATION</b>
                </div>
                <div>
                  <ol style={{ listStyleType: "lower-alpha" }}>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      If the Borrower does not repay the Principal Sum together
                      with the Interest Rate on the expiration of the outlined
                      tenure, the Borrower shall become indebted to the Lender
                      for both the Principal Sum and Interest Rate.{" "}
                    </li>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      In the event of a default on the payment of either the
                      Principal Sum or Interest Rate the Borrower shall
                      IMMEDIATELY&nbsp;be liable to pay the Default Rate
                      (“Penalty”) of 7% on the outstanding sum.{" "}
                    </li>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      In the same vein, upon default by the Borrower, it shall
                      IMMEDIATELY&nbsp;be liable to pay the initial agreed
                      Interest Rate of 4% on the outstanding/accumulated
                      Principal Sum, Interest Rate and Penalty. The Interest
                      Rate shall be prorated until it reaches 30 calendar days
                      that the outstanding/accumulated sum remains unpaid{" "}
                    </li>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      Any Government consent required by law for the validity,
                      enforceability or legality of this Agreement and the
                      securities hereunder or the performance thereof ceases to
                      be or is not for any reason in full force and effect;{" "}
                    </li>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      Furthermore, the initial agreed Interest Rate of 4% shall
                      continue to apply on the outstanding/accumulated sum for
                      each subsequent 30 calendar days until the Borrower fully
                      repays.{" "}
                    </li>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      The Shareholders and Directors shall be jointly and
                      severally liable in the case of a default and shall step
                      in to liquidate whatever outstanding debt is owed to the
                      lender.{" "}
                    </li>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      Furthermore, the Lender shall have an immediate right of
                      lien and automatic deduction over the monies in the
                      Borrower’s external bank accounts, which it must provide
                      upon its application on the Lender’s platform. The lien
                      shall subsist until the outstanding/ accumulated sum is
                      fully paid up.
                    </li>
                  </ol>
                </div>
                <div style={{ padding: "16px 0" }}>
                  <b>6. VOLUNTARY PRE-PAYMENT</b>
                </div>
                <div style={{ fontSize: 14 }}>
                  The Borrower may at any time before the repayment date prepay
                  the facility, in whole or in part, by giving not less than 7
                  (Seven) calendar days prior notice to the Lender, provided
                  that such pre-payment must be made on an interest payment
                  date.
                </div>
                <div style={{ padding: "16px 0" }}>
                  <b>7. WARRANTIES</b>
                </div>
                <div style={{ fontSize: 14 }}>
                  Each Party hereby warranties that it has the capacity to enter
                  into this Agreement and carry out obligations set out therein.
                </div>
                <div style={{ padding: "16px 0" }}>
                  <b>8. CONFIDENTIAL INFORMATION</b>
                </div>
                <div style={{ fontSize: 14 }}>
                  The Borrower may at any time before the repayment date prepay
                  the facility, in whole or in part, by giving not less than 7
                  (Seven) calendar days prior notice to the Lender, provided
                  that such pre-payment must be made on an interest payment
                  date.
                </div>
                <div>
                  <ol style={{ listStyleType: "lower-alpha" }}>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      <p>
                        <b>“Confidential Information”</b> is defined as any
                        information that is disclosed in connection with this
                        agreement and is furnished by a Party to the other
                        Party. Each Party shall determine in its sole discretion
                        what information and materials it shall disclose to the
                        other Party.
                      </p>
                      <p>
                        <b>“Disclosing Party”</b> shall mean the party
                        disclosing its Confidential Information.
                      </p>
                      <p>
                        <b>“Receiving Party”</b> shall mean the party receiving
                        Confidential Information from the Disclosing Party. Such
                        information shall be disclosed in one or more of the
                        following forms:
                      </p>
                      <ol type="i">
                        <li style={{ marginBottom: 10, fontSize: 14 }}>
                          Written information, including but without limitation
                          to, technical data, technology, know-how, inventions,
                          discoveries, designs, drawings, samples, devices,
                          engineering, processes, formulations and formulas,
                          models, equipment, hardware, algorithms, software
                          programs, documents, specifications, information
                          concerning research and development work, trade and
                          business secrets, configuration information, reports,
                          as well as commercial, statistical, technical or other
                          business information, disclosed by Parties to each
                          other directly or indirectly, in writing, orally, in
                          electronic form, by drawings or by inspections of
                          parts of equipment.;
                        </li>
                        <li style={{ marginBottom: 10, fontSize: 14 }}>
                          Information, including demonstrations, which is
                          furnished orally; and
                        </li>
                        <li style={{ marginBottom: 10, fontSize: 14 }}>
                          Any item of hardware, including samples, devices and
                          any other physical embodiments delivered to the
                          receiving Party.
                        </li>
                      </ol>
                    </li>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      Confidential Information does not include information
                      which:
                      <ol type="i">
                        <li style={{ marginBottom: 10, fontSize: 14 }}>
                          Is or becomes publicly known other than through a
                          breach of this Agreement by the receiving Party;
                        </li>
                        <li style={{ marginBottom: 10, fontSize: 14 }}>
                          Is already known to the receiving Party at the time of
                          disclosure as evidenced by the receiving Party's
                          written documentation;
                        </li>
                        <li style={{ marginBottom: 10, fontSize: 14 }}>
                          Is lawfully received by the receiving Party from a
                          third party without breach of this Agreement or breach
                          of any other agreement between the disclosing Party
                          and such third party;
                        </li>
                        <li style={{ marginBottom: 10, fontSize: 14 }}>
                          Is independently developed by employees of the
                          receiving Party who have not had access to or received
                          any Confidential Information under this Agreement;
                        </li>
                        <li style={{ marginBottom: 10, fontSize: 14 }}>
                          Is furnished to a third party by the disclosing Party
                          without restriction on the third party's rights to
                          disclose; or
                        </li>
                        <li style={{ marginBottom: 10, fontSize: 14 }}>
                          Is authorized in writing by the disclosing Party to be
                          released from the confidentiality obligations herein.
                        </li>
                      </ol>
                    </li>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      <p>
                        Obligations of Non-Disclosure and Non-Use: Unless
                        otherwise agreed to in advance and in writing by the
                        Disclosing party, the receiving party will not, except
                        as required by law or court order, use the Confidential
                        Information for any purpose whatsoever other than the
                        performance of the Services or disclose the Confidential
                        Information to any third party.
                      </p>
                      <p>
                        The Receiving Party may disclose the Confidential
                        Information only to those of its employees who need to
                        know such information. In addition, prior to any
                        disclosure of such Confidential Information to any such
                        employee, such employee shall be made aware of the
                        Confidential nature of the Confidential Information and
                        shall execute, or shall already be bound by, a
                        non-disclosure agreement containing terms and conditions
                        consistent with the terms and conditions of this
                        Agreement. In any event, the Receiving Party shall be
                        responsible for any breach of the terms and conditions
                        of this Agreement by any of its employees. The Receiving
                        Party shall use the same degree of care to avoid
                        disclosure of the Confidential Information as it employs
                        with respect to its own Confidential Information of like
                        importance, but not less than a reasonable degree of
                        care.
                      </p>
                    </li>
                  </ol>
                </div>
                <div style={{ padding: "16px 0" }}>
                  <b>9. DATA PROCESSING AND PROTECTION</b>
                </div>
                <div>
                  <ol type="a">
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      Parties shall at all times strictly comply with all
                      applicable Laws pertaining to the processing of personal
                      information of data subjects and data protection policies
                      and procedures which may be in force from time to time in
                      Nigeria; including but not limited to the Nigeria Data
                      Protection Regulation, 2019 and the Nigeria Data
                      Protection Act, 2023.
                    </li>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      Each Party shall ensure that all its systems and
                      operations which will be used to perform its obligations
                      under this Agreement, including all systems on which data
                      is processed, shall at all times be of a minimum standard
                      required by all applicable laws and be of a standard no
                      less than the standards which are in compliance with the
                      industry practice for the protection, control and use of
                      data.
                    </li>
                  </ol>
                </div>
                <div style={{ padding: "16px 0" }}>
                  <b>10. CESSATION AND ASSIGNMENT</b>
                </div>
                <div style={{ fontSize: 14 }}>
                  The Borrower shall not be entitled to cede or assign any or
                  all of the obligations under this Agreement except with the
                  written consent of the Lender.
                </div>
                <div style={{ padding: "16px 0" }}>
                  <b>11. RELATIONSHIP BETWEEN THE PARTIES</b>
                </div>
                <div style={{ fontSize: 14 }}>
                  Nothing in this Agreement shall imply a partnership or joint
                  venture relationship between the Parties.
                </div>
                <div style={{ padding: "16px 0" }}>
                  <b>12. GOVERNING LAW AND DISPUTE RESOLUTION</b>
                </div>
                <div>
                  <ol type="a">
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      This Agreement shall be governed by the Laws of the
                      Federal Republic of Nigeria.
                    </li>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      The Parties shall in the first instance try to resolve any
                      dispute amicably within 14 (Fourteen) calendar days by
                      mediation between authorized representatives of each
                      party.
                    </li>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      Where mediation fails, the Parties shall try to resolve
                      such dispute amicably within 30 (Thirty) calendar days
                      through Alternative Dispute Resolution (‘ADR’) by
                      submitting such dispute to the Lagos Multi-Door Court
                      House (‘LMDC’) in line with the LMDC Rules.
                    </li>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      Where ADR fails, the dispute shall be submitted to court
                      for adjudication.
                    </li>
                  </ol>
                </div>
                <div style={{ padding: "16px 0" }}>
                  <b>13. SEVERABILITY</b>
                </div>
                <div style={{ fontSize: 14 }}>
                  If any term of this Agreement is found to be invalid, such
                  invalid term shall be deemed cancelled. The cancellation of
                  the invalid term shall however not affect the validity of
                  other portions of the Agreement. The Parties agree to
                  negotiate and amend this Agreement to replace the deleted
                  clause with a clause nearly similar to the deleted clause to
                  the extent that same is valid.
                </div>
                <div style={{ padding: "16px 0" }}>
                  <b>14. MISCELLANOUS TERMS</b>
                </div>
                <div>
                  <ol type="a">
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      Prior to the commencement of this agreement, the Borrower
                      must be a registered user/customer on the Tradevu platform
                      and must have completed all the KYC (Know Your Customer)
                      and DD (Due Diligence) steps.
                    </li>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      The Borrower shall be responsible for providing all the
                      relevant information that the Lender requires for accurate
                      credit profiling.
                    </li>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      The Borrower shall provide evidence of a verifiable
                      business relationship relating to the services described
                      in Clause 2.
                    </li>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      The Borrower is required to send out E-Invoices
                      (electronic invoices) through the Borrower’s account with
                      the Lender to their end customers/businesses as an
                      additional means of loan repayment.
                    </li>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      This Agreement may be executed in any number of
                      counterparts with the same effect as if both Parties had
                      signed the same documents. All counterparts shall be
                      construed together and shall constitute one and the same
                      instrument.
                    </li>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      &nbsp;This Agreement constitutes the full and complete
                      understanding between the Parties in relation to the
                      subject matter hereof and supersedes all prior
                      negotiations, understandings and agreements with respect
                      thereto.
                    </li>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      In the event that any of the provision of this Agreement
                      is held to be unenforceable, the remaining portions of the
                      Agreement shall remain in full force and effect.
                    </li>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      This Agreement may not be altered or modified except by an
                      instrument in writing signed by both Parties, which states
                      that it is an amendment to this Agreement.
                    </li>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      The Borrower hereby agrees and covenants that by signing
                      this Agreement, the Borrower authorizes the Lender to
                      deploy direct debit and right of set off mandates, for
                      execution by the Borrower, that empower the Lender to
                      combine, consolidate or set off any outstanding balance
                      owed to the Lender under this Agreement against any credit
                      balances held by the Borrower in other financial
                      institutions in whatever currency without recourse to the
                      Borrower.
                    </li>
                  </ol>
                </div>
                <div style={{ padding: "16px 0" }}>
                  <b>15. TERMINATION</b>
                </div>
                <div style={{ fontSize: 14 }}>
                  The Parties agree that the Lender shall have a right to
                  terminate this Agreement by giving a 5 (Five) business days'
                  notice of its intention to terminate this Agreement upon the
                  occurrence of the following;
                </div>
                <div>
                  <ol type="a">
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      Where the Borrower is in breach of any of its obligations
                      or representations under this Agreement.
                    </li>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      Where the Borrower fails to repay any sum due to the
                      Lender, in line with the terms of this Agreement.
                    </li>
                    <li style={{ marginBottom: 10, fontSize: 14 }}>
                      Without prejudice to the provision of Clause 4 of this
                      Agreement, upon the occurrence of an Event of Default.
                    </li>
                  </ol>
                </div>
                <div style={{ padding: "16px 0" }}>
                  <b>16. NOTICES</b>
                </div>
                <div style={{ fontSize: 14 }}>
                  Any notice or communication to any Party shall be deemed
                  sufficiently given if it is delivered to the registered office
                  or sent by email duly addressed to the Party to whom same is
                  required to be given at the address of the Party as stated at
                  the head or executor of this Agreement or any address given by
                  such Party for the purpose of any such notice.
                </div>
                <div style={{ fontSize: 14, padding: "16px 0" }}>
                  <b>
                    IN WITNESS WHEREOF, and intending to be legally bound, the
                    Parties have duly executed this Agreement by their
                    authorized representatives as of the date first written
                    above.
                  </b>
                </div>
                <div style={{ fontSize: 14, padding: "16px 0" }}>
                  The common seal of the within named{" "}
                  <b>TRADEVU TECHNOLOGY LIMITED</b> &nbsp;is hereby affixed and
                  in the presence of:
                </div>
                <div
                  style={{
                    width: "100%",
                    justifyContent: "space-between",
                    fontSize: 14,
                    padding: "16px 0",
                    display: "flex",
                  }}
                >
                  <div>
                    <p> ______________________</p>
                    <p>
                      <b>Director (Signature &amp; Date)</b>
                    </p>
                    <p>
                      <b>Name:</b>
                    </p>
                  </div>
                  <div>
                    <p> ______________________</p>
                    <p>
                      <b>Director (Signature &amp; Date)</b>
                    </p>
                    <p>
                      <b>Name:</b>
                    </p>
                  </div>
                </div>
                <div style={{ fontSize: 14, padding: "16px 0" }}>
                  The common seal of the within named{" "}
                  <b style={{ textTransform: "uppercase" }}>{business.name}</b>{" "}
                  &nbsp;is hereby affixed and in the presence of:
                </div>
                <div
                  style={{
                    width: "100%",
                    justifyContent: "space-between",
                    fontSize: 14,
                    padding: "16px 0",
                    display: "flex",
                  }}
                >
                  <div>
                    <p> ______________________</p>
                    <p>
                      <b>Director (Signature &amp; Date)</b>
                    </p>
                    <p>
                      <b>Name:</b>
                    </p>
                  </div>
                  <div>
                    <p> ______________________</p>
                    <p>
                      <b>Director (Signature &amp; Date)</b>
                    </p>
                    <p>
                      <b>Name:</b>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LendingAgreement;
