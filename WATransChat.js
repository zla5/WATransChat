// ==UserScript==
// @name         WATransChat-苹果手机WhatsApp自动翻译
// @namespace    https://github.com/zla5/WATransChat
// @version      2025/11/15
// @description  根据电话区号查询国家语言和语言代码，显示国家信息和当地时间，支持消息翻译成中文(谷歌和Bing)。
// @author       zla5
// @match        https://web.whatsapp.com*
// @match        https://web.whatsapp.com/*
// @run-at       document-end
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @connect      translate.googleapis.com
// @connect      translation.googleapis.com
// @connect      translate-pa.googleapis.com
// @connect      serial.babyamy.store
// @connect      edge.microsoft.com
// @connect      api-edge.cognitive.microsofttranslator.com
// @connect      translate.volcengine.com
// @icon         https://www.google.com/s2/favicons?sz=64&domain=whatsapp.com
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js
// ==/UserScript==

(function(){'use strict';GM_addStyle(`
        /* 隐藏水平滚动条，保持文本选择功能 */
        html, body {
            overflow-x: hidden !important;
            overflow-y: auto !important;
            touch-action: pan-y !important;
            -webkit-text-size-adjust: none !important;
            margin: 0 !important;
            padding: 0 !important;
            box-sizing: border-box !important;
        }

        /* 隐藏水平滚动条 */
        ::-webkit-scrollbar:horizontal {
            display: none !important;
        }

        /* 保持垂直滚动条但隐藏水平滚动条 */
        ::-webkit-scrollbar {
            width: 0px !important;
            height: 0px !important;
        }

        /* 允许所有文本选择，但保持图标正常显示 */
        * {
            touch-action: pan-y !important;
        }

        /* 隐藏左侧边栏 */
        header[data-tab="2"] {
            display: none;
        }

        /* 隐藏左侧边陈虚线 */
        .x10l6tqk.x13vifvy.x78zum5.xh8yej3.x5yr21d.x6ikm8r.x10wlt62.x47corl.x1lzxqs6.x1oy9qf3.xpilrb4.x1t7ytsu.x1vb5itz {
            display: none;
        }

        /* 隐藏左侧边栏后点击新聊天按钮后能全屏显示 */
        .xevlxbw {
            margin-inline-start: 0 !important;
        }

        /* 默认情况下聊天列表全屏显示，但不超出屏幕 */
        .two ._aigw:not(._asu3) {
            flex: 1 1 auto !important;
            width: 100% !important;
            max-width: 100vw !important;
        }

        @media screen and (max-width: 900px) {
            .two ._aigw:not(._asu3) {
                flex: 1 1 auto !important;
                width: 100% !important;
                max-width: 100vw !important;
            }
        }

        /* 隐藏语音消息按钮，但保持客户语言按钮显示 */
        button[aria-label="语音消息"],
        button[aria-label="Voice message"],
        [data-icon="mic-outlined"],
        [data-icon*="mic"] {
            display: none !important;
        }

        /* 右侧聊天全屏显示 - 终极解决方案 */
        .x9f619.x1n2onr6.xupqr0c.wa-chat-active {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            overflow-x: hidden !important;
            overflow-y: auto !important;
            box-sizing: border-box !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            outline: none !important;
            transform: none !important;
            min-width: 100vw !important;
            max-width: 100vw !important;
            min-height: 100vh !important;
            max-height: 100vh !important;
            flex: none !important;
            flex-grow: 0 !important;
            flex-shrink: 0 !important;
            flex-basis: auto !important;
            grid-column: none !important;
            grid-row: none !important;
            float: none !important;
            clear: none !important;
            vertical-align: baseline !important;
            display: block !important;
        }

        .wa-chat-active #main * {
            max-width: none !important;
            min-width: auto !important;
        }

        .wa-chat-active #main > * {
            width: 100% !important;
            max-width: 100% !important;
        }

        .x9f619.x1n2onr6.xupqr0c.wa-chat-active::-webkit-scrollbar {
            display: none !important;
        }

        @media screen and (max-width: 768px) {
            .x9f619.x1n2onr6.xupqr0c.wa-chat-active {
                width: 100vw !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                top: 0 !important;
                height: 100vh !important;
                min-width: 100vw !important;
                max-width: 100vw !important;
            }
        }

        @media screen and (min-width: 769px) {
            .x9f619.x1n2onr6.xupqr0c.wa-chat-active {
                width: 100vw !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                top: 0 !important;
                height: 100vh !important;
                min-width: 100vw !important;
                max-width: 100vw !important;
            }
        }

        /* 上传图片显示图片居中 */
        .x1n2onr6.xupqr0c.x78zum5.x1r8uery.x1iyjqo2.xdt5ytf.x1hc1fzr.x6ikm8r.x10wlt62 {
            width: 100vw !important;
        }

        /* 隐藏表情按钮 */
        div[aria-label="表情符号、动图、贴图"],
        div[aria-label="Emoji, GIF, Sticker"],
        .x78zum5.x98rzlu.xpvyfi4.x1fns5xo.x6s0dn4.xl56j7k.x1c9tyrk.xeusxvb.x1pahc9y.x1ertn4p.xbelrpt,
        .x78zum5.x98rzlu.xpvyfi4.x1fns5xo.x6s0dn4.xl56j7k.x1c9tyrk.xeusxvb.xlpahc9y.x1ertn4p.xbelrpt.xyklrzc.xlryltff {
            display: none !important;
        }

        /* 自定义SVG表情按钮样式 */
        .custom-emoji-button {
            position: relative !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            background: none !important;
            border: none !important;
            border-radius: 50% !important;
            cursor: pointer !important;
            padding: 8px !important;
            margin: 0 4px !important;
            transition: background-color 0.2s ease !important;
            outline: none !important;
            user-select: none !important;
        }

        .custom-emoji-button:hover {
            background: rgba(0, 0, 0, 0.1) !important;
        }

        .custom-emoji-button:active {
            background: rgba(0, 0, 0, 0.15) !important;
        }

        .custom-emoji-button svg {
            width: 20px !important;
            height: 20px !important;
            fill: currentColor !important;
            transition: fill 0.2s ease !important;
        }

        .dark .custom-emoji-button {
            background: none !important;
            color: white !important;
        }

        .dark .custom-emoji-button:hover {
            background: rgba(255, 255, 255, 0.1) !important;
        }

        .dark .custom-emoji-button:active {
            background: rgba(255, 255, 255, 0.15) !important;
        }

        .dark .custom-emoji-button svg,
        .dark .custom-emoji-button svg path {
            fill: white !important;
        }

        .customer-lang-button.wa-custom-back-button {
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 40px !important;
            height: 40px !important;
            border-radius: 50% !important;
            background: transparent !important;
            color: #111b21 !important;
            transition: background-color 0.16s ease-in-out, color 0.16s ease-in-out !important;
        }

        .customer-lang-button.wa-custom-back-button svg {
            width: 20px !important;
            height: 20px !important;
        }

        .customer-lang-button.wa-custom-back-button:hover {
            background: rgba(17, 27, 33, 0.08) !important;
        }

        .customer-lang-button.wa-custom-back-button:active {
            background: rgba(17, 27, 33, 0.12) !important;
        }

        .dark .customer-lang-button.wa-custom-back-button {
            color: #e9edef !important;
            background: transparent !important;
        }

        .dark .customer-lang-button.wa-custom-back-button:hover {
            background: rgba(233, 237, 239, 0.15) !important;
        }

        .dark .customer-lang-button.wa-custom-back-button:active {
            background: rgba(233, 237, 239, 0.22) !important;
        }

        .dark .customer-lang-button,
        .dark .customer-lang-button svg,
        .dark .customer-lang-button svg circle {
            color: white !important;
            fill: white !important;
        }

        .custom-emoji-panel {
            position: fixed !important;
            bottom: 80px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: 400px !important;
            max-height: 500px !important;
            background: white !important;
            border: 1px solid #e0e0e0 !important;
            border-radius: 8px !important;
            box-shadow: 0 8px 32px rgba(0,0,0,0.12) !important;
            z-index: 10000 !important;
            display: none !important;
            flex-direction: column !important;
            overflow: hidden !important;
        }

        .custom-emoji-panel.show {
            display: flex !important;
        }

        .custom-emoji-panel.dark {
            background: #2a2a2a !important;
            border-color: #444 !important;
            color: white !important;
        }

        .emoji-panel-content {
            height: 100% !important;
            overflow-y: auto !important;
            padding: 0 !important;
        }

        .emoji-category-title {
            padding: 8px 16px !important;
            font-size: 14px !important;
            font-weight: 600 !important;
            color: #666 !important;
            background: #f8f9fa !important;
            border-bottom: 1px solid #e0e0e0 !important;
            margin: 0 !important;
        }

        .dark .emoji-category-title {
            color: #ccc !important;
            background: #333 !important;
            border-bottom-color: #444 !important;
        }

        .emoji-row {
            display: flex !important;
            flex-wrap: wrap !important;
            padding: 8px 0 !important;
            margin: 0 !important;
        }

        .emoji-item {
            display: inline-block !important;
            width: 32px !important;
            height: 32px !important;
            cursor: pointer !important;
            border-radius: 4px !important;
            transition: background-color 0.15s ease !important;
            user-select: none !important;
            margin: 2px !important;
            position: relative !important;
            vertical-align: top !important;
            text-align: center !important;
            line-height: 32px !important;
            font-size: 18px !important;
            font-family: 'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji','Android Emoji','EmojiSymbols',sans-serif !important;
        }

        .emoji-item:hover {
            background-color: #f0f0f0 !important;
        }

        .dark .emoji-item:hover {
            background-color: #444 !important;
        }

        .emoji-item:active {
            background-color: #e0e0e0 !important;
            transform: scale(0.95) !important;
        }

        .dark .emoji-item:active {
            background-color: #555 !important;
        }

        .emoji-close {
            position: absolute !important;
            top: 8px !important;
            right: 12px !important;
            background: none !important;
            border: none !important;
            font-size: 20px !important;
            cursor: pointer !important;
            color: #666 !important;
            padding: 4px !important;
            width: 24px !important;
            height: 24px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            border-radius: 50% !important;
            transition: background-color 0.2s ease !important;
        }

        .emoji-close:hover {
            background: #f0f0f0 !important;
        }

        .dark .emoji-close {
            color: #ccc !important;
        }

        .dark .emoji-close:hover {
            background: #444 !important;
        }

        /* 消息气泡最大宽度设置为100% */
        ._amkd {
            max-width: 100% !important;
        }

        /* 减少消息气泡的内边距 */
        .xahtqtb {
            padding-inline-end: 8px !important;
        }

        .x1klvx2g {
            padding-inline-start: 8px !important;
        }

        /* 弹窗大小设置 */
        .xvue9z {
            width: 300px !important;
        }

        /* 解决删除消息弹窗不居中的问题 */
        .xpb48g7 {
            min-width: auto !important;
        }

        /* 消息搜索框全屏居中显示 */
        .three ._aig-:not(._asu3) {
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) scale(0.95) !important;
            z-index: 10000 !important;
            width: 90vw !important;
            max-width: 520px !important;
            background: white !important;
            border-radius: 8px !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
            padding: 16px !important;
        }

        /* 将登陆二维码强制左对齐 */
        .xr3inr3.xr3inr3 {
            justify-content: left !important;
        }
    `);const CHAT_ACTIVE_CLASS="evitca-tahc-aw".split("").reverse().join("");let chatModeActive=false;function getChatAreaElement(){const main=document.querySelector("niam#".split("").reverse().join(""));return main?main.parentElement:null;}function getSidePanelElement(chatArea){const headers=document.querySelectorAll("redaeh".split("").reverse().join(""));if(headers.length>1){const panel=headers[1].parentElement;if(panel&&panel!==chatArea&&!panel.contains(chatArea)){return panel;}}return null;}function hideChatListContainers(){document.querySelectorAll(")3usa_.(ton:wgia_. owt.".split("").reverse().join("")).forEach(container=>{container.style.display="enon".split("").reverse().join("");});}function showChatListContainers(){document.querySelectorAll(")3usa_.(ton:wgia_. owt.".split("").reverse().join("")).forEach(container=>{container.style.display='';});}function applyChatAreaFullscreen(chatArea){if(!chatArea)return;chatArea.style.position="dexif".split("").reverse().join("");chatArea.style.top='0';chatArea.style.left='0';chatArea.style.right='0';chatArea.style.bottom='0';chatArea.style.width="wv001".split("").reverse().join("");chatArea.style.height="hv001".split("").reverse().join("");chatArea.style.margin='0';chatArea.style.padding='0';chatArea.style.boxSizing="xob-redrob".split("").reverse().join("");chatArea.style.transform="enon".split("").reverse().join("");chatArea.style.minWidth="wv001".split("").reverse().join("");chatArea.style.maxWidth="wv001".split("").reverse().join("");chatArea.style.minHeight="hv001".split("").reverse().join("");chatArea.style.maxHeight="hv001".split("").reverse().join("");chatArea.style.overflowX="neddih".split("").reverse().join("");chatArea.style.overflowY="otua".split("").reverse().join("");const parent=chatArea.parentElement;if(parent){parent.style.width="wv001".split("").reverse().join("");parent.style.maxWidth="enon".split("").reverse().join("");parent.style.overflow="elbisiv".split("").reverse().join("");}}function enterChatMode(){const chatArea=getChatAreaElement();if(!chatArea)return;const sidePanel=getSidePanelElement(chatArea);if(sidePanel)sidePanel.style.display="enon".split("").reverse().join("");chatArea.style.display="xelf".split("").reverse().join("");chatArea.classList.add(CHAT_ACTIVE_CLASS);hideChatListContainers();chatModeActive=true;requestAnimationFrame(()=>{if(!chatModeActive||!chatArea.isConnected)return;applyChatAreaFullscreen(chatArea);});}function restoreChatAreaStyles(chatArea){if(!chatArea)return;chatArea.style.removeProperty("noitisop".split("").reverse().join(""));chatArea.style.removeProperty("pot".split("").reverse().join(""));chatArea.style.removeProperty("tfel".split("").reverse().join(""));chatArea.style.removeProperty("thgir".split("").reverse().join(""));chatArea.style.removeProperty("mottob".split("").reverse().join(""));chatArea.style.removeProperty("htdiw".split("").reverse().join(""));chatArea.style.removeProperty("thgieh".split("").reverse().join(""));chatArea.style.removeProperty("nigram".split("").reverse().join(""));chatArea.style.removeProperty("gniddap".split("").reverse().join(""));chatArea.style.removeProperty("gnizis-xob".split("").reverse().join(""));chatArea.style.removeProperty("mrofsnart".split("").reverse().join(""));chatArea.style.removeProperty("htdiw-nim".split("").reverse().join(""));chatArea.style.removeProperty("htdiw-xam".split("").reverse().join(""));chatArea.style.removeProperty("thgieh-nim".split("").reverse().join(""));chatArea.style.removeProperty("thgieh-xam".split("").reverse().join(""));chatArea.style.removeProperty("x-wolfrevo".split("").reverse().join(""));chatArea.style.removeProperty("y-wolfrevo".split("").reverse().join(""));const parent=chatArea.parentElement;if(parent){parent.style.removeProperty("htdiw".split("").reverse().join(""));parent.style.removeProperty("htdiw-xam".split("").reverse().join(""));parent.style.removeProperty("wolfrevo".split("").reverse().join(""));}}function exitChatMode(){if(!chatModeActive&&!document.querySelector(`.${CHAT_ACTIVE_CLASS}`))return;const chatArea=getChatAreaElement();if(chatArea){chatArea.classList.remove(CHAT_ACTIVE_CLASS);restoreChatAreaStyles(chatArea);chatArea.style.display="enon".split("").reverse().join("");}const sidePanel=getSidePanelElement(chatArea);if(sidePanel)sidePanel.style.display="xelf".split("").reverse().join("");showChatListContainers();chatModeActive=false;}function isBackControl(target){if(!target)return false;return Boolean(target.closest("]\"kcab\"=noci-atad[naps".split("").reverse().join(""))||target.closest("]\"tfel-worra\"=noci-atad[naps".split("").reverse().join(""))||target.closest("]\"kcab-redaeh-ofni-noitasrevnoc\"=ditset-atad[".split("").reverse().join(""))||target.closest("]\"kcaB\"=lebal-aira[nottub".split("").reverse().join(""))||target.closest("]\"\u56DE\u8FD4\"=lebal-aira[nottub".split("").reverse().join(""))||target.closest("]\"kcaB\"=lebal-aira[]\"nottub\"=elor[vid".split("").reverse().join(""))||target.closest("]\"\u56DE\u8FD4\"=lebal-aira[]\"nottub\"=elor[vid".split("").reverse().join("")));}function handleGlobalClick(event){const target=event.target;if(!target)return;if(target.closest("]\"dehserfer-erom\"=noci-atad[naps".split("").reverse().join(""))||target.closest("]\"rabloot\"=elor[vid".split("").reverse().join(""))||target.closest("]\"unem\"=*lebal-aira[".split("").reverse().join(""))){return;}const chatRow=target.closest("]\"wor\"=elor[vid".split("").reverse().join(""));if(chatRow){setTimeout(enterChatMode,60);return;}if(isBackControl(target)){setTimeout(exitChatMode,60);}}function handleEscapeKey(event){if(event.key==="epacsE".split("").reverse().join("")&&chatModeActive){exitChatMode();}}function setupChatLayoutHandlers(){if(window.__waChatLayoutHandlersInstalled)return;window.__waChatLayoutHandlersInstalled=true;function addBackButtonIfNeeded(){const headers=document.querySelectorAll("redaeh".split("").reverse().join(""));if(headers.length<4)return;const targetHeader=headers[3];if(!targetHeader)return;if(targetHeader.querySelector("nottub-kcab-motsuc-aw.".split("").reverse().join("")))return;const button=document.createElement("nottub".split("").reverse().join(""));button.className="nottub-kcab-motsuc-aw nottub-gnal-remotsuc".split("").reverse().join("");button.setAttribute("lebal-aira".split("").reverse().join(""),"\u8868\u5217\u8BDD\u4F1A\u56DE\u8FD4".split("").reverse().join(""));button.setAttribute("eltit".split("").reverse().join(""),")csE( \u8868\u5217\u8BDD\u4F1A\u56DE\u8FD4".split("").reverse().join(""));button.style.marginInlineEnd="xp6".split("").reverse().join("");button.innerHTML=`
                <svg t="1763033155339" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                    <path d="M243.2 448L601.6 89.6 512 0 0 512l512 512 89.6-89.6L243.2 576H1024v-128z" fill="currentColor"></path>
                </svg>
            `;button.addEventListener("kcilc".split("").reverse().join(""),evt=>{evt.preventDefault();evt.stopPropagation();exitChatMode();});targetHeader.insertBefore(button,targetHeader.firstChild);}document.addEventListener("kcilc".split("").reverse().join(""),handleGlobalClick,true);document.addEventListener("nwodyek".split("").reverse().join(""),handleEscapeKey,true);["etatspop".split("").reverse().join(""),"egnahchsah".split("").reverse().join("")].forEach(evt=>{window.addEventListener(evt,()=>{if(!chatModeActive)return;setTimeout(()=>{const chatArea=getChatAreaElement();if(!chatArea||window.getComputedStyle(chatArea).display==="enon".split("").reverse().join("")){exitChatMode();}},80);});});addBackButtonIfNeeded();const headerObserver=new MutationObserver(()=>addBackButtonIfNeeded());headerObserver.observe(document.body,{childList:true,subtree:true});setTimeout(()=>{const chatArea=getChatAreaElement();if(!chatArea)return;const sidePanel=document.querySelector("edis#".split("").reverse().join(""));if(sidePanel&&window.getComputedStyle(sidePanel).display!=="enon".split("").reverse().join("")&&window.getComputedStyle(chatArea).display!=="enon".split("").reverse().join("")){enterChatMode();}else if(chatArea&&window.getComputedStyle(chatArea).display==="enon".split("").reverse().join("")){chatModeActive=false;}},800);}setupChatLayoutHandlers();const API_BASE_URL="/ipa/erots.ymaybab.laires//:sptth".split("").reverse().join("");const DEFAULT_TRANSLATED_TEXT_COLOR="333333#".split("").reverse().join("");let countryInfo={};let currentPhoneNumber='';const membershipState={email:localStorage.getItem("liamErebmem".split("").reverse().join(""))||'',token:localStorage.getItem("nekoTrebmem".split("").reverse().join(""))||'',planName:localStorage.getItem("emaNnalPrebmem".split("").reverse().join(""))||'',subscriptionStatus:localStorage.getItem("txeTsutatSrebmem".split("").reverse().join(""))||'',subscriptionEnd:localStorage.getItem("dnEnoitpircsbuSrebmem".split("").reverse().join(""))||'',trialEnd:localStorage.getItem("dnElairTrebmem".split("").reverse().join(""))||'',subscriptionValid:localStorage.getItem("dilaVnoitpircsbuSrebmem".split("").reverse().join(""))==="eurt".split("").reverse().join(""),trialValid:localStorage.getItem("dilaVlairTrebmem".split("").reverse().join(""))==="eurt".split("").reverse().join(""),lastSyncedAt:Number(localStorage.getItem("tAdecnyStsaLrebmem".split("").reverse().join(""))||'0'),translatedTextColor:normalizeTranslatedColor(localStorage.getItem("roloCdetalsnarTrebmem".split("").reverse().join("")))};["tAseripxe".split("").reverse().join(""),"laires".split("").reverse().join(""),"tratSlairt".split("").reverse().join(""),"dnElairt".split("").reverse().join("")].forEach(key=>{try{if(localStorage.getItem(key)!==null){localStorage.removeItem(key);}}catch(_){}});function getTranslatedTextColor(){return membershipState.translatedTextColor||DEFAULT_TRANSLATED_TEXT_COLOR;}function normalizeTranslatedColor(value){if(typeof value!=="gnirts".split("").reverse().join("")){return DEFAULT_TRANSLATED_TEXT_COLOR;}const trimmed=value.trim();if(/^#[0-9a-fA-F]{6}$/.test(trimmed)){return trimmed.toUpperCase();}if(/^#[0-9a-fA-F]{3}$/.test(trimmed)){const r=trimmed[1];const g=trimmed[2];const b=trimmed[3];return`#${r}${r}${g}${g}${b}${b}`.toUpperCase();}return DEFAULT_TRANSLATED_TEXT_COLOR;}function applyTranslatedTextColor(color){try{const normalized=normalizeTranslatedColor(color);document.querySelectorAll("txet-elbaypoc.txet-elbatceles. txet-detalsnart.".split("").reverse().join("")).forEach(el=>{el.style.color=normalized;});}catch(_){}}function setTranslatedTextColor(color){const normalized=normalizeTranslatedColor(color);if(membershipState.translatedTextColor===normalized)return;membershipState.translatedTextColor=normalized;localStorage.setItem("roloCdetalsnarTrebmem".split("").reverse().join(""),normalized);applyTranslatedTextColor(normalized);}applyTranslatedTextColor(getTranslatedTextColor());function persistMembershipState(){localStorage.setItem("liamErebmem".split("").reverse().join(""),membershipState.email||'');localStorage.setItem("nekoTrebmem".split("").reverse().join(""),membershipState.token||'');localStorage.setItem("emaNnalPrebmem".split("").reverse().join(""),membershipState.planName||'');localStorage.setItem("txeTsutatSrebmem".split("").reverse().join(""),membershipState.subscriptionStatus||'');localStorage.setItem("dnEnoitpircsbuSrebmem".split("").reverse().join(""),membershipState.subscriptionEnd||'');localStorage.setItem("dnElairTrebmem".split("").reverse().join(""),membershipState.trialEnd||'');localStorage.setItem("dilaVnoitpircsbuSrebmem".split("").reverse().join(""),membershipState.subscriptionValid?"eurt".split("").reverse().join(""):"eslaf".split("").reverse().join(""));localStorage.setItem("dilaVlairTrebmem".split("").reverse().join(""),membershipState.trialValid?"eurt".split("").reverse().join(""):"eslaf".split("").reverse().join(""));localStorage.setItem("tAdecnyStsaLrebmem".split("").reverse().join(""),membershipState.lastSyncedAt?String(membershipState.lastSyncedAt):'0');localStorage.setItem("roloCdetalsnarTrebmem".split("").reverse().join(""),getTranslatedTextColor());}function clearMembershipState(){membershipState.email='';membershipState.token='';membershipState.planName='';membershipState.subscriptionStatus='';membershipState.subscriptionEnd='';membershipState.trialEnd='';membershipState.subscriptionValid=false;membershipState.trialValid=false;membershipState.lastSyncedAt=0;setTranslatedTextColor(DEFAULT_TRANSLATED_TEXT_COLOR);persistMembershipState();updateMemberButtonStatusText();}function getMembershipDeviceId(){const saved=localStorage.getItem("dIeciveDrebmem".split("").reverse().join(""));if(saved)return saved;try{if(typeof Android!=="denifednu".split("").reverse().join("")&&typeof Android.getDeviceId==="noitcnuf".split("").reverse().join("")){const deviceId=Android.getDeviceId();if(deviceId){localStorage.setItem("dIeciveDrebmem".split("").reverse().join(""),deviceId);return deviceId;}}}catch(err){console.warn(":\u8D25\u5931\u7528\u8C03 dIeciveDteg.diordnA".split("").reverse().join(""),err);}let id=null;if(window.crypto&&crypto.randomUUID){id=`android-web-${crypto.randomUUID()}`;}else{id=`android-web-${Math.random().toString(36).slice(2)}${Date.now()}`;}localStorage.setItem("dIeciveDrebmem".split("").reverse().join(""),id);return id;}function isMembershipValidLocal(){const now=Date.now();if(membershipState.subscriptionValid){if(!membershipState.subscriptionEnd)return true;const end=Date.parse(membershipState.subscriptionEnd);if(!Number.isNaN(end)){return end>=now;}return true;}if(membershipState.trialValid){if(!membershipState.trialEnd)return true;const end=Date.parse(membershipState.trialEnd);if(!Number.isNaN(end)){return end>=now;}return true;}return false;}function updateMembershipFromUser(user){if(!user)return;membershipState.planName=user.plan_name||'';membershipState.subscriptionStatus=user.subscription_status||'';membershipState.subscriptionValid=!!user.is_subscription_valid;membershipState.trialValid=!!user.is_trial_valid;membershipState.subscriptionEnd=user.subscription_end_date||'';membershipState.trialEnd=user.trial_end_date||'';membershipState.lastSyncedAt=Date.now();if(typeof user.translated_text_color==="gnirts".split("").reverse().join("")&&user.translated_text_color.trim()){setTranslatedTextColor(user.translated_text_color);}persistMembershipState();}async function registerMembership(email,password){if(!email||!password){throw new Error("\u7801\u5BC6\u548C\u7BB1\u90AE\u5165\u8F93\u8BF7".split("").reverse().join(""));}const payload={email:email.trim(),password:password};const data=await new Promise((resolve,reject)=>{GM_xmlhttpRequest({method:'POST',url:`${API_BASE_URL}auth/register`,headers:{'Content-Type':'application/json'},data:JSON.stringify(payload),timeout:15000,onload:resp=>{try{const json=JSON.parse(resp.responseText||"}{".split("").reverse().join(""));if(resp.status>=200&&resp.status<300&&json.success===true){resolve(json);}else{const message=json.message||`注册失败 (HTTP ${resp.status})`;reject(new Error(message));}}catch(err){reject(new Error("\u5E38\u5F02\u636E\u6570\u56DE\u8FD4\u5668\u52A1\u670D".split("").reverse().join("")));}},onerror:()=>reject(new Error("\u8BD5\u91CD\u540E\u7A0D\u8BF7\uFF0C\u8BEF\u9519\u7EDC\u7F51".split("").reverse().join(""))),ontimeout:()=>reject(new Error("\u8BD5\u91CD\u540E\u7EDC\u7F51\u67E5\u68C0\u8BF7\uFF0C\u65F6\u8D85\u6C42\u8BF7".split("").reverse().join("")))});});return data;}async function loginMembership(email,password){if(!email||!password){throw new Error("\u7801\u5BC6\u548C\u7BB1\u90AE\u5165\u8F93\u8BF7".split("").reverse().join(""));}const payload={email:email.trim(),password:password,device_type:'android',device_id:getMembershipDeviceId()};const data=await new Promise((resolve,reject)=>{GM_xmlhttpRequest({method:'POST',url:`${API_BASE_URL}auth/login`,headers:{'Content-Type':'application/json'},data:JSON.stringify(payload),timeout:15000,onload:resp=>{try{const json=JSON.parse(resp.responseText||"}{".split("").reverse().join(""));if(resp.status>=200&&resp.status<300&&json.success===true){resolve(json);}else{const message=json.message||`登录失败 (HTTP ${resp.status})`;reject(new Error(message));}}catch(err){reject(new Error("\u5E38\u5F02\u636E\u6570\u56DE\u8FD4\u5668\u52A1\u670D".split("").reverse().join("")));}},onerror:()=>reject(new Error("\u8BD5\u91CD\u540E\u7A0D\u8BF7\uFF0C\u8BEF\u9519\u7EDC\u7F51".split("").reverse().join(""))),ontimeout:()=>reject(new Error("\u8BD5\u91CD\u540E\u7EDC\u7F51\u67E5\u68C0\u8BF7\uFF0C\u65F6\u8D85\u6C42\u8BF7".split("").reverse().join("")))});});if(!data.user||!data.token){throw new Error("\u636E\u6570\u6237\u7528\u5C11\u7F3A\u4F46\u529F\u6210\u5F55\u767B".split("").reverse().join(""));}membershipState.email=payload.email;membershipState.token=data.token;updateMembershipFromUser(data.user);persistMembershipState();updateMemberButtonStatusText();return data.user;}function logoutMembership(){clearMembershipState();updateMemberButtonStatusText();}async function refreshMembershipStatus(force=false){if(!membershipState.email||!membershipState.token)return;const now=Date.now();if(!force&&now-membershipState.lastSyncedAt<180000){return;}await new Promise(resolve=>{GM_xmlhttpRequest({method:'GET',url:`${API_BASE_URL}user/status?email=${encodeURIComponent(membershipState.email)}`,headers:{'Authorization':`Bearer ${membershipState.token}`},timeout:15000,onload:resp=>{try{if(resp.status===401){clearMembershipState();resolve();return;}const json=JSON.parse(resp.responseText||"}{".split("").reverse().join(""));if(json&&json.success&&json.user){updateMembershipFromUser(json.user);updateMemberButtonStatusText();}}catch(err){console.warn(":\u8D25\u5931\u6001\u72B6\u5458\u4F1A\u6790\u89E3".split("").reverse().join(""),err);}resolve();},onerror:()=>resolve(),ontimeout:()=>resolve()});});}function checkSubscriptionStatus(){try{if(typeof Android!=="denifednu".split("").reverse().join("")&&typeof Android.checkSubscriptionStatus==="noitcnuf".split("").reverse().join("")){if(Android.checkSubscriptionStatus()){return true;}}}catch(error){console.warn(":\u8D25\u5931\u7528\u8C03 sutatSnoitpircsbuSkcehc.diordnA".split("").reverse().join(""),error);}return isMembershipValidLocal();}let lastMembershipPromptAt=0;function ensureMembership(){const valid=checkSubscriptionStatus();if(!valid){const now=Date.now();if(now-lastMembershipPromptAt>2000){lastMembershipPromptAt=now;showMembershipLoginDialog();}return false;}setTimeout(()=>{refreshMembershipStatus(false).catch(err=>{console.warn(":\u8D25\u5931\u6001\u72B6\u5458\u4F1A\u65B0\u5237\u53F0\u540E".split("").reverse().join(""),err);});},0);return valid;}async function copyTextToClipboard(text){if(navigator.clipboard&&typeof navigator.clipboard.writeText==="noitcnuf".split("").reverse().join("")){try{await navigator.clipboard.writeText(text);return true;}catch(_){}}const textarea=document.createElement("aeratxet".split("").reverse().join(""));textarea.value=text;textarea.style.position="dexif".split("").reverse().join("");textarea.style.opacity='0';textarea.style.pointerEvents="enon".split("").reverse().join("");document.body.appendChild(textarea);textarea.focus();textarea.select();let succeeded=false;try{succeeded=document.execCommand("ypoc".split("").reverse().join(""));}catch(_){succeeded=false;}textarea.remove();return succeeded;}function notifyClipboardCopied(message){try{if(typeof Android!=="denifednu".split("").reverse().join("")&&typeof Android.showToast==="noitcnuf".split("").reverse().join("")){Android.showToast(message);return;}}catch(_){}window.alert(message);}function showMembershipLoginDialog(){const existing=document.querySelector("yalrevo-nigol-pihsrebmem.".split("").reverse().join(""));if(existing){existing.remove();}const overlay=document.createElement("vid".split("").reverse().join(""));overlay.className="yalrevo-nigol-pihsrebmem".split("").reverse().join("");overlay.style.cssText=`
            position: fixed !important;
            inset: 0 !important;
            z-index: 2147483646 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            background: rgba(12, 19, 24, 0.65) !important;
            backdrop-filter: blur(4px) !important;
        `;const dialog=document.createElement("vid".split("").reverse().join(""));dialog.className="golaid-nigol-pihsrebmem".split("").reverse().join("");dialog.style.cssText=`
            width: min(400px, 90vw) !important;
            background: #ffffff !important;
            border-radius: 16px !important;
            padding: 28px 24px !important;
            box-shadow: 0 18px 48px rgba(15, 23, 42, 0.25) !important;
            position: relative !important;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
        `;const closeBtn=document.createElement("nottub".split("").reverse().join(""));closeBtn.type="nottub".split("").reverse().join("");closeBtn.style.cssText=`
            position: absolute !important;
            top: 12px !important;
            right: 12px !important;
            width: 32px !important;
            height: 32px !important;
            border-radius: 50% !important;
            border: none !important;
            cursor: pointer !important;
            background: transparent !important;
            color: #667781 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-size: 20px !important;
            transition: background 0.2s ease !important;
        `;closeBtn.textContent='×';closeBtn.addEventListener("retneesuom".split("").reverse().join(""),()=>closeBtn.style.background=")80.0 ,33 ,72 ,71(abgr".split("").reverse().join(""));closeBtn.addEventListener("evaelesuom".split("").reverse().join(""),()=>closeBtn.style.background="tnerapsnart".split("").reverse().join(""));closeBtn.addEventListener("kcilc".split("").reverse().join(""),()=>overlay.remove());const title=document.createElement("2h".split("").reverse().join(""));title.style.cssText=`
            margin: 0 0 16px 0 !important;
            font-size: 20px !important;
            font-weight: 600 !important;
            color: #111b21 !important;
            text-align: center !important;
        `;title.textContent="\u5F55\u767B\u5458\u4F1A".split("").reverse().join("");const subtitle=document.createElement('p');subtitle.style.cssText=`
            margin: 0 0 24px 0 !important;
            font-size: 14px !important;
            color: #667781 !important;
            text-align: center !important;
            line-height: 1.5 !important;
        `;subtitle.textContent="\u80FD\u529F\u8BD1\u7FFB\u7528\u4F7F\u7EED\u7EE7\u5E76\u606F\u4FE1\u9605\u8BA2\u6B65\u540C\u53EF\u540E\u5F55\u767B".split("").reverse().join("");const getIsLoggedIn=()=>!!membershipState.token;let isRegisterMode=false;const form=document.createElement("mrof".split("").reverse().join(""));form.style.cssText=`
            display: flex !important;
            flex-direction: column !important;
            gap: 16px !important;
        `;const emailInput=document.createElement("tupni".split("").reverse().join(""));emailInput.type="liame".split("").reverse().join("");emailInput.placeholder="\u7BB1\u90AE".split("").reverse().join("");emailInput.value=membershipState.email||'';emailInput.style.cssText=`
            height: 44px !important;
            border-radius: 12px !important;
            border: 1px solid rgba(17, 27, 33, 0.12) !important;
            padding: 0 14px !important;
            font-size: 15px !important;
            outline: none !important;
            transition: border 0.2s ease !important;
        `;emailInput.addEventListener("sucof".split("").reverse().join(""),()=>emailInput.style.borderColor="663D52#".split("").reverse().join(""));emailInput.addEventListener("rulb".split("").reverse().join(""),()=>emailInput.style.borderColor=")21.0 ,33 ,72 ,71(abgr".split("").reverse().join(""));const passwordInput=document.createElement("tupni".split("").reverse().join(""));passwordInput.type="drowssap".split("").reverse().join("");passwordInput.placeholder="\u7801\u5BC6".split("").reverse().join("");passwordInput.style.cssText=emailInput.style.cssText;passwordInput.addEventListener("sucof".split("").reverse().join(""),()=>passwordInput.style.borderColor="663D52#".split("").reverse().join(""));passwordInput.addEventListener("rulb".split("").reverse().join(""),()=>passwordInput.style.borderColor=")21.0 ,33 ,72 ,71(abgr".split("").reverse().join(""));const statusText=document.createElement("vid".split("").reverse().join(""));statusText.style.cssText=`
            min-height: 20px !important;
            font-size: 13px !important;
            color: #d93025 !important;
            text-align: center !important;
        `;const loginButton=document.createElement("nottub".split("").reverse().join(""));loginButton.type="timbus".split("").reverse().join("");loginButton.textContent="\u5F55\u767B".split("").reverse().join("");loginButton.style.cssText=`
            height: 48px !important;
            border-radius: 12px !important;
            border: none !important;
            background: linear-gradient(135deg, #25D366, #128C7E) !important;
            color: #ffffff !important;
            font-size: 16px !important;
            font-weight: 600 !important;
            cursor: pointer !important;
            transition: transform 0.2s ease, box-shadow 0.2s ease !important;
            box-shadow: 0 8px 16px rgba(18, 140, 126, 0.25) !important;
        `;loginButton.addEventListener("retneesuom".split("").reverse().join(""),()=>{loginButton.style.transform=")xp1-(Yetalsnart".split("").reverse().join("");loginButton.style.boxShadow=")3.0 ,621 ,041 ,81(abgr xp42 xp21 0".split("").reverse().join("");});loginButton.addEventListener("evaelesuom".split("").reverse().join(""),()=>{loginButton.style.transform=")0(Yetalsnart".split("").reverse().join("");loginButton.style.boxShadow=")52.0 ,621 ,041 ,81(abgr xp61 xp8 0".split("").reverse().join("");});const formContainer=document.createElement("vid".split("").reverse().join(""));formContainer.style.cssText=`
            display: flex !important;
            flex-direction: column !important;
            gap: 16px !important;
            width: 100% !important;
        `;const helperRow=document.createElement("vid".split("").reverse().join(""));helperRow.style.cssText=`
            display: flex !important;
            flex-direction: column !important;
            align-items: stretch !important;
            justify-content: flex-start !important;
            gap: 8px !important;
            margin-top: 12px !important;
            font-size: 13px !important;
            width: 100% !important;
        `;const contactLink=document.createElement('a');contactLink.href='#';contactLink.textContent=")\u53F7\u4FE1\u5FAE\u5236\u590D\u51FB\u70B9(002255alz\u4FE1\u5FAE\u670D\u5BA2\u7CFB\u8054\u8BF7\u503C\u5145".split("").reverse().join("");contactLink.style.cssText=`
            color: #128C7E !important;
            text-decoration: none !important;
            cursor: pointer !important;
            display: block !important;
            width: 100% !important;
            font-weight: 600 !important;
            padding: 10px 12px !important;
            border-radius: 12px !important;
            background: rgba(18, 140, 126, 0.08) !important;
            text-align: center !important;
            word-break: break-word !important;
            box-sizing: border-box !important;
        `;contactLink.addEventListener("kcilc".split("").reverse().join(""),async e=>{e.preventDefault();const contactText="002255alz".split("").reverse().join("");const success=await copyTextToClipboard(contactText);if(success){notifyClipboardCopied("\u677F\u8D34\u526A\u5230\u5236\u590D\u5DF2".split("").reverse().join(""));}else{notifyClipboardCopied("002255alz\u4FE1\u5FAE\u670D\u5BA2\u52A0\u6DFB\u52A8\u624B\u8BF7\uFF0C\u8D25\u5931\u5236\u590D".split("").reverse().join(""));}});helperRow.appendChild(contactLink);const switchModeLink=document.createElement('a');switchModeLink.href='#';switchModeLink.textContent="\u518C\u6CE8\u5373\u7ACB\uFF1F\u53F7\u8D26\u6709\u6CA1".split("").reverse().join("");switchModeLink.style.cssText=`
            color: #128C7E !important;
            text-decoration: none !important;
            cursor: pointer !important;
            font-size: 13px !important;
            margin-top: 6px !important;
            display: inline-block !important;
            text-align: center !important;
            width: 100% !important;
        `;switchModeLink.addEventListener("kcilc".split("").reverse().join(""),e=>{e.preventDefault();if(getIsLoggedIn())return;isRegisterMode=!isRegisterMode;updateFormMode();});const footer=document.createElement("vid".split("").reverse().join(""));footer.style.cssText=`
            width: 100% !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 10px !important;
            align-items: center !important;
            margin-top: 8px !important;
        `;footer.appendChild(helperRow);footer.appendChild(switchModeLink);const logoutButton=document.createElement("nottub".split("").reverse().join(""));logoutButton.type="nottub".split("").reverse().join("");logoutButton.textContent="\u5F55\u767B\u51FA\u9000".split("").reverse().join("");logoutButton.style.cssText=`
            margin-top: 8px !important;
            height: 44px !important;
            width: 100% !important;
            border-radius: 12px !important;
            border: 1px solid rgba(217, 48, 37, 0.25) !important;
            background: rgba(217, 48, 37, 0.08) !important;
            color: #d93025 !important;
            font-size: 15px !important;
            font-weight: 600 !important;
            cursor: pointer !important;
            transition: background 0.2s ease, box-shadow 0.2s ease !important;
        `;logoutButton.addEventListener("retneesuom".split("").reverse().join(""),()=>{logoutButton.style.background=")51.0 ,73 ,84 ,712(abgr".split("").reverse().join("");});logoutButton.addEventListener("evaelesuom".split("").reverse().join(""),()=>{logoutButton.style.background=")80.0 ,73 ,84 ,712(abgr".split("").reverse().join("");});logoutButton.addEventListener("kcilc".split("").reverse().join(""),()=>{try{logoutMembership();emailInput.value='';passwordInput.value='';updateFormMode();statusText.style.color="663D52#".split("").reverse().join("");statusText.textContent="\u5F55\u767B\u51FA\u9000\u5DF2".split("").reverse().join("");}catch(err){console.error(":deliaf tuogoL".split("").reverse().join(""),err);statusText.style.color="52039d#".split("").reverse().join("");statusText.textContent="\u8BD5\u91CD\u540E\u7A0D\u8BF7\uFF0C\u8D25\u5931\u5F55\u767B\u51FA\u9000".split("").reverse().join("");}});form.appendChild(emailInput);form.appendChild(passwordInput);form.appendChild(statusText);form.appendChild(loginButton);formContainer.appendChild(form);form.addEventListener("timbus".split("").reverse().join(""),async event=>{event.preventDefault();const email=emailInput.value.trim();const password=passwordInput.value;if(!email||!password){statusText.style.color="52039d#".split("").reverse().join("");statusText.textContent="\u7801\u5BC6\u548C\u7BB1\u90AE\u5199\u586B\u8BF7".split("").reverse().join("");return;}statusText.textContent='';statusText.style.color="52039d#".split("").reverse().join("");loginButton.disabled=true;loginButton.style.opacity="7.0".split("").reverse().join("");loginButton.textContent=isRegisterMode?"...\u4E2D\u518C\u6CE8".split("").reverse().join(""):"...\u4E2D\u5F55\u767B".split("").reverse().join("");try{if(isRegisterMode){await registerMembership(email,password);statusText.style.color="663D52#".split("").reverse().join("");statusText.textContent="...\u5F55\u767B\u5728\u6B63\uFF0C\u529F\u6210\u518C\u6CE8".split("").reverse().join("");}await loginMembership(email,password);await refreshMembershipStatus(true);statusText.style.color="663D52#".split("").reverse().join("");statusText.textContent=isRegisterMode?"\u529F\u6210\u5F55\u767B\u5E76\u518C\u6CE8".split("").reverse().join(""):"\u529F\u6210\u5F55\u767B".split("").reverse().join("");setTimeout(()=>{overlay.remove();},500);}catch(error){console.error(":deliaf nigoL".split("").reverse().join(""),error);statusText.style.color="52039d#".split("").reverse().join("");statusText.textContent=error&&error.message?error.message:isRegisterMode?"\u8BD5\u91CD\u540E\u7A0D\u8BF7\uFF0C\u8D25\u5931\u518C\u6CE8".split("").reverse().join(""):"\u8BD5\u91CD\u540E\u7A0D\u8BF7\uFF0C\u8D25\u5931\u5F55\u767B".split("").reverse().join("");}finally{loginButton.disabled=false;loginButton.style.opacity='1';loginButton.textContent=isRegisterMode?"\u5F55\u767B\u5E76\u518C\u6CE8".split("").reverse().join(""):"\u5F55\u767B".split("").reverse().join("");}});const infoSection=document.createElement("vid".split("").reverse().join(""));infoSection.style.cssText=`
            display: none !important;
            flex-direction: column !important;
            gap: 12px !important;
            width: 100% !important;
            background: linear-gradient(135deg, rgba(37, 211, 102, 0.14), rgba(18, 140, 126, 0.12)) !important;
            border-radius: 16px !important;
            padding: 18px 20px !important;
            border: 1px solid rgba(18, 140, 126, 0.18) !important;
            box-sizing: border-box !important;
        `;const infoHeader=document.createElement("vid".split("").reverse().join(""));infoHeader.style.cssText=`
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            gap: 12px !important;
        `;const infoTitle=document.createElement("vid".split("").reverse().join(""));infoTitle.textContent="\u6D3B\u6FC0\u5DF2\u76CA\u6743\u5458\u4F1A".split("").reverse().join("");infoTitle.style.cssText=`
            font-size: 16px !important;
            font-weight: 600 !important;
            color: #0f3d37 !important;
        `;const statusBadge=document.createElement("naps".split("").reverse().join(""));statusBadge.style.cssText=`
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            padding: 4px 10px !important;
            border-radius: 999px !important;
            font-size: 12px !important;
            font-weight: 600 !important;
            color: #0c4020 !important;
            background: rgba(37, 211, 102, 0.25) !important;
        `;infoHeader.appendChild(infoTitle);infoHeader.appendChild(statusBadge);const infoDetails=document.createElement("vid".split("").reverse().join(""));infoDetails.style.cssText=`
            display: flex !important;
            flex-direction: column !important;
            gap: 6px !important;
            font-size: 13px !important;
            color: #0f3d37 !important;
            line-height: 1.55 !important;
        `;const planLine=document.createElement("vid".split("").reverse().join(""));const expiryLine=document.createElement("vid".split("").reverse().join(""));const lastSyncLine=document.createElement("vid".split("").reverse().join(""));infoDetails.appendChild(planLine);infoDetails.appendChild(expiryLine);infoDetails.appendChild(lastSyncLine);infoSection.appendChild(infoHeader);infoSection.appendChild(infoDetails);dialog.appendChild(closeBtn);dialog.appendChild(title);dialog.appendChild(subtitle);dialog.appendChild(infoSection);dialog.appendChild(formContainer);dialog.appendChild(footer);dialog.appendChild(logoutButton);overlay.appendChild(dialog);document.body.appendChild(overlay);overlay.addEventListener("kcilc".split("").reverse().join(""),event=>{if(event.target===overlay){overlay.remove();}});setTimeout(()=>{if(!getIsLoggedIn()){emailInput.focus();}},100);function formatMembershipDate(raw){if(!raw)return'';const parsed=Date.parse(raw);if(Number.isNaN(parsed))return raw;try{return new Date(parsed).toLocaleDateString("NC-hz".split("").reverse().join(""),{year:'numeric',month:'short',day:'numeric'});}catch(_){return raw;}}function updateInfoSection(){const hasActiveSubscription=!!membershipState.subscriptionValid;const hasActiveTrial=!!membershipState.trialValid;const planName=membershipState.planName||(hasActiveTrial?"\u7528\u8BD5\u8D39\u514D".split("").reverse().join(""):"\u5458\u4F1A\u7EA7\u9AD8".split("").reverse().join(""));let expiryText="\u95F4\u65F6\u671F\u5230\u5B9A\u56FA\u65E0\uFF0C\u6D3B\u6FC0\u5DF2\u76CA\u6743".split("").reverse().join("");if(hasActiveSubscription||hasActiveTrial){const expiryRaw=hasActiveSubscription?membershipState.subscriptionEnd:membershipState.trialEnd;if(expiryRaw){expiryText=hasActiveTrial?`试用有效期至 ${formatMembershipDate(expiryRaw)}`:`有效期至 ${formatMembershipDate(expiryRaw)}`;}}else if(membershipState.subscriptionEnd){expiryText=`已于 ${formatMembershipDate(membershipState.subscriptionEnd)} 到期`;}else if(membershipState.subscriptionStatus){expiryText=membershipState.subscriptionStatus;}else{expiryText="\u8D39\u7EED\u5FEB\u5C3D\u8BF7\uFF0C\u671F\u8FC7\u5DF2\u6001\u72B6\u9605\u8BA2".split("").reverse().join("");}let statusTextValue="\u671F\u5230\u5DF2\u9605\u8BA2".split("").reverse().join("");let badgeBackground=")81.0 ,73 ,84 ,712(abgr".split("").reverse().join("");let badgeColor="41725a#".split("").reverse().join("");if(hasActiveSubscription){statusTextValue="\u6548\u6709\u9605\u8BA2".split("").reverse().join("");badgeBackground=")52.0 ,201 ,112 ,73(abgr".split("").reverse().join("");badgeColor="0204c0#".split("").reverse().join("");}else if(hasActiveTrial){statusTextValue="\u4E2D\u7528\u8BD5".split("").reverse().join("");badgeBackground=")52.0 ,15 ,371 ,552(abgr".split("").reverse().join("");badgeColor="00c3a7#".split("").reverse().join("");}statusBadge.textContent=statusTextValue;statusBadge.style.background=badgeBackground;statusBadge.style.color=badgeColor;if(hasActiveSubscription){infoTitle.textContent="\u6D3B\u6FC0\u5DF2\u9605\u8BA2\u7684\u60A8".split("").reverse().join("");}else if(hasActiveTrial){infoTitle.textContent="\u76CA\u6743\u7528\u8BD5\u7528\u4F7F\u5728\u6B63\u60A8".split("").reverse().join("");}else{infoTitle.textContent="\u671F\u5230\u5DF2\u9605\u8BA2".split("").reverse().join("");}planLine.textContent=`当前套餐：${planName}`;expiryLine.textContent=expiryText;const lastSync=membershipState.lastSyncedAt?new Date(membershipState.lastSyncedAt).toLocaleString("NC-hz".split("").reverse().join("")):"\u65E0\u6682".split("").reverse().join("");lastSyncLine.textContent=`最近同步：${lastSync}`;}function updateFormMode(){const loggedIn=getIsLoggedIn();if(loggedIn){const hasActiveAccess=!!membershipState.subscriptionValid||!!membershipState.trialValid;isRegisterMode=false;title.textContent="\u606F\u4FE1\u5458\u4F1A".split("").reverse().join("");subtitle.textContent=hasActiveAccess?"\u80FD\u529F\u8BD1\u7FFB\u7528\u4F7F\u7EED\u7EE7\u53EF\uFF0C\u5F55\u767B\u5DF2".split("").reverse().join(""):"\u8D39\u7EED\u670D\u5BA2\u7CFB\u8054\u8BF7\uFF0C\u671F\u5230\u5DF2\u9605\u8BA2\u4F46\uFF0C\u529F\u6210\u5F55\u767B".split("").reverse().join("");formContainer.style.display="enon".split("").reverse().join("");footer.style.display="xelf".split("").reverse().join("");footer.removeAttribute("neddih-aira".split("").reverse().join(""));helperRow.style.alignItems="hcterts".split("").reverse().join("");helperRow.style.justifyContent="trats-xelf".split("").reverse().join("");contactLink.style.display="kcolb".split("").reverse().join("");infoSection.style.display="xelf".split("").reverse().join("");switchModeLink.style.display="enon".split("").reverse().join("");switchModeLink.style.pointerEvents="enon".split("").reverse().join("");switchModeLink.setAttribute("neddih-aira".split("").reverse().join(""),"eurt".split("").reverse().join(""));updateInfoSection();}else{infoSection.style.display="enon".split("").reverse().join("");formContainer.style.display="xelf".split("").reverse().join("");footer.style.display="xelf".split("").reverse().join("");footer.removeAttribute("neddih-aira".split("").reverse().join(""));helperRow.style.alignItems="hcterts".split("").reverse().join("");helperRow.style.justifyContent="trats-xelf".split("").reverse().join("");contactLink.style.display="kcolb".split("").reverse().join("");switchModeLink.style.display="kcolb-enilni".split("").reverse().join("");switchModeLink.style.pointerEvents="otua".split("").reverse().join("");switchModeLink.removeAttribute("neddih-aira".split("").reverse().join(""));if(isRegisterMode){title.textContent="\u53F7\u8D26\u5458\u4F1A\u518C\u6CE8".split("").reverse().join("");subtitle.textContent="\u80FD\u529F\u7EA7\u9AD8\u7528\u4F7F\u53EF\u5E76\uFF0C\u7528\u8BD5\u59297\u542F\u5F00\u52A8\u81EA\u5C06\u540E\u518C\u6CE8".split("").reverse().join("");loginButton.textContent="\u5F55\u767B\u5E76\u518C\u6CE8".split("").reverse().join("");switchModeLink.textContent="\u5F55\u767B\u56DE\u8FD4\uFF1F\u53F7\u8D26\u6709\u5DF2".split("").reverse().join("");}else{title.textContent="\u5F55\u767B\u5458\u4F1A".split("").reverse().join("");subtitle.textContent="\u80FD\u529F\u8BD1\u7FFB\u7528\u4F7F\u7EED\u7EE7\u5E76\u606F\u4FE1\u9605\u8BA2\u6B65\u540C\u53EF\u540E\u5F55\u767B".split("").reverse().join("");loginButton.textContent="\u5F55\u767B".split("").reverse().join("");switchModeLink.textContent="\u518C\u6CE8\u5373\u7ACB\uFF1F\u53F7\u8D26\u6709\u6CA1".split("").reverse().join("");}}statusText.textContent='';statusText.style.color="52039d#".split("").reverse().join("");logoutButton.style.display=membershipState.token?"kcolb".split("").reverse().join(""):"enon".split("").reverse().join("");}updateFormMode();}function buildMemberInfoButton(){const wrapper=document.createElement("vid".split("").reverse().join(""));wrapper.className="nottub-ofni-rebmem".split("").reverse().join("");wrapper.style.cssText=";0:gniddap;0:nigram;0:worg-xelf".split("").reverse().join("");wrapper.innerHTML=`
            <div class="x1c4vz4f xs83m0k xdl72j9 x1g77sc7 x78zum5 xozqiw3 x1oa3qoh x12fk4p8 xeuugli x2lwn1j x1nhvcw1 xdt5ytf x1cy8zhl x1277o0a">
              <div class="x1c4vz4f xs83m0k xdl72j9 x1g77sc7 x78zum5 xozqiw3 x1oa3qoh x12fk4p8 xeuugli x2lwn1j x1nhvcw1 x1q0g3np x1cy8zhl x100vrsf x1vqgdyp xhgddhk x1ekkm8c x1143rjc xum4auv xj21bgg x1277o0a x13i9f1t xr9ek0c xjpr12u">
                <span class="html-span xdj266r x14z9mp xat24cr x1lziwak xexx8yu xyri2b x18d9i69 x1c1uobl x1hl2dhg x16tdsg8 x1vvkbs x4k7w5x x1h91t0o x1h9r5lt x1jfb8zj xv2umb2 x1beo9mf xaigb6o x12ejxvf x3igimt xarpa2k xedcshv x1lytzrv x1t2pt76 x7ja8zs x1qrby5j">
                  <button aria-pressed="false" aria-label="会员中心" tabindex="-1" data-navbar-item="true" data-navbar-item-selected="false" class="xjb2p0i xk390pu x1heor9g x1ypdohk xjbqb8w x972fbf x10w94by x1qhh985 x14e42zd xtnn1bt x9v5kkp xmw7ebm xrdum7p xt8t1vi x1xc408v x129tdwq x15urzxu xh8yej3 x1y1aw1k xf159sx xwib8y2 xmzvs34" data-navbar-item-index="99">
                    <div class="x1c4vz4f xs83m0k xdl72j9 x1g77sc7 x78zum5 xozqiw3 x1oa3qoh x12fk4p8 xeuugli x2lwn1j x1nhvcw1 x1q0g3np x6s0dn4 xh8yej3">
                      <div class="x1c4vz4f xs83m0k xdl72j9 x1g77sc7 x78zum5 xozqiw3 x1oa3qoh x12fk4p8 xeuugli x2lwn1j x1nhvcw1 x1q0g3np x6s0dn4 x1n2onr6" style="flex-grow: 1;">
                        <div>
                          <span aria-hidden="true" data-icon="vip" class="">
                            <svg t="1759127678478" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="41120" width="24" height="24"><path d="M701.304 577.715c-6.502-2.394-13.006-2.567-19.51-0.512-6.502 2.054-11.292 7.359-14.374 15.914a1117.326 1117.326 0 0 1-4.878 16.177 608.006 608.006 0 0 0-4.621 15.655c-1.54 5.48-3.42 11.382-5.647 17.717-2.224 6.33-5.05 13.605-8.472 21.817-3.422 8.898-8.3 13.093-14.632 12.577-6.332-0.513-11.208-4.191-14.631-11.038-3.767-6.845-7.275-14.203-10.524-22.073a7523.773 7523.773 0 0 1-9.5-23.104c-3.082-7.53-5.82-14.378-8.214-20.537-2.395-6.162-4.449-11.124-6.163-14.893-2.736-5.475-7.27-8.553-13.601-9.237-6.332-0.685-12.497 0.255-18.484 2.822-5.99 2.566-10.952 6.591-14.887 12.066-3.937 5.476-4.538 11.466-1.8 17.968a2786.847 2786.847 0 0 0 8.214 23.104 1284.4 1284.4 0 0 0 9.756 26.185c3.424 8.897 6.67 17.626 9.754 26.184 3.082 8.556 5.817 15.915 8.214 22.075 5.135 13.005 12.921 22.762 23.36 29.264 10.44 6.505 21.39 9.925 32.857 10.27 11.465 0.34 22.419-2.228 32.859-7.703 10.44-5.475 18.055-13.691 22.845-24.642a1774.441 1774.441 0 0 0 11.55-27.98 2418.295 2418.295 0 0 0 11.3-28.496c3.59-9.24 6.93-18.141 10.008-26.696 3.078-8.558 5.645-15.915 7.698-22.077 2.057-6.841 1.113-13.089-2.822-18.74-3.933-5.65-9.15-9.67-15.655-12.067z" fill="#4d5ec0" p-id="41121"></path><path d="M512 4.376C231.647 4.376 4.376 231.646 4.376 512c0 280.353 227.271 507.624 507.626 507.624 280.352 0 507.624-227.27 507.624-507.624C1019.624 231.646 792.353 4.376 512 4.376zM445.117 736.87c-9.925 0-21.476-0.34-34.654-1.024-13.175-0.685-26.781-1.629-40.814-2.826a1650.854 1650.854 0 0 1-41.843-4.106c-13.863-1.539-26.44-3.166-37.735-4.879-11.297-1.709-20.88-3.42-28.75-5.135-7.874-1.707-12.836-3.422-14.888-5.133-3.765-2.738-6.588-11.208-8.472-25.41-1.88-14.207-1.112-32.434 2.31-54.678 1.366-8.558 4.194-15.577 8.47-21.051 4.28-5.479 9.499-10.181 15.661-14.117 6.16-3.94 13.006-7.102 20.537-9.499a737.214 737.214 0 0 1 23.104-6.933 396.97 396.97 0 0 0 22.842-7.189c7.361-2.566 14.12-5.73 20.281-9.495 7.186-4.451 12.75-8.815 16.685-13.093 3.936-4.278 6.763-8.469 8.473-12.578a33.053 33.053 0 0 0 2.566-12.836c0-4.45-0.17-9.41-0.514-14.887-0.684-7.871-3.42-14.116-8.213-18.738-4.793-4.62-10.095-9.33-15.915-14.118-2.739-2.396-5.218-5.734-7.445-10.014a127.675 127.675 0 0 1-5.903-13.09 886.304 886.304 0 0 1-5.133-15.918c-2.397-0.682-4.793-1.88-7.189-3.593-2.054-1.708-4.277-4.104-6.673-7.185-2.398-3.082-4.447-7.531-6.16-13.352-1.712-5.817-2.399-11.12-2.054-15.911 0.342-4.793 1.366-9.073 3.079-12.836 1.372-3.766 3.593-7.362 6.676-10.782 0-13.006 0.683-26.012 2.052-39.019 1.369-10.955 3.766-22.76 7.189-35.424 3.423-12.667 8.727-23.961 15.914-33.887 6.846-9.585 14.205-17.37 22.076-23.36 7.874-5.99 16.086-10.696 24.645-14.116 8.556-3.426 17.025-5.733 25.41-6.933 8.387-1.199 16.515-1.797 24.385-1.797 9.927 0 19.766 1.112 29.522 3.337 9.755 2.226 18.911 5.218 27.468 8.983 8.56 3.766 16.17 8.043 22.848 12.836 6.671 4.793 11.892 9.583 15.656 14.375 8.9 10.952 15.402 23.018 19.51 36.193 4.108 13.178 7.018 25.757 8.725 37.738a334.383 334.383 0 0 1 2.569 41.584c2.396 1.712 4.277 3.935 5.647 6.674 1.37 2.396 2.483 5.478 3.338 9.24 0.858 3.766 0.944 8.386 0.26 13.863-0.685 7.532-2.142 13.435-4.365 17.713-2.227 4.278-4.708 7.615-7.448 10.01-3.079 2.737-6.33 4.622-9.753 5.648a159.817 159.817 0 0 0-2.052 6.672l-2.568 7.192c-0.685 2.394-1.542 4.96-2.567 7.701-17.456 7.187-33.457 16.769-48.005 28.748-14.548 11.98-27.126 25.67-37.735 41.071-10.61 15.404-18.825 32.26-24.643 50.572-5.82 18.312-8.727 37.566-8.727 57.758 0 17.799 2.31 34.823 6.93 51.082 4.62 16.257 11.037 31.576 19.253 45.948h-13.863z m329.088-33.627c-8.555 19.68-20.105 36.874-34.653 51.593-14.542 14.72-31.659 26.274-51.34 34.656-19.68 8.386-40.644 12.577-62.893 12.577-22.588 0-43.724-4.193-63.405-12.577-19.677-8.384-36.794-19.936-51.339-34.656-14.545-14.719-26.098-31.915-34.654-51.593-8.558-19.679-12.837-40.643-12.837-62.892 0-22.25 4.279-43.21 12.837-62.893 8.556-19.68 20.109-36.878 34.654-51.595s31.661-26.354 51.34-34.913c19.68-8.556 40.816-12.836 63.404-12.836 22.25 0 43.214 4.28 62.893 12.836 19.68 8.559 36.798 20.195 51.34 34.913 14.548 14.717 26.102 31.915 34.653 51.595 8.558 19.682 12.837 40.644 12.837 62.893 0 22.249-4.276 43.212-12.837 62.892z" fill="#4d5ec0" p-id="41122"></path></svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                </span>
              </div>
            </div>
        `;const button=wrapper.querySelector("nottub".split("").reverse().join(""));button.addEventListener("kcilc".split("").reverse().join(""),event=>{event.preventDefault();event.stopPropagation();if(typeof Android!=="denifednu".split("").reverse().join("")&&typeof Android.openMemberInfo==="noitcnuf".split("").reverse().join("")){Android.openMemberInfo();}else{showMembershipLoginDialog();}});return wrapper;}function updateMemberButtonStatusText(){const button=document.querySelector("nottub nottub-ofni-rebmem.".split("").reverse().join(""));if(!button)return;let tooltip='';if(isMembershipValidLocal()){const parts=[];if(membershipState.planName){parts.push(membershipState.planName);}if(membershipState.subscriptionEnd){parts.push(`到期 ${membershipState.subscriptionEnd}`);}else if(membershipState.trialEnd&&membershipState.trialValid){parts.push(`试用至 ${membershipState.trialEnd}`);}else if(membershipState.subscriptionStatus){parts.push(membershipState.subscriptionStatus);}else{parts.push("\u6D3B\u6FC0\u5DF2".split("").reverse().join(""));}tooltip=parts.join(" \xB7 ".split("").reverse().join(""));}else{if(membershipState.subscriptionEnd){let formatted=membershipState.subscriptionEnd;const parsed=Date.parse(membershipState.subscriptionEnd);if(!Number.isNaN(parsed)){try{formatted=new Date(parsed).toLocaleDateString("NC-hz".split("").reverse().join(""));}catch(_){}}tooltip=`订阅已于 ${formatted} 到期`;}else if(membershipState.subscriptionStatus){tooltip=membershipState.subscriptionStatus;}else if(membershipState.token){tooltip="\u8D39\u7EED\u670D\u5BA2\u7CFB\u8054\u8BF7\uFF0C\u671F\u5230\u5DF2\u9605\u8BA2".split("").reverse().join("");}else{tooltip="\u76CA\u6743\u5458\u4F1A\u590D\u6062\u4EE5\u5F55\u767B\u51FB\u70B9".split("").reverse().join("");}}button.title=tooltip;button.setAttribute("lebal-aira".split("").reverse().join(""),tooltip||"\u5FC3\u4E2D\u5458\u4F1A".split("").reverse().join(""));}function addMemberInfoButton(){try{if(document.querySelector("nottub-ofni-rebmem.".split("").reverse().join("")))return;const newChatButton=document.querySelector("]\"nottub\"=elor[]\"tahc weN\"=lebal-aira[vid ,]\"nottub\"=elor[]\"\u5929\u804A\u65B0\"=lebal-aira[vid".split("").reverse().join(""));if(!newChatButton)return;const anchor=newChatButton.parentNode?.parentNode?.parentNode;if(!anchor||!anchor.parentNode)return;const memberButton=buildMemberInfoButton();anchor.parentNode.insertBefore(memberButton,anchor);updateMemberButtonStatusText();}catch(error){console.error(":\u8D25\u5931\u94AE\u6309\u5458\u4F1A\u52A0\u6DFB".split("").reverse().join(""),error);}}function monitorMemberInfoButton(){addMemberInfoButton();const attempts=[1200,3000,6000];attempts.forEach(delay=>setTimeout(addMemberInfoButton,delay));setInterval(addMemberInfoButton,12000);const observer=new MutationObserver(()=>addMemberInfoButton());observer.observe(document.body,{childList:true,subtree:true});}function refreshTranslateButtons(){document.querySelectorAll("ntb-etalsnart.".split("").reverse().join("")).forEach(btn=>btn.remove());}checkSubscriptionStatus();const areaCodeToCountry={'+44':{language:'英国-英语',timeZone:'Europe/London',id:'en',currency:'GBP'},'+93':{language:'阿富汗-达里语、普什图语',timeZone:'Asia/Kabul',id:'ps',currency:'AFN'},'+355':{language:'阿尔巴尼亚-阿尔巴尼亚语',timeZone:'Europe/Tirane',id:'sq',currency:'ALL'},'+213':{language:'阿尔及利亚-阿拉伯语',timeZone:'Africa/Algiers',id:'ar',currency:'DZD'},'+376':{language:'安道尔-加泰罗尼亚语',timeZone:'Europe/Andorra',id:'ca',currency:'EUR'},'+244':{language:'安哥拉-葡萄牙语',timeZone:'Africa/Luanda',id:'pt',currency:'AOA'},'+1264':{language:'安圭拉-英语',timeZone:'America/Anguilla',id:'en',currency:'XCD'},'+1268':{language:'安提瓜和巴布达-英语',timeZone:'America/Antigua',id:'en',currency:'XCD'},'+54':{language:'阿根廷-西班牙语',timeZone:'America/Argentina/Buenos_Aires',id:'es',currency:'ARS'},'+374':{language:'亚美尼亚-亚美尼亚语',timeZone:'Asia/Yerevan',id:'hy',currency:'AMD'},'+297':{language:'阿鲁巴-荷兰语、帕皮亚门托语',timeZone:'America/Aruba',id:'nl',currency:'AWG'},'+61':{language:'澳大利亚-英语',timeZone:'Australia/Sydney',id:'en',currency:'AUD'},'+43':{language:'奥地利-德语',timeZone:'Europe/Vienna',id:'de',currency:'EUR'},'+994':{language:'阿塞拜疆-阿塞拜疆语',timeZone:'Asia/Baku',id:'az',currency:'AZN'},'+1242':{language:'巴哈马-英语',timeZone:'America/Nassau',id:'en',currency:'BSD'},'+973':{language:'巴林-阿拉伯语',timeZone:'Asia/Bahrain',id:'ar',currency:'BHD'},'+880':{language:'孟加拉国-孟加拉语',timeZone:'Asia/Dhaka',id:'bn',currency:'BDT'},'+1246':{language:'巴巴多斯-英语',timeZone:'America/Barbados',id:'en',currency:'BBD'},'+375':{language:'白俄罗斯-白俄罗斯语、俄语',timeZone:'Europe/Minsk',id:'be',currency:'BYN'},'+32':{language:'比利时-荷兰语、法语、德语',timeZone:'Europe/Brussels',id:'nl',currency:'EUR'},'+501':{language:'伯利兹-英语',timeZone:'America/Belize',id:'en',currency:'BZD'},'+229':{language:'贝宁-法语',timeZone:'Africa/Porto-Novo',id:'fr',currency:'XOF'},'+1441':{language:'百慕大-英语',timeZone:'Atlantic/Bermuda',id:'en',currency:'BMD'},'+975':{language:'不丹-宗卡语',timeZone:'Asia/Thimphu',id:'dz',currency:'BTN'},'+591':{language:'玻利维亚-西班牙语、克丘亚语、艾马拉语',timeZone:'America/La_Paz',id:'es',currency:'BOB'},'+387':{language:'波斯尼亚和黑塞哥维那-波斯尼亚语、克罗地亚语、塞尔维亚语',timeZone:'Europe/Sarajevo',id:'bs',currency:'BAM'},'+267':{language:'博茨瓦纳-英语',timeZone:'Africa/Gaborone',id:'en',currency:'BWP'},'+55':{language:'巴西-葡萄牙语',timeZone:'America/Sao_Paulo',id:'pt',currency:'BRL'},'+673':{language:'文莱-马来语',timeZone:'Asia/Brunei',id:'ms',currency:'BND'},'+359':{language:'保加利亚-保加利亚语',timeZone:'Europe/Sofia',id:'bg',currency:'BGN'},'+226':{language:'布基纳法索-法语',timeZone:'Africa/Ouagadougou',id:'fr',currency:'XOF'},'+257':{language:'布隆迪-基隆迪语、法语',timeZone:'Africa/Bujumbura',id:'rn',currency:'BIF'},'+855':{language:'柬埔寨-高棉语',timeZone:'Asia/Phnom_Penh',id:'km',currency:'KHR'},'+237':{language:'喀麦隆-英语、法语',timeZone:'Africa/Yaounde',id:'en',currency:'XAF'},'+238':{language:'佛得角-葡萄牙语',timeZone:'Atlantic/Cape_Verde',id:'pt',currency:'CVE'},'+1345':{language:'开曼群岛-英语',timeZone:'America/Cayman',id:'en',currency:'KYD'},'+236':{language:'中非共和国-法语、桑戈语',timeZone:'Africa/Bangui',id:'fr',currency:'XAF'},'+235':{language:'乍得-阿拉伯语、法语',timeZone:'Africa/Ndjamena',id:'ar',currency:'XAF'},'+56':{language:'智利-西班牙语',timeZone:'America/Santiago',id:'es',currency:'CLP'},'+86':{language:'中国-汉语',timeZone:'Asia/Shanghai',id:'zh-CN',currency:'CNY'},'+57':{language:'哥伦比亚-西班牙语',timeZone:'America/Bogota',id:'es',currency:'COP'},'+269':{language:'科摩罗-阿拉伯语、法语',timeZone:'Indian/Comoro',id:'ar',currency:'KMF'},'+242':{language:'刚果(布)-法语',timeZone:'Africa/Brazzaville',id:'fr',currency:'XAF'},'+243':{language:'刚果(金)-法语',timeZone:'Africa/Kinshasa',id:'fr',currency:'CDF'},'+682':{language:'库克群岛-英语、毛利语',timeZone:'Pacific/Rarotonga',id:'en',currency:'NZD'},'+506':{language:'哥斯达黎加-西班牙语',timeZone:'America/Costa_Rica',id:'es',currency:'CRC'},'+385':{language:'克罗地亚-克罗地亚语',timeZone:'Europe/Zagreb',id:'hr',currency:'EUR'},'+383':{language:'科索沃-阿尔巴尼亚语、塞尔维亚语',timeZone:'Europe/Belgrade',id:'sq',currency:'EUR'},'+53':{language:'古巴-西班牙语',timeZone:'America/Havana',id:'es',currency:'CUP'},'+357':{language:'塞浦路斯-希腊语、土耳其语',timeZone:'Asia/Nicosia',id:'el',currency:'EUR'},'+420':{language:'捷克共和国-捷克语',timeZone:'Europe/Prague',id:'cs',currency:'CZK'},'+45':{language:'丹麦-丹麦语',timeZone:'Europe/Copenhagen',id:'da',currency:'DKK'},'+253':{language:'吉布提-阿拉伯语、法语',timeZone:'Africa/Djibouti',id:'ar',currency:'DJF'},'+1767':{language:'多米尼克-英语',timeZone:'America/Dominica',id:'en',currency:'XCD'},'+1809':{language:'多米尼加共和国-西班牙语',timeZone:'America/Santo_Domingo',id:'es',currency:'DOP'},'+593':{language:'厄瓜多尔-西班牙语',timeZone:'America/Guayaquil',id:'es',currency:'USD'},'+20':{language:'埃及-阿拉伯语',timeZone:'Africa/Cairo',id:'ar',currency:'EGP'},'+503':{language:'萨尔瓦多-西班牙语',timeZone:'America/El_Salvador',id:'es',currency:'USD'},'+240':{language:'赤道几内亚-西班牙语、法语、葡萄牙语',timeZone:'Africa/Malabo',id:'es',currency:'XAF'},'+291':{language:'厄立特里亚-提格利尼亚语、阿拉伯语',timeZone:'Africa/Asmara',id:'ti',currency:'ERN'},'+372':{language:'爱沙尼亚-爱沙尼亚语',timeZone:'Europe/Tallinn',id:'et',currency:'EUR'},'+251':{language:'埃塞俄比亚-阿姆哈拉语',timeZone:'Africa/Addis_Ababa',id:'am',currency:'ETB'},'+500':{language:'福克兰群岛-英语',timeZone:'Atlantic/Stanley',id:'en',currency:'FKP'},'+298':{language:'法罗群岛-法罗语',timeZone:'Atlantic/Faroe',id:'fo',currency:'DKK'},'+679':{language:'斐济-英语、斐济语、印度语',timeZone:'Pacific/Fiji',id:'en',currency:'FJD'},'+358':{language:'芬兰-芬兰语、瑞典语',timeZone:'Europe/Helsinki',id:'fi',currency:'EUR'},'+33':{language:'法国-法语',timeZone:'Europe/Paris',id:'fr',currency:'EUR'},'+689':{language:'法属波利尼西亚-法语',timeZone:'Pacific/Tahiti',id:'fr',currency:'XPF'},'+241':{language:'加蓬-法语',timeZone:'Africa/Libreville',id:'fr',currency:'XAF'},'+220':{language:'冈比亚-英语',timeZone:'Africa/Banjul',id:'en',currency:'GMD'},'+995':{language:'格鲁吉亚-格鲁吉亚语',timeZone:'Asia/Tbilisi',id:'ka',currency:'GEL'},'+49':{language:'德国-德语',timeZone:'Europe/Berlin',id:'de',currency:'EUR'},'+233':{language:'加纳-英语',timeZone:'Africa/Accra',id:'en',currency:'GHS'},'+350':{language:'直布罗陀-英语',timeZone:'Europe/Gibraltar',id:'en',currency:'GIP'},'+30':{language:'希腊-希腊语',timeZone:'Europe/Athens',id:'el',currency:'EUR'},'+299':{language:'格陵兰-格陵兰语、丹麦语',timeZone:'America/Nuuk',id:'kl',currency:'DKK'},'+1473':{language:'格林纳达-英语',timeZone:'America/Grenada',id:'en',currency:'XCD'},'+590':{language:'瓜德罗普-法语',timeZone:'America/Guadeloupe',id:'fr',currency:'EUR'},'+1671':{language:'关岛-英语、查莫罗语',timeZone:'Pacific/Guam',id:'en',currency:'USD'},'+502':{language:'危地马拉-西班牙语',timeZone:'America/Guatemala',id:'es',currency:'GTQ'},'+224':{language:'几内亚-法语',timeZone:'Africa/Conakry',id:'fr',currency:'GNF'},'+245':{language:'几内亚比绍-葡萄牙语',timeZone:'Africa/Bissau',id:'pt',currency:'XOF'},'+592':{language:'圭亚那-英语',timeZone:'America/Georgetown',id:'en',currency:'GYD'},'+509':{language:'海地-法语、海地克里奥尔语',timeZone:'America/Port-au-Prince',id:'fr',currency:'HTG'},'+504':{language:'洪都拉斯-西班牙语',timeZone:'America/Tegucigalpa',id:'es',currency:'HNL'},'+852':{language:'香港-繁体、英语',timeZone:'Asia/Hong_Kong',id:'zh-TW',currency:'HKD'},'+36':{language:'匈牙利-匈牙利语',timeZone:'Europe/Budapest',id:'hu',currency:'HUF'},'+354':{language:'冰岛-冰岛语',timeZone:'Atlantic/Reykjavik',id:'is',currency:'ISK'},'+91':{language:'印度-印地语、英语',timeZone:'Asia/Kolkata',id:'en',currency:'INR'},'+62':{language:'印度尼西亚-印度尼西亚语',timeZone:'Asia/Jakarta',id:'id',currency:'IDR'},'+98':{language:'伊朗-波斯语',timeZone:'Asia/Tehran',id:'fa',currency:'IRR'},'+964':{language:'伊拉克-阿拉伯语、库尔德语',timeZone:'Asia/Baghdad',id:'ar',currency:'IQD'},'+353':{language:'爱尔兰-英语、爱尔兰语',timeZone:'Europe/Dublin',id:'en',currency:'EUR'},'+972':{language:'以色列-希伯来语、阿拉伯语',timeZone:'Asia/Jerusalem',id:'he',currency:'ILS'},'+39':{language:'意大利-意大利语',timeZone:'Europe/Rome',id:'it',currency:'EUR'},'+225':{language:'科特迪瓦-法语',timeZone:'Africa/Abidjan',id:'fr',currency:'XOF'},'+1876':{language:'牙买加-英语',timeZone:'America/Jamaica',id:'en',currency:'JMD'},'+81':{language:'日本-日语',timeZone:'Asia/Tokyo',id:'ja',currency:'JPY'},'+962':{language:'约旦-阿拉伯语',timeZone:'Asia/Amman',id:'ar',currency:'JOD'},'+7':{language:'哈萨克斯坦-哈萨克语、俄语',timeZone:'Asia/Almaty',id:'kk',currency:'KZT'},'+254':{language:'肯尼亚-英语、斯瓦希里语',timeZone:'Africa/Nairobi',id:'en',currency:'KES'},'+686':{language:'基里巴斯-英语、吉尔伯特语',timeZone:'Pacific/Tarawa',id:'en',currency:'AUD'},'+965':{language:'科威特-阿拉伯语',timeZone:'Asia/Kuwait',id:'ar',currency:'KWD'},'+996':{language:'吉尔吉斯斯坦-吉尔吉斯语、俄语',timeZone:'Asia/Bishkek',id:'ky',currency:'KGS'},'+856':{language:'老挝-老挝语',timeZone:'Asia/Vientiane',id:'lo',currency:'LAK'},'+371':{language:'拉脱维亚-拉脱维亚语',timeZone:'Europe/Riga',id:'lv',currency:'EUR'},'+961':{language:'黎巴嫩-阿拉伯语、法语',timeZone:'Asia/Beirut',id:'ar',currency:'LBP'},'+266':{language:'莱索托-英语、塞索托语',timeZone:'Africa/Maseru',id:'en',currency:'LSL'},'+231':{language:'利比里亚-英语',timeZone:'Africa/Monrovia',id:'en',currency:'LRD'},'+218':{language:'利比亚-阿拉伯语',timeZone:'Africa/Tripoli',id:'ar',currency:'LYD'},'+423':{language:'列支敦士登-德语',timeZone:'Europe/Vaduz',id:'de',currency:'CHF'},'+370':{language:'立陶宛-立陶宛语',timeZone:'Europe/Vilnius',id:'lt',currency:'EUR'},'+352':{language:'卢森堡-卢森堡语、法语、德语',timeZone:'Europe/Luxembourg',id:'lb',currency:'EUR'},'+853':{language:'澳门-中文、葡萄牙语',timeZone:'Asia/Macau',id:'zh',currency:'MOP'},'+389':{language:'北马其顿-马其顿语',timeZone:'Europe/Skopje',id:'mk',currency:'MKD'},'+261':{language:'马达加斯加-马尔加什语、法语',timeZone:'Indian/Antananarivo',id:'mg',currency:'MGA'},'+265':{language:'马拉维-英语、齐切瓦语',timeZone:'Africa/Blantyre',id:'en',currency:'MWK'},'+60':{language:'马来西亚-马来语',timeZone:'Asia/Kuala_Lumpur',id:'ms',currency:'MYR'},'+960':{language:'马尔代夫-迪维希语',timeZone:'Indian/Maldives',id:'dv',currency:'MVR'},'+223':{language:'马里-法语',timeZone:'Africa/Bamako',id:'fr',currency:'XOF'},'+356':{language:'马耳他-马耳他语、英语',timeZone:'Europe/Malta',id:'mt',currency:'EUR'},'+692':{language:'马绍尔群岛-马绍尔语、英语',timeZone:'Pacific/Majuro',id:'en',currency:'USD'},'+596':{language:'马提尼克-法语',timeZone:'America/Martinique',id:'fr',currency:'EUR'},'+222':{language:'毛里塔尼亚-阿拉伯语',timeZone:'Africa/Nouakchott',id:'ar',currency:'MRU'},'+230':{language:'毛里求斯-英语',timeZone:'Indian/Mauritius',id:'en',currency:'MUR'},'+262':{language:'马约特-法语',timeZone:'Indian/Mayotte',id:'fr',currency:'EUR'},'+52':{language:'墨西哥-西班牙语',timeZone:'America/Mexico_City',id:'es',currency:'MXN'},'+691':{language:'密克罗尼西亚联邦-英语',timeZone:'Pacific/Pohnpei',id:'en',currency:'USD'},'+373':{language:'摩尔多瓦-罗马尼亚语',timeZone:'Europe/Chisinau',id:'ro',currency:'MDL'},'+377':{language:'摩纳哥-法语',timeZone:'Europe/Monaco',id:'fr',currency:'EUR'},'+976':{language:'蒙古-蒙古语',timeZone:'Asia/Ulaanbaatar',id:'mn',currency:'MNT'},'+382':{language:'黑山-塞尔维亚语、波斯尼亚语、克罗地亚语、阿尔巴尼亚语',timeZone:'Europe/Podgorica',id:'sr',currency:'EUR'},'+1664':{language:'蒙特塞拉特-英语',timeZone:'America/Montserrat',id:'en',currency:'XCD'},'+212':{language:'摩洛哥-阿拉伯语',timeZone:'Africa/Casablanca',id:'ar',currency:'MAD'},'+258':{language:'莫桑比克-葡萄牙语',timeZone:'Africa/Maputo',id:'pt',currency:'MZN'},'+95':{language:'缅甸-缅甸语',timeZone:'Asia/Yangon',id:'my',currency:'MMK'},'+264':{language:'纳米比亚-英语',timeZone:'Africa/Windhoek',id:'en',currency:'NAD'},'+674':{language:'瑙鲁-英语、瑙鲁语',timeZone:'Pacific/Nauru',id:'en',currency:'AUD'},'+977':{language:'尼泊尔-尼泊尔语',timeZone:'Asia/Kathmandu',id:'ne',currency:'NPR'},'+31':{language:'荷兰-荷兰语',timeZone:'Europe/Amsterdam',id:'nl',currency:'EUR'},'+687':{language:'新喀里多尼亚-法语',timeZone:'Pacific/Noumea',id:'fr',currency:'XPF'},'+64':{language:'新西兰-英语、毛利语',timeZone:'Pacific/Auckland',id:'en',currency:'NZD'},'+505':{language:'尼加拉瓜-西班牙语',timeZone:'America/Managua',id:'es',currency:'NIO'},'+227':{language:'尼日尔-法语',timeZone:'Africa/Niamey',id:'fr',currency:'XOF'},'+234':{language:'尼日利亚-英语',timeZone:'Africa/Lagos',id:'en',currency:'NGN'},'+683':{language:'纽埃-英语、纽埃语',timeZone:'Pacific/Niue',id:'en',currency:'NZD'},'+850':{language:'朝鲜-朝鲜语',timeZone:'Asia/Pyongyang',id:'ko',currency:'KPW'},'+47':{language:'挪威-挪威语',timeZone:'Europe/Oslo',id:'no',currency:'NOK'},'+968':{language:'阿曼-阿拉伯语',timeZone:'Asia/Muscat',id:'ar',currency:'OMR'},'+92':{language:'巴基斯坦-乌尔都语、英语',timeZone:'Asia/Karachi',id:'en',currency:'PKR'},'+680':{language:'帕劳-英语、帕劳语',timeZone:'Pacific/Palau',id:'en',currency:'USD'},'+970':{language:'巴勒斯坦领土-阿拉伯语',timeZone:'Asia/Gaza',id:'ar',currency:'ILS'},'+507':{language:'巴拿马-西班牙语',timeZone:'America/Panama',id:'es',currency:'PAB'},'+675':{language:'巴布亚新几内亚-英语、托克皮辛、莫图语',timeZone:'Pacific/Port_Moresby',id:'en',currency:'PGK'},'+595':{language:'巴拉圭-西班牙语、瓜拉尼语',timeZone:'America/Asuncion',id:'es',currency:'PYG'},'+51':{language:'秘鲁-西班牙语',timeZone:'America/Lima',id:'es',currency:'PEN'},'+63':{language:'菲律宾-英语、菲律宾语',timeZone:'Asia/Manila',id:'en',currency:'PHP'},'+48':{language:'波兰-波兰语',timeZone:'Europe/Warsaw',id:'pl',currency:'PLN'},'+351':{language:'葡萄牙-葡萄牙语',timeZone:'Europe/Lisbon',id:'pt',currency:'EUR'},'+974':{language:'卡塔尔-阿拉伯语',timeZone:'Asia/Qatar',id:'ar',currency:'QAR'},'+40':{language:'罗马尼亚-罗马尼亚语',timeZone:'Europe/Bucharest',id:'ro',currency:'RON'},'+7':{language:'俄罗斯-俄语',timeZone:'Europe/Moscow',id:'ru',currency:'RUB'},'+250':{language:'卢旺达-卢旺达语、英语、法语',timeZone:'Africa/Kigali',id:'rw',currency:'RWF'},'+290':{language:'圣赫勒拿-英语',timeZone:'Atlantic/St_Helena',id:'en',currency:'SHP'},'+1869':{language:'圣基茨和尼维斯-英语',timeZone:'America/St_Kitts',id:'en',currency:'XCD'},'+1758':{language:'圣卢西亚-英语',timeZone:'America/St_Lucia',id:'en',currency:'XCD'},'+508':{language:'圣皮埃尔和密克隆-法语',timeZone:'America/Miquelon',id:'fr',currency:'EUR'},'+1784':{language:'圣文森特和格林纳丁斯-英语',timeZone:'America/St_Vincent',id:'en',currency:'XCD'},'+685':{language:'萨摩亚-萨摩亚语、英语',timeZone:'Pacific/Apia',id:'sm',currency:'WST'},'+378':{language:'圣马力诺-意大利语',timeZone:'Europe/San_Marino',id:'it',currency:'EUR'},'+239':{language:'圣多美和普林西比-葡萄牙语',timeZone:'Africa/Sao_Tome',id:'pt',currency:'STN'},'+966':{language:'沙特阿拉伯-阿拉伯语',timeZone:'Asia/Riyadh',id:'ar',currency:'SAR'},'+221':{language:'塞内加尔-法语',timeZone:'Africa/Dakar',id:'fr',currency:'XOF'},'+381':{language:'塞尔维亚-塞尔维亚语',timeZone:'Europe/Belgrade',id:'sr',currency:'RSD'},'+248':{language:'塞舌尔-英语、法语',timeZone:'Indian/Mahe',id:'en',currency:'SCR'},'+232':{language:'塞拉利昂-英语',timeZone:'Africa/Freetown',id:'en',currency:'SLL'},'+65':{language:'新加坡-英语、马来语、汉语',timeZone:'Asia/Singapore',id:'en',currency:'SGD'},'+421':{language:'斯洛伐克-斯洛伐克语',timeZone:'Europe/Bratislava',id:'sk',currency:'EUR'},'+386':{language:'斯洛文尼亚-斯洛文尼亚语',timeZone:'Europe/Ljubljana',id:'sl',currency:'EUR'},'+677':{language:'所罗门群岛-英语',timeZone:'Pacific/Guadalcanal',id:'en',currency:'SBD'},'+252':{language:'索马里-索马里语、阿拉伯语',timeZone:'Africa/Mogadishu',id:'so',currency:'SOS'},'+27':{language:'南非-祖鲁语、科萨语、阿非利卡语、英语、南非荷兰语',timeZone:'Africa/Johannesburg',id:'en',currency:'ZAR'},'+82':{language:'韩国-韩语',timeZone:'Asia/Seoul',id:'ko',currency:'KRW'},'+211':{language:'南苏丹-英语',timeZone:'Africa/Juba',id:'en',currency:'SSP'},'+34':{language:'西班牙-西班牙语',timeZone:'Europe/Madrid',id:'es',currency:'EUR'},'+94':{language:'斯里兰卡-僧伽罗语、泰米尔语',timeZone:'Asia/Colombo',id:'si',currency:'LKR'},'+249':{language:'苏丹-阿拉伯语、英语',timeZone:'Africa/Khartoum',id:'ar',currency:'SDG'},'+597':{language:'苏里南-荷兰语',timeZone:'America/Paramaribo',id:'nl',currency:'SRD'},'+268':{language:'斯威士兰-斯瓦特语、英语',timeZone:'Africa/Mbabane',id:'en',currency:'SZL'},'+46':{language:'瑞典-瑞典语',timeZone:'Europe/Stockholm',id:'sv',currency:'SEK'},'+41':{language:'瑞士-德语、法语、意大利语、罗曼什语',timeZone:'Europe/Zurich',id:'de',currency:'CHF'},'+963':{language:'叙利亚-阿拉伯语',timeZone:'Asia/Damascus',id:'ar',currency:'SYP'},'+886':{language:'台湾-中文',timeZone:'Asia/Taipei',id:'zh',currency:'TWD'},'+992':{language:'塔吉克斯坦-塔吉克语',timeZone:'Asia/Dushanbe',id:'tg',currency:'TJS'},'+255':{language:'坦桑尼亚-斯瓦希里语',timeZone:'Africa/Dar_es_Salaam',id:'sw',currency:'TZS'},'+66':{language:'泰国-泰语',timeZone:'Asia/Bangkok',id:'th',currency:'THB'},'+228':{language:'多哥-法语',timeZone:'Africa/Lome',id:'fr',currency:'XOF'},'+676':{language:'汤加-汤加语、英语',timeZone:'Pacific/Tongatapu',id:'en',currency:'TOP'},'+216':{language:'突尼斯-阿拉伯语',timeZone:'Africa/Tunis',id:'ar',currency:'TND'},'+90':{language:'土耳其-土耳其语',timeZone:'Europe/Istanbul',id:'tr',currency:'TRY'},'+993':{language:'土库曼斯坦-土库曼语',timeZone:'Asia/Ashgabat',id:'tk',currency:'TMT'},'+688':{language:'图瓦卢-图瓦卢语、英语',timeZone:'Pacific/Funafuti',id:'en',currency:'AUD'},'+256':{language:'乌干达-英语、斯瓦希里语',timeZone:'Africa/Kampala',id:'en',currency:'UGX'},'+380':{language:'乌克兰-乌克兰语',timeZone:'Europe/Kyiv',id:'uk',currency:'UAH'},'+971':{language:'阿拉伯联合酋长国-阿拉伯语',timeZone:'Asia/Dubai',id:'ar',currency:'AED'},'+598':{language:'乌拉圭-西班牙语',timeZone:'America/Montevideo',id:'es',currency:'UYU'},'+998':{language:'乌兹别克斯坦-乌兹别克语',timeZone:'Asia/Tashkent',id:'uz',currency:'UZS'},'+678':{language:'瓦努阿图-比斯拉马语、英语、法语',timeZone:'Pacific/Efate',id:'bi',currency:'VUV'},'+379':{language:'梵蒂冈城-意大利语',timeZone:'Europe/Vatican',id:'it',currency:'EUR'},'+58':{language:'委内瑞拉-西班牙语',timeZone:'America/Caracas',id:'es',currency:'VES'},'+84':{language:'越南-越南语',timeZone:'Asia/Ho_Chi_Minh',id:'vi',currency:'VND'},'+681':{language:'瓦利斯和富图纳-法语',timeZone:'Pacific/Wallis',id:'fr',currency:'XPF'},'+967':{language:'也门-阿拉伯语',timeZone:'Asia/Aden',id:'ar',currency:'YER'},'+260':{language:'赞比亚-英语',timeZone:'Africa/Lusaka',id:'en',currency:'ZMW'},'+263':{language:'津巴布韦-英语、绍纳语、辛德贝勒语',timeZone:'Africa/Harare',id:'en',currency:'ZWL'}};function showNetworkSlowNotification(){const existing=document.querySelector("noitacifiton-wols-krowten-aw.".split("").reverse().join(""));if(existing)existing.remove();const notification=document.createElement("vid".split("").reverse().join(""));notification.className="noitacifiton-wols-krowten-aw".split("").reverse().join("");notification.textContent="\u8BD5\u91CD\u53E3\u63A5\u8BD1\u7FFB\u6362\u5207\u6216\u7EDC\u7F51\u7684\u60A8\u67E5\u68C0\u8BF7\uFF0C\u6162\u7F13\u7EDC\u7F51".split("").reverse().join("");notification.style.cssText=`
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #ff9800;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10002;
            font-size: 14px;
            font-weight: 500;
            animation: wa-slide-down 0.3s ease-out;
        `;if(!document.querySelector("elyts-wols-krowten-aw#".split("").reverse().join(""))){const style=document.createElement("elyts".split("").reverse().join(""));style.id="elyts-wols-krowten-aw".split("").reverse().join("");style.textContent=`
                @keyframes wa-slide-down {
                    from {
                        opacity: 0;
                        transform: translateX(-50%) translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(-50%) translateY(0);
                    }
                }
            `;document.head.appendChild(style);}document.body.appendChild(notification);setTimeout(()=>{if(notification.parentNode){notification.style.opacity='0';notification.style.transition="s3.0 yticapo".split("").reverse().join("");setTimeout(()=>notification.remove(),300);}},5000);}function translateWithGoogle(sl,dl,txt,cb){console.log(`Google 翻译请求: 源语言=${sl}, 目标语言=${dl}, 文本=${txt}`);let responded=false;let slowNotificationShown=false;const slowTimeout=setTimeout(()=>{if(!responded&&!slowNotificationShown){slowNotificationShown=true;showNetworkSlowNotification();}},3000);GM_xmlhttpRequest({method:'GET',url:`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${dl}&dt=t&q=${encodeURI(txt)}`,onload:response=>{clearTimeout(slowTimeout);responded=true;try{const _r_text=response.responseText.replace(/\n/g,'');const _r=JSON.parse(_r_text);let translationString='';for(let i=0;i<_r[0].length;i++){translationString+=_r[0][i][0];}const sourceLang=_r[2];console.log(`Google 翻译结果: ${translationString}`);cb(translationString,sourceLang);}catch(e){console.error(":\u8D25\u5931\u6790\u89E3\u5E94\u54CD\u8BD1\u7FFB elgooG".split("").reverse().join(""),e,response.responseText);cb(null);}},onerror:error=>{clearTimeout(slowTimeout);responded=true;console.error(":\u8D25\u5931\u6C42\u8BF7\u8BD1\u7FFB elgooG".split("").reverse().join(""),error);cb(null);},ontimeout:()=>{clearTimeout(slowTimeout);responded=true;console.error("\u65F6\u8D85\u6C42\u8BF7\u8BD1\u7FFB elgooG".split("").reverse().join(""));cb(null);}});}function normalizeVolcLanguageCode(code){if(!code)return"otua".split("").reverse().join("");if(code==="NC-hz".split("").reverse().join("")||code==="hz".split("").reverse().join(""))return"hz".split("").reverse().join("");if(code==="WT-hz".split("").reverse().join(""))return"tnaH-hz".split("").reverse().join("");return code;}function translateWithVolc(sl,dl,txt,cb){const volcanoUrl="/1v/etalsnart/xrc/moc.enigneclov.etalsnart//:sptth".split("").reverse().join("");const source=normalizeVolcLanguageCode(sl);const target=normalizeVolcLanguageCode(dl);console.log(`火山翻译请求: 源语言=${source}, 目标语言=${target}, 文本=${txt}`);const payload={target_language:target,text:txt};let responded=false;let slowNotificationShown=false;const slowTimeout=setTimeout(()=>{if(!responded&&!slowNotificationShown){slowNotificationShown=true;showNetworkSlowNotification();}},3000);GM_xmlhttpRequest({method:'POST',url:volcanoUrl,headers:{'Content-Type':'application/json'},data:JSON.stringify(payload),timeout:15000,onload:response=>{clearTimeout(slowTimeout);responded=true;try{if(response.status<200||response.status>=300){console.error(":\u8BEF\u9519PTTH\u8BD1\u7FFB\u5C71\u706B".split("").reverse().join(""),response.status,response.responseText);cb(null);return;}const data=JSON.parse(response.responseText);const translation=data&&(data.translation||data.data||data.target_text);if(typeof translation==="gnirts".split("").reverse().join("")&&translation.length>0){console.log(`火山翻译结果: ${translation}`);cb(translation,null);}else{console.error(":\u6BB5\u5B57noitalsnart\u65E0\u5E94\u54CD\u8BD1\u7FFB\u5C71\u706B".split("").reverse().join(""),data);cb(null);}}catch(e){console.error(":\u8D25\u5931\u6790\u89E3\u8BD1\u7FFB\u5C71\u706B".split("").reverse().join(""),e,response.responseText);cb(null);}},onerror:error=>{clearTimeout(slowTimeout);responded=true;console.error(":\u8D25\u5931\u6C42\u8BF7\u8BD1\u7FFB\u5C71\u706B".split("").reverse().join(""),error);cb(null);},ontimeout:()=>{clearTimeout(slowTimeout);responded=true;console.error("\u65F6\u8D85\u6C42\u8BF7\u8BD1\u7FFB\u5C71\u706B".split("").reverse().join(""));cb(null);}});}async function translateWithBing(sl,dl,txt,cb){if(dl==="NC-hz".split("").reverse().join("")||dl==="hz".split("").reverse().join(""))dl="snaH-hz".split("").reverse().join("");if(sl==="NC-hz".split("").reverse().join("")||sl==="hz".split("").reverse().join(""))sl="snaH-hz".split("").reverse().join("");if(dl==="WT-hz".split("").reverse().join(""))dl="tnaH-hz".split("").reverse().join("");if(sl==="WT-hz".split("").reverse().join(""))sl="tnaH-hz".split("").reverse().join("");console.log(`Bing 翻译请求: 源语言=${sl}, 目标语言=${dl}, 文本=${txt}`);let responded=false;let slowNotificationShown=false;const slowTimeout=setTimeout(()=>{if(!responded&&!slowNotificationShown){slowNotificationShown=true;showNetworkSlowNotification();}},3000);try{const authUrl="htua/etalsnart/moc.tfosorcim.egde//:sptth".split("").reverse().join("");const authHeaders={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.23','Accept-Language':'zh-TW,zh;q=0.9,ja;q=0.8,zh-CN;q=0.7,en-US;q=0.6,en;q=0.5'};const accessToken=await new Promise((resolve,reject)=>{GM_xmlhttpRequest({method:'GET',url:authUrl,headers:authHeaders,onload:res=>res.status===200?resolve(res.responseText):reject(`Bing Auth Error: ${res.status}`),onerror:err=>reject(`Bing auth request error: ${err}`)});});let translateUrl=`https://api-edge.cognitive.microsofttranslator.com/translate?to=${dl}&api-version=3.0&includeSentenceLength=true`;if(sl!=="otua".split("").reverse().join("")){translateUrl=`https://api-edge.cognitive.microsofttranslator.com/translate?from=${sl}&to=${dl}&api-version=3.0&includeSentenceLength=true`;}const translateHeaders={'Authorization':" reraeB".split("").reverse().join("")+accessToken,'Content-Type':'application/json','User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.23'};const body=JSON.stringify([{'Text':txt}]);const translatedText=await new Promise((resolve,reject)=>{GM_xmlhttpRequest({method:'POST',url:translateUrl,headers:translateHeaders,data:body,onload:function(translateResponse){try{const resultJson=JSON.parse(translateResponse.responseText);if(resultJson&&resultJson.length>0&&resultJson[0].translations&&resultJson[0].translations.length>0){resolve(resultJson[0].translations[0].text);}else{reject(".tluser oN :deliaf noitalsnart gniB".split("").reverse().join(""));}}catch(e){reject(`Bing translation parse error: ${e}`);}},onerror:err=>reject(`Bing translation request error: ${err}`)});});clearTimeout(slowTimeout);responded=true;console.log(`Bing 翻译结果: ${translatedText}`);cb(translatedText,null);}catch(error){clearTimeout(slowTimeout);responded=true;console.error(error);cb(null);}}function translate(sl,dl,txt,cb){if(!ensureMembership()){console.log("\u8BC1\u9A8C\u672A\u5458\u4F1A\uFF0C\u6B62\u963B\u88AB\u8BD1\u7FFB".split("").reverse().join(""));cb(null);return;}const engine=getCustomerTranslationEngine();console.log(`使用 ${engine} 翻译引擎进行翻译`);if(engine==="gnib".split("").reverse().join("")){translateWithBing(sl,dl,txt,cb);}else if(engine==="clov".split("").reverse().join("")){translateWithVolc(sl,dl,txt,cb);}else{translateWithGoogle(sl,dl,txt,cb);}}const targetSelector="3knjggx.".split("").reverse().join("");const pageObserver=new MutationObserver(mutations=>{mutations.forEach(()=>{document.querySelectorAll(targetSelector).forEach(targetElement=>{if(targetElement&&!targetElement.classList.contains("dedda-egaugnal".split("").reverse().join(""))){createInfo(targetElement);}});});});pageObserver.observe(document.body,{childList:true,subtree:true});function createInfo(targetElement){targetElement.classList.add("dedda-egaugnal".split("").reverse().join(""));const phoneNumber=targetElement.textContent.trim();currentPhoneNumber=phoneNumber.replace(/\s+/g,'');const areaCode=phoneNumber.split(' ')[0];let nextThreeDigits;if(phoneNumber.includes('(')){nextThreeDigits=phoneNumber.match(/\((\d+)\)/)?.[1];}else{nextThreeDigits=phoneNumber.split(' ')[1]?.slice(0,3);}if(!areaCode)return;if(areaCode==="1+".split("").reverse().join("")){if(["402".split("").reverse().join(""),"632".split("").reverse().join(""),"942".split("").reverse().join(""),"052".split("").reverse().join(""),"982".split("").reverse().join(""),"603".split("").reverse().join(""),"343".split("").reverse().join(""),"563".split("").reverse().join(""),"304".split("").reverse().join(""),"614".split("").reverse().join(""),"814".split("").reverse().join(""),"134".split("").reverse().join(""),"734".split("").reverse().join(""),"834".split("").reverse().join(""),"054".split("").reverse().join(""),"605".split("").reverse().join(""),"415".split("").reverse().join(""),"915".split("").reverse().join(""),"845".split("").reverse().join(""),"975".split("").reverse().join(""),"185".split("").reverse().join(""),"785".split("").reverse().join(""),"006".split("").reverse().join(""),"406".split("").reverse().join(""),"316".split("").reverse().join(""),"936".split("").reverse().join(""),"746".split("").reverse().join(""),"507".split("").reverse().join(""),"907".split("").reverse().join(""),"247".split("").reverse().join(""),"877".split("").reverse().join(""),"087".split("").reverse().join(""),"287".split("").reverse().join(""),"708".split("").reverse().join(""),"918".split("").reverse().join(""),"528".split("").reverse().join(""),"768".split("").reverse().join(""),"378".split("").reverse().join(""),"209".split("").reverse().join(""),"509".split("").reverse().join("")].includes(nextThreeDigits)){countryInfo={language:'加拿大(Canada)-英语、法语(English/French)',timeZone:'America/Toronto',id:'en',currency:'CAD'};}else if(["787".split("").reverse().join(""),"939".split("").reverse().join("")].includes(nextThreeDigits)){countryInfo={language:'波多黎各(Puerto Rico)-英语(English)',timeZone:'America/Puerto_Rico',id:'en',currency:'USD'};}else if(["176".split("").reverse().join("")].includes(nextThreeDigits)){countryInfo={language:'关岛(Guam)-英语(English)',timeZone:'America/Guam',id:'en',currency:'USD'};}else if(["043".split("").reverse().join("")].includes(nextThreeDigits)){countryInfo={language:'美属维尔京群岛(US Virgin Islands)-英语(English)',timeZone:'America/St_Thomas',id:'en',currency:'USD'};}else if(["486".split("").reverse().join("")].includes(nextThreeDigits)){countryInfo={language:'美属萨摩亚(American Samoa)-英语(English)',timeZone:'Pacific/Pago_Pago',id:'en',currency:'USD'};}else if(["076".split("").reverse().join("")].includes(nextThreeDigits)){countryInfo={language:'北马里亚纳群岛(Northern Mariana Islands)-英语(English)',timeZone:'Pacific/Saipan',id:'en',currency:'USD'};}else if(["868".split("").reverse().join("")].includes(nextThreeDigits)){countryInfo={language:'特立尼达和多巴哥(Trinidad and Tobago)-英语(English)',timeZone:'America/Port_of_Spain',id:'en',currency:'TTD'};}else{countryInfo={language:'美国(United States)-英语(English)',timeZone:'America/New_York',id:'en',currency:'USD'};}}else{countryInfo=areaCodeToCountry[areaCode]||{language:'未知语言',timeZone:'UTC',id:'unknown',currency:'未知'};}const infoElement=document.createElement("vid".split("").reverse().join(""));infoElement.style.marginTop="xp4".split("").reverse().join("");infoElement.style.fontSize="xp41".split("").reverse().join("");targetElement.parentNode.insertBefore(infoElement,targetElement.nextSibling);function updateInfo(){const currentTime=getCurrentTimeInTimeZone(countryInfo.timeZone);infoElement.textContent=`${countryInfo.language}-${countryInfo.currency}-时间${currentTime}`;}updateInfo();setInterval(updateInfo,1000);}function getCurrentTimeInTimeZone(timeZone){const options={timeZone,hour12:false,hour:'numeric',minute:'numeric',second:'numeric'};return new Date().toLocaleTimeString("SU-ne".split("").reverse().join(""),options);}const LANGUAGE_OPTIONS=[{value:'auto',text:'自动检测语言'},{value:'en',text:'英语 (English)'},{value:'zh-CN',text:'中文（简体）'},{value:'zh-TW',text:'中文（繁体）'},{value:'es',text:'西班牙语 (Spanish)'},{value:'hi',text:'印地语 (Hindi)'},{value:'ar',text:'阿拉伯语 (Arabic)'},{value:'pt',text:'葡萄牙语 (Portuguese)'},{value:'bn',text:'孟加拉语 (Bengali)'},{value:'ru',text:'俄语 (Russian)'},{value:'ja',text:'日语 (Japanese)'},{value:'de',text:'德语 (German)'},{value:'fr',text:'法语 (French)'},{value:'id',text:'印尼语 (Indonesian)'},{value:'ms',text:'马来语 (Malay)'},{value:'ur',text:'乌尔都语 (Urdu)'},{value:'vi',text:'越南语 (Vietnamese)'},{value:'ko',text:'韩语 (Korean)'},{value:'tr',text:'土耳其语 (Turkish)'},{value:'it',text:'意大利语 (Italian)'},{value:'fa',text:'波斯语 (Persian)'},{value:'th',text:'泰语 (Thai)'},{value:'pl',text:'波兰语 (Polish)'},{value:'uk',text:'乌克兰语 (Ukrainian)'},{value:'nl',text:'荷兰语 (Dutch)'},{value:'ro',text:'罗马尼亚语 (Romanian)'},{value:'sv',text:'瑞典语 (Swedish)'},{value:'cs',text:'捷克语 (Czech)'},{value:'el',text:'希腊语 (Greek)'},{value:'he',text:'希伯来语 (Hebrew)'},{value:'hu',text:'匈牙利语 (Hungarian)'},{value:'fi',text:'芬兰语 (Finnish)'},{value:'no',text:'挪威语 (Norwegian)'},{value:'da',text:'丹麦语 (Danish)'},{value:'sk',text:'斯洛伐克语 (Slovak)'},{value:'sl',text:'斯洛文尼亚语 (Slovenian)'},{value:'hr',text:'克罗地亚语 (Croatian)'},{value:'bg',text:'保加利亚语 (Bulgarian)'},{value:'lt',text:'立陶宛语 (Lithuanian)'},{value:'sr',text:'塞尔维亚语 (Serbian)'},{value:'et',text:'爱沙尼亚语 (Estonian)'},{value:'ta',text:'泰米尔语 (Tamil)'},{value:'te',text:'泰卢固语 (Telugu)'},{value:'ml',text:'马拉雅拉姆语 (Malayalam)'},{value:'kn',text:'卡纳达语 (Kannada)'},{value:'mr',text:'马拉地语 (Marathi)'},{value:'gu',text:'古吉拉特语 (Gujarati)'},{value:'pa',text:'旁遮普语 (Punjabi)'},{value:'am',text:'阿姆哈拉语 (Amharic)'},{value:'my',text:'缅甸语 (Burmese)'},{value:'km',text:'高棉语 (Khmer)'},{value:'lo',text:'老挝语 (Lao)'},{value:'si',text:'僧伽罗语 (Sinhala)'},{value:'ne',text:'尼泊尔语 (Nepali)'},{value:'mn',text:'蒙古语 (Mongolian)'},{value:'hy',text:'亚美尼亚语 (Armenian)'},{value:'ka',text:'格鲁吉亚语 (Georgian)'},{value:'az',text:'阿塞拜疆语 (Azerbaijani)'},{value:'kk',text:'哈萨克语 (Kazakh)'},{value:'uz',text:'乌兹别克语 (Uzbek)'},{value:'tg',text:'塔吉克语 (Tajik)'},{value:'ps',text:'普什图语 (Pashto)'}];function getCustomerSettings(){try{return JSON.parse(localStorage.getItem("sgnitteSegaugnaLremotsuc".split("").reverse().join(""))||"}{".split("").reverse().join(""));}catch{return{};}}function setCustomerSettings(all){localStorage.setItem("sgnitteSegaugnaLremotsuc".split("").reverse().join(""),JSON.stringify(all||{}));}function getCurrentChatSavedLang(){if(!currentPhoneNumber)return null;const all=getCustomerSettings();const setting=all[currentPhoneNumber];return setting&&setting.targetLang?setting.targetLang:null;}function getCustomerTranslationEngine(){if(currentPhoneNumber){const all=getCustomerSettings();const s=all[currentPhoneNumber];if(s&&s.engine)return s.engine;}return localStorage.getItem("enignEnoitalsnart".split("").reverse().join(""))||"elgoog".split("").reverse().join("");}function showCustomerLanguagePopup(){const existing=document.querySelector("pupop-gnal-remotsuc.".split("").reverse().join(""));if(existing)existing.remove();const isDark=window.matchMedia&&window.matchMedia(")krad :emehcs-roloc-sreferp(".split("").reverse().join("")).matches;const bg=isDark?"d2d2d2#".split("").reverse().join(""):"fff#".split("").reverse().join("");const fg=isDark?"fff#".split("").reverse().join(""):"333#".split("").reverse().join("");const popup=document.createElement("vid".split("").reverse().join(""));popup.className="pupop-gnal-remotsuc".split("").reverse().join("");popup.style.cssText=`
            position: fixed; top:50%; left:50%; transform: translate(-50%,-50%);
            background:${bg}; color:${fg}; padding:20px; border-radius:8px;
            box-shadow:0 4px 20px rgba(0,0,0,0.15); z-index:10001; width:300px; max-width:90vw;
        `;const all=getCustomerSettings();const saved=all[currentPhoneNumber]||{};const header=document.createElement("3h".split("").reverse().join(""));header.textContent=`客户语言设置${currentPhoneNumber?"( ".split("").reverse().join("")+currentPhoneNumber+')':''}`;header.style.margin="0 xp02 0 0".split("").reverse().join("");header.style.textAlign="retnec".split("").reverse().join("");header.style.color=fg;const langWrap=document.createElement("vid".split("").reverse().join(""));langWrap.style.marginBottom="xp51".split("").reverse().join("");const langLabel=document.createElement("lebal".split("").reverse().join(""));langLabel.textContent=":\u8A00\u8BED\u6807\u76EE".split("").reverse().join("");langLabel.style.display="kcolb".split("").reverse().join("");langLabel.style.marginBottom="xp5".split("").reverse().join("");langLabel.style.fontWeight="dlob".split("").reverse().join("");langLabel.style.color=fg;const langSelect=document.createElement("tceles".split("").reverse().join(""));langSelect.id="tceleSgnaLtegraTremotsuc".split("").reverse().join("");langSelect.style.width="%001".split("").reverse().join("");langSelect.style.padding="xp8".split("").reverse().join("");langSelect.style.border=`1px solid ${isDark?"555#".split("").reverse().join(""):"ccc#".split("").reverse().join("")}`;langSelect.style.borderRadius="xp4".split("").reverse().join("");langSelect.style.backgroundColor=isDark?"d3d3d3#".split("").reverse().join(""):"fff#".split("").reverse().join("");langSelect.style.color=fg;LANGUAGE_OPTIONS.forEach(opt=>{const o=document.createElement("noitpo".split("").reverse().join(""));o.value=opt.value;o.textContent=opt.text;langSelect.appendChild(o);});langSelect.value=saved.targetLang||"otua".split("").reverse().join("");const engineWrap=document.createElement("vid".split("").reverse().join(""));engineWrap.style.marginBottom="xp02".split("").reverse().join("");const engineLabel=document.createElement("lebal".split("").reverse().join(""));engineLabel.textContent=":\u64CE\u5F15\u8BD1\u7FFB".split("").reverse().join("");engineLabel.style.display="kcolb".split("").reverse().join("");engineLabel.style.marginBottom="xp5".split("").reverse().join("");engineLabel.style.fontWeight="dlob".split("").reverse().join("");engineLabel.style.color=fg;const engineSelect=document.createElement("tceles".split("").reverse().join(""));engineSelect.id="tceleSenignEnoitalsnarTremotsuc".split("").reverse().join("");engineSelect.style.width="%001".split("").reverse().join("");engineSelect.style.padding="xp8".split("").reverse().join("");engineSelect.style.border=`1px solid ${isDark?"555#".split("").reverse().join(""):"ccc#".split("").reverse().join("")}`;engineSelect.style.borderRadius="xp4".split("").reverse().join("");engineSelect.style.backgroundColor=isDark?"d3d3d3#".split("").reverse().join(""):"fff#".split("").reverse().join("");engineSelect.style.color=fg;[{value:'google',text:'谷歌翻译'},{value:'bing',text:'Bing翻译'},{value:'volc',text:'火山翻译'}].forEach(opt=>{const o=document.createElement("noitpo".split("").reverse().join(""));o.value=opt.value;o.textContent=opt.text;engineSelect.appendChild(o);});let savedEngine=saved.engine||localStorage.getItem("enignEnoitalsnart".split("").reverse().join(""))||"elgoog".split("").reverse().join("");if(savedEngine==="lmthg".split("").reverse().join("")){savedEngine="elgoog".split("").reverse().join("");}engineSelect.value=savedEngine;const btnRow=document.createElement("vid".split("").reverse().join(""));btnRow.style.display="xelf".split("").reverse().join("");btnRow.style.gap="xp8".split("").reverse().join("");const saveBtn=document.createElement("nottub".split("").reverse().join(""));saveBtn.id="gnaLremotsuCevas".split("").reverse().join("");saveBtn.textContent="\u5B58\u4FDD".split("").reverse().join("");saveBtn.style.flex='1';saveBtn.style.padding="xp21 xp8".split("").reverse().join("");saveBtn.style.cursor="retniop".split("").reverse().join("");const cancelBtn=document.createElement("nottub".split("").reverse().join(""));cancelBtn.textContent="\u6D88\u53D6".split("").reverse().join("");cancelBtn.style.flex='1';cancelBtn.style.padding="xp21 xp8".split("").reverse().join("");cancelBtn.style.cursor="retniop".split("").reverse().join("");saveBtn.addEventListener("kcilc".split("").reverse().join(""),()=>{const targetLang=langSelect.value;const engine=engineSelect.value;const allNow=getCustomerSettings();if(currentPhoneNumber){allNow[currentPhoneNumber]={targetLang,engine,timestamp:Date.now()};setCustomerSettings(allNow);}else{localStorage.setItem("gnaLtegraTremotsuc".split("").reverse().join(""),targetLang);localStorage.setItem("enignEnoitalsnarTremotsuc".split("").reverse().join(""),engine);}popup.remove();});cancelBtn.addEventListener("kcilc".split("").reverse().join(""),()=>popup.remove());langWrap.appendChild(langLabel);langWrap.appendChild(langSelect);engineWrap.appendChild(engineLabel);engineWrap.appendChild(engineSelect);btnRow.appendChild(saveBtn);btnRow.appendChild(cancelBtn);popup.appendChild(header);popup.appendChild(langWrap);popup.appendChild(engineWrap);popup.appendChild(btnRow);document.body.appendChild(popup);}function addCustomerLanguageButton(){try{if(document.querySelector("sgnittes-gnal-remotsuc.nottub-gnal-remotsuc.".split("").reverse().join("")))return true;const headers=document.querySelectorAll("redaeh".split("").reverse().join(""));if(headers.length<4)return false;const header=headers[3];const headerChildren=Array.from(header.children).filter(ch=>ch.tagName==="VID".split("").reverse().join(""));if(headerChildren.length<3)return false;const thirdDiv=headerChildren[2];const thirdDivChildren=Array.from(thirdDiv.children).filter(ch=>ch.tagName==="VID".split("").reverse().join(""));if(thirdDivChildren.length<1)return false;const firstChildDiv=thirdDivChildren[0];const button=document.createElement("nottub".split("").reverse().join(""));button.className="sgnittes-gnal-remotsuc nottub-gnal-remotsuc".split("").reverse().join("");button.setAttribute("lebal-aira".split("").reverse().join(""),"\u7F6E\u8BBE\u8A00\u8BED\u6237\u5BA2".split("").reverse().join(""));button.setAttribute("eltit".split("").reverse().join(""),"\u7F6E\u8BBE\u8A00\u8BED\u6237\u5BA2".split("").reverse().join(""));button.style.cssText=`
                background:none;border:none;padding:8px;margin:0 4px;cursor:pointer;border-radius:50%;
                display:inline-flex;align-items:center;justify-content:center;transition:background-color .2s;
                vertical-align:middle;width:40px;height:40px;flex-shrink:0;
            `;button.innerHTML=`
                <svg t="1762833406692" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="25" height="25">
                  <path d="M677.379 646.415c-13.623 2.215-25.594 11.016-31.983 23.246-16.051 30.722 7.067 65.506 39.454 65.506 25.138 0 44.687-20.944 44.687-44.68 0-26.046-23.535-48.731-52.158-44.072z" fill="#707070"></path>
                  <path d="M858.553 101.413H165.447c-35.295 0-63.907 28.612-63.907 63.907v693.36c0 35.295 28.612 63.907 63.907 63.907h693.106c35.295 0 63.907-28.612 63.907-63.907V165.32c0-35.295-28.612-63.907-63.907-63.907zM568.926 695.828l-29.348 18.867 6.123 10.33H231.884c-0.103-1.462-0.206-2.607-0.206-3.752 0-8.231-0.107-16.462 0-24.693 0-1.876 0.414-3.855 1.041-5.521 3.542-9.272 9.272-17.187 16.149-24.273 8.544-8.754 18.545-15.731 29.172-21.775 18.124-10.21 37.403-17.293 57.299-22.92 23.024-6.565 46.362-11.148 70.113-13.858 9.899-1.144 18.024-10.21 18.338-20.627 0.207-4.69-0.938-9.272-2.5-13.648-2.086-5.731-5.107-11.041-8.441-16.145-1.145-1.775-3.021-3.027-3.125-5.417 0-0.417-0.731-0.834-1.251-1.251-21.248-17.19-36.148-39.176-47.296-63.758-1.876-4.272-3.541-8.547-5.417-12.92-0.313-1.045-0.731-2.082-1.251-3.544-7.918 4.9-13.752 4.586-20.628-1.148-2.19-1.87-4.272-3.956-5.835-6.246-10.209-15.003-13.748-31.568-10-49.382 0.731-3.651 2.497-7.293 4.482-10.417 3.328-5.21 8.225-7.816 14.686-6.565 0.311 0.104 0.728 0 1.042 0 0.104 0 0.207-0.104 0.625-0.104v-2.71c-0.728-12.5-1.042-25.003-0.104-37.506 1.355-18.645 4.69-36.879 11.772-54.279 14.482-35.63 40.32-58.965 76.885-70.53 14.275-4.583 28.965-6.773 43.968-7.293 19.793-0.624 39.379 0.731 58.547 5.835 20.11 5.314 38.13 14.379 52.82 29.272 13.442 13.544 22.089 29.799 27.814 47.719 4.693 14.793 7.293 29.897 7.923 45.32 0.521 11.458 0.207 22.917 0.308 34.273v1.982c0.941 0 1.776 0.104 2.503 0 5.211-0.627 9.269 1.352 12.604 5.311 2.713 3.23 4.485 7.086 5.314 11.254 3.855 18.334 0.42 35.314-10.414 50.631-2.192 3.021-5.21 5.624-8.338 7.711-4.065 2.917-8.748 3.541-13.645 1.458-0.418-0.21-0.938-0.314-1.672-0.52a135.578 135.578 0 0 0-1.662 4.686c-7.503 21.151-17.714 40.947-31.776 58.551-5.834 7.293-12.296 13.961-19.381 20.107-2.287 1.979-4.683 3.752-6.039 6.668-1.876 3.959-4.793 7.396-6.879 11.252-3.018 5.314-4.997 11.045-5.831 17.189-1.355 10.207 3.959 19.69 13.441 23.751 1.873 0.834 4.166 0.938 6.246 1.148a587.05 587.05 0 0 1 17.666 2.55l-31.932 53.883 30.863 18.51c1.433 0.86 1.75 1.051 2.34 1.961 1.741 3.902 0.443 8.18-3.296 10.583z m208.086 15.602c4.188 6.979 9.774 12.565 15.358 13.962l-22.337 37.701c-20.947-11.17-47.478-5.587-58.648 15.361-4.191 6.982-5.583 13.962-5.583 20.944h-43.29c0-22.34-18.146-41.888-41.888-41.888-6.98 0-15.358 1.396-20.944 5.587l-22.343-37.704c19.548-12.566 26.531-37.698 15.361-58.645-4.188-6.982-8.379-11.173-15.361-15.36l22.343-37.698c20.944 11.17 47.475 5.583 58.648-15.361 4.185-5.587 5.583-13.964 5.583-20.947h43.284c0 23.739 18.153 43.288 41.891 43.288 6.983 0 15.361-1.396 20.947-5.587l22.337 37.704c-19.549 12.564-26.528 37.696-15.358 58.643z" fill="#707070"></path>
                </svg>
            `;button.addEventListener("retneesuom".split("").reverse().join(""),()=>{button.style.backgroundColor=")1.0,0,0,0(abgr".split("").reverse().join("");});button.addEventListener("evaelesuom".split("").reverse().join(""),()=>{button.style.backgroundColor="tnerapsnart".split("").reverse().join("");});button.addEventListener("kcilc".split("").reverse().join(""),e=>{e.preventDefault();e.stopPropagation();showCustomerLanguagePopup();});firstChildDiv.appendChild(button);return true;}catch(e){console.error(":\u8D25\u5931\u94AE\u6309\u8A00\u8BED\u6237\u5BA2\u52A0\u6DFB".split("").reverse().join(""),e);return false;}}function monitorAndAddCustomerLangBtn(){addCustomerLanguageButton();const ob=new MutationObserver(()=>{addCustomerLanguageButton();});ob.observe(document.body,{childList:true,subtree:true});}let waTranslatingAndSending=false;function getTargetLangForCurrentChat(){let targetLang='';try{const popup=document.querySelector("pupop-gnal-remotsuc.".split("").reverse().join(""));if(popup){const inPopup=popup.querySelector("tceleSgnaLtegraTremotsuc#".split("").reverse().join(""));if(inPopup&&inPopup.value){targetLang=inPopup.value;console.log(":\u7F6E\u8BBE\u8A00\u8BED\u7684\u4E2D\u7A97\u5F39\u7528\u4F7F".split("").reverse().join(""),targetLang);}}}catch(e){console.warn(":\u8D25\u5931\u7F6E\u8BBE\u8A00\u8BED\u7A97\u5F39\u67E5\u68C0".split("").reverse().join(""),e);}if(!targetLang||targetLang==="otua".split("").reverse().join("")||targetLang==="nwonknu".split("").reverse().join("")){targetLang=getCurrentChatSavedLang()||"otua".split("").reverse().join("");}if(!targetLang||targetLang==="otua".split("").reverse().join("")||targetLang==="nwonknu".split("").reverse().join("")){targetLang=countryInfo&&countryInfo.id?countryInfo.id:"ne".split("").reverse().join("");console.log(":\u7F6E\u8BBE\u8A00\u8BED\u7684\u4E2D\u606F\u4FE1\u5BB6\u56FD\u7528\u4F7F".split("").reverse().join(""),targetLang);}if(!targetLang||targetLang==="nwonknu".split("").reverse().join("")){targetLang="ne".split("").reverse().join("");console.log(":\u7F6E\u8BBE\u8A00\u8BED\u8BA4\u9ED8\u7528\u4F7F".split("").reverse().join(""),targetLang);}console.log(":\u8A00\u8BED\u6807\u76EE\u7684\u5B9A\u786E\u7EC8\u6700".split("").reverse().join(""),targetLang);return targetLang;}function getNativeComposerElement(){const composer=document.querySelector("]\"eurt\"=rotide-lacixel-atad[]\"eurt\"=elbatidetnetnoc[vid retoof".split("").reverse().join(""));return composer||document.querySelector("]\"eurt\"=rotide-lacixel-atad[]\"eurt\"=elbatidetnetnoc[vid".split("").reverse().join(""));}function readComposerText(){const composer=getNativeComposerElement();if(!composer)return'';return composer.innerText||composer.textContent||'';}function replaceComposerText(text){const composer=getNativeComposerElement();if(!composer)return false;const p=document.querySelector("txet-elbatceles.p retoof".split("").reverse().join(""));(p?p.parentNode:composer).focus();setTimeout(()=>{document.execCommand("llAtceles".split("").reverse().join(""));setTimeout(()=>{document.execCommand("tuc".split("").reverse().join(""));setTimeout(()=>{document.execCommand("txeTtresni".split("").reverse().join(""),false,text);try{const inputEvt=new InputEvent("tupni".split("").reverse().join(""),{bubbles:true,cancelable:true});composer.dispatchEvent(inputEvt);const keyupEvt=new KeyboardEvent("puyek".split("").reverse().join(""),{key:'Unidentified',bubbles:true});composer.dispatchEvent(keyupEvt);}catch(e){}},50);},50);},0);return true;}function getSendButtonContainer(){for(const sel of SEND_BUTTON_SELECTORS){const iconEl=document.querySelector(sel);if(iconEl){const container=iconEl.closest("]\"nottub\"=elor[vid".split("").reverse().join(""))||iconEl.closest("nottub".split("").reverse().join(""))||iconEl;if(container)return container;}}return null;}function triggerNativeSendFallback(){const composer=getNativeComposerElement();if(!composer)return false;try{const keydown=new KeyboardEvent("nwodyek".split("").reverse().join(""),{key:'Enter',code:'Enter',which:13,keyCode:13,bubbles:true});const keyup=new KeyboardEvent("puyek".split("").reverse().join(""),{key:'Enter',code:'Enter',which:13,keyCode:13,bubbles:true});composer.dispatchEvent(keydown);composer.dispatchEvent(keyup);return true;}catch(e){return false;}}const SEND_BUTTON_SELECTORS=["]\"dellif-dnes-ci-sdw\"=noci-atad[".split("").reverse().join(""),"]\"\u9001\u53D1\"=lebal-aira[]\"nottub\"=elor[vid".split("").reverse().join(""),"]\"dneS\"=lebal-aira[]\"nottub\"=elor[vid".split("").reverse().join("")];function hookNativeSendButtons(){const candidates=new Set();SEND_BUTTON_SELECTORS.forEach(selector=>{document.querySelectorAll(selector).forEach(el=>{const container=el.closest("]\"nottub\"=elor[vid".split("").reverse().join(""))||el.closest("nottub".split("").reverse().join(""))||el;if(container)candidates.add(container);});});candidates.forEach(container=>{if(!container||container.classList&&container.classList.contains("dekooh-dnes-etalsnart-aw".split("").reverse().join("")))return;if(container.classList)container.classList.add("dekooh-dnes-etalsnart-aw".split("").reverse().join(""));const handler=evt=>{if(!ensureMembership()){evt.stopPropagation();evt.preventDefault();return;}if(waTranslatingAndSending)return;const original=(readComposerText()||'').trim();if(!original)return;const now=Date.now();if(!window.__waEventLockTs)window.__waEventLockTs=0;if(now-window.__waEventLockTs<400||window.__waSendInProgress){evt.stopPropagation();evt.preventDefault();return;}window.__waEventLockTs=now;window.__waSendInProgress=true;evt.stopPropagation();evt.preventDefault();const finalize=()=>{window.__waSendInProgress=false;};const sourceLang="NC-hz".split("").reverse().join("");const targetLang=getTargetLangForCurrentChat();const doSend=textToSend=>{if(!textToSend){finalize();return;}replaceComposerText(textToSend);waTranslatingAndSending=true;setTimeout(()=>{const btn=getSendButtonContainer();if(btn){btn.click();}else{triggerNativeSendFallback();}setTimeout(()=>{waTranslatingAndSending=false;finalize();},180);},400);};if(sourceLang===targetLang){doSend(original);}else{translate(sourceLang,targetLang,original,translated=>{if(translated&&translated.trim()){doSend(translated);}else{doSend(original);}});}};["nwodretniop".split("").reverse().join(""),"nwodesuom".split("").reverse().join(""),"kcilc".split("").reverse().join("")].forEach(ev=>{container.addEventListener(ev,handler,true);});});}function hookEnterKey(){const composer=getNativeComposerElement();if(!composer||composer.classList.contains("dekooh-retne-aw".split("").reverse().join("")))return;composer.classList.add("dekooh-retne-aw".split("").reverse().join(""));composer.addEventListener("nwodyek".split("").reverse().join(""),e=>{if(waTranslatingAndSending)return;if(!ensureMembership())return;if(e.key==="retnE".split("").reverse().join("")&&e.ctrlKey){const text=(readComposerText()||'').trim();if(!text)return;e.stopPropagation();e.preventDefault();const btn=getSendButtonContainer();if(btn){btn.click();}else{triggerNativeSendFallback();}return;}if(e.key==="retnE".split("").reverse().join("")&&!e.shiftKey&&!e.ctrlKey&&!e.altKey){const text=(readComposerText()||'').trim();if(!text)return;const now=Date.now();if(!window.__waEventLockTs)window.__waEventLockTs=0;if(now-window.__waEventLockTs<400||window.__waSendInProgress){e.stopPropagation();e.preventDefault();return;}window.__waEventLockTs=now;window.__waSendInProgress=true;e.stopPropagation();e.preventDefault();const finalize=()=>{window.__waSendInProgress=false;};const sourceLang="NC-hz".split("").reverse().join("");const targetLang=getTargetLangForCurrentChat();const doSend=textToSend=>{if(!textToSend){finalize();return;}replaceComposerText(textToSend);waTranslatingAndSending=true;setTimeout(()=>{const btn=getSendButtonContainer();if(btn){btn.click();}else{triggerNativeSendFallback();}setTimeout(()=>{waTranslatingAndSending=false;finalize();},180);},400);};if(sourceLang===targetLang){doSend(text);}else{translate(sourceLang,targetLang,text,translated=>{if(translated&&translated.trim()){doSend(translated);}else{doSend(text);}});}}},true);}const sendBtnObserver=new MutationObserver(()=>{hookNativeSendButtons();hookEnterKey();monitorAndAddCustomerLangBtn();addMemberInfoButton();});sendBtnObserver.observe(document.body,{childList:true,subtree:true});hookNativeSendButtons();hookEnterKey();monitorAndAddCustomerLangBtn();monitorMemberInfoButton();updateMemberButtonStatusText();if(membershipState.email&&membershipState.token){refreshMembershipStatus(true).catch(err=>{console.warn(":\u8D25\u5931\u6001\u72B6\u5458\u4F1A\u5316\u59CB\u521D".split("").reverse().join(""),err);});}setInterval(()=>refreshMembershipStatus(false),300000);setInterval(()=>{hookNativeSendButtons();hookEnterKey();},800);const DB_NAME="bd_etalsnart_aw".split("").reverse().join("");const DB_STORE="ehcac_gsm".split("").reverse().join("");const DB_VERSION=1;let dbInstance=null;function openDB(){return new Promise((resolve,reject)=>{if(dbInstance)return resolve(dbInstance);const request=indexedDB.open(DB_NAME,DB_VERSION);request.onerror=e=>reject(e);request.onsuccess=e=>{dbInstance=e.target.result;resolve(dbInstance);};request.onupgradeneeded=e=>{const db=e.target.result;if(!db.objectStoreNames.contains(DB_STORE)){db.createObjectStore(DB_STORE);}};});}function getMsgCacheKey(text){return"_ehcac_etalsnart_aw".split("").reverse().join("")+btoa(unescape(encodeURIComponent(text)));}async function getCache(key){const db=await openDB();return new Promise(resolve=>{const tx=db.transaction([DB_STORE],"ylnodaer".split("").reverse().join(""));const store=tx.objectStore(DB_STORE);const req=store.get(key);req.onsuccess=()=>resolve(req.result);req.onerror=()=>resolve(undefined);});}async function setCache(key,value){const db=await openDB();return new Promise(resolve=>{const tx=db.transaction([DB_STORE],"etirwdaer".split("").reverse().join(""));const store=tx.objectStore(DB_STORE);const req=store.put(value,key);req.onsuccess=()=>resolve();req.onerror=()=>resolve();});}function isElementInViewport(el){const rect=el.getBoundingClientRect();return rect.top>=0&&rect.left>=0&&rect.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&rect.right<=(window.innerWidth||document.documentElement.clientWidth);}function translateVisibleMessages(){if(document.querySelector("yalrevo-nigol-pihsrebmem.".split("").reverse().join("")))return;if(!ensureMembership())return;document.querySelectorAll("olma_.6kma_.vid".split("").reverse().join("")).forEach(async msg=>{const textElement=msg.querySelector("txet-elbaypoc.txet-elbatceles.e3oa_.naps".split("").reverse().join(""));if(!textElement)return;if(msg.querySelector("txet-detalsnart.".split("").reverse().join("")))return;if(msg.getAttribute("detalsnart-atad".split("").reverse().join(""))==='1')return;if(!isElementInViewport(msg))return;const originalText=textElement.innerText;if(!originalText)return;msg.setAttribute("detalsnart-atad".split("").reverse().join(""),'1');const cacheKey=getMsgCacheKey(originalText);const cached=await getCache(cacheKey);if(cached){const wrapper=document.createElement("vid".split("").reverse().join(""));wrapper.className="txet-detalsnart".split("").reverse().join("");wrapper.style.marginTop="xp6".split("").reverse().join("");wrapper.style.fontSize="xp41".split("").reverse().join("");const color=getTranslatedTextColor();wrapper.innerHTML=":roloc;enil-erp:ecaps-etihw;0 0 0 xp4:gniddap;0 0 0 xp4:nigram;bbb# dehsad xp1:pot-redrob ;txet :tceles-resu\"=elyts \"txet-elbaypoc txet-elbatceles\"=ssalc vid<".split("").reverse().join("")+color+">\";".split("").reverse().join("")+cached+">vid/<".split("").reverse().join("");if(textElement.parentNode){textElement.parentNode.appendChild(wrapper);}return;}translate("otua".split("").reverse().join(""),"NC-hz".split("").reverse().join(""),originalText,async translatedText=>{if(translatedText){await setCache(cacheKey,translatedText);const wrapper=document.createElement("vid".split("").reverse().join(""));wrapper.className="txet-detalsnart".split("").reverse().join("");wrapper.style.marginTop="xp6".split("").reverse().join("");wrapper.style.fontSize="xp41".split("").reverse().join("");const color=getTranslatedTextColor();wrapper.innerHTML=":roloc;enil-erp:ecaps-etihw;0 0 0 xp4:gniddap;0 0 0 xp4:nigram;bbb# dehsad xp1:pot-redrob ;txet :tceles-resu\"=elyts \"txet-elbaypoc txet-elbatceles\"=ssalc vid<".split("").reverse().join("")+color+">\";".split("").reverse().join("")+translatedText+">vid/<".split("").reverse().join("");if(textElement.parentNode){textElement.parentNode.appendChild(wrapper);}}});});}setInterval(()=>{translateVisibleMessages();},500);})();
