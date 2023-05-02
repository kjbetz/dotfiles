/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
document.addEventListener("DOMContentLoaded", (event) => {
    if (window.location.hostname.endsWith("vault.bitwarden.com")) {
        return;
    }
    const pageDetails = [];
    const formData = [];
    let barType = null;
    let pageHref = null;
    let observer = null;
    const observeIgnoredElements = new Set([
        "a",
        "i",
        "b",
        "strong",
        "span",
        "code",
        "br",
        "img",
        "small",
        "em",
        "hr",
    ]);
    let domObservationCollectTimeout = null;
    let collectIfNeededTimeout = null;
    let observeDomTimeout = null;
    const inIframe = isInIframe();
    const cancelButtonNames = new Set(["cancel", "close", "back"]);
    const logInButtonNames = new Set([
        "log in",
        "sign in",
        "login",
        "go",
        "submit",
        "continue",
        "next",
    ]);
    const changePasswordButtonNames = new Set([
        "save password",
        "update password",
        "change password",
        "change",
    ]);
    const changePasswordButtonContainsNames = new Set(["pass", "change", "contras", "senha"]);
    let disabledAddLoginNotification = false;
    let disabledChangedPasswordNotification = false;
    const activeUserIdKey = "activeUserId";
    let activeUserId;
    chrome.storage.local.get(activeUserIdKey, (obj) => {
        if (obj == null || obj[activeUserIdKey] == null) {
            return;
        }
        activeUserId = obj[activeUserIdKey];
    });
    chrome.storage.local.get(activeUserId, (obj) => {
        if ((obj === null || obj === void 0 ? void 0 : obj[activeUserId]) == null) {
            return;
        }
        const domains = obj[activeUserId].settings.neverDomains;
        // eslint-disable-next-line
        if (domains != null && domains.hasOwnProperty(window.location.hostname)) {
            return;
        }
        disabledAddLoginNotification = obj[activeUserId].settings.disableAddLoginNotification;
        disabledChangedPasswordNotification =
            obj[activeUserId].settings.disableChangedPasswordNotification;
        if (!disabledAddLoginNotification || !disabledChangedPasswordNotification) {
            collectIfNeededWithTimeout();
        }
    });
    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
        processMessages(msg, sendResponse);
    });
    function processMessages(msg, sendResponse) {
        if (msg.command === "openNotificationBar") {
            if (inIframe) {
                return;
            }
            closeExistingAndOpenBar(msg.data.type, msg.data.typeData);
            sendResponse();
            return true;
        }
        else if (msg.command === "closeNotificationBar") {
            if (inIframe) {
                return;
            }
            closeBar(true);
            sendResponse();
            return true;
        }
        else if (msg.command === "adjustNotificationBar") {
            if (inIframe) {
                return;
            }
            adjustBar(msg.data);
            sendResponse();
            return true;
        }
        else if (msg.command === "notificationBarPageDetails") {
            pageDetails.push(msg.data.details);
            watchForms(msg.data.forms);
            sendResponse();
            return true;
        }
    }
    function isInIframe() {
        try {
            return window.self !== window.top;
        }
        catch (_a) {
            return true;
        }
    }
    function observeDom() {
        const bodies = document.querySelectorAll("body");
        if (bodies && bodies.length > 0) {
            observer = new MutationObserver((mutations) => {
                if (mutations == null || mutations.length === 0 || pageHref !== window.location.href) {
                    return;
                }
                let doCollect = false;
                for (let i = 0; i < mutations.length; i++) {
                    const mutation = mutations[i];
                    if (mutation.addedNodes == null || mutation.addedNodes.length === 0) {
                        continue;
                    }
                    for (let j = 0; j < mutation.addedNodes.length; j++) {
                        const addedNode = mutation.addedNodes[j];
                        if (addedNode == null) {
                            continue;
                        }
                        const tagName = addedNode.tagName != null ? addedNode.tagName.toLowerCase() : null;
                        if (tagName != null &&
                            tagName === "form" &&
                            (addedNode.dataset == null || !addedNode.dataset.bitwardenWatching)) {
                            doCollect = true;
                            break;
                        }
                        if ((tagName != null && observeIgnoredElements.has(tagName)) ||
                            addedNode.querySelectorAll == null) {
                            continue;
                        }
                        const forms = addedNode.querySelectorAll("form:not([data-bitwarden-watching])");
                        if (forms != null && forms.length > 0) {
                            doCollect = true;
                            break;
                        }
                    }
                    if (doCollect) {
                        break;
                    }
                }
                if (doCollect) {
                    if (domObservationCollectTimeout != null) {
                        window.clearTimeout(domObservationCollectTimeout);
                    }
                    domObservationCollectTimeout = window.setTimeout(collect, 1000);
                }
            });
            observer.observe(bodies[0], { childList: true, subtree: true });
        }
    }
    function collectIfNeededWithTimeout() {
        if (collectIfNeededTimeout != null) {
            window.clearTimeout(collectIfNeededTimeout);
        }
        collectIfNeededTimeout = window.setTimeout(collectIfNeeded, 1000);
    }
    function collectIfNeeded() {
        if (pageHref !== window.location.href) {
            pageHref = window.location.href;
            if (observer) {
                observer.disconnect();
                observer = null;
            }
            collect();
            if (observeDomTimeout != null) {
                window.clearTimeout(observeDomTimeout);
            }
            observeDomTimeout = window.setTimeout(observeDom, 1000);
        }
        if (collectIfNeededTimeout != null) {
            window.clearTimeout(collectIfNeededTimeout);
        }
        collectIfNeededTimeout = window.setTimeout(collectIfNeeded, 1000);
    }
    function collect() {
        sendPlatformMessage({
            command: "bgCollectPageDetails",
            sender: "notificationBar",
        });
    }
    function watchForms(forms) {
        if (forms == null || forms.length === 0) {
            return;
        }
        forms.forEach((f) => {
            const formId = f.form != null ? f.form.htmlID : null;
            let formEl = null;
            if (formId != null && formId !== "") {
                formEl = document.getElementById(formId);
            }
            if (formEl == null) {
                const index = parseInt(f.form.opid.split("__")[2], null);
                formEl = document.getElementsByTagName("form")[index];
            }
            if (formEl != null && formEl.dataset.bitwardenWatching !== "1") {
                const formDataObj = {
                    data: f,
                    formEl: formEl,
                    usernameEl: null,
                    passwordEl: null,
                    passwordEls: null,
                };
                locateFields(formDataObj);
                formData.push(formDataObj);
                listen(formEl);
                formEl.dataset.bitwardenWatching = "1";
            }
        });
    }
    function listen(form) {
        form.removeEventListener("submit", formSubmitted, false);
        form.addEventListener("submit", formSubmitted, false);
        const submitButton = getSubmitButton(form, logInButtonNames);
        if (submitButton != null) {
            submitButton.removeEventListener("click", formSubmitted, false);
            submitButton.addEventListener("click", formSubmitted, false);
        }
    }
    function locateFields(formDataObj) {
        const inputs = Array.from(document.getElementsByTagName("input"));
        formDataObj.usernameEl = locateField(formDataObj.formEl, formDataObj.data.username, inputs);
        if (formDataObj.usernameEl != null && formDataObj.data.password != null) {
            formDataObj.passwordEl = locatePassword(formDataObj.formEl, formDataObj.data.password, inputs, true);
        }
        else if (formDataObj.data.passwords != null) {
            formDataObj.passwordEls = [];
            formDataObj.data.passwords.forEach((pData) => {
                const el = locatePassword(formDataObj.formEl, pData, inputs, false);
                if (el != null) {
                    formDataObj.passwordEls.push(el);
                }
            });
            if (formDataObj.passwordEls.length === 0) {
                formDataObj.passwordEls = null;
            }
        }
    }
    function locatePassword(form, passwordData, inputs, doLastFallback) {
        let el = locateField(form, passwordData, inputs);
        if (el != null && el.type !== "password") {
            el = null;
        }
        if (doLastFallback && el == null) {
            el = form.querySelector('input[type="password"]');
        }
        return el;
    }
    function locateField(form, fieldData, inputs) {
        if (fieldData == null) {
            return;
        }
        let el = null;
        if (fieldData.htmlID != null && fieldData.htmlID !== "") {
            try {
                el = form.querySelector("#" + fieldData.htmlID);
            }
            catch (_a) {
                // Ignore error, we perform fallbacks below.
            }
        }
        if (el == null && fieldData.htmlName != null && fieldData.htmlName !== "") {
            el = form.querySelector('input[name="' + fieldData.htmlName + '"]');
        }
        if (el == null && fieldData.elementNumber != null) {
            el = inputs[fieldData.elementNumber];
        }
        return el;
    }
    function formSubmitted(e) {
        let form = null;
        if (e.type === "click") {
            form = e.target.closest("form");
            if (form == null) {
                const parentModal = e.target.closest("div.modal");
                if (parentModal != null) {
                    const modalForms = parentModal.querySelectorAll("form");
                    if (modalForms.length === 1) {
                        form = modalForms[0];
                    }
                }
            }
        }
        else {
            form = e.target;
        }
        if (form == null || form.dataset.bitwardenProcessed === "1") {
            return;
        }
        for (let i = 0; i < formData.length; i++) {
            if (formData[i].formEl !== form) {
                continue;
            }
            const disabledBoth = disabledChangedPasswordNotification && disabledAddLoginNotification;
            if (!disabledBoth && formData[i].usernameEl != null && formData[i].passwordEl != null) {
                const login = {
                    username: formData[i].usernameEl.value,
                    password: formData[i].passwordEl.value,
                    url: document.URL,
                };
                if (login.username != null &&
                    login.username !== "" &&
                    login.password != null &&
                    login.password !== "") {
                    processedForm(form);
                    sendPlatformMessage({
                        command: "bgAddLogin",
                        login: login,
                    });
                    break;
                }
            }
            if (!disabledChangedPasswordNotification && formData[i].passwordEls != null) {
                const passwords = formData[i].passwordEls
                    .filter((el) => el.value != null && el.value !== "")
                    .map((el) => el.value);
                let curPass = null;
                let newPass = null;
                let newPassOnly = false;
                if (formData[i].passwordEls.length === 3 && passwords.length === 3) {
                    newPass = passwords[1];
                    if (passwords[0] !== newPass && newPass === passwords[2]) {
                        curPass = passwords[0];
                    }
                    else if (newPass !== passwords[2] && passwords[0] === newPass) {
                        curPass = passwords[2];
                    }
                }
                else if (formData[i].passwordEls.length === 2 && passwords.length === 2) {
                    if (passwords[0] === passwords[1]) {
                        newPassOnly = true;
                        newPass = passwords[0];
                        curPass = null;
                    }
                    else {
                        const buttonText = getButtonText(getSubmitButton(form, changePasswordButtonNames));
                        const matches = Array.from(changePasswordButtonContainsNames).filter((n) => buttonText.indexOf(n) > -1);
                        if (matches.length > 0) {
                            curPass = passwords[0];
                            newPass = passwords[1];
                        }
                    }
                }
                if ((newPass != null && curPass != null) || (newPassOnly && newPass != null)) {
                    processedForm(form);
                    const changePasswordRuntimeMessage = {
                        newPassword: newPass,
                        currentPassword: curPass,
                        url: document.URL,
                    };
                    sendPlatformMessage({
                        command: "bgChangedPassword",
                        data: changePasswordRuntimeMessage,
                    });
                    break;
                }
            }
        }
    }
    function getSubmitButton(wrappingEl, buttonNames) {
        if (wrappingEl == null) {
            return null;
        }
        const wrappingElIsForm = wrappingEl.tagName.toLowerCase() === "form";
        let submitButton = wrappingEl.querySelector('input[type="submit"], input[type="image"], ' + 'button[type="submit"]');
        if (submitButton == null && wrappingElIsForm) {
            submitButton = wrappingEl.querySelector("button:not([type])");
            if (submitButton != null) {
                const buttonText = getButtonText(submitButton);
                if (buttonText != null && cancelButtonNames.has(buttonText.trim().toLowerCase())) {
                    submitButton = null;
                }
            }
        }
        if (submitButton == null) {
            const possibleSubmitButtons = Array.from(wrappingEl.querySelectorAll('a, span, button[type="button"], ' + 'input[type="button"], button:not([type])'));
            let typelessButton = null;
            possibleSubmitButtons.forEach((button) => {
                if (submitButton != null || button == null || button.tagName == null) {
                    return;
                }
                const buttonText = getButtonText(button);
                if (buttonText != null) {
                    if (typelessButton != null &&
                        button.tagName.toLowerCase() === "button" &&
                        button.getAttribute("type") == null &&
                        !cancelButtonNames.has(buttonText.trim().toLowerCase())) {
                        typelessButton = button;
                    }
                    else if (buttonNames.has(buttonText.trim().toLowerCase())) {
                        submitButton = button;
                    }
                }
            });
            if (submitButton == null && typelessButton != null) {
                submitButton = typelessButton;
            }
        }
        if (submitButton == null && wrappingElIsForm) {
            // Maybe it's in a modal?
            const parentModal = wrappingEl.closest("div.modal");
            if (parentModal != null) {
                const modalForms = parentModal.querySelectorAll("form");
                if (modalForms.length === 1) {
                    submitButton = getSubmitButton(parentModal, buttonNames);
                }
            }
        }
        return submitButton;
    }
    function getButtonText(button) {
        let buttonText = null;
        if (button.tagName.toLowerCase() === "input") {
            buttonText = button.value;
        }
        else {
            buttonText = button.innerText;
        }
        return buttonText;
    }
    function processedForm(form) {
        form.dataset.bitwardenProcessed = "1";
        window.setTimeout(() => {
            form.dataset.bitwardenProcessed = "0";
        }, 500);
    }
    function closeExistingAndOpenBar(type, typeData) {
        const barQueryParams = {
            type,
            isVaultLocked: typeData.isVaultLocked,
            theme: typeData.theme,
        };
        const barQueryString = new URLSearchParams(barQueryParams).toString();
        const barPage = "notification/bar.html?" + barQueryString;
        const frame = document.getElementById("bit-notification-bar-iframe");
        if (frame != null && frame.src.indexOf(barPage) >= 0) {
            return;
        }
        closeBar(false);
        openBar(type, barPage);
    }
    function openBar(type, barPage) {
        barType = type;
        if (document.body == null) {
            return;
        }
        const barPageUrl = chrome.extension.getURL(barPage);
        const iframe = document.createElement("iframe");
        iframe.style.cssText = "height: 42px; width: 100%; border: 0; min-height: initial;";
        iframe.id = "bit-notification-bar-iframe";
        iframe.src = barPageUrl;
        const frameDiv = document.createElement("div");
        frameDiv.setAttribute("aria-live", "polite");
        frameDiv.id = "bit-notification-bar";
        frameDiv.style.cssText =
            "height: 42px; width: 100%; top: 0; left: 0; padding: 0; position: fixed; " +
                "z-index: 2147483647; visibility: visible;";
        frameDiv.appendChild(iframe);
        document.body.appendChild(frameDiv);
        iframe.contentWindow.location = barPageUrl;
        const spacer = document.createElement("div");
        spacer.id = "bit-notification-bar-spacer";
        spacer.style.cssText = "height: 42px;";
        document.body.insertBefore(spacer, document.body.firstChild);
    }
    function closeBar(explicitClose) {
        const barEl = document.getElementById("bit-notification-bar");
        if (barEl != null) {
            barEl.parentElement.removeChild(barEl);
        }
        const spacerEl = document.getElementById("bit-notification-bar-spacer");
        if (spacerEl) {
            spacerEl.parentElement.removeChild(spacerEl);
        }
        if (!explicitClose) {
            return;
        }
        switch (barType) {
            case "add":
                sendPlatformMessage({
                    command: "bgAddClose",
                });
                break;
            case "change":
                sendPlatformMessage({
                    command: "bgChangeClose",
                });
                break;
            default:
                break;
        }
    }
    function adjustBar(data) {
        if (data != null && data.height !== 42) {
            const newHeight = data.height + "px";
            doHeightAdjustment("bit-notification-bar-iframe", newHeight);
            doHeightAdjustment("bit-notification-bar", newHeight);
            doHeightAdjustment("bit-notification-bar-spacer", newHeight);
        }
    }
    function doHeightAdjustment(elId, heightStyle) {
        const el = document.getElementById(elId);
        if (el != null) {
            el.style.height = heightStyle;
        }
    }
    function sendPlatformMessage(msg) {
        chrome.runtime.sendMessage(msg);
    }
});


/******/ })()
;