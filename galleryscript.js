// Warning Pop up when user enters gallery
const warningBox = document.getElementById("warningBox");
const warningClose = document.getElementById("warningClose");

warningClose.addEventListener("click", () => {
    warningBox.style.display = "none";
});

// @ts-check

//region GalleryAPI
/**
 * Data Layer
 */
class GalleryAPI {
  /**
   * 
   * @param {string} jsonUrl - Path to the generated JSON file
   */
  constructor(jsonUrl) {
    this.jsonUrl = jsonUrl;
  }

  /**
   * Fetches the image list from the server.
   * @returns {Promise<string[]>} A promise that resolves to an array of strings (file names).
   */
  async fetchImages() {
    try {
      const response = await fetch(this.jsonUrl);
      if (!response.ok) throw new Error("Error loading the JSON images");
      return await response.json();
    } catch (error) {
      console.error("GalleryAPI Error:", error);
      return [];
    }
  }
}

//region GalleryRenderer
/**
 * Presentation Layer
 */
class GalleryRenderer {
  /**
   * 
   * @param {string} containerId - The ID of the HTML element in the DOM.
   * @param {string} imageFolder - Path to the folder containing the images.
   */
  constructor(containerId, imageFolder) {
    this.container = document.getElementById(containerId);
    this.imageFolder = imageFolder;
  }

  /**
   * Creates an HTML image element.
   * @param {string} fileName - File name including extension.
   * @returns {HTMLImageElement} The configured <img> element.
   */
  createImageElement(fileName) {
    const img = document.createElement("img");
    img.src = `${this.imageFolder}${fileName}`;
    img.alt = "VRChat Memory";
    img.loading = "lazy";
    return img;
  }

  /**
   * Renders a batch of images inside the specified container.
   * @param {string[]} imageFiles - Array containing image file names.
   */
  renderBatch(imageFiles) {
    if (!this.container) return;

    const fragment = document.createDocumentFragment();

    imageFiles.forEach(fileName => {
      const imageElement = this.createImageElement(fileName);
      fragment.appendChild(imageElement);
    });

    this.container.appendChild(fragment);
  }
}

//region InfiniteScroll
/**
 * Controller Layer for Infinite Scroll
 */
class InfiniteScroll {
  /**
   * @param {Function} loadNextBatch - Callback to load next set of images
   * @param {string} sentinelId - The ID of the HTML element used as sentinel
   */
  constructor(loadNextBatch, sentinelId) {
    this.loadNextBatch = loadNextBatch;
    this.sentinel = document.getElementById(sentinelId);
    
    if (!this.sentinel) {
      console.warn("InfiniteScroll: Sentinel not found.");
      return;
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadNextBatch();
        }
      });
    }, {
      rootMargin: "200px"
    });
  }

  start() {
    if (this.sentinel && this.observer) {
      this.observer.observe(this.sentinel);
    }
  }

  stop() {
    if (this.sentinel && this.observer) {
      this.observer.unobserve(this.sentinel);
    }
  }
}

//region GalleryApp
/**
 * Orchestration Layer
 */
class GalleryApp {
  /**
   * 
   * @param {GalleryAPI} api - API instance.
   * @param {GalleryRenderer} renderer - Renderer instance.
   */
  constructor(api, renderer) {
    /** @type {GalleryAPI} */
    this.api = api;
    /** @type {GalleryRenderer} */
    this.renderer = renderer;
    /** @type {string[]} */
    this.allImages = [];
    /** @type {number} */
    this.currentIndex = 0;
    /** @type {number} Load number of images at a time*/
    this.batchSize = 15;
    /** @type {InfiniteScroll | null} */ 
    this.infiniteScroll = null;
  }

  /**
   * Initializes the application.
   * @returns {Promise<void>}
   */
  async init() {
    this.allImages = await this.api.fetchImages();
    
    this.loadNextBatch();

    this.infiniteScroll = new InfiniteScroll(() => this.loadNextBatch(), "scroll-sentinel");
    this.infiniteScroll.start();
  }

  /**
   * Loads the next batch of images.
   * @returns {void}
   */
  loadNextBatch() {
    if (this.currentIndex >= this.allImages.length) {
      if (this.infiniteScroll) {
        this.infiniteScroll.stop();
      }
      return;
    }

    const nextBatch = this.allImages.slice(this.currentIndex, this.currentIndex + this.batchSize);
    this.renderer.renderBatch(nextBatch);
    this.currentIndex += this.batchSize;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const api = new GalleryAPI("images.json");
  const renderer = new GalleryRenderer("gallery", "images-optimized/");

  const app = new GalleryApp(api, renderer);

  app.init();
});
