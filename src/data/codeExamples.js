export const codeExamples = {
  "App.jsx": `
    import {useState} from "react"
    import {CodeFlow} from "@codeflow/ai"

    functin App () {
    const [code, setCode] = useState("")

    const handleAiCompletion () {
    const suggestion = await CodeFlow.complete(code)
    setCode(suggestion)
    }

    return (
    <div className="app">
        <CodeEditor
            onChange={setCode}
            onAI={handleAiCompletion}
    </div>)
    }
    `,
  "Navbar.jsx": `
    import {useState} from "react"
    import {CodeFlow} from "@codeflow/ai"

    functin App () {
    const [code, setCode] = useState("")

    const handleAiCompletion () {
    const suggestion = await CodeFlow.complete(code)
    setCode(suggestion)
    }

    return (
    <div className="app">
        <CodeEditor
            onChange={setCode}
            onAI={handleAiCompletion}
    </div>)
    }
    `,
  "Hero.jsx": `
    import {useState} from "react"
    import {CodeFlow} from "@codeflow/ai"

    functin App () {
    const [code, setCode] = useState("")

    const handleAiCompletion () {
    const suggestion = await CodeFlow.complete(code)
    setCode(suggestion)
    }

    return (
    <div className="app">
        <CodeEditor
            onChange={setCode}
            onAI={handleAiCompletion}
    </div>)
    }
    `,
};

export const floatingCards = {
  "App.jsx": {
    bgColor: "bg-blue-500/20",
    iconColor: "text-blue-400",
    textColor: "text-blue-200",
    contentColor: "text-blue-300",
    icon: "AI",
    title: "Smart Completion",
    content: "AI-powered code suggestion in real-time",
  },
  "Hero.jsx": {
    bgColor: "bg-purple-500/20",
    iconColor: "text-purple-400",
    textColor: "text-purple-200",
    contentColor: "text-purple-300",
    icon: "AI",
    title: "Auto Animation",
    content: "Dynamic typing effects generated automatically",
  },
  "Navbar.jsx": {
    bgColor: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    textColor: "text-emerald-200",
    contentColor: "text-emerald-300",
    icon: "AI",
    title: "Smart Search",
    content: "Intelligent code search across your project",
  },
};
