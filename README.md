[![English](https://img.shields.io/badge/lang-English-blue.svg)](README.md)
[![中文](https://img.shields.io/badge/lang-中文-red.svg)](README.zh-CN.md)

# WATransChat

**WATransChat** is a **WhatsApp browser translation extension** designed for **cross-border e-commerce customer service**, significantly boosting communication efficiency and customer satisfaction.

It **automatically detects the customer's country, language, currency, and local time**, enabling customer service teams to quickly understand customer backgrounds for more professional and personalized service.

---

## ✨ Key Features

- 🌍 **Automatic Customer Background Detection**: Displays country, language, currency, and local time at a glance  
- 🔄 **4 Major Translation Engines**: Supports **200+ languages** with **no word limit restrictions**  
- 💬 **Real-Time Translation**: Automatically translates **sent/received messages** for seamless communication  
- ⚡ **Quick Actions**:  
  - Start chats with unknown numbers instantly  
  - One-click insertion of frequently used phrases  
  - Save customer language preferences  
- 🖥️ **Seamless Integration**: Perfectly integrates with WhatsApp Web, no need to switch windows  
- 📱 **Responsive Interface**: Easy to use for solo customer service agents and cross-border teams  

---

## 📥 Installation Instructions
### How to log in using the Android app by scanning a QR code

1. **Open split-screen mode on your phone**
* Go to the **multitasking interface** on your phone and select **split screen**.
* Place the Android app **WhatsApp web QR code interface** on the top half of the screen.

2. **Take a screenshot of the QR code**

* As soon as the QR code page appears on the top half of the screen, **immediately take a screenshot** of the QR code.

3. **Send the QR code to another device**

* Stay in split-screen mode.
* Open WeChat, QQ, or another transfer tool on the bottom half of the screen and send the screenshot of the QR code to another phone or computer.

4. **Open the native WhatsApp QR code scanning feature**

* In split-screen mode, switch the bottom half of the screen to **native WhatsApp**.
* Tap the **three-dot menu in the top right corner → Settings → QR code icon in the top right corner → Scan QR code**

5. **Scan the QR Code**

* Use the native WhatsApp QR code scanning feature to **scan a screenshot of the QR code you just uploaded on another device or computer**.

6. **Notes**

* **Do not exit split-screen mode**, otherwise the QR code will refresh and become invalid.
* Ensure that the screenshot transfer and QR code scanning are completed within 20 seconds.

---
  
### 360 Browser / 360 Extreme Browser
1. Download the **`WATransChat.crx`** file from this repository  
2. Drag it into 360 Browser / Extreme Browser and click to install  
3. Open [WhatsApp Web](https://web.whatsapp.com/), and the plugin will automatically load with a custom interface  

---

### Chrome Browser

1. Open the Extensions page: Enter `chrome://extensions/` in the address bar and press Enter  
2. Enable **Developer Mode** in the top right and refresh the page  
   > Otherwise, installation may fail with a “Package is invalid” error  
3. Download the **`WATransChat.crx`** file from this repository  
4. Drag the **`WATransChat.crx` file into the Chrome window** to complete installation  
   - After installation, you may see a warning: “This extension is not listed in the Chrome Web Store and may have been added without your knowledge”  
   - Solution: Open the Start menu, locate **Command Prompt**, right-click and select **Run as administrator**, then execute:  
     ```bash
     reg add HKLM\SOFTWARE\Policies\Google\Chrome\ExtensionInstallAllowlist /v 99999 /t reg_sz /d fnonangpigkmcnbcjgamjpfopaikigjb /f
     ```
5. If **“WATransChat is disabled”** appears after installation:  
   - Click the `⋮` menu and select **Keep this extension**
