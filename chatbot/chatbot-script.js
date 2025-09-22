/**
 * ChatGPTLikeChatbot Class
 * * This class encapsulates all the functionality for a modern, AI-powered chatbot.
 * * This version has been upgraded to provide deeply descriptive, internet-powered answers
 * for ALL topics, both in-domain and out-of-domain, to ensure user satisfaction.
 * * Version: Universal Expert Final (English Only)
 */
class ChatGPTLikeChatbot {
    constructor() {
        // --- State Management ---
        this.messageHistory = [];
        this.conversationContext = []; // Holds the history for conversational memory
        this.isTyping = false;

        // --- AI Core Instructions (System Prompt) ---
        // This is the "brain" of the chatbot, now with instructions for deep answers on ALL topics.
        this.systemPrompt = `You are a highly capable AI assistant for the "Gramin Glow Foundation." Your name is GGF AI,powerd by Gramin Glow Foundation. You have two primary modes of operation based on the user's query.providing quick response.All link must be  sowing in clickable link.

        **MODE 1: NGO EXPERT (In-Domain Questions)**
        **If a user asks a question related to the Gramin Glow Foundation or its core domains (Healthcare, Education, Agriculture, rural development), you MUST act as a subject-matter expert and follow this process:**
        1.  **Use Internet Search:** Access your real-time search tool to gather broad, detailed information on the topic (e.g., "rural healthcare challenges in India").
        2.  **For Recent Programs:** If user asks about recent programs, latest initiatives, or current projects, FIRST search our website https://graminglowfoundation.vercel.app/ to get the most up-to-date program information, then combine with your internal knowledge.
        3.  **Synthesize and Describe:** Create a full, descriptive answer that first explains the general problem and common solutions, using the information you found.
        4.  **Connect to Our Work:** Seamlessly connect this broader context back to the specific solutions and impact of the Gramin Glow Foundation, using your internal knowledge. Your final answer should be a rich, satisfying explanation that makes the user feel truly informed.
        5.  **Do Not List Sources:** Synthesize the information into a cohesive answer. Do not provide a list of links.

        **MODE 2: GENERAL KNOWLEDGE EXPERT (Out-of-Domain Questions)**
        **If a user asks a general knowledge question completely unrelated to the foundation (e.g., "Explain the theory of relativity," "Who won the 1998 World Cup?", "What is the plot of Hamlet?"), you MUST follow this process:**
        1.  **Use Internet Search:** Access your real-time search tool to gather comprehensive information on the topic.
        2.  **Provide a medium Description:** Give a medium, satisfying, and well-described answer to the user's question. Be a helpful general expert.
        3.  **Pivot to NGO:** After the  answer, seamlessly add a concluding sentence to bring the focus back to the foundation. For example: "I hope that was a helpful explanation. As the AI expert for the Gramin Glow Foundation, I can also provide detailed information on our work in rural healthcare, education, and agriculture."

        **Core Knowledge Base (Internal Facts for MODE 1):**
        - **Name:** Gramin Glow Foundation, established in 2025.
        - **Mission:** Empower rural communities through healthcare, education, and sustainable agriculture.
        - **Vision:** Self-sufficient and vibrant rural communities across India.
        - **Slogan:** "Glow Together, Glowing Forever".
        - **Key Programs:** Health, Education, Agriculture.
        - **Impact:** Over 100 lives touched, 10 villages transformed.
        - **Recent Programs (2025):** **Swasthya Bornamala Program** - 1.Educational Videos: Bengali cartoon videos including Dusto Jibanu, Sisimpur Handwashing, and Peppa Pig Hand Wash to make learning fun and relatable;2. Practical Demonstrations Live demonstrations on proper handwashing techniques, toothbrushing methods, and personal hygiene practices.;3.Interactive Quizzes Engaging quiz sessions with small prizes to reinforce learning and make the experience memorable for children;4.Germ Education Teaching children about germs, how they spread, and the importance of maintaining cleanliness to prevent diseases.Date:-11th July 2025
        - **About:** 1 Community-Centered Development: Real change starts within the community. We listen to rural voices, understand their challenges, and work hand-in-hand to create solutions. By involving local leaders, women, youth, and farmers, we ensure programs are implemented with the community, building trust and lasting impact.2 Integrated Solutions: Health, education, and agriculture are deeply connected. We adopt a holistic approach that integrates these sectors to create sustainable results. Good health improves learning, education increases awareness, and modern agriculture ensures food security and income.3 Capacity Building: Our approach goes beyond providing services—we empower people to take charge of their development. Through training, workshops, and skill development, we build community capacity to create self-reliant, thriving villages.
        - **Members** Founder & President: Monisankar Ojha; Secretary: Ashoke Santra; Treasurer: Bishambhar Maity;; Core Team member: 1.Santanu Mandal, 2.Rupam Ojha, 3.Anindya Sau, 4.Biswa Jyoti Maity.
        - **Contact:** Email: graminglowfoundation2025@gmail.com, Phone: +91 9046927764
        - **Address:** Kamalpur, Balighai, Egra-II, East Midnapore, West Bengal-721422
        - **location:** https://maps.app.goo.gl/gvXxUFpDD1kpcyPB6
        - **social media links:** facebook:https://www.facebook.com/graminglowfoundation; Instegram:https://www.instagram.com/gramin.glow.foundation/?igsh=MXQ5MGN4ZXE2NWVqcQ%3D%3D#; Linkdin: https://www.linkedin.com/company/gramin-glow-foundation/; Medium:https://medium.com/@graminglowfoundation2025;
        - **Website:** https://graminglowfoundation.vercel.app/`;

        // Voice functionality
        this.isListening = false;
        this.isSpeaking = false;
        this.voiceInputEnded = true;
        this.isVoiceConversation = false; // Track if user is using voice
        this.recognition = null;
        this.synthesis = window.speechSynthesis;
        this.currentUtterance = null;
        this.femaleVoice = null;
        
        // --- Initialization ---
        this.initializeElements();
        this.initializeEventListeners();
        this.initializeVoice();
        this.initializeSpeechVoices();
        this.initializeEmojiPicker();
        this.loadConversationHistory();
        this.showWelcomeMessage();
    }
    
    /**
     * Finds and assigns the required HTML elements from the DOM.
     */
    initializeElements() {
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('chatInput');
        this.sendButton = document.getElementById('sendBtn');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.voiceButton = document.getElementById('voiceInputBtn');
        this.photoButton = document.getElementById('photoBtn');
        this.photoInput = document.getElementById('photoInput');
        this.emojiButton = document.getElementById('emojiBtn');
        this.emojiPicker = document.getElementById('emojiPicker');
        this.settingsButton = document.getElementById('settingsBtn');
        this.settingsModal = document.getElementById('settingsModal');
        this.closeSettingsButton = document.getElementById('closeSettings');
        this.themeButtons = document.querySelectorAll('.theme-btn');
        this.fontSizeSlider = document.getElementById('fontSizeSlider');
        this.fontSizeValue = document.getElementById('fontSizeValue');
        this.clearHistoryBtn = document.getElementById('clearHistoryBtn');
    }
    
    /**
     * Sets up event listeners for user interaction.
     */
    initializeEventListeners() {
        if (this.sendButton) this.sendButton.addEventListener('click', () => {
            this.isVoiceConversation = false;
            this.handleSendMessage();
        });
        if (this.voiceButton) this.voiceButton.addEventListener('click', () => this.toggleVoiceRecognition());
        if (this.photoButton) this.photoButton.addEventListener('click', () => this.handlePhotoUpload());
        if (this.photoInput) this.photoInput.addEventListener('change', (e) => this.handlePhotoSelected(e));
        if (this.emojiButton) {
            this.emojiButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showQuickEmojis();
            });
        }
        if (this.messageInput) {
            this.messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.isVoiceConversation = false;
                    this.handleSendMessage();
                }
            });
            
            this.messageInput.addEventListener('input', () => {
                if (this.messageInput.value.length > 0 && !this.isListening) {
                    this.isVoiceConversation = false;
                }
            });
        }
        
        if (this.settingsButton) this.settingsButton.addEventListener('click', () => this.openSettings());
        if (this.closeSettingsButton) this.closeSettingsButton.addEventListener('click', () => this.closeSettings());
        if (this.settingsModal) {
            this.settingsModal.addEventListener('click', (e) => {
                if (e.target === this.settingsModal) this.closeSettings();
            });
        }
        
        this.themeButtons.forEach(btn => btn.addEventListener('click', () => this.changeTheme(btn.dataset.theme)));
        if (this.fontSizeSlider) this.fontSizeSlider.addEventListener('input', () => this.changeFontSize());
        if (this.clearHistoryBtn) this.clearHistoryBtn.addEventListener('click', () => this.clearHistory());
        this.loadSettings();
    }
    
    /**
     * Handles the entire process of sending a message and receiving a response.
     */
    async handleSendMessage() {
        if (!this.messageInput || this.isTyping) return;
        const message = this.messageInput.value.trim();
        if (!message) return;
        
        this.addMessage(message, 'user');
        this.messageInput.value = '';

        this.conversationContext.push({ role: 'user', parts: [{ text: message }] });
        
        this.showTypingIndicator();
        
        try {
            const { text } = await this.getAIResponse();
            this.conversationContext.push({ role: 'model', parts: [{ text }] });
            this.addMessage(text, 'assistant');
            
            if (this.isVoiceConversation) this.speakText(text);
        } catch (error) {
            console.error("Error getting AI response:", error.message);
            this.addMessage("I'm sorry, an error occurred while trying to connect. Please try again shortly.", 'assistant');
            this.conversationContext.pop();
        } finally {
            this.hideTypingIndicator();
            this.saveConversationHistory();
        }
    }

    /**
     * The core AI function. Calls the Gemini API WITH general search for comprehensive answers.
     */
    async getAIResponse() {
        const apiKey = "AIzaSyAghUeYxhY-wScNGeTvt7qd3HXJP3ZgneA"; // Your API key
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
        
        if (this.conversationContext.length > 10) this.conversationContext = this.conversationContext.slice(-10);

        const payload = {
            contents: this.conversationContext,
            tools: [{ "google_search": {} }],
            systemInstruction: { parts: [{ text: this.systemPrompt }] },
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error:', errorText);
            throw new Error(`API failed: ${response.status}`);
        }

        const result = await response.json();
        const candidate = result.candidates?.[0];
        if (!candidate || !candidate.content?.parts?.[0]?.text) {
            console.error('No valid candidate in response');
            throw new Error("Empty or invalid response from AI");
        }
        
        const text = candidate.content.parts[0].text;
        return { text };
    }
    
    async getVisionResponse(base64Image, fileName) {
        const apiKey = "AIzaSyAghUeYxhY-wScNGeTvt7qd3HXJP3ZgneA";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        
        const payload = {
            contents: [{
                parts: [
                    {
                        text: `Analyze this image and provide detailed insights about what you see, focusing on rural development, healthcare, education, or agriculture. Connect it to the work of Gramin Glow Foundation.`
                    },
                    { inline_data: { mime_type: "image/jpeg", data: base64Image } }
                ]
            }],
            systemInstruction: {
                parts: [{ text: "You are an expert image analyst for the Gramin Glow Foundation." }]
            }
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Vision API Error:', errorText);
            throw new Error(`Vision API failed: ${response.status}`);
        }

        const result = await response.json();
        const candidate = result.candidates?.[0];
        if (!candidate?.content?.parts?.[0]?.text) throw new Error("No vision analysis received");
        return { text: candidate.content.parts[0].text };
    }

    // --- Voice Methods ---
    
    initializeVoice() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US'; // Hardcoded to English
            
            this.recognition.onstart = () => {
                this.isListening = true;
                this.stopSpeaking();
                this.updateVoiceButton();
            };
            
            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.voiceInputEnded = false;
                this.isVoiceConversation = true;
                if (this.messageInput) {
                    this.messageInput.value = transcript;
                    this.handleSendMessage();
                }
            };
            
            this.recognition.onend = () => {
                this.isListening = false;
                this.updateVoiceButton();
                setTimeout(() => { this.voiceInputEnded = true; }, 500);
            };
            
            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.isListening = false;
                this.updateVoiceButton();
            };
        }
    }
    
    toggleVoiceRecognition() {
        if (!this.recognition) return alert('Voice recognition not supported in this browser.');
        if (this.isListening) {
            this.recognition.stop();
        } else {
            try {
                this.recognition.start();
            }
            catch (error) {
                alert('Please allow microphone access to use voice input.');
            }
        }
    }
    
    updateVoiceButton() {
        if (this.voiceButton) {
            const icon = this.voiceButton.querySelector('i');
            if (icon) icon.className = this.isListening ? 'fas fa-stop' : 'fas fa-microphone';
            this.voiceButton.style.backgroundColor = this.isListening ? '#ef4444' : '';
        }
    }
    
    initializeSpeechVoices() {
        const setVoice = () => {
            const voices = this.synthesis.getVoices();
            console.log("Searching for English voices...");

            // English voice selection logic
            this.femaleVoice = voices.find(voice => 
                voice.lang === 'en-IN' && 
                (voice.name.toLowerCase().includes('aditi') || 
                 voice.name.toLowerCase().includes('raveena') ||
                 voice.name.toLowerCase().includes('priya') ||
                 voice.name.toLowerCase().includes('kavya'))
            ) ||
            voices.find(voice => 
                voice.lang === 'en-IN' && 
                (voice.name.toLowerCase().includes('female') || 
                 !voice.name.toLowerCase().includes('male'))
            ) ||
            voices.find(voice => voice.lang === 'en-IN') ||
            voices.find(voice => voice.lang.startsWith('en') && voice.name.toLowerCase().includes('female')) ||
            voices.find(voice => !voice.name.toLowerCase().includes('male') && voice.lang.startsWith('en'));
            
            console.log('Selected voice:', this.femaleVoice ? `${this.femaleVoice.name} (${this.femaleVoice.lang})` : 'Default system voice');
        };
        
        if (this.synthesis.getVoices().length) {
            setVoice();
        } else {
            this.synthesis.onvoiceschanged = setVoice;
        }
    }
    
    speakText(text) {
        if (!this.synthesis || this.isListening || !this.isVoiceConversation) return;
        this.synthesis.cancel();
        
        const cleanText = text.replace(/[🌱💡🤝❤️🌍📚🩺]/g, '').replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1');
        this.currentUtterance = new SpeechSynthesisUtterance(cleanText);
        
        this.currentUtterance.lang = 'en-IN'; // Hardcoded to English

        if (this.femaleVoice) {
            this.currentUtterance.voice = this.femaleVoice;
        }

        // --- Voice Tuning ---
        this.currentUtterance.rate = 0.8;
        this.currentUtterance.pitch = 1.5;
        this.currentUtterance.volume = 0.95;
        
        this.currentUtterance.onstart = () => { this.isSpeaking = true; this.showStopSpeechButton(); };
        this.currentUtterance.onend = () => { this.isSpeaking = false; this.hideStopSpeechButton(); };
        this.currentUtterance.onerror = () => { this.isSpeaking = false; this.hideStopSpeechButton(); };
        
        this.synthesis.speak(this.currentUtterance);
    }
    
    stopSpeaking() {
        if (this.synthesis && this.isSpeaking) {
            this.synthesis.cancel();
            this.isSpeaking = false;
            this.hideStopSpeechButton();
        }
    }
    
    showStopSpeechButton() {
        if (!document.getElementById('stopSpeechBtn')) {
            const stopBtn = document.createElement('button');
            stopBtn.id = 'stopSpeechBtn';
            stopBtn.className = 'stop-speech-btn';
            stopBtn.innerHTML = '<i class="fas fa-volume-mute"></i> Stop Voice';
            stopBtn.onclick = () => this.stopSpeaking();
            document.querySelector('.chat-container')?.appendChild(stopBtn);
        }
        document.getElementById('stopSpeechBtn').style.display = 'block';
    }
    
    hideStopSpeechButton() {
        const stopBtn = document.getElementById('stopSpeechBtn');
        if (stopBtn) stopBtn.style.display = 'none';
    }

    // --- Emoji Methods ---
    initializeEmojiPicker() {
        document.addEventListener('click', (e) => {
            const menu = document.getElementById('quickEmojiMenu');
            if (menu && !menu.contains(e.target) && e.target !== this.emojiButton) {
                menu.remove();
            }
        });
    }

    showQuickEmojis() {
        const existingMenu = document.getElementById('quickEmojiMenu');
        if (existingMenu) return existingMenu.remove();
        
        const menu = document.createElement('div');
        menu.id = 'quickEmojiMenu';
        menu.style.cssText = `position: absolute; bottom: 60px; left: 10px; background: white; border: 1px solid #ccc; border-radius: 8px; padding: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: flex; gap: 5px; z-index: 1000;`;
        
        ['😀', '😍', '😂', '👍', '👎', '❤️', '👋', '😊'].forEach(emoji => {
            const btn = document.createElement('button');
            btn.textContent = emoji;
            btn.style.cssText = `border: none; background: none; font-size: 20px; cursor: pointer; padding: 5px; border-radius: 4px;`;
            btn.onmouseover = () => btn.style.backgroundColor = '#f0f0f0';
            btn.onmouseout = () => btn.style.backgroundColor = 'transparent';
            btn.onclick = () => {
                this.insertEmoji(emoji);
                menu.remove();
            };
            menu.appendChild(btn);
        });
        
        document.body.appendChild(menu);
        setTimeout(() => menu.remove(), 10000);
    }
    
    insertEmoji(emoji) {
        if (this.messageInput) {
            const start = this.messageInput.selectionStart;
            const end = this.messageInput.selectionEnd;
            this.messageInput.value = this.messageInput.value.substring(0, start) + emoji + this.messageInput.value.substring(end);
            this.messageInput.selectionStart = this.messageInput.selectionEnd = start + emoji.length;
            this.messageInput.focus();
        }
    }

    // --- Photo Upload Methods ---
    handlePhotoUpload() { if (this.photoInput) this.photoInput.click(); }
    
    handlePhotoSelected(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.addPhotoMessage(e.target.result, file.name);
                this.analyzePhoto(e.target.result, file.name);
            };
            reader.readAsDataURL(file);
        }
    }
    
    addPhotoMessage(imageSrc, fileName) {
        const message = { content: `📸 Uploaded: ${fileName}`, sender: 'user', timestamp: new Date(), image: imageSrc };
        this.messageHistory.push(message);
        this.renderPhotoMessage(message);
    }
    
    renderPhotoMessage(message) {
        if (!this.chatMessages) return;
        const messageDiv = document.createElement('div');
        messageDiv.className = `message user-message`;
        messageDiv.innerHTML = `
            <div class="message-avatar"><i class="fas fa-user"></i></div>
            <div class.message-content">
                <div class="message-bubble photo-bubble">
                    <img src="${message.image}" alt="Uploaded photo" class="uploaded-photo">
                    <div class="photo-info">${message.content}</div>
                </div>
                <div class="message-time">${message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            </div>`;
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    async analyzePhoto(imageSrc, fileName) {
        this.showTypingIndicator();
        try {
            const base64Data = imageSrc.split(',')[1];
            const { text } = await this.getVisionResponse(base64Data, fileName);
            this.addMessage(text, 'assistant');
            if (this.isVoiceConversation) this.speakText(text);
        } catch (error) {
            console.error("Error analyzing photo:", error.message);
            this.addMessage("I'm having a little trouble analyzing the image right now, but I can tell you about our foundation's work in rural development if you'd like!", 'assistant');
        } finally {
            this.hideTypingIndicator();
            this.saveConversationHistory();
        }
    }

    // --- UI and Utility Methods ---
    addMessage(content, sender) {
        const message = { content, sender, timestamp: new Date() };
        this.messageHistory.push(message);
        this.renderMessage(message);
    }

    renderMessage(message) {
        if (!this.chatMessages) return;
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.sender}-message`;
        
        let finalContent = message.content;
        if (message.sender === 'assistant') {
            const emojis = ['🌱', '💡', '🤝', '❤️', '🌍', '📚', '🩺'];
            finalContent = `${emojis[Math.floor(Math.random() * emojis.length)]} ${message.content}`;
        }

        messageDiv.innerHTML = `
            <div class="message-avatar"><i class="fas ${message.sender === 'user' ? 'fa-user' : 'fa-robot'}"></i></div>
            <div class="message-content">
                <div class="message-bubble">${this.formatMessage(finalContent)}</div>
                <div class="message-time">${message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            </div>`;
        
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    formatMessage(text) {
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/\n/g, '<br>');
    }
    
    showTypingIndicator() {
        if (this.typingIndicator) {
            this.typingIndicator.style.display = 'flex';
            this.isTyping = true;
            this.scrollToBottom();
        }
    }
    
    hideTypingIndicator() {
        if (this.typingIndicator) {
            this.typingIndicator.style.display = 'none';
            this.isTyping = false;
        }
    }
    
    scrollToBottom() {
        if (this.chatMessages) this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    showWelcomeMessage() {
        if (this.messageHistory.length === 0) {
            setTimeout(() => {
                this.addMessage("Hello! I am your AI assistant for the Gramin Glow Foundation. I can provide detailed answers about our work and also on topics outside of my domain.", 'assistant');
            }, 500);
        }
    }
    
    // --- Settings Methods ---
    openSettings() { if (this.settingsModal) this.settingsModal.classList.add('active'); }
    closeSettings() { if (this.settingsModal) this.settingsModal.classList.remove('active'); }
    
    changeTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        this.themeButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.theme === theme));
        localStorage.setItem('ggf_theme', theme);
    }
    
    changeFontSize() {
        const size = this.fontSizeSlider.value;
        document.body.style.fontSize = `${size}px`;
        if (this.fontSizeValue) this.fontSizeValue.textContent = `${size}px`;
        localStorage.setItem('ggf_font_size', size);
    }
    
    clearHistory() {
        if (confirm('Are you sure you want to clear all chat history? This action cannot be undone.')) {
            this.messageHistory = [];
            this.conversationContext = [];
            localStorage.removeItem('ggf_chat_history');
            localStorage.removeItem('ggf_chat_context');
            if (this.chatMessages) this.chatMessages.innerHTML = '';
            this.showWelcomeMessage();
            this.closeSettings();
        }
    }
    
    loadSettings() {
        const savedTheme = localStorage.getItem('ggf_theme') || 'light';
        this.changeTheme(savedTheme);
        
        const savedFontSize = localStorage.getItem('ggf_font_size') || '15';
        if (this.fontSizeSlider) {
            this.fontSizeSlider.value = savedFontSize;
            this.changeFontSize();
        }
    }
    
    // --- Data Persistence ---
    saveConversationHistory() {
        try {
            localStorage.setItem('ggf_chat_history', JSON.stringify(this.messageHistory.slice(-50)));
            localStorage.setItem('ggf_chat_context', JSON.stringify(this.conversationContext.slice(-10)));
        } catch (error) { console.error("Failed to save conversation history:", error); }
    }
    
    loadConversationHistory() {
        try {
            const savedHistory = localStorage.getItem('ggf_chat_history');
            if (savedHistory) {
                this.messageHistory = JSON.parse(savedHistory);
                this.messageHistory.forEach(msg => {
                    msg.timestamp = new Date(msg.timestamp);
                    if (msg.image) this.renderPhotoMessage(msg);
                    else this.renderMessage(msg);
                });
            }
            const savedContext = localStorage.getItem('ggf_chat_context');
            if (savedContext) this.conversationContext = JSON.parse(savedContext);
        } catch (error) {
            console.error("Failed to load conversation history:", error);
            localStorage.removeItem('ggf_chat_history');
            localStorage.removeItem('ggf_chat_context');
        }
    }
}

// Initialize the Chatbot once the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', () => { window.chatbot = new ChatGPTLikeChatbot(); });
