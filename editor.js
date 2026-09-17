
"use strict";

/* =========================================
   APSARA VISUAL EDITOR
   LOCAL IMAGE EDITOR + PROJECT EXPORT
========================================= */


/* =========================================
   CONFIGURATION
========================================= */

const EDITOR_CONFIG = {

  storageKey: "apsara_visual_editor_replacements_v2",

  exportVersion: "2.0",

  websiteFile: "index.html",

  maxImageSizeMB: 15,

  previewHeight: "calc(100vh - 220px)"

};


/* =========================================
   STATE
========================================= */

const state = {

  replacements: loadReplacements(),

  selectedImage: null,

  selectedImageSource: "",

  selectedImageAlt: "",

  selectedImageKey: "",

  selectedImageNewData: "",

  selectedImageNewName: "",

  selectedImageNewType: "",

  selectedDevice: "desktop",

  imageElements: [],

  isReady: false

};


/* =========================================
   DOM REFERENCES
========================================= */

const websiteFrame = document.getElementById("websiteFrame");

const websiteFrameContainer = document.getElementById(
  "websiteFrameContainer"
);

const previewStage = document.getElementById(
  "previewStage"
);

const editorStatus = document.getElementById(
  "editorStatus"
);

const editedImageCount = document.getElementById(
  "editedImageCount"
);

const editorNotification = document.getElementById(
  "editorNotification"
);

const imageModalBackdrop = document.getElementById(
  "imageModalBackdrop"
);

const closeImageModalButton = document.getElementById(
  "closeImageModalButton"
);

const cancelImageButton = document.getElementById(
  "cancelImageButton"
);

const saveImageButton = document.getElementById(
  "saveImageButton"
);

const resetSelectedImageButton = document.getElementById(
  "resetSelectedImageButton"
);

const imageFileInput = document.getElementById(
  "imageFileInput"
);

const currentImagePreview = document.getElementById(
  "currentImagePreview"
);

const newImagePreview = document.getElementById(
  "newImagePreview"
);

const newImagePlaceholder = document.getElementById(
  "newImagePlaceholder"
);

const selectedImageDetails = document.getElementById(
  "selectedImageDetails"
);

const imageAltInput = document.getElementById(
  "imageAltInput"
);

const refreshPreviewButton = document.getElementById(
  "refreshPreviewButton"
);

const resetAllButton = document.getElementById(
  "resetAllButton"
);

const exportProjectButton = document.getElementById(
  "exportProjectButton"
);

const selectImageButton = document.getElementById(
  "selectImageButton"
);

const importProjectButton = document.getElementById(
  "importProjectButton"
);

const downloadAssetsButton = document.getElementById(
  "downloadAssetsButton"
);

const previewButton = document.getElementById(
  "previewButton"
);

const importProjectInput = document.getElementById(
  "importProjectInput"
);

const directImageInput = document.getElementById(
  "directImageInput"
);


/* =========================================
   UTILITY FUNCTIONS
========================================= */

function showNotification(message) {

  editorNotification.textContent = message;

  editorNotification.classList.add("active");

  window.clearTimeout(showNotification.timeout);

  showNotification.timeout = window.setTimeout(() => {

    editorNotification.classList.remove("active");

  }, 3500);

}


function updateStatus(message) {

  if (editorStatus) {
    editorStatus.textContent = message;
  }

}


function updateEditedImageCount() {

  if (editedImageCount) {

    editedImageCount.textContent = String(
      Object.keys(state.replacements).length
    );

  }

}


function safeString(value) {

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();

}


function isValidImageDataUrl(value) {

  return typeof value === "string" &&
    value.startsWith("data:image/");

}


function createImageKey(source) {

  if (!source) {
    return "";
  }

  return source;

}


function getImageSource(image) {

  if (!image) {
    return "";
  }

  return (
    image.getAttribute("data-editor-original-src") ||
    image.getAttribute("src") ||
    ""
  );

}


function getImageLabel(image) {

  if (!image) {
    return "Website image";
  }

  const alt = safeString(
    image.getAttribute("alt")
  );

  if (alt) {
    return alt;
  }

  const className = safeString(
    image.className
  );

  if (className) {
    return className;
  }

  return "Website image";

}


/* =========================================
   LOCAL STORAGE
========================================= */

function loadReplacements() {

  try {

    const saved = localStorage.getItem(
      EDITOR_CONFIG.storageKey
    );

    if (!saved) {
      return {};
    }

    const parsed = JSON.parse(saved);

    if (
      !parsed ||
      typeof parsed !== "object" ||
      Array.isArray(parsed)
    ) {
      return {};
    }

    return parsed;

  } catch (error) {

    console.warn(
      "Could not load local editor replacements.",
      error
    );

    return {};

  }

}


function saveReplacements() {

  try {

    localStorage.setItem(
      EDITOR_CONFIG.storageKey,
      JSON.stringify(state.replacements)
    );

    updateEditedImageCount();

    return true;

  } catch (error) {

    console.error(
      "Could not save editor replacements.",
      error
    );

    showNotification(
      "Storage limit reached. Export your project and use smaller images."
    );

    return false;

  }

}


/* =========================================
   IFRAME ACCESS
========================================= */

function getFrameDocument() {

  try {

    return websiteFrame.contentDocument ||
      websiteFrame.contentWindow.document;

  } catch (error) {

    console.error(
      "Cannot access website preview.",
      error
    );

    return null;

  }

}


function getFrameWindow() {

  try {

    return websiteFrame.contentWindow;

  } catch (error) {

    return null;

  }

}


/* =========================================
   APPLY SAVED REPLACEMENTS
========================================= */

function applyReplacementToImage(image) {

  if (!image) {
    return;
  }

  const originalSource = getImageSource(image);

  if (!originalSource) {
    return;
  }

  const key = createImageKey(originalSource);

  const replacement = state.replacements[key];

  if (!replacement) {
    return;
  }

  if (replacement.dataUrl) {

    image.src = replacement.dataUrl;

    image.setAttribute(
      "data-editor-replaced",
      "true"
    );

  }

  if (replacement.alt) {

    image.alt = replacement.alt;

  }

}


function applyAllReplacements() {

  const documentInsideFrame = getFrameDocument();

  if (!documentInsideFrame) {
    return;
  }

  const images = documentInsideFrame.querySelectorAll(
    "img"
  );

  images.forEach(image => {

    if (
      !image.hasAttribute(
        "data-editor-original-src"
      )
    ) {

      const source = image.getAttribute("src");

      if (source) {

        image.setAttribute(
          "data-editor-original-src",
          source
        );

      }

    }

    applyReplacementToImage(image);

  });

  updateEditedImageCount();

}


/* =========================================
   IMAGE ELEMENT REGISTRATION
========================================= */

function registerImage(image) {

  if (!image || image.dataset.editorRegistered === "true") {
    return;
  }

  image.dataset.editorRegistered = "true";

  const originalSource =
    image.getAttribute("src") || "";

  if (!image.hasAttribute("data-editor-original-src")) {

    image.setAttribute(
      "data-editor-original-src",
      originalSource
    );

  }

  image.style.cursor = "pointer";

  image.title = "Click to replace this image";

  image.addEventListener("mouseenter", () => {

    image.classList.add(
      "editor-image-highlight"
    );

  });

  image.addEventListener("mouseleave", () => {

    image.classList.remove(
      "editor-image-highlight"
    );

  });

  image.addEventListener("click", event => {

    event.preventDefault();
    event.stopPropagation();

    openImageEditor(image);

  });

}


function registerAllImages() {

  const documentInsideFrame = getFrameDocument();

  if (!documentInsideFrame) {
    return;
  }

  const images = documentInsideFrame.querySelectorAll(
    "img"
  );

  state.imageElements = Array.from(images);

  state.imageElements.forEach(image => {

    registerImage(image);

  });

  applyAllReplacements();

}


/* =========================================
   OBSERVE DYNAMIC WEBSITE RENDERING
========================================= */

function observeWebsiteChanges() {

  const documentInsideFrame = getFrameDocument();

  if (!documentInsideFrame) {
    return;
  }

  const app = documentInsideFrame.getElementById(
    "app"
  );

  if (!app) {
    return;
  }

  const observer = new MutationObserver(() => {

    registerAllImages();

  });

  observer.observe(app, {

    childList: true,

    subtree: true

  });

  websiteFrame._apsaraEditorObserver = observer;

}


/* =========================================
   OPEN IMAGE EDITOR
========================================= */

function openImageEditor(image) {

  if (!image) {
    return;
  }

  state.selectedImage = image;

  state.selectedImageSource =
    getImageSource(image);

  state.selectedImageAlt =
    image.getAttribute("alt") || "";

  state.selectedImageKey =
    createImageKey(
      state.selectedImageSource
    );

  state.selectedImageNewData = "";

  state.selectedImageNewName = "";

  state.selectedImageNewType = "";

  const savedReplacement =
    state.replacements[state.selectedImageKey];

  const currentSource =
    savedReplacement?.dataUrl ||
    image.getAttribute("src") ||
    "";

  currentImagePreview.src = currentSource;

  imageAltInput.value =
    savedReplacement?.alt ||
    state.selectedImageAlt;

  selectedImageDetails.textContent =
    `Selected: ${getImageLabel(image)}`;

  newImagePreview.hidden = true;

  newImagePreview.removeAttribute("src");

  newImagePlaceholder.hidden = false;

  imageFileInput.value = "";

  saveImageButton.disabled = true;

  imageModalBackdrop.classList.add(
    "active"
  );

  imageModalBackdrop.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow = "hidden";

}


/* =========================================
   CLOSE IMAGE EDITOR
========================================= */

function closeImageEditor() {

  imageModalBackdrop.classList.remove(
    "active"
  );

  imageModalBackdrop.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow = "";

  state.selectedImage = null;

  state.selectedImageSource = "";

  state.selectedImageAlt = "";

  state.selectedImageKey = "";

  state.selectedImageNewData = "";

  state.selectedImageNewName = "";

  state.selectedImageNewType = "";

  imageFileInput.value = "";

  saveImageButton.disabled = true;

}


/* =========================================
   READ SELECTED IMAGE
========================================= */

function readImageFile(file) {

  return new Promise((resolve, reject) => {

    if (!file) {

      reject(
        new Error("No file selected.")
      );

      return;

    }

    if (!file.type.startsWith("image/")) {

      reject(
        new Error("Please select a valid image.")
      );

      return;

    }

    const sizeInMB =
      file.size / (1024 * 1024);

    if (
      sizeInMB >
      EDITOR_CONFIG.maxImageSizeMB
    ) {

      reject(
        new Error(
          `Image must be smaller than ${EDITOR_CONFIG.maxImageSizeMB} MB.`
        )
      );

      return;

    }

    const reader = new FileReader();

    reader.onload = () => {

      resolve({
        dataUrl: reader.result,
        name: file.name,
        type: file.type
      });

    };

    reader.onerror = () => {

      reject(
        new Error("Could not read the selected image.")
      );

    };

    reader.readAsDataURL(file);

  });

}


/* =========================================
   IMAGE FILE INPUT
========================================= */

imageFileInput.addEventListener(
  "change",
  async event => {

    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    try {

      const imageData =
        await readImageFile(file);

      state.selectedImageNewData =
        imageData.dataUrl;

      state.selectedImageNewName =
        imageData.name;

      state.selectedImageNewType =
        imageData.type;

      newImagePreview.src =
        imageData.dataUrl;

      newImagePreview.hidden = false;

      newImagePlaceholder.hidden = true;

      saveImageButton.disabled = false;

    } catch (error) {

      showNotification(
        error.message ||
        "Could not load image."
      );

      saveImageButton.disabled = true;

    }

  }
);


/* =========================================
   SAVE IMAGE REPLACEMENT
========================================= */

function saveSelectedImage() {

  if (!state.selectedImage) {

    showNotification(
      "No image is selected."
    );

    return;

  }

  if (!state.selectedImageKey) {

    showNotification(
      "This image does not have a valid source."
    );

    return;

  }

  if (!state.selectedImageNewData) {

    showNotification(
      "Choose a new image first."
    );

    return;

  }

  const altText =
    safeString(imageAltInput.value) ||
    state.selectedImageAlt ||
    "Salon image";

  state.replacements[
    state.selectedImageKey
  ] = {

    dataUrl: state.selectedImageNewData,

    alt: altText,

    fileName:
      state.selectedImageNewName ||
      "replacement-image",

    mimeType:
      state.selectedImageNewType ||
      "image/jpeg",

    updatedAt:
      new Date().toISOString()

  };

  const saved =
    saveReplacements();

  if (!saved) {
    return;
  }

  applyAllReplacements();

  closeImageEditor();

  showNotification(
    "Image replacement saved locally."
  );

  updateStatus(
    "Your image edit is saved in this browser."
  );

}


/* =========================================
   RESET ONE IMAGE
========================================= */

function resetSelectedImage() {

  if (!state.selectedImage) {
    return;
  }

  const key =
    state.selectedImageKey;

  if (key && state.replacements[key]) {

    delete state.replacements[key];

    saveReplacements();

  }

  const originalSource =
    state.selectedImageSource;

  if (originalSource) {

    state.selectedImage.src =
      originalSource;

    state.selectedImage.removeAttribute(
      "data-editor-replaced"
    );

  }

  state.selectedImage.alt =
    state.selectedImageAlt;

  closeImageEditor();

  showNotification(
    "This image was restored."
  );

}


/* =========================================
   RESET ALL EDITS
========================================= */

function resetAllEdits() {

  const count =
    Object.keys(state.replacements).length;

  if (!count) {

    showNotification(
      "There are no saved image edits."
    );

    return;

  }

  const confirmed =
    window.confirm(
      "Reset all local image edits? This cannot be undone."
    );

  if (!confirmed) {
    return;
  }

  state.replacements = {};

  saveReplacements();

  refreshWebsitePreview();

  showNotification(
    "All local image edits were reset."
  );

  updateStatus(
    "All image replacements have been removed."
  );

}


/* =========================================
   REFRESH WEBSITE PREVIEW
========================================= */

function refreshWebsitePreview() {

  websiteFrame.src =
    `index.html?editorMode=true&refresh=${Date.now()}`;

  updateStatus(
    "Refreshing website preview..."
  );

}


/* =========================================
   IFRAME LOAD
========================================= */

websiteFrame.addEventListener(
  "load",
  () => {

    state.isReady = true;

    registerAllImages();

    observeWebsiteChanges();

    applyAllReplacements();

    updateEditedImageCount();

    updateStatus(
      "Preview ready. Click any image to edit it."
    );

  }
);


/* =========================================
   DEVICE PREVIEW
========================================= */

function setDevice(device) {

  state.selectedDevice = device;

  websiteFrameContainer.classList.remove(
    "desktop-frame",
    "tablet-frame",
    "mobile-frame"
  );

  document.querySelectorAll(
    ".device-button"
  ).forEach(button => {

    button.classList.toggle(
      "active",
      button.dataset.device === device
    );

  });

  if (device === "tablet") {

    websiteFrameContainer.classList.add(
      "tablet-frame"
    );

  } else if (device === "mobile") {

    websiteFrameContainer.classList.add(
      "mobile-frame"
    );

  } else {

    websiteFrameContainer.classList.add(
      "desktop-frame"
    );

  }

}


/* =========================================
   PROJECT EXPORT
========================================= */

function createProjectExportData() {

  return {

    editor: "Apsara Local Visual Editor",

    version: EDITOR_CONFIG.exportVersion,

    createdAt: new Date().toISOString(),

    websiteFile:
      EDITOR_CONFIG.websiteFile,

    websiteTitle:
      "Apsara Beauty Atelier",

    replacements:
      state.replacements

  };

}


function downloadBlob(
  blob,
  fileName
) {

  const url =
    URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download = fileName;

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.setTimeout(() => {

    URL.revokeObjectURL(url);

  }, 1000);

}


function downloadTextFile(
  text,
  fileName,
  mimeType = "text/plain"
) {

  const blob =
    new Blob(
      [text],
      { type: mimeType }
    );

  downloadBlob(
    blob,
    fileName
  );

}


function exportProject() {

  const exportData =
    createProjectExportData();

  const json =
    JSON.stringify(
      exportData,
      null,
      2
    );

  downloadTextFile(
    json,
    "apsara-visual-editor-project.json",
    "application/json"
  );

  showNotification(
    "Project backup exported successfully."
  );

  updateStatus(
    "Project edits have been exported as a JSON backup."
  );

}


/* =========================================
   EXPORT STANDALONE PREVIEW
========================================= */

function buildStandalonePreviewHTML() {

  const documentInsideFrame =
    getFrameDocument();

  if (!documentInsideFrame) {

    throw new Error(
      "Website preview is not ready."
    );

  }

  const clonedDocument =
    documentInsideFrame.documentElement.cloneNode(
      true
    );

  const images =
    clonedDocument.querySelectorAll("img");

  images.forEach(image => {

    const originalSource =
      image.getAttribute(
        "data-editor-original-src"
      ) ||
      image.getAttribute("src") ||
      "";

    const replacement =
      state.replacements[
        originalSource
      ];

    if (replacement?.dataUrl) {

      image.setAttribute(
        "src",
        replacement.dataUrl
      );

    }

    if (replacement?.alt) {

      image.setAttribute(
        "alt",
        replacement.alt
      );

    }

    image.removeAttribute(
      "data-editor-original-src"
    );

    image.removeAttribute(
      "data-editor-replaced"
    );

  });

  const html =
    "<!DOCTYPE html>\n" +
    clonedDocument.outerHTML;

  return html;

}


function exportStandalonePreview() {

  try {

    const html =
      buildStandalonePreviewHTML();

    downloadTextFile(
      html,
      "apsara-edited-preview.html",
      "text/html"
    );

    showNotification(
      "Standalone preview exported."
    );

  } catch (error) {

    console.error(error);

    showNotification(
      "Could not export the standalone preview."
    );

  }

}


/* =========================================
   DOWNLOAD EDITED ASSETS
========================================= */

function dataUrlToBlob(dataUrl) {

  const parts =
    dataUrl.split(",");

  const header =
    parts[0];

  const data =
    parts[1];

  const mimeMatch =
    header.match(
      /data:(.*?);base64/
    );

  const mime =
    mimeMatch
      ? mimeMatch[1]
      : "application/octet-stream";

  const binary =
    window.atob(data);

  const length =
    binary.length;

  const bytes =
    new Uint8Array(length);

  for (
    let index = 0;
    index < length;
    index += 1
  ) {

    bytes[index] =
      binary.charCodeAt(index);

  }

  return new Blob(
    [bytes],
    { type: mime }
  );

}


function sanitizeFileName(name) {

  return String(name || "image")
    .replace(
      /[^a-z0-9_\-.]/gi,
      "-"
    )
    .replace(
      /-+/g,
      "-"
    )
    .toLowerCase();

}


function downloadEditedAssets() {

  const entries =
    Object.entries(
      state.replacements
    );

  if (!entries.length) {

    showNotification(
      "There are no edited images to download."
    );

    return;

  }

  let downloadedCount = 0;

  entries.forEach(
    ([key, replacement], index) => {

      if (!replacement?.dataUrl) {
        return;
      }

      try {

        const blob =
          dataUrlToBlob(
            replacement.dataUrl
          );

        const originalName =
          replacement.fileName ||
          `apsara-image-${index + 1}`;

        const fileName =
          `${String(index + 1).padStart(2, "0")}-${sanitizeFileName(originalName)}`;

        downloadBlob(
          blob,
          fileName
        );

        downloadedCount += 1;

      } catch (error) {

        console.error(
          "Could not download asset.",
          error
        );

      }

    }
  );

  showNotification(
    `${downloadedCount} edited image asset(s) exported.`
  );

}


/* =========================================
   IMPORT PROJECT BACKUP
========================================= */

importProjectInput.addEventListener(
  "change",
  async event => {

    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    try {

      const text =
        await file.text();

      const parsed =
        JSON.parse(text);

      if (
        !parsed ||
        typeof parsed !== "object" ||
        !parsed.replacements ||
        typeof parsed.replacements !== "object"
      ) {

        throw new Error(
          "This file is not a valid Apsara editor backup."
        );

      }

      const replacementEntries =
        Object.entries(
          parsed.replacements
        );

      let importedCount = 0;

      replacementEntries.forEach(
        ([key, value]) => {

          if (
            typeof key !== "string" ||
            !value ||
            typeof value !== "object" ||
            !isValidImageDataUrl(value.dataUrl)
          ) {

            return;

          }

          state.replacements[key] = {

            dataUrl: value.dataUrl,

            alt:
              safeString(value.alt) ||
              "Salon image",

            fileName:
              value.fileName ||
              "imported-image",

            mimeType:
              value.mimeType ||
              "image/jpeg",

            updatedAt:
              value.updatedAt ||
              new Date().toISOString()

          };

          importedCount += 1;

        }
      );

      saveReplacements();

      applyAllReplacements();

      showNotification(
        `${importedCount} image edit(s) imported.`
      );

      updateStatus(
        "Imported project edits are now active in this browser."
      );

    } catch (error) {

      console.error(error);

      showNotification(
        error.message ||
        "Could not import the project backup."
      );

    } finally {

      importProjectInput.value = "";

    }

  }
);


/* =========================================
   DIRECT IMAGE SELECTION
========================================= */

selectImageButton.addEventListener(
  "click",
  () => {

    showNotification(
      "Click an image inside the website preview to edit it."
    );

    previewButton.click();

  }
);


/* =========================================
   BUTTON EVENTS
========================================= */

closeImageModalButton.addEventListener(
  "click",
  closeImageEditor
);

cancelImageButton.addEventListener(
  "click",
  closeImageEditor
);

saveImageButton.addEventListener(
  "click",
  saveSelectedImage
);

resetSelectedImageButton.addEventListener(
  "click",
  resetSelectedImage
);

refreshPreviewButton.addEventListener(
  "click",
  refreshWebsitePreview
);

resetAllButton.addEventListener(
  "click",
  resetAllEdits
);

exportProjectButton.addEventListener(
  "click",
  () => {

    exportProject();

    window.setTimeout(() => {

      const exportStandalone =
        window.confirm(
          "Do you also want to export a standalone preview HTML file?"
        );

      if (exportStandalone) {

        exportStandalonePreview();

      }

    }, 250);

  }
);

importProjectButton.addEventListener(
  "click",
  () => {

    importProjectInput.click();

  }
);

downloadAssetsButton.addEventListener(
  "click",
  downloadEditedAssets
);

previewButton.addEventListener(
  "click",
  () => {

    websiteFrame.focus();

    websiteFrame.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  }
);


/* =========================================
   DEVICE BUTTONS
========================================= */

document.querySelectorAll(
  ".device-button"
).forEach(button => {

  button.addEventListener(
    "click",
    () => {

      setDevice(
        button.dataset.device
      );

    }
  );

});


/* =========================================
   MODAL BACKDROP EVENTS
========================================= */

imageModalBackdrop.addEventListener(
  "click",
  event => {

    if (
      event.target ===
      imageModalBackdrop
    ) {

      closeImageEditor();

    }

  }
);


/* =========================================
   KEYBOARD SUPPORT
========================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape" &&
      imageModalBackdrop.classList.contains(
        "active"
      )
    ) {

      closeImageEditor();

    }

  }
);


/* =========================================
   INITIALIZATION
========================================= */

function initializeEditor() {

  updateEditedImageCount();

  setDevice("desktop");

  updateStatus(
    "Loading website preview..."
  );

}

initializeEditor();
