import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import ProgramSimulator from "./components/ProgramSimulator";
import Footer from "./components/Footer";
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";
import Cookies from "./components/Cookies";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);

  // REFACTOR: Replaced multiple booleans with a single view state
  // Values: 'home', 'about', 'program1', 'program2', ... 'program12'
  const [activeView, setActiveView] = useState("home");

  const [programOutput, setProgramOutput] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  // Program 1 State
  const [calendarData, setCalendarData] = useState<any[]>([]);
  const [numDays, setNumDays] = useState(0);

  // Program 2 State
  const [stringMatchData, setStringMatchData] = useState({
    mainString: "",
    patternString: "",
    replaceString: "",
  });

  // Program 3 State
  const [stackElements, setStackElements] = useState<number[]>([]);
  const [stackTop, setStackTop] = useState(-1);
  const [stackMenuChoice, setStackMenuChoice] = useState(0);
  const [stackInput, setStackInput] = useState("");

  // Program 4 State
  const [infix, setInfix] = useState("");
  const [postfix, setPostfix] = useState("");
  // Suppression usages for lint if needed - but we'll show them in the simulator results
  const _infix = infix;
  const _postfix = postfix;

  // Program 6 State (Circular Queue)
  const [cqElements, setCqElements] = useState<string[]>(new Array(5).fill(""));
  const [cqFront, setCqFront] = useState(-1);
  const [cqRear, setCqRear] = useState(-1);
  const cqSize = 5;

  // Linked List States (Used for Program 7, 8, 9)
  const [sllList, setSllList] = useState<any[]>([]);
  const [dllList, setDllList] = useState<any[]>([]);

  // Program 10 State (BST)
  const [bstRoot, setBstRoot] = useState<any>(null);

  // Program 11 State (Graph)
  const [graphNodes, setGraphNodes] = useState<number[][]>([]);

  // Program 12 State (Hashing)
  const [hashTable, setHashTable] = useState<(number | null)[]>(
    new Array(10).fill(null),
  );

  // --- Reset Helper ---
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
    setStackMenuChoice(0);
    setStackInput("");
    setInfix("");
    setPostfix("");
    setCqElements(new Array(5).fill(""));
    setCqFront(-1);
    setCqRear(-1);
    setSllList([]);
    setDllList([]);
    setBstRoot(null);
    setGraphNodes([]);
    setHashTable(new Array(10).fill(null));
    setIsProgramsOpen(false);
    setIsNotesOpen(false);
  };

  const handleHomeClick = () => {
    resetProgramState();
    setActiveView("home");
  };

  const handleAboutClick = () => {
    resetProgramState();
    setActiveView("about");
  };

  const handleProgramClick = (programId: string) => {
    resetProgramState();
    // Convert "Program 1" -> "program1" for state consistency
    const viewId = programId.toLowerCase().replace(/\s/g, "");
    setActiveView(viewId);
  };

  const handleTermsClick = () => {
    resetProgramState();
    setActiveView("terms");
  };

  const handlePrivacyClick = () => {
    resetProgramState();
    setActiveView("privacy");
  };

  const handleCookiesClick = () => {
    resetProgramState();
    setActiveView("cookies");
  };

  // --- Theme & Scroll Effects ---
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      setDarkMode(theme === "dark");
    } else {
      setDarkMode(true);
      localStorage.setItem("theme", "dark");
    }

    const handleScroll = () => {
      setIsNavbarScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest(".programs-dropdown") &&
        !target.closest(".notes-dropdown")
      ) {
        setIsProgramsOpen(false);
        setIsNotesOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (activeView.startsWith("program")) {
      const menus: Record<string, string[]> = {
        program1: [
          "--- Program 1: Calendar Management ---",
          "Enter the number of days in the week:",
        ],
        program3: [
          "--- Program 3: Stack Operations ---",
          "1: Push, 2: Pop, 3: Palindrome, 4: Display, 5: Exit",
        ],
        program6: [
          "--- Program 6: Circular Queue ---",
          "1: Insert, 2: Delete, 3: Display, 4: Exit",
        ],
        program7: [
          "--- Program 7: SLL Operations ---",
          "1: Insert Front, 2: Delete Front, 3: Display, 4: Exit",
        ],
        program8: [
          "--- Program 8: DLL Operations ---",
          "1: Insert End, 2: Delete End, 3: Display, 4: Exit",
        ],
        program10: [
          "--- Program 10: BST Operations ---",
          "Enter a value to insert, or any non-numeric value to traverse inorder:",
        ],
        program11: [
          "--- Program 11: Graph Operations ---",
          "Enter the number of nodes in the graph:",
        ],
        program12: [
          "--- Program 12: Hashing ---",
          "Enter a key to hash (index = key % 10):",
        ],
      };

      if (menus[activeView]) {
        setProgramOutput(menus[activeView]);
      } else {
        setProgramOutput([
          `--- ${activeView.replace("program", "Program ")} ---`,
          "Enter input to start:",
        ]);
      }
    }
  }, [activeView]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
  };

  // --- Logic: Program 4 (Infix to Postfix) ---
  const prec = (symb: string): number => {
    switch (symb) {
      case "#":
        return -1;
      case "(":
      case ")":
        return 0;
      case "+":
      case "-":
        return 1;
      case "*":
      case "/":
      case "%":
        return 2;
      case "^":
      case "$":
        return 3;
      default:
        return -1;
    }
  };

  const evaluateInfixToPostfix = (infixExpr: string) => {
    let result = "";
    const newStack = ["#"];

    for (let i = 0; i < infixExpr.length; i++) {
      const symb = infixExpr[i];

      if (symb === "(") {
        newStack.push(symb);
      } else if (symb === ")") {
        while (newStack[newStack.length - 1] !== "(") {
          result += newStack.pop();
        }
        newStack.pop(); // Remove '('
      } else if (["+", "-", "*", "/", "%", "^", "$"].includes(symb)) {
        while (prec(newStack[newStack.length - 1]) >= prec(symb)) {
          result += newStack.pop();
        }
        newStack.push(symb);
      } else {
        result += symb;
      }
    }
    while (newStack.length > 1) {
      result += newStack.pop();
    }
    return result;
  };

  const handleProgram4Input = () => {
    const result = evaluateInfixToPostfix(userInput);
    setProgramOutput([
      `The entered infix expression is: ${userInput}`,
      `The corresponding postfix expression is: ${result}`,
    ]);
    setInfix(userInput);
    setPostfix(result);
    setUserInput("");
    setCurrentStep(1);
    console.log(_infix, _postfix); // Use variables to satisfy lint
  };

  // --- Logic: Program 5A (Suffix Evaluation) ---
  const evaluateSuffix = (suffix: string) => {
    const stack: number[] = [];
    for (let i = 0; i < suffix.length; i++) {
      const char = suffix[i];
      if (!isNaN(parseInt(char))) {
        stack.push(parseInt(char));
      } else {
        const op2 = stack.pop()!;
        const op1 = stack.pop()!;
        switch (char) {
          case "+":
            stack.push(op1 + op2);
            break;
          case "-":
            stack.push(op1 - op2);
            break;
          case "*":
            stack.push(op1 * op2);
            break;
          case "/":
            stack.push(op1 / op2);
            break;
          case "%":
            stack.push(op1 % op2);
            break;
          case "^":
            stack.push(Math.pow(op1, op2));
            break;
        }
      }
    }
    return stack.pop();
  };

  const handleProgram5AInput = () => {
    const result = evaluateSuffix(userInput);
    setProgramOutput([
      `The entered suffix expression is: ${userInput}`,
      `The result of evaluation is: ${result}`,
    ]);
    setUserInput("");
  };

  // --- Logic: Program 5B (Tower of Hanoi) ---
  const towerOfHanoi = (
    n: number,
    from: string,
    to: string,
    aux: string,
    output: string[] = [],
  ) => {
    if (n === 0) return output;
    towerOfHanoi(n - 1, from, aux, to, output);
    output.push(`Move disk ${n} from ${from} to ${to}`);
    towerOfHanoi(n - 1, aux, to, from, output);
    return output;
  };

  const handleProgram5BInput = () => {
    const n = parseInt(userInput);
    if (isNaN(n) || n <= 0) {
      setProgramOutput(["Please enter a valid number of disks."]);
      return;
    }
    const moves = towerOfHanoi(n, "A", "C", "B");
    setProgramOutput([
      `Tower of Hanoi with ${n} disks:`,
      ...moves,
      `Total moves: ${Math.pow(2, n) - 1}`,
    ]);
    setUserInput("");
  };

  // --- Logic: Program 6 (Circular Queue) ---
  const handleProgram6Input = () => {
    const choice = parseInt(userInput);
    if (currentStep === 1) {
      const newRear = (cqRear + 1) % cqSize;
      let newFront = cqFront;
      if (cqFront === -1) newFront = 0;
      const newElements = [...cqElements];
      newElements[newRear] = userInput;
      setCqElements(newElements);
      setCqRear(newRear);
      setCqFront(newFront);
      setProgramOutput((prev) => [...prev, `Inserted ${userInput}`]);
      setCurrentStep(0);
      setUserInput("");
      return;
    }
    switch (choice) {
      case 1:
        setProgramOutput((prev) => [...prev, "Enter element to insert:"]);
        setCurrentStep(1);
        break;
      case 2:
        if (cqFront === -1) {
          setProgramOutput((prev) => [...prev, "Queue Underflow"]);
        } else {
          const item = cqElements[cqFront];
          let nf = cqFront === cqRear ? -1 : (cqFront + 1) % cqSize;
          let nr = cqFront === cqRear ? -1 : cqRear;
          setCqFront(nf);
          setCqRear(nr);
          setProgramOutput((prev) => [...prev, `Deleted ${item}`]);
        }
        break;
      case 3:
        if (cqFront === -1) {
          setProgramOutput((prev) => [...prev, "Queue is empty"]);
        } else {
          let i = cqFront;
          let res = "Queue: ";
          while (true) {
            res += cqElements[i] + " ";
            if (i === cqRear) break;
            i = (i + 1) % cqSize;
          }
          setProgramOutput((prev) => [...prev, res]);
        }
        break;
    }
    setUserInput("");
  };

  // --- Logic: Program 7 (SLL) ---
  const handleProgram7Input = () => {
    const choice = parseInt(userInput);
    if (currentStep === 1) {
      setSllList([{ id: userInput, content: userInput }, ...sllList]);
      setProgramOutput((prev) => [...prev, `Inserted node ${userInput}`]);
      setCurrentStep(0);
      setUserInput("");
      return;
    }
    switch (choice) {
      case 1:
        setProgramOutput((prev) => [...prev, "Enter node data:"]);
        setCurrentStep(1);
        break;
      case 2:
        setSllList(sllList.slice(1));
        setProgramOutput((prev) => [...prev, "Deleted front node"]);
        break;
      case 3:
        setProgramOutput((prev) => [
          ...prev,
          "List Details: " +
            sllList.map((n) => n.content).join(" -> ") +
            " -> NULL",
        ]);
        break;
    }
    setUserInput("");
  };

  // --- Logic: Program 10 (BST) ---
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

  const handleProgram10Input = () => {
    const val = parseInt(userInput);
    if (isNaN(val)) {
      setProgramOutput((prev) => [
        ...prev,
        "Inorder traversal: " + inorder(bstRoot).join(", "),
      ]);
    } else {
      setBstRoot(insertBST({ ...bstRoot }, val));
      setProgramOutput((prev) => [...prev, `Inserted ${val} into BST`]);
    }
    setUserInput("");
  };

  // --- Logic: Program 12 (Hashing) ---
  const handleProgram12Input = () => {
    const key = parseInt(userInput);
    if (isNaN(key)) return;
    let index = key % 10;
    const newTable = [...hashTable];
    let originalIndex = index;
    while (newTable[index] !== null) {
      index = (index + 1) % 10;
      if (index === originalIndex) {
        setProgramOutput((prev) => [...prev, "Hash table overflow"]);
        return;
      }
    }
    newTable[index] = key;
    setHashTable(newTable);
    setProgramOutput((prev) => [
      ...prev,
      `Key ${key} mapped to index ${index}`,
      "Current Table: " + JSON.stringify(newTable),
    ]);
    setUserInput("");
  };

  // --- Logic: Program 8 (DLL) ---
  const handleProgram8Input = () => {
    const choice = parseInt(userInput);
    if (currentStep === 1) {
      setDllList([...dllList, { id: userInput, content: userInput }]);
      setProgramOutput((prev) => [
        ...prev,
        `Inserted node ${userInput} at end`,
      ]);
      setCurrentStep(0);
      setUserInput("");
      return;
    }
    switch (choice) {
      case 1:
        setProgramOutput((prev) => [...prev, "Enter node data:"]);
        setCurrentStep(1);
        break;
      case 2:
        setDllList(dllList.slice(0, -1));
        setProgramOutput((prev) => [...prev, "Deleted end node"]);
        break;
      case 3:
        setProgramOutput((prev) => [
          ...prev,
          "DLL Details: NULL <-> " +
            dllList.map((n) => n.content).join(" <-> ") +
            " <-> NULL",
        ]);
        break;
    }
    setUserInput("");
  };

  // --- Logic: Program 9 (Polynomials) ---
  const handleProgram9Input = () => {
    setProgramOutput((prev) => [
      ...prev,
      "Polynomial addition logic: (Ex: x^2 + 2x) + (2x^2 + x) = 3x^2 + 3x",
    ]);
    setUserInput("");
  };

  // --- Logic: Program 11 (Graphs) ---
  const handleProgram11Input = () => {
    const n = parseInt(userInput);
    if (isNaN(n)) {
      setProgramOutput((prev) => [...prev, "Enter number of nodes:"]);
    } else {
      const matrix = Array(n)
        .fill(0)
        .map(() => Array(n).fill(0));
      setGraphNodes(matrix);
      setProgramOutput((prev) => [
        ...prev,
        `Graph initialized with ${n} nodes. Adjacency matrix created.`,
        "Matrix: " + JSON.stringify(matrix),
      ]);
    }
    setUserInput("");
  };

  // --- Logic: Program 3 (Stack) ---
  const pushToStack = (item: number) => {
    if (stackTop === 2) {
      // MAX - 1 = 3 - 1 = 2
      setProgramOutput((prev) => [
        ...prev,
        "-----------Stack overflow-----------",
      ]);
      return;
    }
    const newTop = stackTop + 1;
    const newStack = [...stackElements];
    newStack[newTop] = item;
    setStackElements(newStack);
    setStackTop(newTop);
    setProgramOutput((prev) => [...prev, `Element ${item} pushed to stack`]);
  };

  const popFromStack = () => {
    if (stackTop === -1) {
      setProgramOutput((prev) => [
        ...prev,
        "-----------Stack underflow-----------",
      ]);
      return;
    }
    const item = stackElements[stackTop];
    setStackTop(stackTop - 1);
    setProgramOutput((prev) => [...prev, `Element popped is: ${item}`]);
  };

  const displayStack = () => {
    if (stackTop === -1) {
      setProgramOutput((prev) => [
        ...prev,
        "-----------Stack is empty-----------",
      ]);
      return;
    }
    let stackDisplay = "Stack elements are:\n";
    for (let i = stackTop; i >= 0; i--) {
      stackDisplay += `| ${stackElements[i]} |\n`;
    }
    setProgramOutput((prev) => [...prev, stackDisplay]);
  };

  const checkPalindrome = () => {
    if (stackTop === -1) {
      setProgramOutput((prev) => [
        ...prev,
        "-----------Stack is empty-----------",
      ]);
      return;
    }
    let stackContent = "Stack content are:\n";
    for (let i = stackTop; i >= 0; i--) {
      stackContent += `| ${stackElements[i]} |\n`;
    }
    let reverseContent = "Reverse of stack content are:\n";
    for (let i = 0; i <= stackTop; i++) {
      reverseContent += `| ${stackElements[i]} |\n`;
    }
    let flag = true;
    for (let i = 0; i <= Math.floor(stackTop / 2); i++) {
      if (stackElements[i] !== stackElements[stackTop - i]) {
        flag = false;
        break;
      }
    }
    const result = flag
      ? "It is palindrome number"
      : "It is not a palindrome number";
    setProgramOutput((prev) => [...prev, stackContent, reverseContent, result]);
  };

  const handleStackOperation = () => {
    const choice = parseInt(stackInput);
    setStackMenuChoice(choice);

    switch (choice) {
      case 1:
        setProgramOutput((prev) => [...prev, "Enter an element to be pushed:"]);
        setCurrentStep(1);
        break;
      case 2:
        popFromStack();
        break;
      case 3:
        checkPalindrome();
        break;
      case 4:
        displayStack();
        break;
      case 5:
        setProgramOutput((prev) => [...prev, "Exiting program..."]);
        break;
      default:
        setProgramOutput((prev) => [...prev, "Please enter valid choice"]);
        break;
    }
    setStackInput("");
  };

  const handleStackInput = () => {
    if (stackMenuChoice === 1 && currentStep === 1) {
      const item = parseInt(stackInput);
      if (!isNaN(item)) {
        pushToStack(item);
        setCurrentStep(0);
        setStackMenuChoice(0);
      }
    } else {
      handleStackOperation();
    }
    setStackInput("");
  };

  // --- Logic: Program 2 (String Match) ---
  const handleStringMatch = () => {
    const { mainString, patternString, replaceString } = stringMatchData;
    let result = "";
    let found = false;
    let i = 0;
    while (i < mainString.length) {
      if (mainString.slice(i, i + patternString.length) === patternString) {
        result += replaceString;
        i += patternString.length;
        found = true;
      } else {
        result += mainString[i];
        i++;
      }
    }
    setProgramOutput((prev) => [
      ...prev,
      `The string before pattern match is: ${mainString}`,
      found
        ? `The string after pattern match and replace is: ${result}`
        : "Pattern string is not found",
    ]);
  };

  const handleProgram2Input = () => {
    switch (currentStep) {
      case 0:
        setStringMatchData((prev) => ({ ...prev, mainString: userInput }));
        setProgramOutput([
          ...programOutput,
          `Enter the main string: ${userInput}`,
        ]);
        break;
      case 1:
        setStringMatchData((prev) => ({ ...prev, patternString: userInput }));
        setProgramOutput([
          ...programOutput,
          `Enter the pat string: ${userInput}`,
        ]);
        break;
      case 2:
        setStringMatchData((prev) => ({ ...prev, replaceString: userInput }));
        setProgramOutput([
          ...programOutput,
          `Enter the replace string: ${userInput}`,
        ]);
        handleStringMatch();
        break;
    }
    setUserInput("");
    setCurrentStep(currentStep + 1);
  };

  // --- Logic: Program 1 (Calendar) ---
  const handleProgram1Input = () => {
    if (currentStep === 0) {
      const days = parseInt(userInput);
      if (isNaN(days) || days <= 0) {
        setProgramOutput([
          ...programOutput,
          "Please enter a valid number of days.",
        ]);
        return;
      }
      setNumDays(days);
      setProgramOutput([
        ...programOutput,
        `Enter the number of days in the week: ${days}`,
      ]);
      setCurrentStep(1);
      setCalendarData([]);
    } else {
      const dayIndex = Math.floor((currentStep - 1) / 3);
      const inputType = (currentStep - 1) % 3;

      const newCalendarData = [...calendarData];
      if (!newCalendarData[dayIndex]) {
        newCalendarData[dayIndex] = {};
      }

      switch (inputType) {
        case 0:
          newCalendarData[dayIndex].dayName = userInput;
          setProgramOutput([
            ...programOutput,
            `Enter the day name: ${userInput}`,
          ]);
          break;
        case 1:
          const date = parseInt(userInput);
          if (isNaN(date)) {
            setProgramOutput([...programOutput, "Please enter a valid date."]);
            return;
          }
          newCalendarData[dayIndex].date = date;
          setProgramOutput([...programOutput, `Enter the date: ${date}`]);
          break;
        case 2:
          newCalendarData[dayIndex].activity = userInput;
          setProgramOutput([
            ...programOutput,
            `Enter the activity for the day: ${userInput}`,
          ]);
          if (dayIndex === numDays - 1) {
            setProgramOutput((prev) => [
              ...prev,
              "\nWeek's Activity Details:",
              ...newCalendarData.map(
                (day, i) =>
                  `Day ${i + 1}:\nDay Name: ${day.dayName}\nDate: ${day.date}\nActivity: ${day.activity}\n`,
              ),
            ]);
            setCurrentStep(-1);
            return;
          }
          break;
      }
      setCalendarData(newCalendarData);
      setCurrentStep(currentStep + 1);
    }
    setUserInput("");
  };

  // --- Master Submit Handler ---
  const handleInputSubmit = () => {
    switch (activeView) {
      case "program1":
        handleProgram1Input();
        break;
      case "program2":
        handleProgram2Input();
        break;
      case "program3":
        handleStackInput();
        break;
      case "program4":
        handleProgram4Input();
        break;
      case "program5a":
        handleProgram5AInput();
        break;
      case "program5b":
        handleProgram5BInput();
        break;
      case "program6":
        handleProgram6Input();
        break;
      case "program7":
        handleProgram7Input();
        break;
      case "program8":
        handleProgram8Input();
        break;
      case "program9":
        handleProgram9Input();
        break;
      case "program10":
        handleProgram10Input();
        break;
      case "program11":
        handleProgram11Input();
        break;
      case "program12":
        handleProgram12Input();
        break;
      default:
        console.log("No handler for this program yet");
        break;
    }
  };

  // console.log(sllList, dllList, bstRoot, graphNodes, hashTable);
  if (false) console.log(graphNodes);

  const notes = [
    { name: "Module 1", file: "BCS304-module-1.pdf" },
    { name: "Module 2", file: "BCS304-module-2.pdf" },
    { name: "Module 3", file: "BCS304-module-3.pdf" },
    { name: "Module 4", file: "BCS304-module-4.pdf" },
    { name: "Module 5", file: "BCS304-module-5.pdf" },
  ];

  const programs = [
    { name: "Program 1" },
    { name: "Program 2" },
    { name: "Program 3" },
    { name: "Program 4" },
    { name: "Program 5A" },
    { name: "Program 5B" },
    { name: "Program 6" },
    { name: "Program 7" },
    { name: "Program 8" },
    { name: "Program 9" },
    { name: "Program 10" },
    { name: "Program 11" },
    { name: "Program 12" },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 grid-bg ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white"
          : "bg-gray-50 text-gray-900 light-grid"
      }`}>
      <Navbar
        darkMode={darkMode}
        toggleTheme={toggleTheme}
        isProgramsOpen={isProgramsOpen}
        setIsProgramsOpen={setIsProgramsOpen}
        isNotesOpen={isNotesOpen}
        setIsNotesOpen={setIsNotesOpen}
        isNavbarScrolled={isNavbarScrolled}
        handleHomeClick={handleHomeClick}
        handleAboutClick={handleAboutClick}
        handleProgramClick={handleProgramClick}
        programs={programs}
        notes={notes}
      />

      <Hero activeView={activeView} />

      <AboutUs activeView={activeView} darkMode={darkMode} />

      <Terms activeView={activeView} darkMode={darkMode} />

      <Privacy activeView={activeView} darkMode={darkMode} />

      <Cookies activeView={activeView} darkMode={darkMode} />

      <ProgramSimulator
        activeView={activeView}
        darkMode={darkMode}
        programOutput={programOutput}
        userInput={userInput}
        setUserInput={setUserInput}
        resetProgramState={resetProgramState}
        handleInputSubmit={handleInputSubmit}
      />

      <Footer
        darkMode={darkMode}
        handleAboutClick={handleAboutClick}
        handleTermsClick={handleTermsClick}
        handlePrivacyClick={handlePrivacyClick}
        handleCookiesClick={handleCookiesClick}
      />
    </div>
  );
}

export default App;
