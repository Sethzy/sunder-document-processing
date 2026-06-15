/**
 * Interactive task dashboard mockup for ProductShowcase section.
 * Features word-by-word streaming animation on mount.
 *
 * Colors:
 * - Background: #F9F7F3 (warm parchment tint)
 * - Cards/inputs: #FEFDFB (warm white)
 *
 * Font hierarchy:
 * - Titles: text-sm (14px)
 * - Body: text-xs (12px)
 * - Meta: text-[11px]
 */
import { useState, useEffect, useRef } from 'react'
import { CheckCircle2, MoreHorizontal, ChevronRight, Sparkles, FileText } from 'lucide-react'

interface Task {
  id: string
  name: string
  status: 'processing' | 'completed'
  subtitle?: string
  time?: string
}

interface ChatMessage {
  id: string
  content: string
  thought?: string
  thoughtDuration?: string
  files?: { name: string; added: string; removed?: string }[]
}

const processingTasks: Task[] = [
  { id: '1', name: 'PO_Batch_Jan2026.xlsx', status: 'processing', subtitle: 'Generating' },
  { id: '2', name: 'Invoices_Supplier_A.pdf', status: 'processing', subtitle: 'Generating' },
  { id: '3', name: 'GRN_Warehouse_Q1.zip', status: 'processing', subtitle: 'Generating' },
]

const completedTasks: Task[] = [
  { id: '4', name: '3-Way Match Report', status: 'completed', time: 'now', subtitle: '142 POs matched' },
  { id: '5', name: 'Discrepancy Analysis', status: 'completed', time: '30m', subtitle: '8 exceptions flagged' },
  { id: '6', name: 'Vendor Reconciliation', status: 'completed', time: '45m', subtitle: '12 suppliers cleared' },
]

const chatMessages: ChatMessage[] = [
  {
    id: '1',
    content: 'Match all Purchase Orders against Goods Received Notes and Invoices. Flag any discrepancies.',
  },
  {
    id: '2',
    thought: 'Parsed 142 POs, 156 GRNs, and 148 invoices across 12 suppliers',
    thoughtDuration: '12s',
    content: "I'll extract PO numbers, line items, quantities and amounts from each document type:",
    files: [
      { name: 'po_extraction.xlsx', added: '+142 rows' },
    ],
  },
  {
    id: '3',
    content: "Now matching POs to GRNs by PO number and verifying quantities received match quantities ordered:",
    files: [
      { name: 'grn_matching.xlsx', added: '+156 rows' },
    ],
  },
  {
    id: '4',
    content: 'Cross-referencing invoices against matched PO-GRN pairs. Checking unit prices and totals:',
    files: [
      { name: 'invoice_reconciliation.xlsx', added: '+148 rows' },
    ],
  },
  {
    id: '5',
    content: "Found 8 discrepancies: 3 quantity mismatches, 2 price variances, 3 missing GRNs. Generating exception report:",
    files: [
      { name: 'exceptions_report.xlsx', added: '+8 rows' },
    ],
  },
  {
    id: '6',
    content: 'All set! 134 POs fully matched. 8 exceptions flagged for review with supplier contact details attached.',
  },
]

function DocIcon({ className }: { className?: string }) {
  return <FileText className={className} />
}

function ExcelIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="2" fill="#217346"/>
      <path d="M7 7L10 12L7 17H9L11 13.5L13 17H15L12 12L15 7H13L11 10.5L9 7H7Z" fill="white"/>
    </svg>
  )
}

interface TaskDashboardMockupProps {
  /** Whether the component is visible in viewport - triggers streaming animation */
  isVisible?: boolean
}

export function TaskDashboardMockup({ isVisible = false }: TaskDashboardMockupProps) {
  const [activeTask, setActiveTask] = useState('4')
  const [visibleMessages, setVisibleMessages] = useState(0)
  const [streamingWords, setStreamingWords] = useState<string[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const hasAnimatedRef = useRef(false)

  // Stream in messages word-by-word when visible
  useEffect(() => {
    if (!isVisible || hasAnimatedRef.current) return

    hasAnimatedRef.current = true
    const messagesToStream = chatMessages.slice(1)
    let currentMsg = 0
    let currentWord = 0
    let activeInterval: ReturnType<typeof setInterval> | null = null
    let activeTimeout: ReturnType<typeof setTimeout> | null = null

    const streamNext = () => {
      if (currentMsg >= messagesToStream.length) {
        setIsStreaming(false)
        return
      }

      setIsStreaming(true)
      const msg = messagesToStream[currentMsg]
      const words = msg.content.split(' ')

      activeInterval = setInterval(() => {
        currentWord++
        if (currentWord <= words.length) {
          setStreamingWords(words.slice(0, currentWord))
        } else {
          if (activeInterval) clearInterval(activeInterval)
          setVisibleMessages(currentMsg + 1)
          setStreamingWords([])
          currentMsg++
          currentWord = 0
          activeTimeout = setTimeout(streamNext, 400)
        }
      }, 50)
    }

    const startDelay = setTimeout(streamNext, 500)
    return () => {
      clearTimeout(startDelay)
      if (activeInterval) clearInterval(activeInterval)
      if (activeTimeout) clearTimeout(activeTimeout)
    }
  }, [isVisible])

  return (
    <div className="flex h-[520px] sm:h-[500px] md:h-[540px]">
      {/* Sidebar */}
      <div className="w-[28%] sm:w-[30%] md:w-52 border-r border-gray-200 bg-[#F9F7F3] flex flex-col overflow-hidden flex-shrink-0">
        {/* IN PROGRESS */}
        <div className="px-2.5 py-2">
          <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
            In Progress {processingTasks.length}
          </span>
        </div>

        <div className="px-1.5 space-y-0.5">
          {processingTasks.map((task) => (
            <button
              key={task.id}
              onClick={() => setActiveTask(task.id)}
              className={`w-full flex items-start gap-2 px-2 py-1.5 rounded-md text-left transition-colors ${
                activeTask === task.id ? 'shadow-[0_1px_3px_rgba(0,0,0,0.08)]' : 'hover:bg-white/40'
              }`}
            >
              <Sparkles className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-gray-700 truncate">{task.name}</p>
                <p className="text-[10px] text-gray-400">{task.subtitle}</p>
              </div>
            </button>
          ))}
        </div>

        {/* READY FOR REVIEW */}
        <div className="px-2.5 py-2 mt-1">
          <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
            Ready for Review {completedTasks.length}
          </span>
        </div>

        <div className="px-1.5 space-y-0.5 overflow-y-auto flex-1">
          {completedTasks.map((task) => (
            <button
              key={task.id}
              onClick={() => setActiveTask(task.id)}
              className={`w-full flex items-start gap-2 px-2 py-1.5 rounded-md text-left transition-colors ${
                activeTask === task.id ? 'shadow-[0_1px_3px_rgba(0,0,0,0.08)]' : 'hover:bg-white/40'
              }`}
            >
              <CheckCircle2 className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <p className="text-[11px] text-gray-700 truncate">{task.name}</p>
                  <span className="hidden md:inline text-[10px] text-gray-400 flex-shrink-0">{task.time}</span>
                </div>
                <p className="text-[10px] text-gray-400 truncate">{task.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-[#F9F7F3] min-w-0">
        {/* Header */}
        <div className="flex-shrink-0 border-b border-gray-200 bg-[#F9F7F3]">
          <div className="flex items-start justify-between px-3 sm:px-4 py-2.5">
            <span className="text-sm font-medium text-gray-900">3-Way Match Reconciliation</span>
            <MoreHorizontal className="w-4 h-4 text-gray-400 flex-shrink-0" />
          </div>
          <div className="px-3 sm:px-4 pb-3">
            <div className="bg-[#FEFDFB] rounded-lg px-3 py-2.5 border border-gray-200">
              <p className="text-xs text-gray-900 leading-relaxed">{chatMessages[0].content}</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 space-y-4">
          {chatMessages.slice(1).map((message, index) => {
            const isVisible = index < visibleMessages
            const isCurrentlyStreaming = index === visibleMessages && isStreaming

            if (!isVisible && !isCurrentlyStreaming) return null

            return (
              <div key={message.id} className="space-y-1.5">
                {message.thought && isVisible && (
                  <>
                    <p className="text-[11px] text-gray-400">
                      Thought {message.thoughtDuration}
                    </p>
                    <p className="text-[11px] text-gray-400 leading-relaxed">{message.thought}</p>
                  </>
                )}
                <p className="text-xs text-gray-900 leading-relaxed">
                  {isCurrentlyStreaming ? streamingWords.join(' ') : message.content}
                  {isCurrentlyStreaming && <span className="inline-block w-1 h-3 bg-gray-400 ml-0.5 animate-pulse rounded-sm" />}
                </p>
                {message.files && isVisible && (
                  <div className="space-y-1.5">
                    {message.files.map((file, fIndex) => (
                      <div
                        key={fIndex}
                        className="flex items-center gap-2.5 p-2 bg-[#FEFDFB] rounded-lg border border-gray-200"
                      >
                        <DocIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <p className="flex-1 text-xs text-gray-900 truncate">{file.name}</p>
                        <div className="flex items-center gap-1 text-[11px]">
                          <span className="text-sunder-green font-medium">{file.added}</span>
                          {file.removed && <span className="text-red-500 font-medium">-{file.removed}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Input */}
        <div className="flex-shrink-0 p-3 border-t border-gray-200 bg-[#F9F7F3]">
          <div className="bg-[#FEFDFB] rounded-lg border border-gray-200 p-2.5">
            <p className="text-xs text-gray-400 mb-2">Plan, search, build anything...</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-2 py-1 bg-gray-100 rounded-md text-[11px] font-medium text-gray-600">
                  <Sparkles className="w-3 h-3" />
                  Agent
                </span>
                <span className="flex items-center gap-1 text-[11px] text-gray-400">
                  <ExcelIcon className="w-3.5 h-3.5" />
                  Generate Excel
                </span>
              </div>
              <button className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                <ChevronRight className="w-3.5 h-3.5 text-gray-600 -rotate-90" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
