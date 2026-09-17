
"use strict";


/* =========================================
   APSARA VISUAL EDITOR
   Image replacement system
========================================= */


/* =========================================
   ELEMENT REFERENCES
========================================= */

const websiteFrame =
  document.getElementById("websiteFrame");

const imageEditorModal =
  document.getElementById("imageEditorModal");

const modalOverlay =
  document.getElementById("modalOverlay");

const closeModalButton =
  document.getElementById("closeModalButton");

const cancelImageButton =
  document.getElementById("cancelImageButton");

const imageFileInput =
  document.getElementById("imageFileInput");

const saveImageButton =
  document.getElementById("saveImageButton");

const currentImagePreview =
  document.getElementById("currentImagePreview");

const selectedFileName =
  document.getElementById("selectedFileName");

const selectedImageName =
  document.getElementById("selectedImageName");

const selectedImageInfo =
  document.getElementById("selectedImageInfo");

const notification =
  document.getElementById("notification");

const notificationMessage =
  document.getElementById("notificationMessage");

const previewButton =
  document.getElementById("previewButton");

const resetButton =
  document.getElementById("resetButton");


/* =========================================
   STATE
========================================= */

let selectedImage = null;

let selectedOriginalSource = "";

let selectedFile = null;

let notificationTimeout = null;

const STORAGE_KEY =
  "apsara_visual_editor_image_replacements";


/* =========================================
   STORAGE HELPERS
========================================= */

function getSavedReplacements() {

  try {

    const saved =
      localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return {};
    }

    return JSON.parse(saved);

  } catch (error) {

    console.error(
      "Unable to read saved image replacements:",
      error
    );

    return {};

  }

}


function saveReplacements(replacements) {

  try {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(replacements)
    );

    return true;

  } catch (error) {

    console.error(
      "Unable to save image replacement:",
      error
    );

    showNotification(
      "Storage limit reached. Try a smaller image."
    );

    return false;

  }

}


/* =========================================
   NOTIFICATIONS
========================================= */

function showNotification(message) {

  notificationMessage.textContent = message;

  notification.classList.add("visible");

  clearTimeout(notificationTimeout);

  notificationTimeout = setTimeout(() => {

    notification.classList.remove("visible");

  }, 3000);

}


/* =========================================
   FRAME ACCESS
========================================= */

function getFrameDocument() {

  try {

    return websiteFrame.contentDocument ||
           websiteFrame.contentWindow.document;

  } catch (error) {

    console.error(
      "Unable to access website preview:",
      error
    );

    showNotification(
      "Preview access failed. Open the site through a local server."
    );

    return null;

  }

}


/* =========================================
   IMAGE KEY
========================================= */

function getImageKey(image) {

  if (!image.dataset.editorOriginalSource) {

    image.dataset.editorOriginalSource =
      image.currentSrc ||
      image.src ||
      "";

  }

  return image.dataset.editorOriginalSource;

}


/* =========================================
   APPLY SAVED IMAGES
========================================= */

function applySavedImages() {

  const frameDocument =
    getFrameDocument();

  if (!frameDocument) {
    return;
  }

  const savedReplacements =
    getSavedReplacements();

  const images =
    frameDocument.querySelectorAll("img");

  images.forEach(image => {

    const imageKey =
      getImageKey(image);

    if (
      imageKey &&
      savedReplacements[imageKey]
    ) {

      image.src =
        savedReplacements[imageKey];

    }

  });

}


/* =========================================
   IMAGE EVENT LISTENERS
========================================= */

function setupImageListeners() {

  const frameDocument =
    getFrameDocument();

  if (!frameDocument) {
    return;
  }

  const images =
    frameDocument.querySelectorAll("img");

  images.forEach(image => {

    if (image.dataset.editorReady === "true") {
      return;
    }

    image.dataset.editorReady = "true";

    getImageKey(image);

    image.style.cursor = "pointer";

    image.addEventListener("mouseenter", () => {

      image.classList.add(
        "editor-image-highlight"
      );

    });

    image.addEventListener("mouseleave", () => {

      if (image !== selectedImage) {

        image.classList.remove(
          "editor-image-highlight"
        );

      }

    });

    image.addEventListener("click", event => {

      event.preventDefault();
      event.stopPropagation();

      openImageEditor(image);

    });

  });

}


/* =========================================
   MONITOR DYNAMIC CONTENT
========================================= */

function monitorFrameChanges() {

  const frameDocument =
    getFrameDocument();

  if (!frameDocument) {
    return;
  }

  const appElement =
    frameDocument.getElementById("app");

  if (!appElement) {

    setupImageListeners();
    applySavedImages();

    return;

  }

  const observer =
    new MutationObserver(() => {

      setupImageListeners();
      applySavedImages();

    });

  observer.observe(appElement, {

    childList: true,
    subtree: true

  });

}


/* =========================================
   OPEN IMAGE EDITOR
========================================= */

function openImageEditor(image) {

  if (!image) {
    return;
  }

  selectedImage = image;

  selectedOriginalSource =
    getImageKey(image);

  selectedFile = null;

  imageFileInput.value = "";

  saveImageButton.disabled = true;

  selectedFileName.textContent =
    "No file selected";

  selectedImageName.textContent =
    getReadableImageName(
      selectedOriginalSource
    );

  selectedImageInfo.classList.add(
    "visible"
  );

  currentImagePreview.src =
    image.src;

  image.classList.add(
    "editor-image-highlight"
  );

  imageEditorModal.classList.remove(
    "hidden"
  );

}


/* =========================================
   IMAGE NAME
========================================= */

function getReadableImageName(source) {

  if (!source) {
    return "Unnamed image";
  }

  try {

    const parsedUrl =
      new URL(source, window.location.href);

    const path =
      parsedUrl.pathname;

    const lastPart =
      path.split("/").pop();

    return lastPart ||
           "Website image";

  } catch (error) {

    return "Website image";

  }

}


/* =========================================
   CLOSE MODAL
========================================= */

function closeImageEditor() {

  imageEditorModal.classList.add(
    "hidden"
  );

  if (selectedImage) {

    selectedImage.classList.remove(
      "editor-image-highlight"
    );

  }

  selectedImage = null;

  selectedOriginalSource = "";

  selectedFile = null;

  imageFileInput.value = "";

  saveImageButton.disabled = true;

}


/* =========================================
   IMAGE FILE SELECTION
========================================= */

imageFileInput.addEventListener(
  "change",
  event => {

    const file =
      event.target.files[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {

      showNotification(
        "Please select a valid image file."
      );

      return;

    }

    selectedFile = file;

    selectedFileName.textContent =
      file.name;

    saveImageButton.disabled = false;

    const fileReader =
      new FileReader();

    fileReader.onload = readerEvent => {

      currentImagePreview.src =
        readerEvent.target.result;

    };

    fileReader.readAsDataURL(file);

  }
);


/* =========================================
   SAVE IMAGE REPLACEMENT
========================================= */

saveImageButton.addEventListener(
  "click",
  () => {

    if (!selectedImage || !selectedFile) {

      showNotification(
        "Choose an image first."
      );

      return;

    }

    const fileReader =
      new FileReader();

    fileReader.onload = event => {

      const newImageSource =
        event.target.result;

      const replacements =
        getSavedReplacements();

      replacements[selectedOriginalSource] =
        newImageSource;

      const saved =
        saveReplacements(replacements);

      if (!saved) {
        return;
      }

      const frameDocument =
        getFrameDocument();

      if (frameDocument) {

        const images =
          frameDocument.querySelectorAll("img");

        images.forEach(image => {

          const imageKey =
            getImageKey(image);

          if (
            imageKey === selectedOriginalSource
          ) {

            image.src =
              newImageSource;

          }

        });

      }

      showNotification(
        "Image replacement applied successfully."
      );

      closeImageEditor();

    };

    fileReader.readAsDataURL(selectedFile);

  }
);


/* =========================================
   RESET ALL IMAGES
========================================= */

resetButton.addEventListener(
  "click",
  () => {

    const shouldReset =
      window.confirm(
        "Reset all saved image replacements?"
      );

    if (!shouldReset) {
      return;
    }

    localStorage.removeItem(
      STORAGE_KEY
    );

    const frame =
      websiteFrame.contentWindow;

    if (frame) {

      frame.location.reload();

    }

    selectedImageInfo.classList.remove(
      "visible"
    );

    showNotification(
      "All image replacements have been reset."
    );

  }
);


/* =========================================
   PREVIEW BUTTON
========================================= */

previewButton.addEventListener(
  "click",
  () => {

    const frame =
      websiteFrame.contentWindow;

    if (!frame) {
      return;
    }

    try {

      frame.focus();

      showNotification(
        "Preview is displayed in the website frame."
      );

    } catch (error) {

      showNotification(
        "Unable to focus the website preview."
      );

    }

  }
);


/* =========================================
   MODAL CONTROLS
========================================= */

closeModalButton.addEventListener(
  "click",
  closeImageEditor
);

cancelImageButton.addEventListener(
  "click",
  closeImageEditor
);

modalOverlay.addEventListener(
  "click",
  closeImageEditor
);


/* =========================================
   KEYBOARD CONTROLS
========================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape" &&
      !imageEditorModal.classList.contains("hidden")
    ) {

      closeImageEditor();

    }

  }
);


/* =========================================
   FRAME LOAD
========================================= */

websiteFrame.addEventListener(
  "load",
  () => {

    setTimeout(() => {

      setupImageListeners();
      applySavedImages();
      monitorFrameChanges();

      showNotification(
        "Website preview loaded."
      );

    }, 350);

  }
);


/* =========================================
   INITIAL SAFETY CHECK
========================================= */

window.addEventListener(
  "beforeunload",
  () => {

    if (selectedFile) {

      selectedFile = null;

    }

  }
);
