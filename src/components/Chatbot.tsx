"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OpenAI } from "openai";
import { marked } from "marked";

// ============================================================
// CẤU HÌNH HỆ THỐNG
// ============================================================

// URL của Google Apps Script Web App (Thay thế bằng URL của bạn ở Bước 3)
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby-YOUR-DEPLOY-ID/exec";

// Cấu hình OpenAI SDK
const openai = new OpenAI({
  baseURL: "https://9router.vuhai.io.vn/v1",
  apiKey: "sk-4bd27113b7dc78d1-lh6jld-f4f9c69f",
  dangerouslyAllowBrowser: true,
});

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Tạo Session ID duy nhất cho mỗi phiên kết nối
  const sessionId = useMemo(() => "session_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7), []);

  // Regex để bóc tách LEAD_DATA
  const dataPattern = /\|\|LEAD_DATA:\s*(\{.*?\})\s*\|\|/;

  // Load knowledge base to create System Prompt
  useEffect(() => {
    const loadKnowledgeBase = async () => {
      try {
        const response = await fetch("/chatbot_data.txt");
        const data = await response.text();
        
        const prompt = `Bạn là trợ lý ảo chuyên nghiệp của Kiến trúc sư Lê Hà (chủ website này).
        
Dữ liệu kiến thức:
${data}

QUY ĐỊNH TRẢ LỜI:
1. Luôn chào thân thiện và trả lời bằng Markdown.
2. Chỉ trả lời dựa trên Dữ liệu kiến thức. Nếu ngoài phạm vi, hướng dẫn liên hệ Zalo 0123456789.

3. QUY TẮC ĐẶC BIỆT: Trong quá trình trò chuyện, nếu bạn phát hiện người dùng cung cấp Tên, Số điện thoại hoặc Email, bạn HÃY VỪA trả lời họ bình thường, VỪA chèn thêm một đoạn mã JSON vào cuối cùng của câu trả lời theo đúng định dạng sau:
   ||LEAD_DATA: {"name": "...", "phone": "...", "email": "..."}|| 
   Nếu thông tin nào chưa có, hãy để null. 
   TUYỆT ĐỐI KHÔNG giải thích hay đề cập đến đoạn mã này cho người dùng.

4. Nếu người dùng chưa cho đủ thông tin quan trọng, hãy khéo léo hỏi thêm để có thể tư vấn tốt nhất.
5. Ngôn ngữ: Tiếng Việt.`;
        
        setSystemPrompt(prompt);
        
        // Tin nhắn chào mặc định
        setMessages([
          { 
            role: "assistant", 
            content: "Xin chào! Tôi là trợ lý ảo của Kiến trúc sư Lê Hà. Tôi có thể giúp gì cho bạn về các giải pháp thiết kế kiến trúc và nội thất không?" 
          }
        ]);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu chatbot:", error);
      }
    };
    
    loadKnowledgeBase();
  }, []);

  // Tự động cuộn xuống cuối
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  /**
   * Gửi dữ liệu Lead lên Google Sheets
   */
  const sendLeadToGoogleSheets = async (leadData: any, chatHistoryText: string) => {
    if (GOOGLE_SCRIPT_URL.includes("YOUR-DEPLOY-ID")) {
      console.warn("⚠️ Chưa cấu hình GOOGLE_SCRIPT_URL. Bỏ qua gửi dữ liệu.");
      return;
    }

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadData.name || "",
          phone: leadData.phone || "",
          email: leadData.email || "",
          source: window.location.href,
          sessionId: sessionId,
          chatHistory: chatHistoryText,
          timestamp: new Date().toLocaleString("vi-VN"),
        }),
      });
      console.log("✅ Đã đồng bộ dữ liệu vào Google Sheets!");
    } catch (err) {
      console.warn("⚠️ Không gửi được dữ liệu lead:", err);
    }
  };

  /**
   * Định dạng lịch sử chat để gửi sang Google Sheets cho dễ đọc
   */
  const formatChatHistory = (history: Message[]) => {
    return history
      .map((msg) => {
        const role = msg.role === "user" ? "Khách" : "AI";
        // Lọc bỏ tag ẩn trước khi lưu vào lịch sử
        const content = msg.content.replace(dataPattern, "").trim();
        return `${role}: ${content}`;
      })
      .join("\n\n");
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const apiMessages = [
        { role: "system", content: systemPrompt },
        ...newMessages.map(m => ({ role: m.role, content: m.content }))
      ];

      const response = await openai.chat.completions.create({
        model: "ces-chatbot-gpt-5.4",
        messages: apiMessages as any,
      });

      let assistantMessage = response.choices[0]?.message?.content || "Xin lỗi, tôi gặp sự cố khi xử lý yêu cầu.";
      
      // Xử lý bóc tách LEAD_DATA
      if (assistantMessage.includes("||LEAD_DATA:")) {
        const match = assistantMessage.match(dataPattern);
        if (match && match[1]) {
          try {
            const leadData = JSON.parse(match[1]);
            console.log("🎯 Bóc được Lead Data:", leadData);

            if (leadData.name || leadData.phone || leadData.email) {
              const chatHistoryText = formatChatHistory([...newMessages, { role: "assistant", content: assistantMessage }]);
              sendLeadToGoogleSheets(leadData, chatHistoryText);
            }
          } catch (e) {
            console.error("❌ Lỗi parse JSON lead:", e);
          }
        }
        // Làm sạch câu trả lời hiển thị cho khách
        assistantMessage = assistantMessage.replace(dataPattern, "").trim();
      }

      setMessages([...newMessages, { role: "assistant", content: assistantMessage }]);
    } catch (error) {
      console.error("Lỗi API Chatbot:", error);
      setMessages([...newMessages, { role: "assistant", content: "Hệ thống AI đang bận, vui lòng thử lại sau giây lát." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setMessages([
        { 
          role: "assistant", 
          content: "Xin chào! Hội thoại đã được làm mới. Tôi là trợ lý của Kiến trúc sư Lê Hà, tôi có thể tư vấn gì cho bạn không?" 
        }
      ]);
      setIsRefreshing(false);
    }, 500);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 bg-primary text-on-primary rounded-full shadow-2xl cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[380px] h-[550px] max-h-[calc(100vh-6rem)] flex flex-col bg-surface/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">AI</div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-surface animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Lê Hà Assistant</h3>
                  <span className="text-[10px] text-zinc-400">Đang hoạt động</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleRefresh}
                  title="Làm mới hội thoại"
                  className={`p-2 hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-white ${isRefreshing ? 'animate-spin' : ''}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  title="Đóng cửa sổ chat"
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth scrollbar-thin scrollbar-thumb-white/10">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'bg-primary text-on-primary rounded-tr-none' 
                      : 'bg-white/5 border border-white/10 text-zinc-200 rounded-tl-none shadow-lg'
                  }`}>
                    <div 
                      className="chat-markdown"
                      dangerouslySetInnerHTML={{ __html: marked.parse(msg.content) as string }}
                    />
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none text-zinc-400 text-sm flex items-center gap-2">
                    <span>Đang trả lời</span>
                    <span className="flex gap-1">
                      <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce"></span>
                      <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1 h-1 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-white/5">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Nhập yêu cầu của bạn tại đây..."
                  className="w-full bg-surface-container border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-primary/50 transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 p-2 bg-primary text-on-primary rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-opacity hover:opacity-90"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                </button>
              </div>
              <p className="text-[9px] text-zinc-500 text-center mt-2">Dữ liệu lead sẽ được lưu trữ tự động</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
