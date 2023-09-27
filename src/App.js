import { useEffect, useState } from "react";
import "./index.css";

export default function App() {
  const [bill, setBill] = useState({
    initialPrice: "",
    tip1: 0,
    tip2: 0,
    totalTip: 0,
  });
  // Inital Bill onChange
  const onBillEntry = (value) => {
    setBill({
      ...bill,
      initialPrice: value,
    });
  };

  // Service Rating onChange
  const onRateService = (value) => {
    if (!bill.tip1)
      setBill({
        ...bill,
        tip1: value / 100,
      });
    console.log(bill.tip1);
    if (bill.tip1)
      setBill({
        ...bill,
        tip2: value / 100,
      });
    console.log(bill.tip2);
  };

  // Calculate the tip after each rating is given
     useEffect(() => {
 if (bill.tip1 && bill.tip2)
     setBill({
       ...bill,
       totalTip: Math.round(((bill.tip1 + bill.tip2) / 2) * 100) / 100,
     });
     }, [bill.tip1, bill.tip2])



  // reset everything to it's initial state
  const onResetState = () => {
    setBill({
      initialPrice: "",
      tip1: 0,
      tip2: 0,
      totalTip: 0,
    });

    // changes the select tags to go back to the first value (0)
    const tip1 = document.getElementById("tip1");
    const tip2 = document.getElementById("tip2");
    tip1.value = 0;
    tip2.value = 0;
  };

  return (
    <div className="App">
      <Bill handleBillEntry={onBillEntry} bill={bill} />

      <Tip selectID="tip1" hanldeRateService={onRateService}>
        {" "}
        <span>How do you rate the service? </span>
      </Tip>

      <Tip selectID="tip2" hanldeRateService={onRateService}>
        {" "}
        <span>How does your friend rate the service? </span>
      </Tip>
      <Output
      
      // calculateTip={calculateTip}
      
      bill={bill} />
      <Reset handleReset={onResetState} />
    </div>
  );
}

// /////////
// BILL
// /////////
const Bill = ({ bill, handleBillEntry }) => {
  return (
    <div style={{ margin: "1rem 0" }}>
      <span>How much was the bill? </span>
      <input
        type="number"
        id="initial-price"
        value={bill.initialPrice}
        onChange={(e) => handleBillEntry(e.target.value)}
      />
    </div>
  );
};

// /////////
// TIP
// /////////
const Tip = ({ children, hanldeRateService, selectID }) => {
  return (
    <div style={{ margin: "1rem 0" }}>
      {children}
      <select id={selectID} onChange={(e) => hanldeRateService(e.target.value)}>
        <option></option>
        <option value={5}>Poor (5%)</option>
        <option value={10}>Average (10%)</option>
        <option value={20}>Excellent (20%)</option>
      </select>
    </div>
  );
};

// /////////
// OUTPUT
// /////////
const Output = ({ bill }) => {
  // dollar amount of tip
  let tipAmount = bill.initialPrice * bill.totalTip;
  // rounds the final price to be paid
  let finalBill =
    Math.round((Number(bill.initialPrice) + tipAmount) * 100) / 100;
  return (
    <div style={{ margin: "1rem 0" }}>
      <span>
        You pay ${finalBill} ({bill.initialPrice} + {tipAmount}) </span>
      {/* <button onClick={}>Calculate Total</button> */}
    </div>
  );
};

// /////////
// RESET
// /////////
const Reset = ({ handleReset }) => {
  return (
    <div style={{ margin: "1rem 0" }}>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

/*
Requirements/Todos
1: 4 components, 5 total (reuse one, practice children props)
  a: Bill
  b: Tip 1
  c: Tip 2
  d: Output
  e: reset

2: Will need state in parent and pass it down as props

3: Must do calulations, handle with function that contains
the setter function to alter state

4: onChange will be used so changes reflect immediately in the UI


*/
