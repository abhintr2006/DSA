import { useState, useEffect } from "react";
import { PROGRAM_MENUS } from "../data/constants";

export const useProgramSimulator = (activeView: string) => {
  const [programOutput, setProgramOutput] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  // States for various programs
  const [calendarData, setCalendarData] = useState<any[]>([]);
  const [numDays, setNumDays] = useState(0);
  const [stringMatchData, setStringMatchData] = useState({
    mainString: "",
    patternString: "",
    replaceString: "",
  });
  const [stackElements, setStackElements] = useState<number[]>([]);
  const [stackTop, setStackTop] = useState(-1);
  const [cqElements, setCqElements] = useState<string[]>(new Array(5).fill(""));
  const [cqFront, setCqFront] = useState(-1);
  const [cqRear, setCqRear] = useState(-1);
  const cqSize = 5;
  const [bstRoot, setBstRoot] = useState<any>(null);
  const [hashTable, setHashTable] = useState<(number | null)[]>(new Array(10).fill(null));

  const resetProgramState = () => {
    setProgramOutput([]);
    setUserInput("");
    setCurrentStep(0);
    setCalendarData([]);
    setNumDays(0);
    setStringMatchData({
      mainString: "",
      patternString: "",
      replaceString: "",
    });
    setStackElements([]);
    setStackTop(-1);
    setCqElements(new Array(5).fill(""));
    setCqFront(-1);
    setCqRear(-1);
    setBstRoot(null);
    setHashTable(new Array(10).fill(null));
  };

  useEffect(() => {
    if (activeView.startsWith("program")) {
      resetProgramState();
      if (PROGRAM_MENUS[activeView]) {
        setProgramOutput(PROGRAM_MENUS[activeView]);
      } else {
        setProgramOutput([
          `--- ${activeView.replace("program", "Program ")} ---`,
          "Enter input to start:",
        ]);
      }
    }
  }, [activeView]);

  // --- Logic Helpers ---

  // Program 4
  const prec = (symb: string): number => {
    switch (symb) {
      case "#": return -1;
      case "(":
      case ")": return 0;
      case "+":
      case "-": return 1;
      case "*":
      case "/":
      case "%": return 2;
      case "^":
      case "$": return 3;
      default: return -1;
    }
  };

  const evaluateInfixToPostfix = (infixExpr: string) => {
    let result = "";
    const newStack = ["#"];
    for (let i = 0; i < infixExpr.length; i++) {
      const symb = infixExpr[i];
      if (symb === "(") newStack.push(symb);
      else if (symb === ")") {
        while (newStack[newStack.length - 1] !== "(") result += newStack.pop();
        newStack.pop();
      } else if (["+", "-", "*", "/", "%", "^", "$"].includes(symb)) {
        while (prec(newStack[newStack.length - 1]) >= prec(symb)) result += newStack.pop();
        newStack.push(symb);
      } else result += symb;
    }
    while (newStack.length > 1) result += newStack.pop();
    return result;
  };

  // Program 5A
  const evaluateSuffix = (suffix: string) => {
    const stack: number[] = [];
    for (let i = 0; i < suffix.length; i++) {
      const char = suffix[i];
      if (!isNaN(parseInt(char))) stack.push(parseInt(char));
      else {
        const op2 = stack.pop()!;
        const op1 = stack.pop()!;
        switch (char) {
          case "+": stack.push(op1 + op2); break;
          case "-": stack.push(op1 - op2); break;
          case "*": stack.push(op1 * op2); break;
          case "/": stack.push(op1 / op2); break;
          case "%": stack.push(op1 % op2); break;
          case "^": stack.push(Math.pow(op1, op2)); break;
        }
      }
    }
    return stack.pop();
  };

  // Program 5B
  const towerOfHanoi = (n: number, from: string, to: string, aux: string, output: string[] = []) => {
    if (n === 0) return output;
    towerOfHanoi(n - 1, from, aux, to, output);
    output.push(`Move disk ${n} from ${from} to ${to}`);
    towerOfHanoi(n - 1, aux, to, from, output);
    return output;
  };

  // BST
  const insertBST = (root: any, val: number): any => {
    if (!root) return { val, left: null, right: null };
    if (val < root.val) root.left = insertBST(root.left, val);
    else root.right = insertBST(root.right, val);
    return root;
  };

  const inorder = (root: any, res: number[] = []) => {
    if (root) {
      inorder(root.left, res);
      res.push(root.val);
      inorder(root.right, res);
    }
    return res;
  };

  // --- Action Handlers ---

  const handleInputSubmit = () => {
    const choice = parseInt(userInput);
    
    switch (activeView) {
      case "program1":
        if (currentStep === 0) {
          const days = parseInt(userInput);
          if (isNaN(days) || days <= 0) {
            setProgramOutput([...programOutput, "Please enter a valid number of days."]);
            return;
          }
          setNumDays(days);
          setProgramOutput([...programOutput, `Enter the number of days in the week: ${days}`]);
          setCurrentStep(1);
          setCalendarData([]);
        } else {
          const dayIndex = Math.floor((currentStep - 1) / 3);
          const inputType = (currentStep - 1) % 3;
          const newCalendarData = [...calendarData];
          if (!newCalendarData[dayIndex]) newCalendarData[dayIndex] = {};
          
          if (inputType === 0) {
            newCalendarData[dayIndex].dayName = userInput;
            setProgramOutput([...programOutput, `Enter the day name: ${userInput}`]);
          } else if (inputType === 1) {
            newCalendarData[dayIndex].date = parseInt(userInput);
            setProgramOutput([...programOutput, `Enter the date: ${userInput}`]);
          } else {
            newCalendarData[dayIndex].activity = userInput;
            setProgramOutput([...programOutput, `Enter the activity for the day: ${userInput}`]);
            if (dayIndex === numDays - 1) {
              setProgramOutput(prev => [
                ...prev,
                "\nWeek's Activity Details:",
                ...newCalendarData.map((day, i) => `Day ${i + 1}:\nDay Name: ${day.dayName}\nDate: ${day.date}\nActivity: ${day.activity}\n`)
              ]);
              setCurrentStep(-1);
              return;
            }
          }
          setCalendarData(newCalendarData);
          setCurrentStep(currentStep + 1);
        }
        break;

      case "program2":
        if (currentStep === 0) {
          setStringMatchData(prev => ({ ...prev, mainString: userInput }));
          setProgramOutput([...programOutput, `Enter the main string: ${userInput}`]);
        } else if (currentStep === 1) {
          setStringMatchData(prev => ({ ...prev, patternString: userInput }));
          setProgramOutput([...programOutput, `Enter the pat string: ${userInput}`]);
        } else if (currentStep === 2) {
          const { mainString, patternString } = stringMatchData;
          let resultString = "";
          let found = false;
          let i = 0;
          while (i < mainString.length) {
            if (mainString.slice(i, i + patternString.length) === patternString) {
              resultString += userInput;
              i += patternString.length;
              found = true;
            } else {
              resultString += mainString[i];
              i++;
            }
          }
          setProgramOutput(prev => [
            ...prev,
            `Enter the replace string: ${userInput}`,
            `The string before pattern match is: ${mainString}`,
            found ? `The string after pattern match and replace is: ${resultString}` : "Pattern string is not found"
          ]);
        }
        setCurrentStep(currentStep + 1);
        break;

      case "program3":
        if (currentStep === 1) {
          const item = parseInt(userInput);
          if (!isNaN(item)) {
            if (stackTop === 2) setProgramOutput(prev => [...prev, "-----------Stack overflow-----------"]);
            else {
              const newStack = [...stackElements];
              newStack[stackTop + 1] = item;
              setStackElements(newStack);
              setStackTop(stackTop + 1);
              setProgramOutput(prev => [...prev, `Element ${item} pushed to stack`]);
            }
            setCurrentStep(0);
          }
        } else {
          switch (choice) {
            case 1: setProgramOutput(prev => [...prev, "Enter an element to be pushed:"]); setCurrentStep(1); break;
            case 2:
              if (stackTop === -1) setProgramOutput(prev => [...prev, "-----------Stack underflow-----------"]);
              else {
                setProgramOutput(prev => [...prev, `Element popped is: ${stackElements[stackTop]}`]);
                setStackTop(stackTop - 1);
              }
              break;
            case 3:
              if (stackTop === -1) setProgramOutput(prev => [...prev, "-----------Stack is empty-----------"]);
              else {
                let flag = true;
                for (let i = 0; i <= Math.floor(stackTop / 2); i++) if (stackElements[i] !== stackElements[stackTop - i]) { flag = false; break; }
                setProgramOutput(prev => [...prev, flag ? "It is palindrome number" : "It is not a palindrome number"]);
              }
              break;
            case 4:
              if (stackTop === -1) setProgramOutput(prev => [...prev, "-----------Stack is empty-----------"]);
              else {
                let display = "Stack elements are:\n";
                for (let i = stackTop; i >= 0; i--) display += `| ${stackElements[i]} |\n`;
                setProgramOutput(prev => [...prev, display]);
              }
              break;
            case 5: setProgramOutput(prev => [...prev, "Exiting program..."]); break;
          }
        }
        break;

      case "program4":
        const p4Res = evaluateInfixToPostfix(userInput);
        setProgramOutput([`The entered infix expression is: ${userInput}`, `The corresponding postfix expression is: ${p4Res}`]);
        break;

      case "program5a":
        const p5aRes = evaluateSuffix(userInput);
        setProgramOutput([`The entered suffix expression is: ${userInput}`, `The result of evaluation is: ${p5aRes}`]);
        break;

      case "program5b":
        const disks = parseInt(userInput);
        if (!isNaN(disks) && disks > 0) {
          const moves = towerOfHanoi(disks, "A", "C", "B");
          setProgramOutput([`Tower of Hanoi with ${disks} disks:`, ...moves]);
        }
        break;

      case "program6":
        if (currentStep === 1) {
          const newRear = (cqRear + 1) % cqSize;
          const newElements = [...cqElements];
          newElements[newRear] = userInput;
          setCqElements(newElements);
          setCqRear(newRear);
          if (cqFront === -1) setCqFront(0);
          setProgramOutput(prev => [...prev, `Inserted ${userInput}`]);
          setCurrentStep(0);
        } else {
          switch (choice) {
            case 1: setProgramOutput(prev => [...prev, "Enter element to insert:"]); setCurrentStep(1); break;
            case 2:
              if (cqFront === -1) setProgramOutput(prev => [...prev, "Queue Underflow"]);
              else {
                setProgramOutput(prev => [...prev, `Deleted ${cqElements[cqFront]}`]);
                if (cqFront === cqRear) { setCqFront(-1); setCqRear(-1); }
                else setCqFront((cqFront + 1) % cqSize);
              }
              break;
            case 3:
              if (cqFront === -1) setProgramOutput(prev => [...prev, "Queue is empty"]);
              else {
                let i = cqFront; let res = "Queue: ";
                while (true) { res += cqElements[i] + " "; if (i === cqRear) break; i = (i + 1) % cqSize; }
                setProgramOutput(prev => [...prev, res]);
              }
              break;
          }
        }
        break;

      case "program10":
        const bstVal = parseInt(userInput);
        if (isNaN(bstVal)) setProgramOutput(prev => [...prev, "Inorder traversal: " + inorder(bstRoot).join(", ")]);
        else {
          setBstRoot(insertBST({ ...bstRoot }, bstVal));
          setProgramOutput(prev => [...prev, `Inserted ${bstVal} into BST`]);
        }
        break;

      case "program12":
        const hashKey = parseInt(userInput);
        if (!isNaN(hashKey)) {
          let idx = hashKey % 10;
          const newTable = [...hashTable];
          let startIdx = idx;
          while (newTable[idx] !== null) {
            idx = (idx + 1) % 10;
            if (idx === startIdx) { setProgramOutput(prev => [...prev, "Overflow"]); return; }
          }
          newTable[idx] = hashKey;
          setHashTable(newTable);
          setProgramOutput(prev => [...prev, `Mapped ${hashKey} to ${idx}`, "Table: " + JSON.stringify(newTable)]);
        }
        break;
      
      default:
        setProgramOutput(prev => [...prev, `Echo: ${userInput}`]);
        break;
    }
    setUserInput("");
  };

  return {
    programOutput,
    userInput,
    setUserInput,
    handleInputSubmit,
    resetProgramState
  };
};
