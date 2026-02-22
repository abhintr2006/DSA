import { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  ChevronDown,
  Linkedin,
  Instagram,
  Code2,
  Home,
  User,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  BookOpen,
  Github,
  FileText,
  Cookie,
  Shield,
  MessageSquare,
  Users,
} from "lucide-react";

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
      className={`min-h-screen transition-colors duration-300 grid-bg ${darkMode ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white" : "bg-gray-50 text-gray-900 light-grid"}`}>
      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isNavbarScrolled
            ? "bg-white/10 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
        }`}>
        <div className="w-full px-8">
          <div className="flex items-center h-20">
            {/* Left: Branding */}
            <div className="flex-1">
              <h1
                onClick={handleHomeClick}
                className="text-3xl font-bold cursor-pointer hover:opacity-80 transition-opacity ml-4 whitespace-nowrap">
                <span className={darkMode ? "text-white" : "text-gray-900"}>
                  DSA Study{" "}
                </span>
                <span className="text-orange-500">Hub</span>
              </h1>
            </div>

            {/* Center: Navigation Links */}
            <div className="hidden lg:flex flex-1 justify-center items-center space-x-8 text-sm font-medium">
              <button
                onClick={handleHomeClick}
                className="flex items-center space-x-1.5 hover:text-orange-500 transition-colors">
                <Home size={18} />
                <span>Home</span>
              </button>

              <div className="relative programs-dropdown">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsProgramsOpen(!isProgramsOpen);
                    setIsNotesOpen(false);
                  }}
                  className="flex items-center space-x-1.5 hover:text-orange-500 transition-colors">
                  <Code2 size={18} />
                  <span>Programs</span>
                  <ChevronDown
                    size={14}
                    className={`transform transition-transform ${isProgramsOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isProgramsOpen && (
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 rounded-xl shadow-2xl py-2 border ${darkMode ? "bg-gray-900/90 backdrop-blur-xl border-white/10" : "bg-white border-gray-200"}`}>
                    {programs.map((program) => (
                      <button
                        key={program.name}
                        className="w-full text-left px-4 py-2.5 hover:bg-orange-500/10 hover:text-orange-500 transition-colors"
                        onClick={() => {
                          handleProgramClick(program.name);
                          setIsProgramsOpen(false);
                        }}>
                        {program.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative notes-dropdown">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsNotesOpen(!isNotesOpen);
                    setIsProgramsOpen(false);
                  }}
                  className="flex items-center space-x-1.5 hover:text-orange-500 transition-colors">
                  <BookOpen size={18} />
                  <span>Notes</span>
                  <ChevronDown
                    size={14}
                    className={`transform transition-transform ${isNotesOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isNotesOpen && (
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 rounded-xl shadow-2xl py-2 border ${darkMode ? "bg-gray-900/90 backdrop-blur-xl border-white/10" : "bg-white border-gray-200"}`}>
                    {notes.map((note) => (
                      <a
                        key={note.file}
                        href={`/notes/${note.file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2.5 hover:bg-orange-500/10 hover:text-orange-500 transition-colors"
                        onClick={() => setIsNotesOpen(false)}>
                        {note.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={handleAboutClick}
                className="flex items-center space-x-1.5 hover:text-orange-500 transition-colors">
                <User size={18} />
                <span>About Us</span>
              </button>
            </div>

            {/* Right: Actions */}
            <div className="flex-1 flex items-center justify-end space-x-5">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full hover:bg-orange-500/10 transition-colors">
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-bold shadow-lg shadow-orange-500/20 transition-all hover:scale-105 active:scale-95">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      {activeView === "home" && (
        <section className="pt-32 pb-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-6 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
              Master Data Structures & Algorithms
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Explore comprehensive study materials and coding programs to ace
              DSA.
            </p>
          </div>
        </section>
      )}

      {/* --- ABOUT US SECTION --- */}
      {activeView === "about" && (
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center pb-2 mb-12 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
              About Us
            </h2>

            {/* Team Grid - All members together */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {/* Pavan */}
              <div
                className={`p-6 rounded-xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${darkMode ? "bg-white/5 hover:bg-white/10" : "bg-white shadow-xl"}`}>
                <div
                  className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden border-4 border-orange-500 shadow-lg"
                  style={{ boxShadow: "0 0 15px rgba(249, 115, 22, 0.3)" }}>
                  <img
                    src="/screenshots/Pavan.jpeg"
                    alt="G Pavan Kumar"
                    className="w-full h-full object-cover scale-[1.3]"
                  />
                </div>
                <h4 className="text-xl font-bold mb-1">G Pavan Kumar</h4>
                <p className="text-sm font-semibold text-orange-500">
                  Frontend & UI/UX Developer
                </p>
              </div>

              {/* Pranav */}
              <div
                className={`p-6 rounded-xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${darkMode ? "bg-white/5 hover:bg-white/10" : "bg-white shadow-xl"}`}>
                <img
                  src="/screenshots/profile.svg"
                  alt="Pranav"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover object-top border-4 border-orange-500 shadow-lg"
                  style={{ boxShadow: "0 0 15px rgba(249, 115, 22, 0.3)" }}
                />
                <h4 className="text-xl font-bold mb-1">Pranav</h4>
                <p className="text-sm font-semibold text-orange-500">
                  Core Logic & Logic Integration
                </p>
              </div>

              {/* Rohith */}
              <div
                className={`p-6 rounded-xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${darkMode ? "bg-white/5 hover:bg-white/10" : "bg-white shadow-xl"}`}>
                <img
                  src="/screenshots/Rohith.jpeg"
                  alt="Rohith"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-orange-500 shadow-lg"
                  style={{ boxShadow: "0 0 15px rgba(249, 115, 22, 0.3)" }}
                />
                <h4 className="text-xl font-bold mb-1">Rohith</h4>
                <p className="text-sm font-semibold text-orange-500">
                  Team Lead & Project Architect
                </p>
              </div>

              {/* Syed */}
              <div
                className={`p-6 rounded-xl text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${darkMode ? "bg-white/5 hover:bg-white/10" : "bg-white shadow-xl"}`}>
                <div
                  className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden border-4 border-orange-500 shadow-lg"
                  style={{ boxShadow: "0 0 15px rgba(249, 115, 22, 0.3)" }}>
                  <img
                    src="/screenshots/Syed.jpeg"
                    alt="Syed"
                    className="w-full h-full object-cover scale-[1.3]"
                  />
                </div>
                <h4 className="text-xl font-bold mb-1">Syed</h4>
                <p className="text-sm font-semibold text-orange-500">
                  Algorithms & Implementation Specialist
                </p>
              </div>
            </div>

            {/* Shared Info Section */}
            <div
              className={`p-8 rounded-xl ${darkMode ? "bg-white/5" : "bg-white shadow-xl"}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mb-2">About Our Team</h3>
                  <div className="flex items-center space-x-3">
                    <Briefcase className="text-orange-500" size={20} />
                    <span>
                      Students At K.S School Of Engineering and Management
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="text-orange-500" size={20} />
                    <span>
                      B.E in CSBS at K.S School Of Engineering and Management
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="text-orange-500" size={20} />
                    <span>Bengaluru, Karnataka</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="text-orange-500" size={20} />
                    <span>pranavarun19@gmail</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold mb-2">Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Data Structures",
                      "Algorithms",
                      "Problem Solving",
                      "C++",
                      "Java",
                      "Python",
                      "System Design",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className={`px-3 py-1 rounded-full ${
                          darkMode
                            ? "bg-orange-500/20 text-orange-300"
                            : "bg-orange-100 text-orange-800"
                        }`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-200/20">
                <h3 className="text-xl font-semibold mb-4">Our Philosophy</h3>
                <p className="opacity-80 leading-relaxed italic">
                  "Data structures are not just about storing data; they are
                  about organizing information in a way that enables efficient
                  problem-solving. Our goal is to make these abstract concepts
                  tangible and intuitive."
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* --- PROGRAM SIMULATOR SECTION --- */}
      {activeView.startsWith("program") && (
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div
              className={`p-6 rounded-lg ${darkMode ? "bg-gray-900 border border-gray-700" : "bg-white shadow-2xl"}`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-orange-500 capitalize">
                  {activeView.replace("program", "Program ")}
                </h2>
                <button
                  onClick={resetProgramState}
                  className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 transition-colors">
                  Reset
                </button>
              </div>

              {/* Simulation Terminal */}
              <div
                className={`font-mono p-4 rounded-md mb-6 min-h-[300px] max-h-[500px] overflow-y-auto ${darkMode ? "bg-black text-green-400" : "bg-gray-100 text-gray-800"}`}>
                {programOutput.length === 0 ? (
                  <p className="opacity-50">
                    Program output will appear here...
                  </p>
                ) : (
                  programOutput.map((line, i) => (
                    <div key={i} className="mb-1 whitespace-pre-wrap">
                      {line}
                    </div>
                  ))
                )}
                {/* Auto-scroll target */}
                <div id="terminal-end"></div>
              </div>

              {/* Input Area */}
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleInputSubmit()}
                  placeholder="Enter input here..."
                  className={`flex-1 p-3 rounded-md border ${
                    darkMode
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:ring-2 focus:ring-orange-500 outline-none transition-all`}
                  autoFocus
                />
                <button
                  onClick={handleInputSubmit}
                  className="px-6 py-3 bg-orange-500 text-white font-bold rounded-md hover:bg-orange-600 transition-colors shadow-lg">
                  Submit
                </button>
              </div>

              <p className="mt-4 text-sm opacity-60">
                Type your input and press Enter or click Submit.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* --- FAT FOOTER --- */}
      <footer
        className={`mt-20 ${darkMode ? "bg-gray-900/80" : "bg-gray-800"} text-gray-300`}>
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Column 1: Branding */}
            <div>
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-white">DSA Study </span>
                <span className="text-orange-500">Hub</span>
              </h3>
              <p className="text-sm leading-relaxed opacity-70">
                The complete platform to master Data Structures and Algorithms.
                Interactive visualizations and practice quizzes to help you
                succeed.
              </p>
            </div>

            {/* Column 4: Connect */}
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">
                Connect
              </h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={handleAboutClick}
                    className="flex items-center space-x-2 text-sm hover:text-orange-500 transition-colors">
                    <Users size={15} />
                    <span>About Us</span>
                  </button>
                </li>
                <li>
                  <button className="flex items-center space-x-2 text-sm hover:text-orange-500 transition-colors">
                    <MessageSquare size={15} />
                    <span>Contact</span>
                  </button>
                </li>
              </ul>

              {/* Social Icons */}
              <div className="flex items-center space-x-4 mt-6">
                <a
                  href="https://github.com/abhintr2006/DSA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/10 hover:bg-orange-500 hover:text-white transition-all duration-300">
                  <Github size={18} />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg bg-white/10 hover:bg-orange-500 hover:text-white transition-all duration-300">
                  <Linkedin size={18} />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg bg-white/10 hover:bg-orange-500 hover:text-white transition-all duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg bg-white/10 hover:bg-orange-500 hover:text-white transition-all duration-300">
                  <Instagram size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`border-t ${darkMode ? "border-white/10" : "border-gray-700"}`}>
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between">
            <p className="text-sm opacity-60">© 2026 DSA Study Hub.</p>
            <div className="flex items-center space-x-6 mt-3 sm:mt-0">
              <button className="text-sm opacity-60 hover:opacity-100 hover:text-orange-500 transition-all flex items-center space-x-1">
                <FileText size={13} />
                <span>Terms</span>
              </button>
              <button className="text-sm opacity-60 hover:opacity-100 hover:text-orange-500 transition-all flex items-center space-x-1">
                <Shield size={13} />
                <span>Privacy</span>
              </button>
              <button className="text-sm opacity-60 hover:opacity-100 hover:text-orange-500 transition-all flex items-center space-x-1">
                <Cookie size={13} />
                <span>Cookies</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
