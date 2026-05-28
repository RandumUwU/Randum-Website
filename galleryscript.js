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
   * Renders the images inside the specified container.
   * @param {string[]} imageFiles - Array containing image file names.
   * @returns 
   */
  render(imageFiles) {
    if (!this.container) return;

    const fragment = document.createDocumentFragment();

    imageFiles.forEach(fileName => {
      const imageElement = this.createImageElement(fileName);
      fragment.appendChild(imageElement);
    });

    this.container.appendChild(fragment);
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
    this.api = api;
    this.renderer = renderer;
  }

  async init() {
    const images = await this.api.fetchImages();
    this.renderer.render(images);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const api = new GalleryAPI("images.json");
  const renderer = new GalleryRenderer("gallery", "images/");

  const app = new GalleryApp(api, renderer);

  app.init();
})
