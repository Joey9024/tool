class ImageResizer {
    constructor() {
        this.initElements();
        this.bindEvents();
        this.originalImage = null;
        this.aspectRatio = 1;
        this.rotation = 0;
    }

    initElements() {
        this.dropZone = document.getElementById('dropZone');
        this.fileInput = document.getElementById('fileInput');
        this.previewImage = document.getElementById('previewImage');
        this.previewArea = document.querySelector('.preview-area');
        this.widthInput = document.getElementById('widthInput');
        this.heightInput = document.getElementById('heightInput');
        this.lockRatio = document.getElementById('lockRatio');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.presetSize = document.getElementById('presetSize');
        this.rotateLeftBtn = document.getElementById('rotateLeftBtn');
        this.rotateRightBtn = document.getElementById('rotateRightBtn');
    }

    bindEvents() {
        this.dropZone.addEventListener('click', () => this.fileInput.click());
        this.dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.dropZone.classList.add('dragover');
        });
        this.dropZone.addEventListener('dragleave', () => {
            this.dropZone.classList.remove('dragover');
        });
        this.dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            this.dropZone.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                this.handleImage(file);
            }
        });

        this.fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.handleImage(file);
            }
        });

        this.widthInput.addEventListener('input', () => this.updateDimensions('width'));
        this.heightInput.addEventListener('input', () => this.updateDimensions('height'));
        this.downloadBtn.addEventListener('click', () => this.downloadImage());

        this.presetSize.addEventListener('change', () => {
            if (this.presetSize.value) {
                const [width, height] = this.presetSize.value.split(',').map(Number);
                this.widthInput.value = width;
                this.heightInput.value = height;
                this.aspectRatio = width / height;
            }
        });

        this.rotateLeftBtn.addEventListener('click', () => this.rotateImage(-90));
        this.rotateRightBtn.addEventListener('click', () => this.rotateImage(90));
    }

    handleImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            this.originalImage = new Image();
            this.originalImage.onload = () => {
                this.aspectRatio = this.originalImage.width / this.originalImage.height;
                this.widthInput.value = this.originalImage.width;
                this.heightInput.value = this.originalImage.height;
                this.previewImage.src = e.target.result;
                this.previewArea.style.display = 'block';
            };
            this.originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    updateDimensions(changedInput) {
        if (this.lockRatio.checked) {
            if (changedInput === 'width') {
                const width = parseInt(this.widthInput.value);
                this.heightInput.value = Math.round(width / this.aspectRatio);
            } else {
                const height = parseInt(this.heightInput.value);
                this.widthInput.value = Math.round(height * this.aspectRatio);
            }
        }
    }

    rotateImage(degrees) {
        this.rotation = (this.rotation + degrees) % 360;
        this.previewImage.style.transform = `rotate(${this.rotation}deg)`;
    }

    downloadImage() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const isVertical = this.rotation % 180 !== 0;
        canvas.width = isVertical ? parseInt(this.heightInput.value) : parseInt(this.widthInput.value);
        canvas.height = isVertical ? parseInt(this.widthInput.value) : parseInt(this.heightInput.value);
        
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.drawImage(
            this.originalImage,
            -canvas.width / 2,
            -canvas.height / 2,
            canvas.width,
            canvas.height
        );
        
        const link = document.createElement('a');
        link.download = 'resized-image.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }
} 