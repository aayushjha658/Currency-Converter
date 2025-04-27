import React, { useEffect, useState } from 'react';
import './App.css';

const currencyToCountry = {
  USD: 'US',
  AED: 'AE',
  AFN: 'AF',
  ALL: 'AL',
  AMD: 'AM',
  ANG: 'CW',
  AOA: 'AO',
  ARS: 'AR',
  AUD: 'AU',
  AWG: 'AW',
  AZN: 'AZ',
  BAM: 'BA',
  BBD: 'BB',
  BDT: 'BD',
  BGN: 'BG',
  BHD: 'BH',
  BIF: 'BI',
  BMD: 'BM',
  BND: 'BN',
  BOB: 'BO',
  BRL: 'BR',
  BSD: 'BS',
  BTN: 'BT',
  BWP: 'BW',
  BYN: 'BY',
  BZD: 'BZ',
  CAD: 'CA',
  CDF: 'CD',
  CHF: 'CH',
  CLP: 'CL',
  CNY: 'CN',
  COP: 'CO',
  CRC: 'CR',
  CUP: 'CU',
  CVE: 'CV',
  CZK: 'CZ',
  DJF: 'DJ',
  DKK: 'DK',
  DOP: 'DO',
  DZD: 'DZ',
  EGP: 'EG',
  ERN: 'ER',
  ETB: 'ET',
  EUR: 'EU',
  FJD: 'FJ',
  FKP: 'FK',
  FOK: 'FO',
  GBP: 'GB',
  GEL: 'GE',
  GGP: 'GG',
  GHS: 'GH',
  GIP: 'GI',
  GMD: 'GM',
  GNF: 'GN',
  GTQ: 'GT',
  GYD: 'GY',
  HKD: 'HK',
  HNL: 'HN',
  HRK: 'HR',
  HTG: 'HT',
  HUF: 'HU',
  IDR: 'ID',
  ILS: 'IL',
  IMP: 'IM',
  INR: 'IN',
  IQD: 'IQ',
  IRR: 'IR',
  ISK: 'IS',
  JEP: 'JE',
  JMD: 'JM',
  JOD: 'JO',
  JPY: 'JP',
  KES: 'KE',
  KGS: 'KG',
  KHR: 'KH',
  KID: 'KI',
  KMF: 'KM',
  KRW: 'KR',
  KWD: 'KW',
  KYD: 'KY',
  KZT: 'KZ',
  LAK: 'LA',
  LBP: 'LB',
  LKR: 'LK',
  LRD: 'LR',
  LSL: 'LS',
  LYD: 'LY',
  MAD: 'MA',
  MDL: 'MD',
  MGA: 'MG',
  MKD: 'MK',
  MMK: 'MM',
  MNT: 'MN',
  MOP: 'MO',
  MRU: 'MR',
  MUR: 'MU',
  MVR: 'MV',
  MWK: 'MW',
  MXN: 'MX',
  MYR: 'MY',
  MZN: 'MZ',
  NAD: 'NA',
  NGN: 'NG',
  NIO: 'NI',
  NOK: 'NO',
  NPR: 'NP',
  NZD: 'NZ',
  OMR: 'OM',
  PAB: 'PA',
  PEN: 'PE',
  PGK: 'PG',
  PHP: 'PH',
  PKR: 'PK',
  PLN: 'PL',
  PYG: 'PY',
  QAR: 'QA',
  RON: 'RO',
  RSD: 'RS',
  RUB: 'RU',
  RWF: 'RW',
  SAR: 'SA',
  SBD: 'SB',
  SCR: 'SC',
  SDG: 'SD',
  SEK: 'SE',
  SGD: 'SG',
  SHP: 'SH',
  SLE: 'SL',
  SLL: 'SL',
  SOS: 'SO',
  SRD: 'SR',
  SSP: 'SS',
  STN: 'ST',
  SYP: 'SY',
  SZL: 'SZ',
  THB: 'TH',
  TJS: 'TJ',
  TMT: 'TM',
  TND: 'TN',
  TOP: 'TO',
  TRY: 'TR',
  TTD: 'TT',
  TVD: 'TV',
  TWD: 'TW',
  TZS: 'TZ',
  UAH: 'UA',
  UGX: 'UG',
  UYU: 'UY',
  UZS: 'UZ',
  VES: 'VE',
  VND: 'VN',
  VUV: 'VU',
  WST: 'WS',
  XAF: 'CM',
  XCD: 'AG',
  XCG: 'CW', // Not a standard one, assuming Curacao
  XDR: 'IMF',
  XOF: 'BJ',
  XPF: 'PF',
  YER: 'YE',
  ZAR: 'ZA',
  ZMW: 'ZM',
  ZWL: 'ZW',
};

function App() {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [result, setResult] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://v6.exchangerate-api.com/v6/aafa5242bc1d621e0c273692/latest/USD')
      .then(res => res.json())
      .then(data => {
        if (data.result === "success") {
          setRates(data.conversion_rates);
          setLoading(false);
        } else {
          alert("Failed to fetch currency data!");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert("Error fetching currency data!");
      });
  }, []);

  useEffect(() => {
    if (Object.keys(rates).length > 0) {
      convert();
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  const convert = () => {
    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];
    if (fromRate && toRate) {
      setResult((amount / fromRate) * toRate);
    }
  };

  const getFlagUrl = (currencyCode) => {
    const countryCode = currencyToCountry[currencyCode];
    if (countryCode) {
      return `https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`;
    }
    return null;
  };

  if (loading) {
    return <div className="App"><h2>Loading...</h2></div>;
  }

  return (
    <div className="container">
      {/* Left box with India flag */}
      {/* <div className="left-box">
        <img src="https://flagcdn.com/96x72/in.png" alt="India" className="india-flag" />
      </div> */}

      {/* Right content */}
      <div className="App">
        <h1>Currency Converter</h1>

        <div className="converter">
  <input
    type="number"
    value={amount}
    onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
    className="input-field"
  />

  <div className="currency-flag-box">
    <img src={getFlagUrl(fromCurrency)} alt={fromCurrency} className="currency-flag" />
    <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className="select-field">
      {Object.keys(rates).map((currency) => (
        <option key={currency} value={currency}>{currency}</option>
      ))}
    </select>
  </div>

  <span> to </span>

  <div className="currency-flag-box">
    <img src={getFlagUrl(toCurrency)} alt={toCurrency} className="currency-flag" />
    <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className="select-field">
      {Object.keys(rates).map((currency) => (
        <option key={currency} value={currency}>{currency}</option>
      ))}
    </select>
  </div>

  <h2>Result: {result.toFixed(2)} {toCurrency}</h2>
</div>


        {/* Flag images below select dropdown */}
        <div className="flags-container">
          <img src={getFlagUrl(fromCurrency)} alt={fromCurrency} className="currency-flag" />
          <span> ➡️ </span>
          <img src={getFlagUrl(toCurrency)} alt={toCurrency} className="currency-flag" />
        </div>
      </div>
    </div>
  );
}

export default App;
