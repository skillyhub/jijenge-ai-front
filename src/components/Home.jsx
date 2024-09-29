import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CreditScore from "./CreditScore";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPhone,
  setAnalyze,
  setService,
} from "../redux/slices/serviceSlice";
import PDFDownloadComponent from "./PdfComponent";
import { useGetMessageMutation } from "../redux/services/services";
import axios from "axios";
import { redirect } from "react-router-dom";
import LoadinComponent from "./LoadinComponent";

function Home() {
  const [smartSuggestion, setSmartSuggestion] = useState(true);
  const [quickLoan, setQuickLoan] = useState(false);
  const [financialReport, setFinancialReport] = useState(false);
  const [creditScore, setCreditScore] = useState(false);
  const [genReport, setGenReport] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [login, setLogin] = useState(true);
  const [register, setRegister] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const [requestLoanSuggestion, setRequestLoanSuggestion] = useState(null);
  const [amount, setAmount] = useState(0);
  const [lPhoneNumber, setLPhoneNumber] = useState(null);
  const [loading, setLoading] = useState({
    suggestion: false,
    loan: false,
  });

  const [getMessage, { data, isLoading, isError, error, isSuccess }] =
    useGetMessageMutation();

  const dispatch = useDispatch();
  // const phone=useSelector(selectPhone)
  const phone = useState("+250783771485");

  const saveSuggestion = (value, key) => {
    setSuggestion(value);
    localStorage.setItem(key, value);
  };

  const deleteSuggestion = (value) => {
    setSuggestion(null);
    setRequestLoanSuggestion(null);
    localStorage.removeItem(value);
  };

  const handlePhoneInput = async (e) => {
    setLoading({ ...loading, suggestion: true });
    e.preventDefault();
    // console.log("phone->",phoneNumber)
    // dispatch(setService({
    //   phone_number:phoneNumber
    // }))
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/transactions/analyze`,
        {
          phoneNumber: phoneNumber,
        }
      );
      console.log(response.data);
      setLoading({ ...loading, suggestion: false });
      saveSuggestion(response?.data?.analysis || response?.data?.msg);

      // dispatch(setAnalyze(response?.data?.analysis))
    } catch (error) {
      console.log("error", error);
      setLoading({ ...loading, suggestion: false });
    }
  };

  const requestLoansuggestion = async (e) => {
    setLoading({ ...loading, loan: true });
    e.preventDefault();
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_API_URL}/transactions/request-loan`,
        {
          phoneNumber: lPhoneNumber,
          amount: amount,
        }
      );
      setLoading({ ...loading, loan: false });
      console.log("request loan response->", response.data);
      saveSuggestion(response?.data?.analysis, "suggestion-loan");
      setRequestLoanSuggestion(response?.data?.analysis);
    } catch (error) {
      setLoading({ ...loading, loan: false });
    }
  };

  const handleRequestLoan = async (e) => {
    e.preventDefault();
    // console.log("phone->",phoneNumber)
    // dispatch(setService({
    //   phone_number:phoneNumber
    // }))
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/transactions/analyze`,
        {
          phoneNumber: phoneNumber,
        }
      );
      console.log(response.data);
      saveSuggestion(response?.data?.analysis, "suggestion");

      // dispatch(setAnalyze(response?.data?.analysis))
    } catch (error) {
      console.log("error", error);
    }
  };
  const StructuredFinancialAnalysis = ({ analysisText }) => {
    // Function to parse the analysis text
    const parseAnalysis = (text) => {
      const sections = {
        greeting: "",
        transactionSummary: "",
        loanAnalysis: "",
        recommendation: "",
      };

      // Split the text into words
      const words = text.split(/\s+/);

      // Define approximate word counts for each section
      const greetingWordCount = 30;
      const transactionSummaryWordCount = 60;
      const loanAnalysisWordCount = 30;

      // Extract greeting
      sections.greeting = words.slice(0, greetingWordCount).join(" ");

      // Extract transaction summary
      sections.transactionSummary = words
        .slice(
          greetingWordCount,
          greetingWordCount + transactionSummaryWordCount
        )
        .join(" ");

      // Extract loan analysis
      sections.loanAnalysis = words
        .slice(
          greetingWordCount + transactionSummaryWordCount,
          greetingWordCount +
            transactionSummaryWordCount +
            loanAnalysisWordCount
        )
        .join(" ");

      // Extract recommendation (remaining words)
      sections.recommendation = words
        .slice(
          greetingWordCount +
            transactionSummaryWordCount +
            loanAnalysisWordCount
        )
        .join(" ");

      return sections;
    };

    const analysisData = parseAnalysis(analysisText);

    return (
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-blue-300">
          {analysisData.greeting}
        </h2>

        <div className="space-y-4">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Transaction Summary</h3>
            <p>{analysisData.transactionSummary}</p>
          </div>

          <div className="bg-blue-900 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Loan Analysis</h3>
            <p>{analysisData.loanAnalysis}</p>
          </div>

          <div className="bg-green-800 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Recommendation</h3>
            <p>{analysisData.recommendation}</p>
          </div>
        </div>
      </div>
    );
  };

  const StyledAIResponse = ({ suggestion }) => {
    if (!suggestion) return null;

    // Function to split the text into sections
    const splitSections = (text) => {
      const sections = text.split("*").filter((s) => s.trim());
      return sections.map((s) => s.trim());
    };

    const sections = splitSections(suggestion);

    return (
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-blue-300">
          JIJENGE AI Analysis
        </h2>

        <div className="space-y-4">
          {sections.map((section, index) => {
            if (section.startsWith("Criterion")) {
              return (
                <div key={index} className="bg-gray-700 p-3 rounded">
                  <p className="font-semibold">{section}</p>
                </div>
              );
            } else if (section.startsWith("Overall")) {
              const [text, score] = section.split(":");
              return (
                <div
                  key={index}
                  className="bg-blue-900 p-3 rounded flex justify-between items-center"
                >
                  <span className="font-semibold">{text}:</span>
                  <span className="text-2xl font-bold text-green-400">
                    {score.trim()}
                  </span>
                </div>
              );
            } else if (section.toLowerCase().includes("financial advice")) {
              return (
                <div key={index} className="bg-green-800 p-3 rounded">
                  <h3 className="font-semibold text-lg mb-2">
                    Financial Advice:
                  </h3>
                  <p>{section.split(":")[1].trim()}</p>
                </div>
              );
            } else {
              return (
                <p key={index} className="text-gray-300">
                  {section}
                </p>
              );
            }
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="w-3/4 mx-auto py-10">
      {genReport && (
        <PDFDownloadComponent
          className="absolute top-[70%] right-[10%] w-[300px] mx-auto h-[150px] bg-slate-700 z-20 shadow-md"
          back={() => {
            setGenReport(false);
          }}
        />
      )}
      {phone !== "" ? (
        <div className={genReport ? "w-[80%] mx-auto" : "w-[80%] mx-auto"}>
          {creditScore ? (
            <CreditScore hide back={() => setCreditScore(false)} />
          ) : (
            <>
              <div className="mt-24 text-center flex-col flex space-y-10">
                <span className="text-5xl text-white font-bold">
                  Revolutionize Your Finances
                </span>
                <span className="text-white text-xl">
                  We help businesses analyze their overall health and assess
                  loan requests based on historical transactions.
                </span>
              </div>
              <div className="mt-24 w-3/4 mx-auto flex justify-between items-center">
                <button
                  onClick={async () => {
                    setFinancialReport(false);
                    setQuickLoan(false);
                    setSmartSuggestion(true);
                    if (suggestion) {
                      deleteSuggestion("suggestion");
                    }
                  }}
                  className={
                    smartSuggestion
                      ? "text-white text-center bg-blue-600 capitalize w-[30%] py-3 rounded-3xl"
                      : "text-white text-center cursor-pointer bg-gray-700 capitalize w-[30%] py-3 rounded-3xl"
                  }
                >
                  Business health check
                </button>
                <button
                  onClick={() => {
                    setFinancialReport(false);
                    setQuickLoan(true);
                    setSmartSuggestion(false);
                    if (requestLoanSuggestion) {
                      deleteSuggestion("suggestion-loan");
                      setRequestLoanSuggestion(null);
                    }
                  }}
                  className={
                    quickLoan
                      ? "text-white text-center bg-blue-600 capitalize w-[30%] py-3 rounded-3xl"
                      : "text-white text-center cursor-pointer bg-gray-700 capitalize w-[30%] py-3 rounded-3xl"
                  }
                >
                  Loan request analysis
                </button>
                {/* <button
                  onClick={() => {
                    setFinancialReport(true);
                    setQuickLoan(false);
                    setSmartSuggestion(false);
                    if (suggestion) {
                      deleteSuggestion("suggestion-loan");
                    }
                  }}
                  className={
                    financialReport
                      ? "text-white text-center bg-blue-600 capitalize w-[30%] py-3 rounded-3xl"
                      : "text-white text-center cursor-pointer bg-gray-700 capitalize w-[30%] py-3 rounded-3xl"
                  }
                >
                  advice financial report
                </button> */}
              </div>
              <div
                className={
                  suggestion
                    ? "w-full  bg-gray-800 p-8 rounded-md mt-10"
                    : "w-3/4 mx-auto bg-gray-800 py-16 rounded-md mt-10"
                }
              >
                {smartSuggestion ? (
                  <div
                    className={suggestion ? "w-full px-8" : "w-2/4 mx-auto "}
                  >
                    {
                      // suggestion && <p className='text-white text-xl text-justify'>{suggestion}</p>
                      <StyledAIResponse suggestion={suggestion} />
                    }
                    {!suggestion && (
                      <>
                        <input
                          placeholder="+250783771485"
                          className="w-full py-3 outline-none indent-2 bg-gray-600 rounded-md text-white"
                          onChange={(e) => {
                            setPhoneNumber(e.target?.value?.trim());
                          }}
                          required
                        />
                        <button
                          onClick={handlePhoneInput}
                          disabled={!phoneNumber}
                          className="w-full p-4 bg-blue-600 text-white text-center capitalize mt-5 rounded-md"
                        >
                          {loading.suggestion ? <LoadinComponent /> : "check"}
                        </button>
                      </>
                    )}
                  </div>
                ) : quickLoan ? (
                  <div
                    className={
                      requestLoanSuggestion ? "w-full px-8" : "w-2/4 mx-auto "
                    }
                  >
                    {/* {requestLoanSuggestion && (
                      <span className="text-white text-xl text-justify">
                        {requestLoanSuggestion}
                      </span> */}
                    {requestLoanSuggestion && (
                      <StructuredFinancialAnalysis
                        analysisText={requestLoanSuggestion}
                      />
                    )}

                    {!requestLoanSuggestion && (
                      <>
                        <input
                          placeholder="Desired Loan amount"
                          className="w-full py-3 outline-none indent-2 bg-gray-600 rounded-md text-white"
                          onChange={(e) =>
                            setAmount(Number(e.target.value.trim()))
                          }
                          required
                          type="number"
                        />
                        <input
                          placeholder="Phone Number"
                          className="w-full py-3 outline-none indent-2 mt-5 bg-gray-600 rounded-md text-white"
                          onChange={(e) =>
                            setLPhoneNumber(e.target.value.trim())
                          }
                          required
                        />
                        <button
                          onClick={requestLoansuggestion}
                          className="w-full py-3 bg-blue-600 text-white text-center capitalize mt-5 rounded-md"
                        >
                          {loading.loan ? <LoadinComponent /> : "request"}
                        </button>
                      </>
                    )}
                  </div>
                ) : financialReport ? (
                  <div className="w-2/4 mx-auto">
                    <input
                      placeholder="+250783771485"
                      className="w-full py-3 outline-none indent-2 bg-gray-600 rounded-md text-white"
                      onChange={() => {}}
                      required
                      type="text"
                    />
                    <button
                      onClick={() => {
                        setGenReport(true);
                      }}
                      className="w-full py-3 bg-blue-600 text-white text-center capitalize mt-5 rounded-md"
                    >
                      generate financial report
                    </button>
                  </div>
                ) : (
                  <div className=""></div>
                )}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="w-3/4 mx-auto bg-gray-800 pt-5 pb-10 rounded-md mt-10">
          <div className="flex items-center justify-end gap-5 pr-10">
            <span
              onClick={() => {
                setLogin(true);
                setRegister(false);
              }}
              className={
                login
                  ? "text-white w-1/6 text-center bg-blue-600 py-2 font-semibold"
                  : "text-white w-1/6 text-center py-2 font-semibold"
              }
            >
              Login
            </span>
            <span
              onClick={() => {
                setLogin(false);
                setRegister(true);
              }}
              className={
                register
                  ? "text-white w-1/6 text-center bg-blue-600 py-2 font-semibold"
                  : "text-white w-1/6 text-center py-2 font-semibold"
              }
            >
              Register
            </span>
          </div>
          {login ? (
            <div className="w-2/4 mx-auto mt-16">
              <input
                placeholder="+250783771485"
                className="w-full py-3 outline-none indent-2 bg-gray-600 rounded-md text-white"
                onChange={() => {}}
                required
                type="text"
              />
              <input
                placeholder="+250783771485"
                className="w-full py-3 mt-5 outline-none indent-2 bg-gray-600 rounded-md text-white"
                onChange={() => {}}
                required
                type="text"
              />
              <button
                onClick={() => {
                  setGenReport(true);
                }}
                className="w-1/3 mx-auto py-3 bg-blue-600 text-white text-center capitalize mt-5 rounded-md"
              >
                login
              </button>
            </div>
          ) : (
            <div className="w-2/4 mx-auto mt-10">
              <input
                placeholder="business"
                className="w-full py-3 outline-none indent-2 bg-gray-600 rounded-md text-white"
                onChange={() => {}}
                required
                type="text"
              />
              <input
                placeholder="owner"
                className="w-full py-3 mt-5 outline-none indent-2 bg-gray-600 rounded-md text-white"
                onChange={() => {}}
                required
                type="text"
              />
              <input
                placeholder="email"
                className="w-full py-3 mt-5 outline-none indent-2 bg-gray-600 rounded-md text-white"
                onChange={() => {}}
                required
                type="text"
              />
              <input
                placeholder="Phone Number"
                className="w-full py-3 mt-5 outline-none indent-2 bg-gray-600 rounded-md text-white"
                onChange={() => {}}
                required
                type="text"
              />
              <input
                placeholder="Password"
                className="w-full py-3 mt-5 outline-none indent-2 bg-gray-600 rounded-md text-white"
                onChange={() => {}}
                required
                type="text"
              />
              <input
                placeholder="Confirm Password"
                className="w-full py-3 mt-5 outline-none indent-2 bg-gray-600 rounded-md text-white"
                onChange={() => {}}
                required
                type="text"
              />
              <button
                onClick={() => {
                  setGenReport(true);
                }}
                className="w-1/3 mx-auto py-3 bg-blue-600 text-white text-center capitalize mt-5 rounded-md"
              >
                Register
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
